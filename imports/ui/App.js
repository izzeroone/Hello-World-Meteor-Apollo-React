/**
 * The top level react component
 */
import React, { Component } from 'react';
import PostsContainer from './postsContainer'
import AddPostWithData from "./inputform";

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
            <PostsContainer />
            <AddPostWithData />
            </div>
        )
    }
}
