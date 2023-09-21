# Rate My KU

## Table of Contents

1. [Installing and Running](#installing-and-running)
2. [Structure](#structure)
3. [Webpack Auto-reload and HRM](#webpack-auto-reload-and-hrm)
4. [Content Scripts](#content-scripts)
5. [Intelligent Code Completion](#intelligent-code-completion)
6. [Packing](#packing)
7. [Secrets](#secrets)
8. [Resources](#resources)

## Installing and Running

### Running the Chrome Extension:

1. Check if your [Node.js](https://nodejs.org/) version is >= **18**.
2. Navigate to the `frontend` directory.
3. Run `npm install` to install the dependencies.
4. Run `npm start`
5. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.

### Running the Flask Server:

1. Navigate to the `backend` directory.
2. Activate the Python virtual environment:
    - **Linux/Mac**: `source venv/bin/activate`
    - **Windows**: `venv\Scripts\activate`
3. Install the required Python packages:
    ```bash
    pip3 install -r requirements.txt
    ```
4. Run the Flask server:
    ```bash
    python3 flaskserver.py
    ```
5. The server will start on `http://localhost:5000/`.

#### Testing the Professor GET Endpoint:

You can test the endpoint using a web browser, Postman, or `curl`:

-   **Web Browser**: Navigate to `http://localhost:5000/get_professor_data?name=John%20Doe` (replace `John%20Doe` with the professor's name).
-   **Postman**: Create a GET request to `http://localhost:5000/get_professor_data?name=John%20Doe`.
-   **Curl**: Run the following command in the terminal:
    ```bash
    curl "http://localhost:5000/get_professor_data?name=John%20Doe"
    ```

## Structure

Edit code in the `src` folder.

Pre-prepared is a popup, an options page, a background page, and a new tab page.

## Webpack auto-reload and HRM

To make your workflow much more efficient this boilerplate uses the [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) to development (started with `npm start`) with auto reload feature that reloads the browser automatically every time that you save some file in your editor.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 npm run start
```

## Content Scripts

Although this boilerplate uses the webpack dev server, it's also prepared to write all your bundles files on the disk at every code change, so you can point, on your extension manifest, to your bundles that you want to use as [content scripts](https://developer.chrome.com/extensions/content_scripts), but you need to exclude these entry points from hot reloading [(why?)](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/4#issuecomment-261788690). To do so you need to expose which entry points are content scripts on the `webpack.config.js` using the `chromeExtensionBoilerplate -> notHotReload` config. Look the example below.

Let's say that you want use the `myContentScript` entry point as content script, so on your `webpack.config.js` you will configure the entry point and exclude it from hot reloading, like this:

```js
{
  …
  entry: {
    myContentScript: "./src/js/myContentScript.js"
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["myContentScript"]
  }
  …
}
```

and on your `src/manifest.json`:

```json
{
    "content_scripts": [
        {
            "matches": ["https://www.google.com/*"],
            "js": ["myContentScript.bundle.js"]
        }
    ]
}
```

## Intelligent Code Completion

Supports chrome-specific intelligent code completion using [@types/chrome](https://www.npmjs.com/package/@types/chrome).

## Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Look at the [official guide](https://developer.chrome.com/webstore/publish) for more info about publishing.

## Secrets

If you are developing an extension that talks with some API you probably are using different keys for testing and production. Is a good practice you not commit your secret keys and expose to anyone that have access to the repository.

To this task this boilerplate import the file `./secrets.<THE-NODE_ENV>.js` on your modules through the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: "123" };
```

_./src/popup.js_

```js
import secrets from "secrets";
ApiCall({ key: secrets.key });
```

:point_right: The files with name `secrets.*.js` already are ignored on the repository.

## Resources:

-   [Webpack documentation](https://webpack.js.org/concepts/)
-   [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)
