'use strict';

import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

import { Trace } from 'vscode-jsonrpc';
import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient';
import { legend, semanticTokensProvider } from './highlight';
import { Config } from './config';
import { registerBuildCommands } from './build-commands';

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
    let javaArgs: string[];
    
    const ldsJar = context.asAbsolutePath(path.join(Config.libDirName, Config.ldsJarName));
    const hasDiagrams = fs.existsSync(ldsJar);

    if (hasDiagrams) {
        // Get os to select platform dependent SWT library
        let swt: string;
        let cpSep = ':';
        switch(os.platform()) {
            case 'win32': 
                swt = context.asAbsolutePath(path.join(Config.libDirName, 'org.eclipse.swt.win32.win32.jar'));
                cpSep = ';';
                break;
            case 'darwin': 
                swt = context.asAbsolutePath(path.join(Config.libDirName, 'org.eclipse.swt.cocoa.macosx.jar'));
                break;
            default: // maybe a bit too optimistic
                swt = context.asAbsolutePath(path.join(Config.libDirName, 'org.eclipse.swt.gtk.linux.jar'));
                break;
        }
        javaArgs = ['-cp', ldsJar+cpSep+swt, 'org.lflang.diagram.lsp.LanguageDiagramServer'];
    } else {
        // This assumes the extention was build with the standart LS without diagrams only named lflang.jar (requires manual activation in the gradle script)
        javaArgs = ['-jar', context.asAbsolutePath(path.join(Config.libDirName, 'lflang.jar'))];
    }
    
    // TODO check if correct java is available
    let serverOptions: ServerOptions = {
        run : { command: 'java', args: javaArgs },
        debug: { command: 'java', args: javaArgs, options: { env: createDebugEnv() } }
    };
    
    let clientOptions: LanguageClientOptions = {
        documentSelector: ['lflang'],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.*')
        }
    };
    
    client = new LanguageClient('LF Language Server', serverOptions, clientOptions);
    // enable tracing (.Off, .Messages, Verbose)
    client.trace = Trace.Verbose;

    if (hasDiagrams) {
        // Register with Klighd Diagram extension
        const refId = await vscode.commands.executeCommand(
            'klighd-vscode.setLanguageClient',
            client,
            ['lf']
        );
    }

    client.start();

    registerBuildCommands(context, client);

    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(
        { language: 'lflang', scheme: 'file' },
        semanticTokensProvider,
        legend
    ));
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
    return client.stop();
}
