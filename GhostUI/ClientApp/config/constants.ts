import { IDropdownOption } from "../store/form";

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
  HEALTH_UI: "http://localhost:56717/healthchecks-ui",
  HEALTH_JSON: "http://localhost:56717/healthchecks-json",
  SWAGGER_DOCS: "http://localhost:56717/docs"
});
