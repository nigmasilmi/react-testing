# Testing React apps

## Breaking down syntax

```js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  // creates a virtual DOM for whatever the JSX is the argument
  render(<App />);
  // we access the virtual DOM with the screen global object
  // .getByText finds an element in the DOM with the text passed as the argument regex
  const linkElement = screen.getByText(/learn react/i);
  // in the assertion...
  // then we expect that the element be in the DOM
  expect(linkElement).toBeInTheDocument();
});
```

## Assertions

"These assertions are what determine whether the test passes or fails"

`expect` is a Jest global method that starts the assertion

```js
expect(linkElement).toBeInTheDocument();
```

`expect argument::: linkElement` is the subject of the assertion

`type of assertion ::: toBeInTheDocument` comes from Jest-DOM

`argument for the matcher ::: ()(none)` refines the matcher

### jest-dom

- comes with create-react-app
- src/setupTests.js imports it before each test, makes matchers available
- are DOM-based matchers

## Jest watch mode and how it works

- React testing library helps with rendering components into the dom, searching the dom and interacting with it
- Jest is the test runner and comes with create-react-app
- If the test function throws an error, the test fails (keep this in mind) that is why an empty test passes
- throwing errors is the job of the assertion

## TDD

- Write tests befor writing the code
- then write the code according to spec set by tests
- also called red-green testing

## React Testing Library Philosophy

- Creates a virtual DOM for testing and provides utilities for interacting with it

### Types of tests

- Unit tests, one unit of code in isolation
- Integration tests, how multiple units work together
- Functional tests, tests a particular function (behavior) of software
- a unit test can be a functional test, but here we are not testing the code implementation but the behavior
- Acceptance tests (End-to-end) use actual browser and server (Cypress, Selenium)

## Functional testing vs. Unit testing

- unit, isolated, mock dependencies, test internals
- further from how users interact with the software and more likely to breack with refactoring
- <strong> functional </strong> include all relevant units, test behavior
- Close to how users interact with software
- Robust tests
- more difficult to debug failing tests

## TDD vs Behavior Driven Development

- Testing library encourages testing behavior over implementation
- BDD is very explicitly defined and involves collaboration between lots of roles

## Testing Accesibility and Finding Elements

- TL recommends finding elements by accessibility handles, so...

### Which query should I use?

[Go](https://testing-library.com/docs/queries/about/#priority)

(descending priority)

1. Queries Accesible to Everyone
2. Semantic Queries
3. Test IDs

testing by role whenever possible
// the first argument is the role itself, an anchor tag has the role of 'link'
// the second is an options object
const linkElement = screen.getByRole('link', {name: /learn react/i} );

### What role to look for?

[Definition of Roles](https://www.w3.org/TR/wai-aria/#role_definitions)

- some elements have a built-in role: button, a

## What are the basic steps?

1. Write the shell function (nothing in it)
2. Define what we want to test
3. Write the test shell
4. Render the element
5. Define the role by which we want to find it
6. Choose a custom matcher [choose](https://github.com/testing-library/jest-dom)
7. View the expamples, implement, see it fail
8. Write the content of the function (component)
9. Watch the result of the test

## Manual acceptance testing

(what it says)

## Mocking CSS modules

"In the case of create-react-app applications -- or applications that have otherwise mocked css modules for Jest -- CSS module imports are simply ignored for Jest test."

## Transformers

"For styles to be interpreted in tests, you need a transformer to, well, transform the CSS classes into styles. Here are a couple options:

[Jest Transform CSS](https://www.npmjs.com/package/jest-transform-css)
[Jest CSS Modules Transform](https://www.npmjs.com/package/jest-css-modules-transform)

## Unit testing functions

- Functions separate from components
  Unit test if:
- complex logic difficult to test via functional tests
- too many edge cases

# ESLint + Prettier special confs for testing

"ESLint plugin to follow best practices and anticipate common mistakes when writing tests with Testing Library"
[Go](https://github.com/testing-library/eslint-plugin-testing-library)

"ESLint plugin to follow best practices and anticipate common mistakes when writing tests with jest-dom."
[Go](https://www.npmjs.com/package/eslint-plugin-jest-dom)

## ESLint conf

- remove from package.json:

```
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  }
```

- Create a file in root `.eslintrc.json`

```
{
  "plugins": ["testing-library", "jest-dom"],
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/recommended", // no longer needed
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ]
}

```

- or specify other rules like [this example](https://github.com/bonnie/bonniedotdev/blob/main/client/.eslintrc.json)

## VSCode conf to alert us

- The extense configuration is no longer necessary, just one is helpful:

- .vscode folder / settings.json file

```
"editor.codeActionsOnSave":
     {
      "source.fixAll.eslint": true
     }
```

- add .vscode/ and .eslintcache to .gitignore

## In case that a project requires to have a format on save...

in settings.json (vscode)

```
"editor.defaultFormatter":"esbenp.prettier-vscode"
"editor.formatOnSave":true
```

# Firing Events

[Go](https://testing-library.com/docs/dom-testing-library/api-events)

- As the recommendation states, the better approach is to use user-event

## user-event

Is a companion library for Testing Library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.

https://testing-library.com/docs/user-event/intro

[go to the library](https://github.com/testing-library/user-event)

```
npm i @testing-library/user-event @testing-library/dom
```

```
import userEvent from '@testing-library/user-event'

```

# screen Query Methods

- get: expect element to be in the DOM
- query: expect element not to be in the DOM
- find: expect element to appear async

https://testing-library.com/docs/dom-testing-library/api-queries
https://testing-library.com/docs/react-testing-library/cheatsheet
https://testing-library.com/docs/guide-which-query

### when an act warning appears

```
 Warning: An update to Overlay inside a test was not wrapped in act(...).
```

- React updated an element after the test finished
- Don't wrap in act(...), because testing library already does it
- To fix it:

  - Determine what chantes after the test is over (async)
  - Account for the change in test by:
    - awaiting the change
    - asserting on it

- in this particular case...

```
 expect(nullPopoverAgain).not.toBeInTheDocument();
```

is running before the element disappears, so we need to wait for that
[Guide/Recipe](https://testing-library.com/docs/guide-disappearance/)

```
 await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
  );
```

- take into account the implicit return, with an explicit return, the test fails

# Mocking data coming from a server

## [Mock Service Worker](https://mswjs.io/)

1. Install

```
npm install msw --save-dev
```

2. Define Mocks
   "To define which requests should be mocked, we are going to use request handler functions. They allow us to capture any request based on its method, URL, or other criteria, and specify which response to return."
   "When working with Mock Service Worker, the list of request handlers, browser- and server-specific setup is referred to as mock definition."

   ```
   mkdir src/mocks
   touch src/mocks/handlers.js
   ```

3. Choose an API (what if we have 2 types??)

   - [ Mocking a REST API](https://mswjs.io/docs/getting-started/mocks/rest-api)

     - src/mocks/handlers.js ==>
       import { rest } from 'msw'
     - To handle a REST API request we need to specify its method, path, and a function that would return the mocked response.

     ```
        import { rest } from 'msw'

        export const handlers = [
          // Handles a POST /login request
          rest.post('/login', null),

          // Handles a GET /user request
          rest.get('/user', null),
        ]
     ```

     - To respond to an intercepted request we have to specify a mocked response using a response resolver function.

       - req, an information about a matching request;
       - res, a functional utility to create the mocked response;
       - ctx, a group of functions that help to set a status code, headers, body, etc. of the mocked response.

     ```
        import { rest } from 'msw'

        export const handlers = [
          rest.post('/login', (req, res, ctx) => {
            // Persist user's authentication in the session
            sessionStorage.setItem('is-authenticated', 'true')

            return res(
              // Respond with a 200 status code
              ctx.status(200),
            )
          }),

          rest.get('/user', (req, res, ctx) => {
            // Check if the user is authenticated in this session
            const isAuthenticated = sessionStorage.getItem('is-authenticated')

            if (!isAuthenticated) {
              // If not authenticated, respond with a 403 error
              return res(
                ctx.status(403),
                ctx.json({
                  errorMessage: 'Not authorized',
                }),
              )
            }

            // If authenticated, return a mocked user details
            return res(
              ctx.status(200),
              ctx.json({
                username: 'admin',
              }),
            )
          }),
        ]

     ```

   - [ Mocking a GraphQL API](https://mswjs.io/docs/getting-started/mocks/graphql-api)
     - holamundo

4. [Integrate](https://mswjs.io/docs/getting-started/integrate/node)
   "The same request handlers can be shared between browser and Node environments. Since Service Workers cannot run in Node, the integration process is different depending on the environment."
   (see the code and this commit diff)
