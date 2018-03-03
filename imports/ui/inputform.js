import React from 'react';


export default class AddPlayer extends React.Component {
    handleSubmit(e) {
        let post = e.target.newPost.value;

        e.preventDefault();

        if (post) {
            e.target.post.value = '';
            Players.insert({
                name: playerName,
                score: 0
            });
        }
    }
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