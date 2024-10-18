
const productionCompanySchema = `
  type ProductionCompany {
    id: ID!
    name: String!
    description: String
    founded: String
    type: String
    create_time: String!
    update_time: String
    created_by: ID!
    updated_by: ID
    is_deleted: Boolean!
  }

  input ProductionCompanyInput {
    name: String
    description: String
    founded: String
    type: String
    create_time: String!
    update_time: String
    created_by: String
    updated_by: String
  }

  type Query {
    getAllProductionCompanies: [ProductionCompany]
    getProductionCompany(id: ID!): ProductionCompany
    getProductionCompanyByQuery(query: String!): [ProductionCompany]
  }

  type RootMutation {
    createProductionCompany(productionCompanyInput: ProductionCompanyInput!): ProductionCompany
    updateProductionCompany(id: ID!, productionCompanyInput: ProductionCompanyInput!): ProductionCompany
    deleteProductionCompany(id: ID!): ProductionCompany
  }

`;

module.exports = productionCompanySchema;