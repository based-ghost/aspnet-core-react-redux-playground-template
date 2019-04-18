import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { Route } from 'react-router-dom';
import { IApplicationState } from '../../store';
import { actionCreators } from '../../store/auth';
import { spaNugetUrls } from '../../config/constants';
import { RoutesConfig } from '../../config/routes.config';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

type SettingsProps = { isAuthenticated: boolean; } & typeof actionCreators;

const Settings: React.FC<SettingsProps> = (props) => {
    const settingsAnchorEl = useRef();
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(open => !open);
    };

    const toggleClosed = () => {
        setOpen(false);
    };

    const handleLogout = (history: History) => (e: React.MouseEvent): void => {
        props.logoutUserRequest(() => history.push(RoutesConfig.Login.path));
    };

    useOnClickOutside(settingsAnchorEl, toggleClosed, toggle);

    const logoutRoute = (
        <Route render={({ history }) => (
            <a className='dropdown-item' onClick={handleLogout(history)} role='button'>
                <FontAwesomeIcon icon={RoutesConfig.Login.icon as IconProp} /> {RoutesConfig.Login.displayName}
            </a>
        )} />
    );

    const menuContent = open && (
        <ul className='dropdown-menu'>
            <li className='header-title'>Settings</li>
            <li>
                <a className='dropdown-item' target='_blank' rel='noopener' href={spaNugetUrls.HEALTH_UI} role='button'>
                    <FontAwesomeIcon icon='heart' /> Health Checks
                </a>
            </li>
            <li>
                <a className='dropdown-item' target='_blank' rel='noopener' href={spaNugetUrls.SWAGGER_DOCS} role='button'>
                    <FontAwesomeIcon icon='file' /> Swagger API
                </a>
            </li>
            <li>
                {logoutRoute}
            </li>
        </ul>
    );

    return (
        <div className={`fixed-plugin ${open ? 'fixed-plugin-active' : ''}`} style={{ display: !props.isAuthenticated ? 'none' : '' }}>
            <div className='dropdown'>
                <a role='button' ref={settingsAnchorEl}>
                    <FontAwesomeIcon icon='cog' size='3x' />
                </a>
                {menuContent}
            </div>
        </div>
    );
};

// Map only necessary IApplicationState to Settings props
const mapStateToProps = (state: IApplicationState) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

// Wire up the React component to the Redux store
export default connect(mapStateToProps, actionCreators)(Settings);