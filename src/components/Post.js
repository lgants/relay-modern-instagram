import React from 'react';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

// simple Post component that displays the image and the description for each post
class Post extends React.Component {
  _handleDelete = () => {}

  render () {
    return (
      <div className='pa3 bg-black-05 ma3'>
        <div
          className='w-100'
          style={{
            backgroundImage: `url(${this.props.post.imageUrl})`,
            backgroundSize: 'cover',
            paddingBottom: '100%',
          }}
        />
        <div className='pt3'>
          {this.props.post.description}&nbsp;
          <span className='red f6 pointer dim' onClick={this._handleDelete}>Delete</span>
        </div>
      </div>
    )
  }
}

// Post component needs access to the id, description and imageUrl of a post item
// There's a naming convention for the fragments; each fragment should be named according to the file and the prop that will get injected into the component: <FileName>_<propName>
export default createFragmentContainer(Post, graphql`
  fragment Post_post on Post {
    id
    description
    imageUrl
  }
`);
