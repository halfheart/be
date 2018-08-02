This repository holds the source code of Arkham Horror: Card Game's Korean DB.
It's developed with Node.js, Express.js, Vue.js, Vuetify and MongoDB.

# Installing local copy of it

## Prerequisite

* You need a LTS version of Node.js. You can download it from <https://nodejs.org/en/>

## How to install

1. Clone the repository.
2. Install NPM at the be directory: `npm install`
3. Create cfg file: `be/cfg/cfg.js`
```
module.exports = {
  db: {
    url: // url for connection to MongoDB with mongoose. 'mongodb://id:password@clusterX-shard-XX-XX-XXXXX.mongodb.net:XXXXX,clusterX-shard-XX-XX-XXXXX.mongodb.net:XXXXX/DBname?ssl=true&replicaSet=ClusterX-shard-X&authSource=admin'
  },
  web: {
    cors: true // 개발용
  }
}
```
4. Install NPM at the fe derectory: `cd fe` `npm install`
5. Run backend server: `cd be` `npm start`
6. Run frontend server: `cd fe` `npm run dev`
Then, you can check this http://localhost:8080/#/cardlist, packlist, deck/new
