export const RoutesConfig = {
    Login: {
        path: '/',
        displayName: 'Logout',
        icon: 'fa fa-sign-out'
    },
    Form: {
        path: '/form',
        displayName: 'Form',
        icon: 'fa fa-pencil-square-o'
    },
    Dashboard: {
        path: '/dashboard',
        displayName: 'Dashboard',
        icon: 'fa fa-home'
    },
    FetchData: {
        path: {
            Absolute: '/fetchdata/:startDateIndex?',
            Relative: '/fetchdata'
        },
        displayName: 'Fetch Data',
        icon: 'fa fa-cloud'
    }
};