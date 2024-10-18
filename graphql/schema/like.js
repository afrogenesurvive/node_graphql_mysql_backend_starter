const likeSchema = `
  type Like {
    id: ID!
    entity_type: String!
    entity_id: ID!
    value: Int!
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input LikeInput {
    entity_type: String!
    entity_id: ID!
    value: Int!
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  type Query {
    getAllLikes: [Like]
    getLike(id: ID!): Like
    getLikeByQuery(query: String!): [Like]
  }

  type Mutation {
    createLike(likeInput: LikeInput!): Like
    updateLike(id: ID!, likeInput: LikeInput!): Like
    deleteLike(id: ID!): Like
  }
`;

module.exports = likeSchema;