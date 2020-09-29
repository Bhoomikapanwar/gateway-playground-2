const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [{ name: "remoteService", url: "http://localhost:3000" }]
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  // ISSUE - this fetcher doesn't override the fetch used for downstream services as expected
  fetcher: require("make-fetch-happen").defaults({
    // this should have timed out the remote service after 2 seconds but it doesn't
    timeout: 2000
  })
});

const port = 4000;
server.listen({port}).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
