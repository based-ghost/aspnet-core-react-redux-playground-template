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
 * HealthChecks response path config
 */
export const healthChecksConfig = {
    UI_URL: 'http://localhost:56717/healthchecks-ui',
    JSON_URL: 'http://localhost:56717/healthchecks-json'
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
    CONTROLLER_ID: 'SampleData'
};

/**
 * SignalR defaults
 */
export const signalrService = {
    BASE_URL: 'http://localhost:56717/hubs/users',
    CONNECTION_DELAY: 0,
    HUB_MESSAGE_DELAY: 3500,
    HUB_MESSAGE_TITLE: 'Hub Message',
    LOGIN_USER_EVENT: 'UserLogin',
    LOGOUT_USER_EVENT: 'UserLogout',
    CLOSE_EVENT: 'CloseAllConnections'
};