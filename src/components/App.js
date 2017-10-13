import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'

// QueryRenderer is the root of a Relay tree; it takes a query, fetches the data and calls the render callback with the data
// QueryRenderer takes three arguments: 1) relay environment 2) root query 3) render function that specifies what should be rendered in loading, error and success cases

// root query
const AppAllPostQuery = graphql`
  query AppAllPostQuery {
    viewer {
      ...ListPage_viewer
    }
  }
`

import environment from '../Environment'
import ListPage from './ListPage'

class App extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={AppAllPostQuery}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return <ListPage viewer={props.viewer} />
          }
          return <div>Loading</div>
        }}
      />
    )
  }
}
export default App
