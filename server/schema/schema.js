const graphql = require("graphql");
const _ = require("lodash");

// Import models
const Book = require("../models/book");
const Author = require("../models/author");

const {
	GraphQLID,
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLInt,
	GraphQLList
} = graphql;

// // Dummy data
// var books = [
// 	{ name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
// 	{ name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
// 	{ name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
// 	{ name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
// 	{ name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
// 	{ name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' }
// ];

// var authors = [
// 	{ name: 'Patrick Rothfuss', age: 44, id: '1' },
// 	{ name: 'Brandon Sanderson', age: 42, id: '2' },
// 	{ name: 'Terry Pratchett', age: 66, id: '3' }
// ];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				console.log(parent);
				// return _.find(authors, { id: parent.authorId });
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// Id of the author matches the authorID in book list
				// return _.filter(books, { authorId: parent.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// Code to get data from db / other source.
				console.log(typeof args.id);
				// return _.find(books, { id: args.id });
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// Code to get data from db / other source.
				// return _.find(authors, { id: args.id });
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				// return books;
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				// return authors;
			}
		}
	})
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt }
			},
			resolve(parent, args) {
				// author is now a new object based on the Author Schema created in author.js
				let author = new Author({
					name: args.name,
					age: args.age
				});
				// Save to mongoDB
				return author.save();
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: GraphQLString },
				genre: { type: GraphQLString },
				authorId: { type: GraphQLID }
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				});
				// Save to mongoDB
				return book.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
