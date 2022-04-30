import {ApolloClient, ApolloLink, HttpLink} from "@apollo/client";
import { cache } from "./cashe";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/",
});

export const client = new ApolloClient({
    cache,
    link: ApolloLink.from([httpLink]),
});