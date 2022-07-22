# Changelog
 
## [v0.3.0](https://github.com/lf-lang/vscode-lingua-franca/tree/v0.3.0) (2022-07-22)

**Highlights** This release builds on [Lingua Franca v0.3.0](https://github.com/lf-lang/lingua-franca/releases/tag/v0.3.0) and [KLighD 2.2.0](https://github.com/kieler/KLighD/releases/tag/release-2022-07-2.2.0). The extension is now also checks whether necessary dependencies are installed and assists users in setting up their environment.

[Full Changelog](https://github.com/lingua-franca/vscode-lingua-franca/compare/v0.2.1...v0.3.0)

**✨ Enhancements**

- Syntax highlighting for modes [\#62](https://github.com/lf-lang/vscode-lingua-franca/pull/62) ([a-sr](https://github.com/a-sr))

**🔧 Fixes**

- Correction of import statement highlighting [\#66](https://github.com/lf-lang/vscode-lingua-franca/pull/66) ([petervdonovan](https://github.com/petervdonovan))

**🚧 Maintenance and Refactoring**

- Enable invocation of uf.py via npm run [\#61](https://github.com/lf-lang/vscode-lingua-franca/pull/61) ([petervdonovan](https://github.com/petervdonovan))

- Dependency checks and environment setup assistance [\#55](https://github.com/lf-lang/vscode-lingua-franca/pull/55) ([petervdonovan](https://github.com/petervdonovan))

 
## [v0.2.1](https://github.com/lf-lang/vscode-lingua-franca/tree/v0.2.1) (2022-05-19)

**Highlights:**

This release includes bug fixes in the Lingua Franca compiler as well as minor enhancements of the user experience in VS Code.

[Full Changelog](https://github.com/lf-lang/vscode-lingua-franca/compare/v0.2.0...v0.2.1)

**Implemented enhancements:**

- Cmake errors need to show more details [\#42](https://github.com/lf-lang/vscode-lingua-franca/issues/42)
- Any automatic builds should be configurable [\#24](https://github.com/lf-lang/vscode-lingua-franca/issues/24)

**Merged pull requests:**

- Allow users to disable target language validation on save. [\#51](https://github.com/lf-lang/vscode-lingua-franca/pull/51) ([petervdonovan](https://github.com/petervdonovan))
- Add button to view output from build [\#47](https://github.com/lf-lang/vscode-lingua-franca/pull/47) ([petervdonovan](https://github.com/petervdonovan))
- Style updates [\#17](https://github.com/lf-lang/vscode-lingua-franca/pull/17) ([petervdonovan](https://github.com/petervdonovan))
 
## [v0.2.0](https://github.com/lf-lang/vscode-lingua-franca/tree/v0.2.0) (2022-05-02)

**Highlights:**

Upgrade to Lingua Franca v0.2.0, which runs on Java 17. Most relevant to the VS Code extension is a fix for an issue that prevented some of the diagram options from showing up in the menu.

[Full Changelog](https://github.com/lf-lang/vscode-lingua-franca/compare/v0.1.1...v0.2.0)

**Fixed bugs:**

- "Build and Run" should use full path [\#43](https://github.com/lf-lang/vscode-lingua-franca/issues/43)

**Closed issues:**

- Strange rendering artifacts in diagrams [\#31](https://github.com/lf-lang/vscode-lingua-franca/issues/31)

**Merged pull requests:**

- Make "Build and Run" action work irrespective of current working directory [\#45](https://github.com/lf-lang/vscode-lingua-franca/pull/45) ([petervdonovan](https://github.com/petervdonovan))
- Bump to Java 17 and allow building on Mac [\#44](https://github.com/lf-lang/vscode-lingua-franca/pull/44) ([lhstrh](https://github.com/lhstrh))
 
## [v0.1.1](https://github.com/lf-lang/vscode-lingua-franca/tree/v0.1.1) (2022-04-11)

**Highlights:**

Upgrade to Lingua Franca v0.1.0.

[Full Changelog](https://github.com/lf-lang/vscode-lingua-franca/compare/v0.1.0...v0.1.1)

**Closed issues:**

- Enable CI [\#4](https://github.com/lf-lang/vscode-lingua-franca/issues/4)

**Merged pull requests:**

- Update README.md [\#40](https://github.com/lf-lang/vscode-lingua-franca/pull/40) ([edwardalee](https://github.com/edwardalee))
- Submodule update [\#28](https://github.com/lf-lang/vscode-lingua-franca/pull/28) ([lhstrh](https://github.com/lhstrh))

## [v0.1.0](https://github.com/lf-lang/vscode-lingua-franca/tree/v0.1.0) (02/01/2022)

### Features
1. KLIghD Diagrams integration, allowing interactive diagrams of Lingua Franca programs.
1. Syntax highlighting for Lingua Franca and C, C++, Python, TypeScript, and Rust code blocks.
1. Semantic highlighting for Lingua Franca.
1. Syntax checking and/or linting for C++, Python, TypeScript, and Rust.
1. In-editor build command.
