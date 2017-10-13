import React from 'react';
import Post from './Post';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

// ListPage component renders a list of Post components by mapping over an array of posts
class ListPage extends React.Component {

  render () {
    return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.viewer.allPosts.edges.map(({node}) =>
            <Post key={node.__id} post={node} />
          )}
        </div>
      </div>
    )
  }
}

// viewer is the expected prop in the component
// reuses the Post_post fragment from Post.js because ListPage is higher in the React component (and Relay container) tree, so it must include all the fragments of its children
// @connection directive is required for updating the cache later on - needed to refer to that particular connection (identified by the key ListPage_allPosts) in the cache
export default createFragmentContainer(ListPage, graphql`
  fragment ListPage_viewer on Viewer {
    allPosts(last: 100, orderBy: createdAt_DESC) @connection(key: "ListPage_allPosts", filters: []) {
      edges {
        node {
          ...Post_post
        }
      }
    }
  }
`);
