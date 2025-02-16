import * as Blockly from "blockly/core";
import { Block, FieldCheckbox } from "blockly/core";

export type ZapEnvBlock = Block & ZapEnvBlockMixin;
interface ZapEnvBlockMixin extends ZapEnvBlockMixinType {}
type ZapEnvBlockMixinType = typeof ZAP_ENV_BLOCK;

interface EnvState {
  showParams: boolean;
}

export const ZAP_ENV_BLOCK = {
  init: function (this: ZapEnvBlock) {
    this.setColour(230);
    this.setTooltip("Define environment settings for the ZAP automation plan.");
    this.setInputsInline(false);

    this.appendDummyInput().appendField("Environment");
    this.appendValueInput("CONTEXTS").appendField("Contexts").setCheck("Array");
    this.appendDummyInput()
      .appendField(new FieldCheckbox("FALSE"), "SHOW_PARAMS")
      .appendField("Show Parameters");

    this.getField("SHOW_PARAMS")?.setValidator(function (
      this: FieldCheckbox,
      newValue: string,
    ) {
      (this.getSourceBlock() as ZapEnvBlock)._updateShape(newValue == "TRUE");
      return undefined;
    });
  },

  saveExtraState: function (this: ZapEnvBlock): EnvState {
    return { showParams: this.getFieldValue("SHOW_PARAMS") == "TRUE" };
  },

  loadExtraState: function (this: ZapEnvBlock, state: EnvState) {
    this._updateShape(state.showParams);
  },

  _updateShape: function (this: ZapEnvBlock, showParams: boolean) {
    const paramsVisible = !!this.getInput("FAIL_ON_ERROR");
    if (showParams) {
      if (!paramsVisible) {
        this.appendDummyInput("FAIL_ON_ERROR")
          .appendField("  ")
          .appendField(
            new Blockly.FieldCheckbox(true),
            "FAIL_ON_ERROR_CHECKBOX",
          )
          .appendField("Fail on Error");

        this.appendDummyInput("FAIL_ON_WARNING")
          .appendField("  ")
          .appendField(
            new Blockly.FieldCheckbox(false),
            "FAIL_ON_WARNING_CHECKBOX",
          )
          .appendField("Fail on Warning");

        this.appendDummyInput("CONTINUE_ON_FAILURE")
          .appendField("  ")
          .appendField(
            new Blockly.FieldCheckbox(false),
            "CONTINUE_ON_FAILURE_CHECKBOX",
          )
          .appendField("Continue on Failure");

        this.appendDummyInput("PROGRESS_TO_STDOUT")
          .appendField("  ")
          .appendField(
            new Blockly.FieldCheckbox(true),
            "PROGRESS_TO_STDOUT_CHECKBOX",
          )
          .appendField("Progress to Stdout");
      }
    } else if (paramsVisible) {
      this.removeInput("FAIL_ON_ERROR");
      this.removeInput("FAIL_ON_WARNING");
      this.removeInput("CONTINUE_ON_FAILURE");
      this.removeInput("PROGRESS_TO_STDOUT");
    }
  },
};

export type ZapEnvContextBlock = Block & ZapEnvContextBlockMixin;
interface ZapEnvContextBlockMixin extends ZapEnvContextBlockMixinType {}
type ZapEnvContextBlockMixinType = typeof ZAP_ENV_CONTEXT_BLOCK;

export const ZAP_ENV_CONTEXT_BLOCK = {
  init: function (this: ZapEnvContextBlock) {
    this.setColour(230);
    this.setTooltip("Define environment context settings.");
    this.setInputsInline(false);
    this.setOutput(true, "Context");

    this.appendDummyInput().appendField("Context");

    this.appendDummyInput("NAME")
      .appendField("Name")
      .appendField(new Blockly.FieldTextInput("Default Context"), "NAME");
    this.appendValueInput("URLS").appendField("URLs").setCheck("Array");
    this.appendValueInput("INCLUDE_PATHS")
      .appendField("Include Paths")
      .setCheck("Array");
    this.appendValueInput("EXCLUDE_PATHS")
      .appendField("Exclude Paths")
      .setCheck("Array");
  },
};
