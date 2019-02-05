import * as React from 'react';
import { DropdownOption } from '../store/form';

/**
 * Text that appears at bottom of all views/pages (footer)
 */
export const FOOTER_TEXT = '\u00A9 2019 based-ghost LLC';

/**
 * Dropdown test data
 */
export const DROPDOWN_TEST_DATA: DropdownOption[] = [
    { value: 1, label: 'Option 1'},
    { value: 2, label: 'Option 2'},
    { value: 3, label: 'Option 3'},
    { value: 4, label: 'Option 4'},
    { value: 5, label: 'Option 5'}
];

/**
 * HealthChecks/Swagger response path config
 */
export const spaNugetUrls = {
    health_ui: 'http://localhost:56717/healthchecks-ui',
    health_json: 'http://localhost:56717/healthchecks-json',
    swagger_docs: 'http://localhost:56717/docs'
};

/**
 * AuthController endpoints
 */
export const authService = {
    CONTROLLER_ID: 'Auth',
    LOGIN_RQ: 'Login',
    LOGOUT_RQ: 'Logout'
};

/**
 * SampleDataController endpoints
 */
export const sampleService = {
    CONTROLLER_ID: 'SampleData',
    GET_FORECASTS_RQ: 'WeatherForecasts?startDateIndex='
};

/**
 * SignalR defaults
 */
export const signalrService = {
    BASE_URL: 'http://localhost:56717/hubs/users',
    CONNECTION_DELAY: 0,
    HUB_MESSAGE_DELAY: 3000,
    HUB_MESSAGE_TITLE: 'Hub Message',
    LOGIN_USER_EVENT: 'UserLogin',
    LOGOUT_USER_EVENT: 'UserLogout',
    CLOSE_EVENT: 'CloseAllConnections',
    TOASTIFY_ICON: 'info'
};

/**
 * react-toastify npm package constant values for building the inner message html - used in file under utils (toastify-msg-renderer.tsx)
 */
const toastDefaultIcon: string = 'info';

const toastIconStyle: React.CSSProperties = {
    fontSize: '1.5rem'
};

const toastMsgStyle: React.CSSProperties = {
    marginLeft: '.65rem',
    fontSize: '1.1rem'
};

export const toastContent = {
    MSG_STYLE: toastMsgStyle,
    ICON_STYLE: toastIconStyle,
    DEFAULT_ICON: toastDefaultIcon
};
