import { model, Schema, Types } from 'mongoose';

const prescription = new Schema({
    jwt : String,
    medicine : String,
    alertTime : String,
    hospital : String,
    lastMedicationCount : String, // String형인지 Number형인지?
    createdAt: String
})

module.exports = model('Prescription', prescription); // user스키마를 User라는 이름으로 export