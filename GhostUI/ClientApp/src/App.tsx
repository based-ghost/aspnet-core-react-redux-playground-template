import Layout from './Layout';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';
import type { FunctionComponent } from 'react';
import { Routes as routes, TRANSITION_DEFAULT } from './config';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const App: FunctionComponent = () => {
  const location = useLocation();
  const cssKey = location.pathname?.split('/')[1] || '/';
  const curRoute = routes.find((x) => (x.path === cssKey) || (x.name.toLowerCase() === cssKey.toLowerCase()));
  const { timeout, classNames } = curRoute?.transition ?? TRANSITION_DEFAULT;

  return (
    <Layout>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={cssKey}
          timeout={timeout}
          classNames={classNames}
        >
          <Routes location={location}>
            {routes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={<Component />}
              />
            ))}
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </Layout>
  );
};

export default App;