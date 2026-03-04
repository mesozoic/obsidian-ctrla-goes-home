const { Plugin, MarkdownView } = require("obsidian");
const { EditorView, keymap } = require("@codemirror/view");
const { Prec } = require("@codemirror/state");

class SmartHomeCtrlA extends Plugin {
  onload() {
    const ext = Prec.highest(
      keymap.of([
        {
          key: "c-a",
          run: (editorView) => {
            const state = editorView.state;
            const sel = state.selection.main;
            const line = state.doc.lineAt(sel.head);
            const lineText = line.text;

            // Find start of content (after list markers, checkboxes, whitespace)
            const match = lineText.match(
              /^(\s*(?:[-*+]|\d+[.)]) ?(?:\[.\] )?)/
            );
            const contentStartOffset = match ? match[0].length : 0;
            const contentStartPos = line.from + contentStartOffset;

            let newPos;
            if (sel.head > contentStartPos) {
              // First press: go to start of content
              newPos = contentStartPos;
            } else if (sel.head > line.from) {
              // Second press: go to column 0
              newPos = line.from;
            } else {
              // Third press (already at col 0): back to content start
              newPos = contentStartPos;
            }

            editorView.dispatch({
              selection: { anchor: newPos },
            });
            return true;
          },
        },
      ])
    );

    this.registerEditorExtension(ext);
  }
}

module.exports = SmartHomeCtrlA;
