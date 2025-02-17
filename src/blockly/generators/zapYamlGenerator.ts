import * as Blockly from "blockly";
import { BlockNames } from "../constants.ts";
import {
  zapEnvBlockToYaml,
  zapEnvContextBlockToYaml,
} from "./zapEnvConverters.ts";
import {
  builtinListsCreateWithToYaml,
  builtinLogicBooleanToYaml,
  builtinLogicNullToYaml,
  builtinMathNumberToYaml,
  builtinTextToYaml,
} from "./builtinConverters.ts";

export const Order = { ATOMIC: 0 };

export const zapAfYamlGenerator = new Blockly.Generator("ZAP_AF_YAML");

zapAfYamlGenerator.scrub_ = function (block, code, thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    return code + "\n" + zapAfYamlGenerator.blockToCode(nextBlock);
  }
  return code;
};

zapAfYamlGenerator.forBlock[BlockNames.LOGIC_NULL] = builtinLogicNullToYaml;
zapAfYamlGenerator.forBlock[BlockNames.TEXT] = builtinTextToYaml;
zapAfYamlGenerator.forBlock[BlockNames.MATH_NUMBER] = builtinMathNumberToYaml;
zapAfYamlGenerator.forBlock[BlockNames.LOGIC_BOOLEAN] =
  builtinLogicBooleanToYaml;
zapAfYamlGenerator.forBlock[BlockNames.LISTS_CREATE_WITH] =
  builtinListsCreateWithToYaml;
zapAfYamlGenerator.forBlock[BlockNames.ZAP_ENV] = zapEnvBlockToYaml;
zapAfYamlGenerator.forBlock[BlockNames.ZAP_ENV_CONTEXTS] =
  zapEnvContextBlockToYaml;
