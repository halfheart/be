This repository holds the source code of Arkham Horror: Card Game's Korean DB.

It's developed with Node.js, Express.js, Vue.js, Vuetify and MongoDB.

# Installing local copy of it

## Prerequisite

* You need a LTS version of Node.js. You can download it from <https://nodejs.org/en/>
* You need a MongoDB atlas account. You can get this from <https://www.mongodb.com/cloud/atlas> for free.
  1. click 'Get started free'
  2. Get account then sign in with it.
  3. Security -> MongoDB Users -> Click ADD NEW USER
  4. Insert Username and Password. User Privillages are Read and write to any database.

## How to install

1. Clone the repository.
2. Install NPM at the be directory: `npm install`
3. Install MongoDB-extjson: `npm install mongodb-extjson`
4. Create a cfg file: `be/cfg/cfg.js`
```
module.exports = {
  db: {
    url: 'mongodb://username:password@clusterX-shard-XX-XX-XXXXX.mongodb.net:XXXXX,clusterX-shard-XX-XX-XXXXX.mongodb.net:XXXXX/DBname?ssl=true&replicaSet=ClusterX-shard-X&authSource=admin' // url for connection to MongoDB with mongoose.
  },
  web: {
    cors: true // 개발용
  }
}
```
5. Install NPM at the fe derectory: `cd fe` `npm install`
6. Run backend server: `cd be` `npm start`
Then, mongoose install sample data. It takes few seconds. You can check this `Core Set created` and `Sample cards created` message in console.
7. Run frontend server: `cd fe` `npm run dev`
Then, you can check this http://localhost:8080/#/cardlist, packlist, deck/new
