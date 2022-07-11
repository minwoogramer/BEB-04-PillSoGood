import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`;

export const SIGN_UP = gql`
  mutation CreateUser($email: String!, $password: String!, $nickname: String!) {
    createUser(email: $email, password: $password, nickname: $nickname)
  }
`;
