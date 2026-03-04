# Ctrl-A Goes Home

An Obsidian plugin that makes Ctrl-A behave like the Home key, which is how Ctrl-A operates on other macOS editors.

By default, Obsidian's Ctrl-A moves the cursor to column 0 (the very beginning of the line). This plugin changes it to work like the Home key instead:

1. **First press**: Moves to the start of line content (after list markers like `- `, `1. `, `- [ ] `, etc.)
2. **Second press**: Moves to column 0
3. **Third press**: Back to start of content (toggles between the two positions)

## Installation

This is a local plugin, not published to the Obsidian community directory.

```
cd ~/Path/To/YourVault
mkdir -p .obsidian/plugins
git clone https://github.com/mesozoic/obsidian-ctrla-goes-home .obsidian/plugins/ctrla-goes-home
```

1. Open Obsidian Settings > Community plugins.
2. Enable "Ctrl-A Goes Home" in the plugin list.
3. If the plugin doesn't appear, restart Obsidian.
