const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    name: String!
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    image: Image!
    description: String!
    feature: GroupFeatureSet
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    feature: [GroupFeatures!]!
    applyFeaturesSeperately: Booleans!
  }

  type GroupFeatures {
    feature: GroupFeatureFields!
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }


  type Mutation {
    groupDelete(groupId: ID!)
    groupPublish(groupId: ID!)
    groupUnpublish(groupId: ID!)
    groupAddCars(groupId: ID!, carId: ID!)
    groupRemoveCars(groupId: ID!, carId: ID!)
    groupCreate(
      groupInput: GroupInput!
    )
    groupUpdate(
      groupId: ID!
      groupInput: GroupInput!
    ):GroupUpdatePayload
  }

  type GroupUpdatePayload {
    userError: []!
    group: Group
  }

  type UserErrors {
    message: String!
    field: [String!]!
  }

  input GroupInput {
    name: String
    description: String
    image: ImageInput
    feature: GroupFeatureFields
  }

  input ImageInput {
    url: String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
