import { useToggle } from "./useToggle";
import { useOnClickOutside } from "./useOnClickOutside";
import {
  useTextInput,
  TextInput as ITextInput,
  TextInputType as ITextInputType
} from "./useTextInput";

export type TextInput = ITextInput;
export type TextInputType = ITextInputType;

export {
  useToggle,
  useTextInput,
  useOnClickOutside,
};