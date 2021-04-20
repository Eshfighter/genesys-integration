# Purecloud Embeddable Framework

Example application to show how [PureCloud Embeddable Framework](https://developer.mypurecloud.com/api/embeddable-framework/) can be embedded inside a CRM. In this example, the CRM is built using [Angular](https://angular.io/).

Video: https://apps.mypurecloud.com/s/#/1/37c2ifjvfbalnc64wbcjabdv4a.

## Background
PureCloud Embeddable Framework is embedded inside using iframe. It's domain is apps.mypurecloud.com. Angular app's domain is localhost:4200. [Window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) is used to send messages and [Event.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) is used to receive messages in between domains.

### Sending messages from PureCloud Embeddable Framework to CRM

1. _framework.js_ posts message to top.window.
2. _PhoneService_ service receives the message.
3. _PhoneService_ pushes it into _Notifications_ observable.
4. _AppComponent_ component receives it. _AppComponent_ is the CRM.

### Sending messages from CRM to PureCloud Embeddable Framework

1. _AppComponent_ component invokes the function in _PhoneService_ service. _AppComponent_ is the CRM.
2. _PhoneService_ service pushes it into _Actions_ observable.
3. _PhoneComponent_ component contains the iframe with PureCloud Embeddable Framework inside. It receives the action.
4. _PhoneComponnet_ component posts message into iframe.
5. _framework.js_ receives it via _addEventListener()_ and calls PureCloud Embeddable Framework function.

## Instructions

Install [node](https://nodejs.org/en/).

Install _typescript_: `npm install typescript -g`.

Install _ws_: `npm install local-web-server -g`.

Install _concurrently_: `npm install concurrently -g`.

Download source code to your folder.

Run `npm install` at your folder.

Modify _framework.js_ to use the correct PureCloud region and client ID:
```
clientIds: { "mypurecloud.com.au": "your client id here" }
```

Modify _phone.service.ts_ to use the correct PureCloud region:
```
export const PFE_ORIGIN = "https://apps.mypurecloud.com.au";
```

Run `npm start` at your folder to start the local web server to serve framework.js and the Angular application.

On your web browser, browse to https://localhost/framework.js. _local-web-server_ uses a self-signed certificate. Your web browser will warn you. Tell your browser to ignore and continue loading the file. You will need to do this everytime you restart your browser. If you did not tell your browser to ignore and continue, PureCloud Embeddable Framework can't load it because of self-signed certificate. Close the tab with _framework.js_ once successfully loaded.

On your web browser, browse to https://localhost:4200 to see the Angular app.