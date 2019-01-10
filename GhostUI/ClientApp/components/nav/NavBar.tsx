import * as React from 'react';
import { connect } from 'react-redux';
import { RoutePaths } from '../../routes';
import { NavLink } from 'react-router-dom';
import { ApplicationState } from '../../store';
import { actionCreators, AuthState } from '../../store/auth';

type NavProps = AuthState & typeof actionCreators;

class NavBar extends React.Component<NavProps> {
    public render(): React.ReactNode {
        return (
            <nav className='navbar' role='navigation' aria-label='main navigation'>
                <div className='brand-wrapper'>
                    <img src={require('../../assets/image/bulma-type-white-40.png')} alt='' />
                </div>
                <div className='navbar-centered'>
                    { this.props.isAuthenticated ? this.renderNavigationLinks() : null }
                </div>
            </nav>
        );
    }

    private renderNavigationLinks(): React.ReactNode {
        return (
            <div className='navbar-start'>
                <NavLink to={RoutePaths.Form} className='navbar-item' activeClassName='is-active'>
                    <span className='icon'>
                        <i className='fa fa-pencil-square-o'></i>
                    </span>
                    <span>Form</span>
                </NavLink>
                <div className='nav-divider'></div>
                <NavLink to={RoutePaths.Dashboard} className='navbar-item' activeClassName='is-active'>
                    <span className='icon'>
                        <i className='fa fa-home'></i>
                    </span>
                    <span>Dashboard</span>
                </NavLink>
                <div className='nav-divider'></div>
                <NavLink to={RoutePaths.FetchData.Relative} className='navbar-item' activeClassName='is-active'>
                    <span className='icon'>
                        <i className='fa fa-cloud'></i>
                    </span>
                    <span>Fetch Data</span>
                </NavLink>
            </div>
        );
    }
}

// Wire up the React component to the Redux store
export default connect((state: ApplicationState) => state.auth, actionCreators)(NavBar);