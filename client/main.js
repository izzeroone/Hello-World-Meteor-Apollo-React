import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from "react-apollo/";
import {getOperationAST} from "graphql";
import {WebSocketLink} from "apollo-link-ws";
import * as ApolloLink from "apollo-link";

import App from '../imports/ui/App';



/* Initialize Apollo Client for GraphQL */

// You might want to set these manually if you're running your server somewhere else
//
// const client = new ApolloClient({
//     // By default, this client will send queries to the
//     //  `/graphql` endpoint on the same host
//     // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
//     // to a different host
//     link: new HttpLink(),
//     cache: new InMemoryCache(),
// });

// Apollo 2.0 now uses the extensible "ApolloLink" (the following does not rely on Meteor)


/* Initialize Apollo Client for GraphQL */

// You might want to set these manually if you're running your server somewhere else
const httpUri = Meteor.absoluteUrl('graphql'); // http://localhost:3000/graphql
const wsUri = Meteor.absoluteUrl('subscriptions').replace(/^http/, 'ws'); // ws://localhost:3000/subscriptions

// Apollo 2.0 now uses the extensible "ApolloLink" (the following does not rely on Meteor)

const link = ApolloLink.split(
    operation => {
        const operationAST = getOperationAST(operation.query, operation.operationName);
        return !!operationAST && operationAST.operation === 'subscription';
    },
    new WebSocketLink({
        uri: wsUri,
        options: {
            reconnect: true, // tells client to reconnect websocket after being disconnected (which will happen after a hot-reload)
            // // might be helpful if you want to carry login state from client
            // // it is recommended you use the secure version of websockets (wss) when transporting sensitive login information
            // connectionParams: {
            // 	authToken: localStorage.getItem("Meteor.loginToken")
            // }
        }
    }),
    new HttpLink({ uri: httpUri })
);

const cache = new InMemoryCache(window.__APOLLO_STATE);

const client = new ApolloClient({
    link,
    cache
});
Meteor.startup(() => {
    Tracker.autorun(function () {
        let name = "Decode talker";
        let jsx =(<ApolloProvider client={client}>
                <App/>
        </ApolloProvider>

        );
        ReactDOM.render(jsx, document.getElementById('app'));
    });
});