// import the required JS modules to instantiate and configure the Environment
const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')
// instantiate the required Store that will store the cached data
const store = new Store(new RecordSource())
// create a Network that knows the GraphQL server from before, it's instantiated with a function that returns a Promise of a networking call to the GraphQL API using fetch
const network = Network.create((operation, variables) => {
  // relay endpoint
  return fetch('https://api.graph.cool/relay/v1/cj8pbynjb00ze0157w3orq01o', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
})
// use store and network available to instantiate the actual Environment
const environment = new Environment({
  network,
  store,
})
// export the environment from this module
export default environment
