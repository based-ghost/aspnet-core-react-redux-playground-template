import * as React from 'react';
import routes from './router/routes';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { replace } from 'react-router-redux';
import { createMemoryHistory } from 'history';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';

export default createServerRenderer(params => {
    return new Promise<RenderResult>((resolve, reject) => {
        // Prepare Redux store with in-memory history, and dispatch a navigation event corresponding to the incoming URL
        const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
        const urlAfterBasename = params.url.substring(basename.length);
        const store = configureStore(createMemoryHistory());

        store.dispatch(replace(urlAfterBasename));
        
        // Prepare an instance of the application and perform an inital render that will cause any async tasks (e.g., data access) to begin
        const routerContext: any = {};
        const app = (
            <Provider store={store}>
                <StaticRouter basename={basename} context={routerContext} location={params.location.path} children={routes} />
            </Provider>
        );

        renderToString(app);

        // If there's a redirection, just send this information back to the host application
        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }
        
        // Once any async tasks are done, perform the final render (also send the redux store state, so the client can continue execution where the server left off)
        params.domainTasks.then(() => {
            resolve({
                html: renderToString(app),
                globals: { initialReduxState: store.getState() }
            });
        }, reject); // Also propagate any errors back into the host application
    });
});
