'use strict';

import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

import { Trace } from 'vscode-jsonrpc';
import * as vscode from 'vscode';
import { connect, NetConnectOpts, Socket } from 'net';
import { LanguageClient, LanguageClientOptions, ServerOptions, StreamInfo } from 'vscode-languageclient/node';
import { legend, semanticTokensProvider } from './highlight';
import * as config from './config';
import { registerBuildCommands, registerNewFileCommand } from './build_commands';
import * as checkDependencies from './check_dependencies';

let client: LanguageClient;
let socket: Socket

export async function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(
        { language: 'lflang', scheme: 'file' },
        semanticTokensProvider,
        legend
    ));

    checkDependencies.registerDependencyWatcher();

    if (!(
        await checkDependencies.checkerFor
        (checkDependencies.Dependency.Java)
        (vscode.window.showErrorMessage)
        ()
    )) return;

    const serverOptions: ServerOptions = createServerOptions(context);

    const clientOptions: LanguageClientOptions = {
        documentSelector: ['lflang'],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.*')
        }
    };

    client = new LanguageClient('LF Language Server', serverOptions, clientOptions);
    // enable tracing (.Off, .Messages, Verbose)
    client.setTrace(Trace.Verbose);

    // Register with Klighd Diagram extension
    const refId = await vscode.commands.executeCommand(
        'klighd-vscode.setLanguageClient',
        client,
        ['lf']
    );

    client.start();

    registerBuildCommands(context, client);
    registerNewFileCommand(context);
}

/**
 * Depending on the launch configuration, returns {@link ServerOptions} that either
 * connects to a socket or starts the LS as a process. It uses a socket if the
 * environment variable `LF_LS_PORT` is present. Otherwise it runs the jar located
 * at `lib/lflang-lds.jar`.
 */
 function createServerOptions(context: vscode.ExtensionContext): ServerOptions {
    // Connect to language server via socket if a port is specified as an env variable
    if (typeof process.env.LF_LS_PORT !== 'undefined') {
        const connectionInfo: NetConnectOpts = {
            port: parseInt(process.env.LF_LS_PORT, 10),
        };
        console.log('Connecting to language server on port: ', connectionInfo.port);

        return async () => {
            socket = connect(connectionInfo);
            const result: StreamInfo = {
                writer: socket,
                reader: socket,
            };
            return result;
        };
    } else { // Start LDS Jar
        const ldsJar = context.asAbsolutePath(path.join(config.libDirName, config.ldsJarName));

        console.log('Spawning the language server as a process.');
        console.assert(fs.existsSync(ldsJar));
    
        return {
            run: { 
                command: 'java', 
                args: ['-Djava.awt.headless=true', '-jar', ldsJar]
            },
            debug: { 
                command: 'java',
                args: ['-Djava.awt.headless=true', '-jar', ldsJar],
                options: { env: createDebugEnv() }
            },
        };
    }
}

function createDebugEnv() {
    return Object.assign({
        JAVA_OPTS:'-Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n,quiet=y'
    }, process.env);
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    if (socket) {
        // Don't call client.stop when we are connected via socket for development.
        // That call will end the LS server, leading to a bad dev experience.
        socket.end();
        return;
    } else {
        return client.stop();
    }
}
