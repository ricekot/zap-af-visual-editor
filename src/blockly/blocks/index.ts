// Create the block definitions for the custom blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!

import { _jsonMemberBlock, _jsonObjectBlock } from "./json.ts";
import * as Blockly from "blockly/core";
import { ZAP_ENV_BLOCK } from "./env.ts";
import { BlockNames } from "../constants.ts";

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  _jsonObjectBlock,
  _jsonMemberBlock,
]);

blocks[BlockNames.ZAP_ENV] = ZAP_ENV_BLOCK;
