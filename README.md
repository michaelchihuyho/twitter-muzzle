# react-skeleton

My own skeleton for building web applications using React.

## Requirements

[Nodemon](https://github.com/remy/nodemon)

[Node.js](https://nodejs.org/en/)

## Includes

### Client-side

| Tech | Description | Version |
| ---- | ----------- | ------- |
| [React](https://facebook.github.io/react/) | Library for building user interfaces with components | 15.4.2 |
| [React-Router](https://github.com/rackt/react-router) | Ember-inspired routing for React | 3.0.2 |
| [Redux](http://redux.js.org/) | Flux-ish global state manager | 3.6.0 |
| [Webpack](https://webpack.github.io/) | Highly configurable module bundler | 2.2.1 |
| [Less](http://lesscss.org/) | Compiled CSS styles with variables, functions, and more | |
| [Babel](http://babeljs.io/) | Use ES6 syntax today | 6.22.1 |
| [React Hot Loader](http://gaearon.github.io/react-hot-loader/) | See your components live update in the browser without losing state | 3.0.0 beta |
| [Redux Devtools](https://github.com/gaearon/redux-devtools) | Time travel for Redux state | 3.3.2 |
| [Redux Logger](https://github.com/gaearon/redux-devtools) | Log Redux state changes in the console | 3.3.2 |

### Server-side

| Tech | Description | Version |
| ---- | ----------- | ------- |
| [Express](http://expressjs.com/) | Easy web services on top of Node.js | 4.14.1 |

### Utility

| Tech | Description | Version |
| ---- | ----------- | ------- |
| [Lodash](http://lodash.com) | Library of functional programming helpers | 4.17.4 |
| [Q](https://github.com/kriskowal/q) | Promise library | 1.4.1 |
| [Moment.js](http://momentjs.com) | Time-related utilities | 2.17.1 |
| [Immutable.js](https://facebook.github.io/immutable-js/) | Immutable data in javascript | 3.8.1 |

# REAL README

## Quick start

`yarn install`

`yarn run build`

`yarn run start`

### View

http://localhost:8900

## Individual build steps

#### Build the client app

`yarn run dev-build`

#### Start the server

`yarn run start`

or to auto restart on file save:

`yarn run start-dev`

#### Hot reloading

In order to use [React Hot Loader](http://gaearon.github.io/react-hot-loader/), in another terminal window, run:

`yarn run hot-dev-server`

and then view the app at http://localhost:3000

FYI `yarn run dev` runs both `yarn run start-dev` and `yarn run hot-dev-server`

## Tests

Integration tests:

TODO: add nightwatch

Unit tests:

`yarn run test`
