# nuxt_study
nuxt, vuetify study contents

# Prerequisites
```sh
npm i -g express nodemon increase-memory-limit
```

# DAY1 (self_chat)
NO BRANCH
```sh
cd self_chat; npm i; npm run dev;
```

# DAY2 ( chat_vuetify, chat_express )
chat_vuetify : ` cd chat_vuetify; npm i; npm run dev; `
chat_express : ` cd chat_express; npm i; nodemon; `

## *branch day2.0*
chat_vuetify (vuetify, axios, none-server)
```sh
npx create-nuxt-app chat_vuetify
cd chat_vuetify
npm i socket.io-client
increase-memory-limit
```
chat_express (socket.io-client)
```sh
express -e chat_express
cd chat_express; npm i;
npm i socket.io
```

## *branch day2.1*
chat_vuetify
- add chat menus
- default chat pages (chat/index, chat/group, chat/secret)

chat_express
- change bin/www and app.js for socket.io

## *branch day2.2*
empty branch 

## *branch day2.3*
chat_express
- refactoring router, sockets
- serve open-chat

chat_vuetify
- chat/index : dev open-chat

## *branch day2.4*
empty branch 
