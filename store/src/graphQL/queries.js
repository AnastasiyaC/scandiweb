import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
   query {
     categories {
        name
     }
  }
`;

export const GET_PRODUCT = gql`
  query Product($id: String!){
       product(id: $id){
           id
           name
           inStock
           gallery
           category
           brand
           description
           prices {
              currency{
                 label
                 symbol
              }
              amount
           }
       }
  }
`;

export const GET_PRODUCT_ATTRIBUTES = gql`
  query Product($id: String!){
       product(id: $id){
           id
           inStock
           attributes {
              id
              name
              type
              items {
                  displayValue
                  value
                  id
              }
           }
       }
  }
`;
export const GET_CURRENCIES = gql`
  query {
     currencies {
        label
        symbol
     }
  }
`;

export const GET_CART_PRODUCT = gql`
  query Product($id: String!){
       product(id: $id){
           id
           name
           gallery
           brand
           prices {
              currency{
                 label
                 symbol
              }
              amount
           }
       }
  }
`;

export const GET_CATEGORY_PRODUCTS = gql`
  query category($CategoryInput: CategoryInput!) {
      category(input: $CategoryInput) {
        name
         products {
           name
           id
           inStock
           gallery
           brand
           prices {
              currency {
                 label
                 symbol
              }
              amount
           }
      }
  }
}
`;