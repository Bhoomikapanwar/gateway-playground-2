const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const delay = delayTime => new Promise((resolve) => setTimeout(resolve, delayTime));

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: async (root, args, context) => {
      // 5 second delay to display timeout of remote service
      await delay(5000);
      return "Hello world!";
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

const port = 3000;
server.listen({port}).then(({ url }) => {
  console.log(`🚀 Remote Server ready at ${url}`);
});
