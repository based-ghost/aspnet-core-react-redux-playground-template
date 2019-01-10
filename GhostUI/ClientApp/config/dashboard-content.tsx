import * as React from 'react';

export const Column_1: React.ReactNode = (
    <div className='content dashboard-content'>
        <ul>
            <li>
                <a className='dashboard-link react' target='_blank' rel='noopener' href='https://reactjs.org/'>React</a>
                is an open-source JavaScript library that makes no assumptions about the rest of your technology stack. It allows you to build encapsulated components that mange their own state using JavaScript, instead of templates.
            </li>
            <li>
                <a className='dashboard-link redux' target='_blank' rel='noopener' href='https://redux.js.org/'>Redux</a>
                centralizes your application's state and logic and helps you write applications that behave consistently and are easy to test.
            </li>
            <li>
                <a className='dashboard-link bulma' target='_blank' rel='noopener' href='https://bulma.io/'>Bulma</a>
                is open source CSS framework based on Flexbox (with no JQuery dependency).
            </li>
        </ul>
    </div>
);

export const Column_2: React.ReactNode = (
    <div className='content dashboard-content'>
        <ul>
            <li>
                <a className='dashboard-link aspcore' target='_blank' rel='noopener' href='https://www.asp.net/'>ASP.NET Core</a>
                is an open source web framework for building modern web apps and services with .NET. Creates websites based on HTML5, CSS, and JavaScript that are simple, fast, and can scale to millions of users.
            </li>
            <li>
                <a className='dashboard-link sass' target='_blank' rel='noopener' href='https://sass-lang.com/'>SASS</a>
                is a CSS pre-processor extension to help provide more flexibility & maintainability to your style-sheets. Use nesting, variables, mixins, inheritance and more great features to make writing CSS a less arduous task.
            </li>
            <li>
                <a className='dashboard-link typescript' target='_blank' rel='noopener' href='https://www.typescriptlang.org/'>TypeScript</a>
                is a typed superset of JavaScript that compiles to plain JavaScript
            </li>
        </ul>
    </div>
);