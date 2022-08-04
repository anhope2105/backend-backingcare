const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const db = require('../models')


const createNewUser = async (data) => {
    return new Promise(async(resolve, reject) => {
    const hassPasswordForm = await hashUserPassword(data.password)
           try {
            await db.User.create({
                email: data.email,
                password: hassPasswordForm,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                roleId: data.roleId,
            })
            resolve('succsess')
           } catch (e) {
               reject(e)
               
           }
    })
}
const hashUserPassword = (password) => {
    return new Promise((resolve, reject) =>{
        try {
            var hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
    
}
const displayGetCRUD = async() => {
    const getUser = await db.User.findAll();
    return getUser
    
}
const editCRUDbyId = async(id) => {
    let user =''
    return new Promise((resolve, reject) => {
        try {
            const user = db.User.findOne({
                where:{id:id},
                raw:true,
            })
           if(user) {
            resolve(user)
           }else{

           }
        } catch (e) {
            reject(e)
        }

    })
    

}
const putCRUDbyId =(data,id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const dataUpdate = await db.User.findOne({
            //     where:{id:data.id},
            // })
            // if(dataUpdate) {
            //     dataUpdate.email = data.email,
            //     dataUpdate.firstName = data.firstName,
            //     dataUpdate.lastName = data.lastName,
            //     dataUpdate.address = data.address,
            //     dataUpdate.phonenumber = data.phonenumber

            //     dataUpdate.save()
            //     resolve(dataUpdate)
            // }
            
            // resolve(dataUpdate)
            const dataUpdate = await db.User.update({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                

            },{
                where:{id:id}
            })
            resolve(dataUpdate)

        } catch (e) {
            reject(e)
            
        }
    })

}
const  deleteCRUDbyId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
                where:{id:id} })
                resolve()
            
        } catch (e) {
            reject(e);
            
        }


    })
    

}

module.exports={createNewUser,displayGetCRUD,editCRUDbyId,putCRUDbyId,deleteCRUDbyId};