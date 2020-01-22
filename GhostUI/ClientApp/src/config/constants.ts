import { IDropdownOption } from "../store/form";

/**
 * react-functional-select 'themeConfig' property
 */
export const THEME_CONFIG = {
  color: {
    primary: '#09d3ac'
  },
  control: {
    boxShadowColor: 'rgba(9, 211, 172, 0.25)',
    focusedBorderColor: 'rgba(9, 211, 172, 0.75)'
  },
  menu: {
    option: {
      selectedColor: '#fff',
      selectedBgColor: '#09d3ac',
      focusedBgColor: 'rgba(9, 211, 172, 0.225)'
    }
  }
 };

/**
 * Dropdown test data
 */
export const DROPDOWN_TEST_DATA: IDropdownOption[] = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
  { value: 4, label: "Option 4" },
  { value: 5, label: "Option 5" }
];

/**
 * HealthChecks/Swagger response path config
 */
export type UrlConfig = { [key: string]: string };

export const nugetUrlConfig = Object.freeze<UrlConfig>({
  HEALTH_UI: "http://localhost:52530/healthchecks-ui",
  HEALTH_JSON: "http://localhost:52530/healthchecks-json",
  SWAGGER_DOCS: "http://localhost:52530/docs"
});
