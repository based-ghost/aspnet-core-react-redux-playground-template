import Layout from './Layout';
import type { FunctionComponent } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import { Routes as routes, getCSSTransitionProps } from './config';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const App: FunctionComponent = () => {
  const location = useLocation();
  const cssProps = getCSSTransitionProps(location);

  return (
    <Layout>
      <SwitchTransition mode="out-in">
        <CSSTransition {...cssProps}>
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