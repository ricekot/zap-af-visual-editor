import { CodeGenerator } from "blockly";
import { Block } from "blockly/core";
import { Order } from "./main.ts";

export function zapEnvBlockToYaml(block: Block, generator: CodeGenerator) {
  const contexts = generator.valueToCode(block, "CONTEXTS", Order.ATOMIC);
  const failOnError = block.getFieldValue("FAIL_ON_ERROR_CHECKBOX") === "TRUE";
  const failOnWarning =
    block.getFieldValue("FAIL_ON_WARNING_CHECKBOX") === "TRUE";
  const continueOnFailure =
    block.getFieldValue("CONTINUE_ON_FAILURE_CHECKBOX") === "TRUE";
  const progressToStdout =
    block.getFieldValue("PROGRESS_TO_STDOUT_CHECKBOX") === "TRUE";

  return `env:
  contexts: ${contexts}
  parameters:
    failOnError: ${failOnError}
    failOnWarning: ${failOnWarning}
    continueOnFailure: ${continueOnFailure}
    progressToStdout: ${progressToStdout}
`;
}

export function zapEnvContextBlockToYaml(
  block: Block,
  generator: CodeGenerator,
) {
  const name = block.getFieldValue("NAME");
  const urls = generator.valueToCode(block, "URLS", Order.ATOMIC);
  const includePaths = generator.valueToCode(
    block,
    "INCLUDE_PATHS",
    Order.ATOMIC,
  );
  const excludePaths = generator.valueToCode(
    block,
    "EXCLUDE_PATHS",
    Order.ATOMIC,
  );
  return `name: ${name}
urls: ${urls}
includePaths: ${includePaths}
excludePaths: ${excludePaths}`;
}
