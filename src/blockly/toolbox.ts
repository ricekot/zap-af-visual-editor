/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BlockNames } from "./constants.ts";

export const toolbox = {
  kind: "flyoutToolbox",
  contents: [
    { kind: "block", type: BlockNames.LOGIC_NULL },
    { kind: "block", type: BlockNames.TEXT },
    { kind: "block", type: BlockNames.MATH_NUMBER },
    { kind: "block", type: BlockNames.LOGIC_BOOLEAN },
    { kind: "block", type: BlockNames.LISTS_CREATE_WITH },
    {
      kind: "block",
      type: BlockNames.ZAP_ENV,
    },
    {
      kind: "block",
      type: BlockNames.ZAP_ENV_CONTEXTS,
    },
  ],
};
