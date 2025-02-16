import "./style.css";
import zapLogo from "/zap.svg?url";
import mermaid from "mermaid";
import {basicSetup, EditorView} from "codemirror";
import {yaml} from "@codemirror/lang-yaml";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="h-screen flex flex-col">
    <nav class="h-12 bg-gray-800 text-white flex items-center px-4">
        <img src="${zapLogo}" class="h-8 mr-2.5" alt="ZAP logo" />
        ZAP AF Plan Visualizer
    </nav>
    <div class="flex flex-1">
        <div class="w-1/2 p-4">
            <div id="editor" class="h-[calc(100vh-var(--spacing)*20)] border"></div>
        </div>
        <div class="w-1/2 p-4">
            <div id="preview" class="p-4 h-[calc(100vh-var(--spacing)*20)] border">
                <pre class="mermaid">
graph TD;
  script --> spider;
                </pre>
            </div>
        </div>
    </div>
  </div>
`;


// Initialize CodeMirror
new EditorView({
    doc: "jobs:\n  - type: script\n  - type: spider",
    extensions: [basicSetup, yaml()],
    parent: document.getElementById("editor")!,
});

mermaid.initialize({});
