# GraphQL API

## Used technologies and libraries

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [TypeScript](https://www.typescriptlang.org/)
- others

## How to start project

1. Install dependencies
   `npm i`
2. Install pre-commit linter
   `npm run prepare`
3. Create .env based on .env.example
4. Generate typescript types from schema
   `npm run codegen`
5. Run project
   `npm run dev`

## GraphQL Schema

```
scalar Date
scalar UUID

type Forum {
  id: UUID!
  name: String!
  isPrivate: Boolean!
  adminId: UUID
  admin: User
  users: [User!]!
  messages: [Message!]!
}

type Message {
  id: UUID!
  text: String!
  createdAt: Date!
  userId: UUID!
  forumId: UUID!
  user: User!
  forum: Forum!
}

type User {
  id: UUID!
  name: String!
  pictureUrl: String!
  forums: [Forum!]!
}

type Request {
  id: UUID!
  adminId: UUID!
  forumId: UUID!
  userId: UUID!
  admin: User!
  forum: Forum!
  user: User!
}

input CreateMessageInput {
  text: String!
  forumId: String!
}

input CreateForumInput {
  name: String!
  isPrivate: Boolean
}

type Mutation {
  createMessage(input: CreateMessageInput!): Message!
  acceptRequest(requestId: UUID!): Boolean
  refuseRequest(requestId: UUID!): Boolean
  joinForum(forumId: UUID!): Boolean!
  createForum(input: CreateForumInput!): Forum!
}

type Query {
  userRequests: [Request!]!
  currentUser: User
  publicForums: [Forum!]!
}
```

This GraphQL schema defines a data structure for managing an online forum system. Here's a brief description of the key components:

##### Scalars:

    Date: Represents a date and time value.
    UUID: Represents a universally unique identifier

##### Types:

###### Forum

Represents a forum with attributes like id, name, isPrivate (whether the forum is private), adminId, admin (user who is the admin of the forum), users (users who are part of the forum), and messages (messages posted in the forum).

###### Message

Represents a message within a forum, including id, text, createdAt, userId, forumId, user (author of the message), and the parent forum.

###### User

Represents a user with attributes like id, name, pictureUrl, and the forums they are part of.

###### Request

Represents a request to join a forum, containing id, adminId, forumId, userId, admin (user who is the admin of the forum), forum (the forum being requested to join), and user (user who made the request).

##### Input Types:

###### CreateMessageInput

Used to create a new message

###### CreateForumInput

Used to create a new forum

##### Mutations:

###### createMessage

Creates a new message in a forum.

###### acceptRequest

Accepts a request to join a forum.

###### refuseRequest

Refuses a request to join a forum.

###### joinForum

Allows a user to join a forum. If forum is private request to join created, otherwise user joined

###### createForum

Creates a new forum.

##### Queries:

###### userRequests

Retrieves requests made by users to join forums.

###### currentUser

Retrieves information about the currently logged-in user.

###### publicForums

Retrieves a list of publicly accessible forums.

## Project structure

In the root directory you can see common configuration files and folders
In the the `src` directory placed main part of application code
The database represented as simple JS arrays and objects in `db` folder
All GraphQL stuff like resolvers, schemas, etc. placed in `graphql` folder
Business logic placed in `services` folder
There is a folder `scripts` and `utils` with auxiliary functions
In `__generated__` placed generated from GraphQL schema TS types
In `context` folder placed logic for application context

## Other important info

- All methods in services are asynchronous since in the future it would be easier to replace current db with real data sources

## What can be improved

- It would be a good opportunity to refactor error handling

If you have any questions contact me
Developed by mykhailo-vavr (GitHub)
