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

    this.appendDummyInput().appendField("Environment");
    this.appendDummyInput()
      .appendField(new FieldCheckbox("FALSE"), "SHOW_PARAMS")
      .appendField("Show Parameters");

    this.getField("SHOW_PARAMS")?.setValidator(function (
      this: FieldCheckbox,
      newValue: string,
    ) {
      // @ts-ignore
      this.getSourceBlock()._updateShape(newValue == "TRUE");
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
