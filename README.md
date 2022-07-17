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

- npm i eslint-plugin-testing-library
  "ESLint plugin to follow best practices and anticipate common mistakes when writing tests with Testing Library"
  [Go](https://github.com/testing-library/eslint-plugin-testing-library)

- npm i eslint-plugin-jest-dom
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
