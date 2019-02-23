import * as React from 'react';
import Footer from '../components/footer/Footer';
import { NavBar, Settings } from '../components/nav';

export default class Layout extends React.Component<{}> {
    public render(): React.ReactNode {
        return (
            <>
              <NavBar />
              <Settings />
              {this.props.children}
              <Footer />
            </>
        );
    }
}