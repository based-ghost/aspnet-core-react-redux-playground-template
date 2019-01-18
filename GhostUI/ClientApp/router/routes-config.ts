export const RoutesConfig = {
    Login: {
        path: '/',
        displayName: 'Logout',
        icon: 'sign-out-alt'
    },
    Form: {
        path: '/form',
        displayName: 'Form',
        icon: 'pencil-alt'
    },
    Dashboard: {
        path: '/dashboard',
        displayName: 'Dashboard',
        icon: 'home'
    },
    FetchData: {
        path: {
            Absolute: '/fetchdata/:startDateIndex?',
            Relative: '/fetchdata'
        },
        displayName: 'Fetch Data',
        icon: 'cloud'
    }
};