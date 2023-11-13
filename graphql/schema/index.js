const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Booking {
  _id: ID!
  event: Event!
  user: User!
  createdAt: String!
  updatedAt: String!
}

type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User
}

type User {
  _id: ID!
  email: String!
  password: String
  createEvents:[Event!]
}

type Response {
  message: String!
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
  events: [Event!]!
  singleEvent(eventID: ID!): Event!
  user(userID: ID!): User
  bookings: [Booking!]!
}

type RootMutation {
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
  bookEvent(eventID: ID!): Booking!
  cancelBooking(bookingID: ID!): Response!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
