import { getUserInfoByToken } from "../../utils/jwt"
import { status } from "../../constants/code"
import { createLog } from "../../utils/log"

const Medication = require("../../models/medication")
const moment = require("moment")

type medication = {
    _id:String,
    medicine:String,
    condition:String,
    createdAt:String
    userId:string
}

export default {
    Query: {
        async getMedicationRecords(_:any, args:{jwt:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("getMedicationRecords", userInfo._id)

            const medications = Medication.find({
                userId:userInfo._id
            })
            return medications
        }
    },
    Mutation : {
        async createMedicationRecord(_:any, args: {jwt:string, medicine:String,  condition:String}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("createMedicationRecord", userInfo._id)

            const newMedication = new Medication()

            newMedication.medicine = args.medicine
            newMedication.condition = args.condition
            newMedication.createdAt =  moment().format("YYYY-MM-DD HH:mm:ss")
            newMedication.userId = userInfo._id
            
            const res = await newMedication.save()
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async  updateMedicationRecord(_:any, args:  {jwt:string, _id:string, medicine:String,  condition:String}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog(" updateMedicationRecord", userInfo._id)

            const res = await Medication.updateOne(
                {_id:args._id, userId:userInfo._id},
                {medicine:args.medicine, condition:args.condition, createdAt:new Date()}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        },
        async deleteMedicationRecord(_:any, args: {jwt:string, _id:string}) {
            const userInfo = getUserInfoByToken(args.jwt)
            if(!userInfo) return status.TOKEN_EXPIRED

            createLog("deleteMedicationRecord", userInfo._id)
            
            const res = await Medication.deleteOne(
                {_id:args._id, userId:userInfo._id}
            )
            if(!res) return status.SERVER_ERROR
            return status.SUCCESS
        }
    }
}