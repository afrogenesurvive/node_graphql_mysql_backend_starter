
const tagSchema = `
  type Tag {
    id: ID!
    entity_type: String!
    entity_id: ID!
    tag: String!
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input TagInput {
    entity_type: String
    entity_id: ID
    tag: String
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
  }

  type Query {
  getAllTags: [Tag]
  getTag(id: ID!): Tag
  getTagByQuery(query: String!): [Tag]
}

type RootMutation {
  createTag(tagInput: TagInput!): Tag
  updateTag(id: ID!, tagInput: TagInput!): Tag
  deleteTag(id: ID!): Tag
}

`;

module.exports = tagSchema;