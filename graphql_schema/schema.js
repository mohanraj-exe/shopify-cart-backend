const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String!
}

type ProductBundle {
    id: ID!
    bundle_name: String!
    description: String!
    products: [Product!]!
    discount_percentage: Float!
    price: Float!
}

  type Query {
    products: [Product]
    product(id: ID!): Product
    product_bundles: [ProductBundle]
    product_bundle(id: ID!): ProductBundle
}

  type Mutation {
    addProduct(product: AddProduct!): Product
    updateProduct(id: ID!, edit: EditProductInputs!): Product
    deleteProduct(id: ID!): String
}

  input AddProduct {
    name: String!,
    price: Float!,
    description: String!
}
    input EditProductInputs {
    name: String,
    price: Float,
    description: String
}
`;

export default typeDefs;