const vscode = require('vscode');
const Transpiler = require('./Transpiler');

const transpiler = new Transpiler();

function activate(context) {
    const converter = new Converter();
    let disposable = vscode.commands.registerCommand('extension.convertFile', () => converter.convertFile());
    context.subscriptions.push(disposable);

    disposable = vscode.commands.registerCommand('extension.convertSelection', () => converter.convertSelection());
    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;

class Converter {

    convertFile() {
        if(vscode.window.activeTextEditor) {
            const active_editor = vscode.window.activeTextEditor.document;

            console.log('Starting conversion...');
            const converted_str = transpiler.toJSX(active_editor.getText());
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(active_editor.lineCount, 0); // FIXME the char offset is wrong
            const range = new vscode.Range(start, end);
            const edit = new vscode.TextEdit(range, converted_str);
            const workspace_edit = new vscode.WorkspaceEdit();

            try {
                workspace_edit.set(active_editor.uri, [edit]);
                vscode.workspace.applyEdit(workspace_edit);
                console.log('Conversion successful!');
            }
            catch(e) {
                console.error(e);
            }
        }
    }

    convertSelection() {
        const active_editor = vscode.window.activeTextEditor;
        if(active_editor.selection) {
            const selection = active_editor.selection;
            console.log('Starting conversion...');
            const start = selection.start;
            const end = selection.end;
            const range = new vscode.Range(start, end);
            const converted_str = transpiler.toJSX(active_editor.document.getText(range));
            const edit = new vscode.TextEdit(range, converted_str);
            const workspace_edit = new vscode.WorkspaceEdit();

            try {
                workspace_edit.set(active_editor.document.uri, [edit]);
                vscode.workspace.applyEdit(workspace_edit);
                console.log('Conversion successful!');
            }
            catch(e) {
                console.error(e);
            }
        }
    }
}