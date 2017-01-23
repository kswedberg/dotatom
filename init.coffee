# Your init script
#
# Atom will evaluate this file each time a new window is opened. It is run
# after packages are loaded/activated and after the previous editor state
# has been restored.
#
# An example hack to make opened Markdown files always be soft wrapped:
#
# path = require 'path'
#
# atom.workspaceView.eachEditorView (editorView) ->
#   editor = editorView.getEditor()
#   if path.extname(editor.getPath()) is '.md'
#     editor.setSoftWrap(true)

# atom.commands.add('atom-text-editor', 'custom:cut-line', function() {
#   var editor = atom.workspace.getActiveTextEditor();
#   editor.selectLinesContainingCursors();
#   return editor.cutSelectedText();
# });

atom.commands.add 'atom-workspace', 'swed:ignore-toggle', ->
  workspaceView = atom.views.getView atom.workspace
  atom.commands.dispatch workspaceView, 'tree-view:toggle-focus'
  atom.commands.dispatch workspaceView, 'tree-ignore:toggle'

atom.commands.add 'atom-workspace', 'swed:toggle-vcs-ignored-files', ->
  treeView = atom.views.getView(document.querySelector('div.tree-view-resizer.tool-panel'))
  atom.commands.dispatch(treeView, 'tree-view:toggle-vcs-ignored-files');
