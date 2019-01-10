import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { RoutePaths } from '../../routes';
import { ApplicationState } from '../../store';
import { actionCreators, reducer } from '../../store/auth';
import { healthChecksConfig } from '../../config/constants';

type NavProps = ReturnType<typeof reducer> & typeof actionCreators;
type SettingsState = typeof initialState;

const initialState = Object.freeze({
    open: false
});

class Settings extends React.Component<NavProps, SettingsState> {
    private readonly _settingsAnchorRef: React.RefObject<HTMLAnchorElement>;

    constructor(props: NavProps) {
        super(props);
        this.state = initialState;
        this._settingsAnchorRef = React.createRef<HTMLAnchorElement>();
    }

    public componentDidMount(): void {
        document.addEventListener('click', this.handleClick, false);
    }

    public componentWillUnmount(): void {
        document.removeEventListener('click', this.handleClick, false);
    }

    public render(): React.ReactNode {
        return (
            <div className={`fixed-plugin ${this.state.open ? 'fixed-plugin-active' : ''}`}
                 style={{ display: this.props.isAuthenticated ? '' : 'none' }}>
                <div className='dropdown'>
                    <a role='button'
                        ref={this._settingsAnchorRef}>
                        <i className='fa fa-cog fa-2x'></i>
                    </a>
                    { (this.props.isAuthenticated && this.state.open) ? this.renderSettingsMenu() : null }
                </div>
            </div>
        );
    }

    private renderSettingsMenu(): React.ReactNode {
        return (
            <ul className='dropdown-menu'>
                <li className='header-title'>Settings</li>
                <li>
                    {this.renderHealthCheckAnchor()}
                </li>
                <li>
                    {this.renderMessagesAnchor()}
                </li>
                <li>
                    {this.renderLogoutAnchor()}
                </li>
            </ul>
        );
    }

    private renderLogoutAnchor(): React.ReactNode {
        return (
            <Route render={({ history }) => (
                <a className='dropdown-item'
                    onClick={() => { this.props.logoutUserRequest(() => history.push(RoutePaths.Login)); }}
                    role='button'>
                    <span className='icon'>
                        <i className='fa fa-sign-out'></i>
                    </span>
                    <span>Logout</span>
                </a>
            )} />
        );
    }

    private renderHealthCheckAnchor(): React.ReactNode {
        return (
            <a className='dropdown-item'
               target='_blank'
               rel='noopener'
               href={healthChecksConfig.UI_URL}
               role='button'>
                <span className='icon'>
                    <i className='fa fa-heart'></i>
                </span>
                <span>Health Checks</span>
            </a>
        );
    }

    private renderMessagesAnchor(): React.ReactNode {
        return (
            <a className='dropdown-item'>
                <span className='icon'>
                    <i className='fa fa-envelope'></i>
                </span>
                <span>Messages</span>
            </a>
        );
    }

    private handleClick: { (e: MouseEvent): void } = (e: MouseEvent) => {
        // Bound a click event listener to the document obj, and if the target is the cog anchor or immediate child, toggle open - otherwise, set open false
        if (this._settingsAnchorRef.current && this._settingsAnchorRef.current.contains(e.target as HTMLElement)) {
            this.setState({
                open: !this.state.open
            });
        } else if (this.state.open) {
            this.setState({
                open: false
            });
        }
    }
}

// Wire up the React component to the Redux store
export default connect((state: ApplicationState) => state.auth, actionCreators)(Settings);