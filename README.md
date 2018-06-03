# devsy

Auto-sync projects in your dev folder across multiple computers.

### CLI Installation and Usage

```javascript
npm install devsy -g
```

Run this from your `dev` directory:

```javascript
devsy
```

Works with `dev` directories structured like this:

```javascript
dev
├─┬ apps
│ ├─┬ appYouMade
│ │ ├── .git
│ │ ├── src
│ │ ├── app.js
│ │ ├── package-lock.json
│ │ ├── package.json
│ │ └── README.md
│ └─┬ anothaOne
│   └── ...
├── ext
└── cli
```

### node.js Usage

```javascript
await require('devsy')('path/to/dev');
```

### Donate!

Ethereum: 0xb4355179da353f1BA4AA0BB5a7E3Ba4FdC7128ea  
Bitcoin: 1LJkyU5jdZb525sBwcx1dA2qV8kgowdcro  
Patreon: <https://www.patreon.com/qashto>  
Paypal: <https://www.paypal.me/qashto/5>
