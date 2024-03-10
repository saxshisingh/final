# Litecoin-Core

## Installation

Install the package via `yarn`:

```sh
yarn add litecoin-core
```

or via `npm`:

Install the package via `npm`:

```sh
npm install litecoin-core --save
```

## Usage
### Client(...args)
#### Arguments
1. `[host=localhost]` _(string)_: The host to connect to.
2. `[port=[network]]` _(string)_: The RPC server port.
3. `[network=mainnet]` _(string)_: The network
4. `[username]` _(string)_: The RPC server user name.
5. `[password]` _(string)_: The RPC server user password.
6. `[timeout=30000]` _(number)_: How long until the request times out (ms).

### Examples
#### Using network mode
The `network` will automatically determine the port to connect to, just like the `litecoind` and `litecoin-cli` commands.

```js
const Client = require('litecoin-core');
const client = new Client({ network: 'regtest' });
```

##### Setting a custom port

```js
const client = new Client({ port: 32777 });
```
