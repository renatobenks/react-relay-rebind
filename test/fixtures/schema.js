
const schema = `type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  points: Int!
}

input LoginInput {
  username: String!
  password: String!
}

type LoginErrors {
  username: String
  password: String
}

type LoginResponse {
  errors: LoginErrors
}

type Query {
  me: User
}

type Mutation {
  login(credentials: LoginInput): LoginResponse
}

schema {
  query: Query
  mutation: Mutation
}
`;


export default schema;
