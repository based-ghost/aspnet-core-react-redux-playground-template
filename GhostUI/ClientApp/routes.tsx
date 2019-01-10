import * as React from 'react';
import App from './app';
import { Route } from 'react-router-dom';
import { Dashboard, FetchData, Form, Login } from './pages';

export const RoutePaths = {
    Login: '/',
    Form: '/form',
    Dashboard: '/dashboard',
    FetchData: {
        Absolute: '/fetchdata/:startDateIndex?',
        Relative: '/fetchdata'
    }
};

const routes: React.ReactNode = (
    <App>
        <Route exact path={RoutePaths.Login} component={Login} />
        <Route path={RoutePaths.Form} component={Form} />
        <Route path={RoutePaths.Dashboard} component={Dashboard} />
        <Route path={RoutePaths.FetchData.Absolute} component={FetchData} />
    </App>
);

export default routes;