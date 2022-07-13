import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const Prescription = require("../../models/prescription")
const moment = require("moment")

type prescription = {
    _id:String,
        medicine:String,
        alertTime:String,
        hospital:String,
        lastMedicationCount:Number,
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
            alertTime:String, 
            hospital:String, 
            lastMedicationCount:Number}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("createPrescriptionRecord", userInfo._id)

            const newPrescription = new Prescription()

            newPrescription.medicine = args.medicine
            newPrescription.alertTime = args.alertTime
            newPrescription.hospital = args.hospital
            newPrescription.lastMedicationCount = args.lastMedicationCount
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
            alertTime:String,
            hospital:String,
            lastMedicationCount:Number}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("updatePrescriptionRecord", userInfo._id)

            const res = await Prescription.updateOne(
                {_id:args._id, userId:userInfo._id},
                {medicine:args.medicine, 
                 alertTime:args.alertTime, 
                 hospital:args.hospital, 
                 lastMedicationCount:args.lastMedicationCount,
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