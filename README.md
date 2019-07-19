# logger-client-js

## What is it ?

It's a javascript client to use Logger api.

## Technical stack

- ECMAScript 6 to use last functionalities like class, promise, async/await, etc... [http://es6-features.org](http://es6-features.org)
- Webpack to manage modules [https://webpack.js.org/](https://webpack.js.org/)
- Babel to compile the javascript to be compatible with old browsers [https://babeljs.io/](https://babeljs.io/)
- Tools executed with Node.js version 10 [https://nodejs.org/en/](https://nodejs.org/en/)
- Packages managed with `npm` [https://nodejs.org/en/](https://nodejs.org/en/)
- ESLing to linting the code [https://eslint.org/](https://eslint.org/)

## How to install it and modify it

- Execute command `npm i`
- Generate development file: execute command `npm run dev` (result path: `dist/logger-client.js`) <br />
It will keep a process to re-generate the file each times you change the sources
- Generate dist file: execute command `npm run build` (result path: `dist/logger-client.js`)
- Execute unit tests: execute command `npm run test` (code coverage page path: `coverage/index.html`)
- When you push your changes, don't forget to generate dist file !
- Update the npm package: `npm login`(to log with yoctu account) and `npm publish`(don't forget to change version in package.json)

## How to integrate it
### How to get the client
#### Without ES6 modules

- Fetch the project files (download, clone, etc...)
- Add a `<script>` to use file in `dist/logger-client.js`

#### With ES6 modules

- Fetch the project files (download, clone, etc...)
- Import the client with `import * as LoggerClient from 'logger-client-js''`

You will be able to import only the feature you want (see the example below).

### How to use it

First you need to configure the client using the `configure` function. You only need to do this once in your project. If you don't do it, you'll get an exception when using the client.

```js
import { configure } from 'logger-client-js';

configure({
  url:'http://127.0.0.1:8080/api/notifications',
  filterLevel: LoggerClient.Notification.LVL_DEBUG,
  isHttpServer: true, // if node process is running a http server
});
```

#### Create a log

```js
import { Notification, notify } from 'logger-client-js';

var notif = new Notification({
    message: `Test message à la date du ${Date.now()}`,
    user: 'Yoctu',
    server: 'http://server.com',
    command: 'pkg',
    origin: 'cli',
    category: Notification.BUSINESS,
    level: Notification.LVL_DEBUG,
    reportedAt: new Date('2020-02-14'),
    context: [
      {
        key: 'Key1',
        value: 'Value1',
      },
    ]
});

notify(notif)
  .then(response => {
    console.log('The result is', response);
  })
  .catch(err => console.log('The was an error', err));

```

#### Retrieve logs

```js
import { Notification, retrieve } from 'logger-client-js';

retrieve({
  notification_message: 'tests',
  notification_operator: 'like'
})
  .then(response => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err.statusText);
  });
```