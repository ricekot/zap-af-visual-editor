/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly/core";

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const object = {
  type: "object",
  message0: "{ %1 %2 }",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "MEMBERS",
    },
  ],
  output: null,
  colour: 230,
};

const member = {
  type: "member",
  message0: "%1 %2 %3",
  args0: [
    {
      type: "field_input",
      name: "MEMBER_NAME",
      text: "",
    },
    {
      type: "field_label",
      name: "COLON",
      text: ":",
    },
    {
      type: "input_value",
      name: "MEMBER_VALUE",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 230,
};

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  object,
  member,
]);
