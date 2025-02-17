/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from "./zapYamlGenerator.ts";
import { Block } from "blockly/core";
import { CodeGenerator } from "blockly";

export function builtinLogicNullToYaml(
  _block: Block,
  _generator: CodeGenerator,
): string | [string, number] | null {
  return ["null", Order.ATOMIC];
}

export function builtinTextToYaml(
  block: Block,
  _generator: CodeGenerator,
): string | [string, number] | null {
  const textValue = block.getFieldValue("TEXT");
  const code = `"${textValue}"`;
  return [code, Order.ATOMIC];
}

export function builtinMathNumberToYaml(
  block: Block,
  _generator: CodeGenerator,
): string | [string, number] | null {
  const code = String(block.getFieldValue("NUM"));
  return [code, Order.ATOMIC];
}

export function builtinLogicBooleanToYaml(
  block: Block,
  _generator: CodeGenerator,
): string | [string, number] | null {
  const code = block.getFieldValue("BOOL") == "TRUE" ? "true" : "false";
  return [code, Order.ATOMIC];
}

export function builtinListsCreateWithToYaml(
  block: Block,
  generator: CodeGenerator,
): string | [string, number] | null {
  const values = [];
  // @ts-ignore
  for (let i = 0; i < block.itemCount_; i++) {
    const subBlock = block.getInputTargetBlock("ADD" + i);
    if (subBlock) {
      if (subBlock.type === "text") {
        values.push(`- "${subBlock.getFieldValue("TEXT")}"`);
      } else {
        let valueCode: string | [string, number] =
          generator.blockToCode(subBlock);
        if (valueCode) {
          let code;
          if (typeof valueCode === "string") {
            code = valueCode;
          } else {
            code = valueCode[0];
          }
          values.push(
            generator
              .prefixLines("- " + code, generator.INDENT.repeat(2))
              .replace(/^ {2}/, ""),
          );
        }
      }
    }
  }

  const valueString = "\n" + values.join("\n");
  if (!valueString.trim()) {
    return ["[]", Order.ATOMIC];
  }
  const indentedValueString = generator.prefixLines(
    valueString,
    generator.INDENT,
  );
  return [indentedValueString, Order.ATOMIC];
}
