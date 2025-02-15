import "./style.css";
import zapLogo from '../public/zap.svg';

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="h-screen flex flex-col">
    <nav class="h-12 bg-gray-800 text-white flex items-center px-4">
        <img src="${zapLogo}" class="h-8 mr-2.5" alt="ZAP logo" />
        ZAP AF Plan Visualizer
    </nav>
    <div class="flex flex-1">
        <div class="w-1/2 p-4">
            <textarea id="editor" class="w-full h-full border">
jobs:
  - type: script
  - type: spider
            </textarea>
        </div>
        <div class="w-1/2 p-4 overflow-auto">
            <div id="preview" class="border p-4 bg-white">
                <pre class="mermaid"></pre>
            </div>
        </div>
    </div>
  </div>
`;
