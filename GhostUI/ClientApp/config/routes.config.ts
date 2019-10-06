export const RoutesConfig = {
    Login: {
        path: '/',
        displayName: 'Logout',
        icon: 'sign-out-alt',
        navBar: {
            show: false,
            order: 0
        }
    },
    Form: {
        path: '/form',
        displayName: 'Form',
        icon: 'pencil-alt',
        navBar: {
            show: true,
            order: 1
        }
    },
    Dashboard: {
        path: '/dashboard',
        displayName: 'Home',
        icon: 'home',
        navBar: {
            show: true,
            order: 2
        }
    },
    FetchData: {
        path: '/fetchdata',
        pathAbsolute: '/fetchdata/:startDateIndex?',
        displayName: 'Fetch',
        icon: 'cloud',
        navBar: {
            show: true,
            order: 3
        }
    }
};