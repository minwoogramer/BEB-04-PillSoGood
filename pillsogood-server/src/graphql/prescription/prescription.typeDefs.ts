import { gql } from 'apollo-server-express';

export default gql`
    type Prescription {
        _id:String,
        medicine:String,
        alert_time:String,
        hospital:String,
        last_medication_count:Int,
        createdAt:String
    }
    type Query {
        getPrescriptionRecords(jwt:String!):[Prescription]
    }
    type Mutation {
        createPrescriptionRecord(jwt:String!, medicine:String!, alert_time:String!, hospital:String!, last_medication_count:Int!):Int!
        updatePrescriptionRecord(jwt:String!, _id:String!, medicine:String!, alert_time:String!, hospital:String!, last_medication_count:Int!):Int!
        deletePrescriptionRecord(jwt:String!, _id:String!):Int!
    }
`;