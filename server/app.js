const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connect to mLab database
mongoose.connect(
	'mongodb+srv://ryan:<test123>@gql-booklist-x9opl.mongodb.net/test?retryWrites=true&w=majority'
);

//Middleware
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(4000, () => {
	console.log('Now listening for requests on port 4000');
});
