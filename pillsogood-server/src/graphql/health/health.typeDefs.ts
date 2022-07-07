import { gql } from 'apollo-server-express';

export default gql`
    type Health {
        _id:String,
        height:Float,
        weight:Float,
        hypertension:Float,
        bloodSugarLevel:Float,
        createdAt:String
    }

    type Query {
        getHealthRecords(jwt:String!):[Health]
    }

    type Mutation {
        createHealthRecord(jwt:String!, height:Float!, weight:Float!, hypertension:Float!, bloodSugarLevel:Float!):Int!
        updateHealthRecord(jwt:String!, _id:String!, weight:Int!, hypertension:Int!, bloodSugarLevel:Int!):Int!
        deleteHealthRecord(jwt:String!, _id:String!):Int!
    }
`;