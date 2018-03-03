import React from 'react';
import ADD_POST from "../api/client/AddPost.graphql"
import {graphql, compose} from "react-apollo";
class AddPost extends React.Component {
    handleSubmit(e) {
        let post = e.target.newPost.value;

        e.preventDefault();

        if (post) {
            e.target.newPost.value = '';
            // this.props.mutate({
            //     variables: { content: post, views: 12 }
            // });
            this.props.newPostMutation({
                variables: { content: post, views: 12 }
            });


    }}
    render() {
        return (
            <div className="item">
                <form className="form" onSubmit={this.handleSubmit.bind(this)}>
                    <input className="form__input" type="text" name="newPost" placeholder="Zero-two"/>
                    <button className="button">Add Post</button>
                </form>
            </div>
        );
    }
};

export default AddPostWithData = compose(
    graphql(ADD_POST, { name: 'newPostMutation' })
)(AddPost);
