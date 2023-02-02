/*
* Some Components need to render in unique ways in some screens
* Presets help us reuse most of the component while creating unique variations of it
* Use this file to create your own presets, where needed.
* Remember! NOT ALL COMPONENTS NEED PRESET. This file is here to help you, so don't feel like you need to use it!
*/

import { responsiveWidth } from "../../../theme/@archlife/constants"

export const TextInputterPresets = {
  singleLine: {
    multiline: false,
    containerHeight: responsiveWidth(10),
    minContainerHeight: responsiveWidth(10),
    paddingBottomTextInput: null
  },
  multipleLines: {
    multiline: true,
    containerHeight: null,
    minContainerHeight: responsiveWidth(10),
    paddingBottomTextInput: responsiveWidth(1),
  }
}
export type TextInputterPresetNames = keyof typeof TextInputterPresets