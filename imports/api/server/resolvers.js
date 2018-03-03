
import {db, Post } from './connectors';
import { pubsub } from './subscriptions';
// create the resolve functions for the available GraphQL queries
export default resolvers = {

    Query: {
        posts(_, args){
            return Post.findAll({where: args});
        },
    },

    Mutation: {
        createPost(_, args){
            let createPost = Post.create({content: args.input.content, views: args.input.views });
            pubsub.publish("postAdded", {postAdded: createPost});
            return  createPost;
            //return args.input;
        }
    },

    Subscription:{
        postAdded:{
            subscribe: () => pubsub.asyncIterator("postAdded")
        }
    }
};
