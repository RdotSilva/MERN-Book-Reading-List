import React, { Component } from "react";
import BookList from "./components/BookList";
import ApolloClient from "apollo-boost";

// Apollo Client Setup
const client = new ApolloClient({
	uri: "http://localhost:4000/graphql"
});

class App extends Component {
	render() {
		return (
			<div id="main">
				<h1>My Reading List</h1>
				<BookList />
			</div>
		);
	}
}

export default App;
