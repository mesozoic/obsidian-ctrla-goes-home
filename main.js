const { Plugin, MarkdownView } = require("obsidian");
const { EditorView, keymap } = require("@codemirror/view");
const { Prec } = require("@codemirror/state");

class SmartHomeCtrlA extends Plugin {
  onload() {
    function smartHomePos(sel, line) {
      const lineText = line.text;

      // Find start of content (after list markers, checkboxes, whitespace)
      const match = lineText.match(
        /^(\s*(?:[-*+]|\d+[.)]) ?(?:\[.\] )?)/
      );
      const contentStartOffset = match ? match[0].length : 0;
      const contentStartPos = line.from + contentStartOffset;

      if (sel.head > contentStartPos) {
        return contentStartPos;
      } else if (sel.head > line.from) {
        return line.from;
      } else {
        return contentStartPos;
      }
    }

    const ext = Prec.highest(
      keymap.of([
        {
          key: "c-a",
          run: (editorView) => {
            const state = editorView.state;
            const sel = state.selection.main;
            const line = state.doc.lineAt(sel.head);
            const newPos = smartHomePos(sel, line);

            editorView.dispatch({
              selection: { anchor: newPos },
            });
            return true;
          },
        },
        {
          key: "c-S-a",
          run: (editorView) => {
            const state = editorView.state;
            const sel = state.selection.main;
            const line = state.doc.lineAt(sel.head);
            const newPos = smartHomePos(sel, line);

            editorView.dispatch({
              selection: { anchor: sel.anchor, head: newPos },
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
