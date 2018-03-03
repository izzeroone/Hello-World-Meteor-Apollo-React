import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Post from './post'
import ALL_POSTS from '../api/client/PostForDisplay.graphql'
import POST_SUB from '../api/client/PostSubscription.graphql'
/**
 * This React component is responsible for querying Apollo for the posts
 * and passing the results to the child Post components for rendering
 */
class Posts extends Component {
    constructor(props) {
        super(props);
    }



    componentWillMount(){
        this.props.data.subscribeToMore({
            document: POST_SUB,
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                const newPostItem = subscriptionData.data.postAdded;
                return Object.assign({}, prev, {
                    posts: [...prev.posts, newPostItem]
                });

            }
        })

    }
    // posts: [newPostItem, ...prev.posts]
    render() {
        let posts = <div></div>
        if (this.props.data.posts && this.props.data.posts instanceof Array) {
            posts = (
                <div>
                    {this.props.data.posts.map(function(post) {
                        return <Post key={post.id} post={post} />;
                    })}
                </div>
            )
        }

        return posts;
    }
}

// Use the graphql container to run the allPosts query and pass the results to PostsContainer
export default PostsContainer = graphql(ALL_POSTS)(Posts);
