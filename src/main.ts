import "./style.css";
import zapLogo from "/zap.svg?url";
import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { yaml } from "@codemirror/lang-yaml";
import * as Blockly from "blockly";
import { blocks } from "./blockly/blocks/blockDeclarations.ts";
import { save, load } from "./blockly/serialization.ts";
import { toolbox } from "./blockly/toolbox.ts";
import { Workspace } from "blockly/core";
import { zapAfYamlGenerator } from "./blockly/generators/zapYamlGenerator.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="h-screen flex flex-col">
    <nav class="h-12 bg-gray-800 text-white flex items-center px-4">
        <img src="${zapLogo}" class="h-8 mr-2.5" alt="ZAP logo" />
        ZAP AF Plan Visual Editor
    </nav>
    <div class="flex flex-1">
        <div class="w-1/4 p-4">
            <div id="generatedCode" class="h-[calc(100vh-var(--spacing)*20)] border border-gray-200"></div>
        </div>
        <div class="w-3/4 p-4">
            <div id="blocklyDiv" class="h-[calc(100vh-var(--spacing)*20)]"></div>
        </div>
    </div>
  </div>
`;

// Initialize CodeMirror
const editor = new EditorView({
  doc: "jobs:\n  - type: script\n  - type: spider",
  extensions: [basicSetup, yaml(), EditorState.readOnly.of(true)],
  parent: document.getElementById("generatedCode")!,
});

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);

// Set up UI elements and inject Blockly
const blocklyDiv = document.getElementById("blocklyDiv");
const ws: Workspace = Blockly.inject(blocklyDiv!, { toolbox });

// This function resets the code divs and shows the
// generated code from the workspace.
const generateCode = () => {
  const code = zapAfYamlGenerator.workspaceToCode(ws);
  // Add code to codemirror editor
  editor.dispatch({
    changes: { from: 0, to: editor.state.doc.length, insert: code },
  });
};

// Load the initial state from storage
load(ws);
generateCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
  generateCode();
});
