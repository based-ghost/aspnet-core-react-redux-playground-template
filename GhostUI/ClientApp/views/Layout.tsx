import * as React from 'react';
import Footer from '../components/footer/Footer';
import { NavBar, Settings } from '../components/nav';

const Layout: React.FC<{}> = (props) => (
    <>
      <NavBar />
      <Settings />
      {props.children}
      <Footer />
    </>
);

export default Layout;