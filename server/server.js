const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const path = require("path");

//Add in house dependencies here typedefs, db, authmiddleware
const db = require("./config/connection")
const {typeDefs, resolvers} = require("./schemas")
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
     // Add context to our server so data from the `authMiddleware()` function can pass data to our resolver functions
    context: authMiddleware
})

//latest versions of apollo require await of server.start
server.start().then(() => {
    server.applyMiddleware({app})
})

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Add in our static dependencies here
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
})