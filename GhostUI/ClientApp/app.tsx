import * as React from 'react';
import Footer from './components/footer/Footer';
import { NavBar, Settings } from './components/nav';

const App: React.FunctionComponent<{}> = (props) => (
    <>
      <NavBar />
      <Settings />
      {props.children}
      <Footer />
    </>
);

export default App;