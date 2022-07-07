import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const Prescription = require("../../models/prescription")
const moment = require("moment")

type prescription = {
    _id:String,
        medicine:String,
        alert_time:String,
        hospital:String,
        last_medication_count:Number,
        createdAt:String,
        userId:string
}

export default {
    Query: {
        async getPrescriptionRecords(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("getPrescriptionRecords", userInfo._id)

            const prescriptions = Prescription.find({
                userId:userInfo._id
            })
            return prescriptions
        }
    },
    Mutation : {
        async createPrescriptionRecord(_:any, args: 
            {jwt:string, 
            medicine:String, 
            alert_time:String, 
            hospital:String, 
            last_medication_count:Number}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("createPrescriptionRecord", userInfo._id)

            const newPrescription = new Prescription()

            newPrescription.medicine = args.medicine
            newPrescription.alert_time = args.alert_time
            newPrescription.hospital = args.hospital
            newPrescription.last_medication_count = args.last_medication_count
            newPrescription.createdAt =  moment().format("YYYY-MM-DD HH:mm:ss")
            newPrescription.userId = userInfo._id
            
            const res = await newPrescription.save()
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async  updatePrescriptionRecord(_:any, args:  
            {jwt:string, 
            _id:string, 
            medicine:String,
            alert_time:String,
            hospital:String,
            last_medication_count:Number}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("updatePrescriptionRecord", userInfo._id)

            const res = await Prescription.updateOne(
                {_id:args._id, userId:userInfo._id},
                {medicine:args.medicine, 
                 alert_time:args.alert_time, 
                 hospital:args.hospital, 
                 last_medication_count:args.last_medication_count,
                 createdAt:new Date()})
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async deletePrescriptionRecord(_:any, args: {jwt:string, _id:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("deletePrescriptionRecord", userInfo._id)
            
            const res = await Prescription.deleteOne(
                {_id:args._id, userId:userInfo._id}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}