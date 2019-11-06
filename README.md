# ASP.NET Core 2.2 / React + Redux + TypeScript + Hot Module Replacement (HMR) + Server-Side Rendering (SSR)
This template is a SPA application built using ASP.NET Core 2.2 as the REST API server and React/Redux/TypeScript as the web client (Bulma + SASS used for UI styling). You can find a similar version using Vue + Vuex (and associated libraries) here: [aspnet-core-vue-vuex-playground-template](https://github.com/based-ghost/aspnet-core-vue-vuex-playground-template)


![](https://j.gifs.com/jZ6Y44.gif)


## General Overview
This template is largely based on the original React + Redux .NET Core SPA template that was offered around the time of .NET Core 2.0 release (the existing template is a much more simplified version of what was offered in the past and the structure is quite different as well). Using that as a base, this template greatly extends the functionality provided and also uses the latest versions of all referenced libraries/packages. Keep in mind that I use this project (or others like it) as a testing ground for varying libraries/packages and it is not meant to act as a stand-alone final solution - it is more of POC. For example, the login & logout processes are stubbed to simulate the actual process (no real authentication is happening, however, it is something I plan to add to this project in the near future). I plan on keeping this up to date, and the listed technology stack may be subject to change.

After discovering the ```dotnet new reactredux``` command no longer created the desired template, I eventually came across the following repository that was quite helpful and right along the lines of what I was looking for - https://github.com/RyanLamansky/react-redux-typescript-dotnet-core-ssr-hmr

#### *** All components are written using `React FunctionComponents` & `React Hooks`

## Technology Stack Overview
- **Server**
  - ASP.NET Core 2.2
  - SignalR
  - HealthChecks + [AspNetCore.HealthChecks.UI package](https://github.com/xabaril/AspNetCore.Diagnostics.HealthChecks) - this provides  a nicely formatted UI for viewing the results of the HealthCheck modules in use and is accessed on ```/health-ui``` (also, provide an option for viewing the raw JSON data that the UI package prettifies for you at ```/healthchecks-json```). Access this view in the application via the floating settings cog on right screen by clicking the "Health Checks" link.
  - API Documentation using Swagger UI - using package [NSwag.AspNetCore](http://NSwag.org) to prettify the specification output and display at ```/docs``` & [NSwag.MSBuild](http://NSwag.org) to handle automatic updates - so that when the project builds, the NSwag CLI will run and generate an updated API specification. Access this view in the application via the floating settings cog on right screen by clicking the "Swagger API" link.
  - Brotli/Gzip response compression (production build)
- **Client**
  - [`React`](https://reactjs.org/)
  - [`Redux`](https://redux.js.org/)
  - [`TypeScript`](https://www.typescriptlang.org/)
  - [`Webpack`](https://github.com/webpack/webpack) for bundling of application assets and HMR (Hot Module Replacement)
  - [`Bulma CSS`](https://bulma.io/) + [`SASS`](https://github.com/sass/sass) + Font Awesome 5 (using fontawesome-svg-core)
  - [`styled-components`](https://www.styled-components.com/) - CSS-in-JS via template literals - Examples in this project:   `Checkbox.tsx`, `Spinner.tsx`, `Authenticator.tsx`, and `Footer.tsx` are written using `styled-components`.
  - [`react-functional-select`](https://github.com/based-ghost/react-functional-select) - A micro-sized & micro-optimized select component for ReactJS. Inspired by [`react-select`](https://github.com/JedWatson/react-select) and built for ultimate performance - leverages [`react-window`](https://github.com/bvaughn/react-window) to virtualize long options data and `styled-components` to handle styling via CSS-in-JS. Note: I am the author of this package.
  - [`autobind-decorator`](https://github.com/andreypopp/autobind-decorator) which is self-described as 'A class or method decorator which binds methods to the instance so this is always correct, even when the method is detached' - nice-to-have syntax that makes your code more succintc and avoids the repetition of having to bind methods in the constructor of a class-component - autobind (boundMethod) on a method is lazy and is only bound once.
  - [`Axios`](https://github.com/axios/axios) for REST endpoint requests
  - [`react-toastify`](https://github.com/fkhadra/react-toastify) - a highly configurable toast notification library - comes hooked up to display login error & SignalR hub push notifications examples.
  - aspnet-prerendering/SSR (production build)
  - connected-react-router/react-router-dom/react-router-redux
  - Custom, reusable Dropdown & Checkbox components that provide full functionality w/ state management (without a JQuery dependency).
  - Two different loader components (spinner & authentication animation w/ callback for success/fail)
  
## Setup
  - [Node.js version >= 8](https://nodejs.org/en/download/)
  - [.NET Core 2.2 SDK](https://dotnet.microsoft.com/download/dotnet-core/2.2)
  - Clone the repository and running ```npm install``` should properly restore all packages and dependencies.
  - A solution.sln file is added to act as an entry point to open the application in Visual Studio. Visual Studio 2017 and up.
  - GhostUI/GhostUI.csproj acts as the entry point to open the application in Visual Studio Code.
