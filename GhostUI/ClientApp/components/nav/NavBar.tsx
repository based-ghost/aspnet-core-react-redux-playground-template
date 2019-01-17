import * as React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ApplicationState } from '../../store';
import { RoutesConfig } from '../../router/routes-config';
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
                <NavLink to={RoutesConfig.Form.path} className='navbar-item' activeClassName='is-active'>
                    <span className='icon'>
                        <i className={RoutesConfig.Form.icon}></i>
                    </span>
                    <span>{RoutesConfig.Form.displayName}</span>
                </NavLink>
                <div className='nav-divider'></div>
                <NavLink to={RoutesConfig.Dashboard.path} className='navbar-item' activeClassName='is-active'>
                    <span className='icon'>
                        <i className={RoutesConfig.Dashboard.icon}></i>
                    </span>
                    <span>{RoutesConfig.Dashboard.displayName}</span>
                </NavLink>
                <div className='nav-divider'></div>
                <NavLink to={RoutesConfig.FetchData.path.Relative} className='navbar-item' activeClassName='is-active'>
                    <span className='icon'>
                        <i className={RoutesConfig.FetchData.icon}></i>
                    </span>
                    <span>{RoutesConfig.FetchData.displayName}</span>
                </NavLink>
            </div>
        );
    }
}

// Wire up the React component to the Redux store
export default connect((state: ApplicationState) => state.auth, actionCreators)(NavBar);