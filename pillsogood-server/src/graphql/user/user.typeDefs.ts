import { gql } from 'apollo-server-express';

export default gql`
    type User {
        _id:String,
        email:String,
        password:String,
        nickname:String,
        dateOfBirth:String,
        pointBalance:Int,
        createdAt:String,
        PhoneNumber:String
    }

    type Token {
        jwt:String
    }

    type Query {
        hi:String
        getUserInfo(jwt:String!):User
    }

    type Mutation {
        join(nickname:String!, email:String!, dateOfBirth:String!, password:String,  PhoneNumber:String):Int!
        login(email:String!, password:String!):Token!
    }
`;