import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from "react-apollo/";

import App from '../imports/ui/App';
const client = new ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
    // to a different host
    link: new HttpLink(),
    cache: new InMemoryCache(),
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