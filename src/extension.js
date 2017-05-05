const vscode = require('vscode');
const Transpiler = require('./Transpiler');

const transpiler = new Transpiler();

function activate(context) {
    const disposable = vscode.commands.registerCommand('extension.convertTwig', function () {
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
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;