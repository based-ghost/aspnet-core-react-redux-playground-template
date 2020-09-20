import { AnchorHTMLAttributes } from 'react';
import { IDropdownOption } from '../store/form';
import { Theme } from 'react-functional-select';

/**
 * react-functional-select 'themeConfig' property
 */
export const THEME_CONFIG: Theme = {
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
 * HTML attributes to spread on anchor elements in Settings.tsx component
 */
export type MenuLinkAttributes = AnchorHTMLAttributes<HTMLAnchorElement>;

export const LINK_ATTRIBUTES: MenuLinkAttributes = {
  role: 'button',
  target: '_blank',
  rel: 'noopener noreferrer',
};

/**
 * Dropdown test data
 */
export const DROPDOWN_TEST_DATA: IDropdownOption[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
  { value: 4, label: 'Option 4' },
  { value: 5, label: 'Option 5' }
];

/**
 * HealthChecks/Swagger response path config
 */
export const NUGET_URL_CONFIG: Record<string, string> = {
  HEALTH_UI: 'http://localhost:52530/healthchecks-ui',
  HEALTH_JSON: 'http://localhost:52530/healthchecks-json',
  SWAGGER_DOCS: 'http://localhost:52530/docs'
};
