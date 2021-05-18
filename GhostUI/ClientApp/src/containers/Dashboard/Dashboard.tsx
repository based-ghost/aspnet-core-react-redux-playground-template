import { ReactComponent as ReactCoreSvg } from '../../assets/image/ReactCore.svg';

import type { FunctionComponent } from 'react';

const Dashboard: FunctionComponent = () => (
  <div className='dashboard-wrapper'>
    <section className='hero is-dark'>
      <div className='hero-body'>
        <div className='is-flex is-horizontal-center'>
          <ReactCoreSvg
            width='260'
            height='260'
            aria-hidden
            title='react-core-logo'
          />
        </div>
      </div>
    </section>
    <section className='container'>
      <div className='card'>
        <div className='card-content'>
          <div className='column'>
            <p className='title has-text-centered'>Technology Stack</p>
            <hr />
            <div className='columns is-multiline'>
              <div className='column dashboard-info is-half'>
                <div className='content'>
                  <ul>
                    <li>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://reactjs.org/'
                        className='dashboard-link react'
                      >
                        React
                      </a>
                      is an open-source JavaScript library that makes no
                      assumptions about the rest of your technology stack. It
                      allows you to build encapsulated components that mange
                      their own state using JavaScript, instead of templates.
                    </li>
                    <li>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://redux.js.org/'
                        className='dashboard-link redux'
                      >
                        Redux
                      </a>
                      centralizes your application's state and logic and helps
                      you write applications that behave consistently and are
                      easy to test.
                    </li>
                    <li>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://bulma.io/'
                        className='dashboard-link bulma'
                      >
                        Bulma
                      </a>
                      is open source CSS framework based on Flexbox (with no
                      JQuery dependency).
                    </li>
                  </ul>
                </div>
              </div>
              <div className='column dashboard-info is-half'>
                <div className='content'>
                  <ul>
                    <li>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://www.asp.net/'
                        className='dashboard-link aspcore'
                      >
                        ASP.NET Core
                      </a>
                      is an open source web framework for building modern web
                      apps and services with .NET. Creates websites based on
                      HTML5, CSS, and JavaScript that are simple, fast, and can
                      scale to millions of users.
                    </li>
                    <li>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://sass-lang.com/'
                        className='dashboard-link sass'
                      >
                        SASS
                      </a>
                      is a CSS pre-processor extension to help provide more
                      flexibility &amp; maintainability to your style-sheets. Use
                      nesting, variables, mixins, inheritance and more great
                      features to make writing CSS a less arduous task.
                    </li>
                    <li>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://www.typescriptlang.org/'
                        className='dashboard-link typescript'
                      >
                        TypeScript
                      </a>
                      is a typed superset of JavaScript that compiles to plain
                      JavaScript
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Dashboard;