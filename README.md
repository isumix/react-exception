
# react-exception

### A flexible React's Error Boundary implementation

> Available since React [16.6](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)

## Description

You should enclose your components within [Error Boundary](https://reactjs.org/docs/error-boundaries.html),
so users will be presented with a `fallback` view in case of failure.

```html
<Exception fallback="An error has occurred!">
  <Components/> could throw exceptions
</Exception>
```

The `<Exception>` component will `catch` any errors `throw`n in the inner components' lifecycle methods.

> Error boundaries do not catch errors for: event handlers, asynchronous code and SSR.
> See [useEventThrow](#useEventThrow-hook) below for solution.

## Install

```sh
npm install --save react-exception
```

```sh
yarn add react-exception
```

## Example

> [Play with full example in codesandbox](https://codesandbox.io/s/react-exception-9zh48?file=/src/App.tsx)

```tsx
import * as React from "react";
import { Exception } from "react-exception";

const ComponentWillThrow = () => {
  throw "BOOM!";
};

export default () => (
  <Exception fallback={<i>Something went wrong!</i>} >
    <ComponentWillThrow />
  </Exception>
);
```

# API

## Exception component


```html
<Exception
  fallback="optional: Text or <Node /> or Component"
  onError="optional: error handler function"
>
  Child <components/> that could throw exceptions
  Including <Exception>nesting</Exception>
</Exception>
```

### fallback property

```tsx
const FallbackComponent = ({ error, reset }) => (
  <b style={{ color: "red" }}>
    An error "{error.message}" has occurred
    <button type="button" onClick={reset}>
      Reset
    </button>
  </b>
);
```

### onError property

```ts
const handleError = (error, errorInfo) => console.log(error, errorInfo);
```


## useEventThrow hook

In event handlers and asynchronous code, you can `useEventThrow` hook to be able to catch exceptions in Error Boundary.

> Available since React 16.8

```tsx
import { useEventThrow } from "react-exception";

const ComponentWillThrow = () => {
  const eventThrow = useEventThrow();

  return (
    <p>
      Some text
      <button type="button" onClick={() => eventThrow("BANG!")}>
        Throw
      </button>
    </p>
  );
};
```
