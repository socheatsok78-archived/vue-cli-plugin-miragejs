# vue-cli-plugin-miragejs

Build complete frontend features, even if your API doesn't exist.

See https://miragejs.com/

## Usage

### Environment Variables

```sh
# .env.local
# .env.development.local

VUE_APP_MIRAGE_ENABLE=true
VUE_APP_MIRAGE_NAMESPACE=/api
VUE_APP_MIRAGE_URL_PREFIX=http://localhost:9090
VUE_APP_MIRAGE_TIMING=400
```

### Start server

**Manually start mock server**

```js
// main.js
import { MirageMockServer } from "@/mocks";

MirageMockServer.start();
```

**Start via `axios` adapter**

```js
import axios from "axios";
import { MirageMockServer } from "@/mocks";

function MirageMockAdapter(adapter) {
  return async function (config) {
    const { NODE_ENV, VUE_APP_MIRAGE_ENABLE } = process.env;
    const isDevelopment = NODE_ENV === "development";
    const isMockEnabled = VUE_APP_MIRAGE_ENABLE === "true";

    if (isDevelopment && isMockEnabled) {
      await MirageMockServer.start();
    }

    return adapter(config);
  };
}

const api = axios.create({
  adapter: MirageMockAdapter(axios.defaults.adapter)
})

const response = await api.get('/unicorn')
console.log(response) // Response
```
