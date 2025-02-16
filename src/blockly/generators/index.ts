import * as Blockly from "blockly";
import { BlockNames } from "../constants.ts";
import { zapEnvBlockToYaml } from "./env.ts";

export const zapAfYamlGenerator = new Blockly.Generator("ZAP_AF_YAML");

zapAfYamlGenerator.forBlock[BlockNames.ZAP_ENV] = zapEnvBlockToYaml;
