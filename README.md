
# @isumix/react-exception

### A flexible React's Error Boundary implementation

> Available since React [16.6](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html). Works with React Native.

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
> See [useEventThrow](#useeventthrow) below for solution.

## Install

```sh
npm install --save @isumix/react-exception
```

```sh
yarn add @isumix/react-exception
```

## Example

> [Play with **web** example in codesandbox.io](https://codesandbox.io/s/react-exception-9zh48?file=/src/App.tsx)

> [Play with **native** example in snack.expo.io](https://snack.expo.io/@isumix/react-exception)

```tsx
import * as React from "react";
import { Exception } from "@isumix/react-exception";

const ComponentWillThrow = () => {
  throw "BOOM!";
};

export default () => (
  <Exception fallback={<i>Something went wrong!</i>} >
    <ComponentWillThrow />
  </Exception>
);
```

# Exception

```html
<Exception
  fallback="optional: Text or <Node /> or Component"
  onError="optional: error handler function"
>
  Child <components/> that could throw exceptions
  Including <Exception>nesting</Exception>
</Exception>
```

## fallback

> If no `fallback` is provided the `error` will be re`throw`n

```tsx
const fallbackString = 'An error has occurred!';
```
```tsx
const fallbackNode = <strong>An error has occurred!</strong>;
```
```tsx
const FallbackComponent = ({ error, reset }: ExceptionFallbackProps) => (
  <b style={{ color: "red" }}>
    An error "{error.message}" has occurred!
    <button type="button" onClick={reset}>
      Reset
    </button>
  </b>
);
```

## onError

```ts
const handleError: ExceptionErrorHandler = (error, errorInfo) => console.log(error, errorInfo);
```

# useEventThrow

In event handlers and asynchronous code, you can `useEventThrow` hook to be able to catch exceptions in Error Boundary.

> Available since React 16.8

```tsx
import { useEventThrow } from "@isumix/react-exception";

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

Please note: for asynchronous code, there is a [better approach](https://github.com/isumix/react-suspendable#readme)

```html
<Exception fallback="Rejected">
  <Suspense fallback="Pending">
    <CustomComponent /> has asynchronous code and could throw exceptions
  </Suspense>
</Exception>
```
