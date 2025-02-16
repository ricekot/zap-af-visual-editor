import { CodeGenerator } from "blockly";
import { Block } from "blockly/core";

export function zapEnvBlockToYaml(block: Block, _generator: CodeGenerator) {
  const contexts = "[]";
  const failOnError = block.getFieldValue("FAIL_ON_ERROR_CHECKBOX") === "TRUE";
  const failOnWarning =
    block.getFieldValue("FAIL_ON_WARNING_CHECKBOX") === "TRUE";
  const continueOnFailure =
    block.getFieldValue("CONTINUE_ON_FAILURE_CHECKBOX") === "TRUE";
  const progressToStdout =
    block.getFieldValue("PROGRESS_TO_STDOUT_CHECKBOX") === "TRUE";

  return `env:
  contexts: ${contexts ? contexts : "[]"}
  parameters:
    failOnError: ${failOnError}
    failOnWarning: ${failOnWarning}
    continueOnFailure: ${continueOnFailure}
    progressToStdout: ${progressToStdout}
`;
}
