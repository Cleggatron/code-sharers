const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const path = require("path");

//Add in house dependencies here typedefs, db, authmiddleware
const db = require("./config/connection")
const {typeDefs, resolvers} = require("./schemas")
//ToDo Import our authentication middleware

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    //ToDo Add this in
    //context: authMiddleware
})

//latest versions of apollo require await of server.start
server.start().then(() => {
    server.applyMiddleware({app})
})

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// ToDo Add in our static here

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
})