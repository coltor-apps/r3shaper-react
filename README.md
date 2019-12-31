<p align="center">
✨R3shaper Hook, Component and HOC for React✨
</p>

# R3shaper for React

## Installation

Install the package using npm

```bash
npm install r3shaper r3shaper-react
```

or if you're using yarn

```bash
yarn add r3shaper r3shaper-react
```

### Pre-configurations

In order to use r3shaper-react components, we'll need to have configured an instance of [r3shaper](http://github.com/coltor-apps/r3shaper) client, so let's assume we have following resource:

```js
import apiClient from './';

export const UsersResource = {
  list: apiClient.get('/users'),
  delete: apiClient.delete('/users/{id}')
};
```

## Hook

R3shaper hook accepts 2 arguments and returns an object with 4 properties, as shown in the code snippet below:

```js
import { useR3shaper } from 'r3shaper-react';
/* ... */
const { response, error, loading, dispatch } = useR3shaper(resource, options);
```

| Argument           | Type     | Default | Description                             |
| ------------------ | -------- | ------- | --------------------------------------- |
| `resource`         | Function | -       | R3shaper resource method                |
| `options.debounce` | Number   | 0       | Debounce time (ms)                      |
| `options.throttle` | Number   | 0       | Throttle time (ms)                      |
| `options.manual`   | Boolean  | false   | Shall the request be triggered manually |

<br/>
<p id="hook_properties_docs">

| Property   | Type     | Description                                                                                                          |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `response` | Object   | Response object                                                                                                      |
| `error`    | Object   | Error object                                                                                                         |
| `loading`  | Boolean  | Indicates if the request was finished or not                                                                         |
| `dispatch` | Function | Function invoked to dispatch the request. Accepts exactly the same arguments as an ordinary r3shaper resource method |

</p>



## Component

```jsx
import { R3shaper } from 'r3shaper-react';
import { UserResource } from './api';

function ExampleComponent() {
  return (
    <R3shaper
      debounce={100}
      throttle={500}
      resource={UserResource.list}
    >
      {({ loading, response, dispatch, error }) => (
          <div>
            {loading && <SomeLoadingIndicator/>}
            {response && <SomeResponseWrapper data={response.data}/>}
            {error && <SomeErrorWrapper error={error}>}
            <button onClick={() => dispatch({queryParams: {page: 2}})}>Fetch</button>
          </div>
      )}
    </R3shaper>
  );
}
```

### R3shaper component Props

| Prop       | Type     | Default | Description                                                                                                               |
| ---------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `resource` | Function | -       | R3shaper resource method                                                                                                  |
| `debounce` | Number   | 0       | Debounce time (ms)                                                                                                        |
| `throttle` | Number   | 0       | Throttle time (ms)                                                                                                        |
| `manual`   | Boolean  | false   | Shall the request be triggered manually                                                                                   |
| `children` | Function | -       | React component that will receive following props: `loading`, `response`, `error` and `dispatch` ([see hook documentation](#hook_properties_docs)) |

> All other props passed to R3shaper will be passed down to it's children




## Higher-Order Component

```js
import { withR3shaper } from 'r3shaper-react';
/* ... */
export default withR3shaper(OriginalComponent, resource, options);
```

### withR3shaper arguments

| Argument            | Type     | Default | Description                             |
| ------------------- | -------- | ------- | --------------------------------------- |
| `OriginalComponent` | Function | -       | React component                         |
| `resource`          | Function | -       | R3shaper resource method                |
| `options.debounce`  | Number   | 0       | Debounce time (ms)                      |
| `options.throttle`  | Number   | 0       | Throttle time (ms)                      |
| `options.manual`    | Boolean  | false   | Shall the request be triggered manually |

<br/>

`withR3shaper` will pass down to OriginalComponent 4 new props: `loading`, `response`, `error` and `dispatch` ([see hook documentation](#hook_properties_docs))

Created with ❤️ by [Sergiu Masurceac](https://twitter.com/masurceac)
