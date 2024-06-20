import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

// types
import typeDefs from "./graphql_schema/schema.js";

// resolvers
import resolvers from "./resolvers/resolvers.js";

// Apollo server 
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log('server ready at port', url);