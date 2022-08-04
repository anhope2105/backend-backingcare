const db = require('../models')


const getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.User.findAll({ 
                limit,
                where: {roleId:'R2'},
                order: [['createdAt' , 'DESC']],
                attributes: {
                    exclude: ["password"]
                },
                include: [
                    {model : db.Allcode,as:'positionData',attributes:["valueEn","valueVi"]},
                    {model : db.Allcode,as:'genderData',attributes:["valueEn","valueVi"]},
                ],
                raw:true,
                nest:true
            })
            resolve({
                errCode:0,
                data
            })
        } catch (e) {
            reject(e)
            
        }
    })
}
const getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctors = await db.User.findAll({
                where: {roleId:'R2'},
                attributes: {
                    exclude: ["password","image"]
                },
            })
            resolve({
                errCode:0,
                errMessage:"get Doctor Sucsess",
                data:doctors
            })
        } catch (e) {
            reject(e)
            
        }
    })
}

module.exports = {getTopDoctorHome,getAllDoctor}