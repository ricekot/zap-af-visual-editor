// Create the block definitions for the custom blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!

import { ZAP_ENV_BLOCK, ZAP_ENV_CONTEXT_BLOCK } from "./env.ts";
import { BlockNames } from "../constants.ts";

export const blocks: { [blockName: string]: any } = {};

blocks[BlockNames.ZAP_ENV] = ZAP_ENV_BLOCK;
blocks[BlockNames.ZAP_ENV_CONTEXTS] = ZAP_ENV_CONTEXT_BLOCK;
