const userService = require('../services/userService')

const handleLogin = async (req,res) => {

    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password) {
        return res.status(500).json({
            errCode:1,
            message:'Missing inputs parameter'
        })
    }   
    const userData = await userService.handleUserLogin(email , password)
    return res.status(200).json({
            errCode:userData.errCode,
            message:userData.errMessage,
            user: userData.user ? userData.user : {}
    })

}
const handleGetAllUsers = async (req,res) => {
    const id = req.query.id 
    if(!id) {
        return res.status(500).json({
            errCode:1,
            errMessage:"Id require parameters",
            users:[]
        })
    }
    const users = await userService.getAllUsers(id)
    return res.status(200).json({
        errCode:0,
        errMessage:'Ok',
        users
    })



}
const handleCreateNewUser = async (req,res) => {
    const user = await userService.createNewUser(req.body);
    return res.status(200).json({
        user
    })

}
const handleDeleteUser = async (req,res) => {

    if(!req.body.id) {
        return res.status(500).json({
            errCode:1,
            errMessage:'Id is required'
        })
    }
    const user  = await userService.deleteUser(req.body.id)
    return res.status(200).json({
        user
    })

}
const handleEditUser = async (req,res) => {
    if(!req.body.id) {
        return res.status(403).json({
            errCode:1,
            errMessage:'id is required'
        })
    }

    const user = await userService.editUser(req.body)
    return res.status(200).json({
        user
    })

    
}
const getAllCodes = async (req, res) => {
        try {
            const type  = req.query.type
            if(!type){
                return res.status(404).json({
                    errCode:1,
                    errMessage:"type is required"
                })
            }
            else {
                const data = await userService.getAllCodesService(req.query.type)
                return res.status(200).json(data)
            }
           
        } catch (e) {
            return res.json(200).json({
                errCode:1,
                errMessage:"error from server"
            })
            
        }
}
module.exports = {handleLogin,handleGetAllUsers,handleCreateNewUser,
    handleDeleteUser,handleEditUser,getAllCodes}