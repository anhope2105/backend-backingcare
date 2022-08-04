const dortorService = require("../services/doctorService")

const getTopDoctorHome = async (req,res) => {
    let limit = req.query.limit
    if(!limit) limit = 10
    try {
        const data = await dortorService.getTopDoctorHome(+limit);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            errCode:-1,
            errMessage:"Server error..."
        })
    }

}
const getAllDoctors = async (req,res) => {
    try {
        const respone = await dortorService.getAllDoctor()
        return res.status(200).json(respone)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            errCode:-1,
            errMessage:"Server error..."
        })
        
    }
}
module.exports = {getTopDoctorHome,getAllDoctors}
