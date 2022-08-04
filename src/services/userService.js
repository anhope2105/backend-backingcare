const db = require('../models')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);



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


const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            const isExist = await checkUserEmail(email)
            if (isExist) {


                const user = await db.User.findOne({
                    where: { email: email },
                    raw: true,
                    attributes: ['email', 'roleId', 'password','firstName']
                })
                if (user) {
                    const check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'oke';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';

                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist our database , Plz try orther email`
            }
            resolve(userData)

        } catch (e) {
            reject(e)

        }
    })

}


const checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { email: email } })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e)

        }
    })

}

const getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)

        } catch (e) {
            reject(e)

        }
    })
}
const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEmailExists = await checkUserEmail(data.email)
            if(checkEmailExists) {
                resolve({
                    errCode:3,
                    errMessage:'email is already in use',
                })
            }else {
                const hassPasswordForm = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hassPasswordForm,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender:data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image:data.image,

                  
                })
                resolve({
                    errCode:0,
                    message:"create user sucess"
                })
            }
            
        } catch (e) {
            reject(e)
            
        }
    })

}

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        const user = await db.User.findOne({
            where: { id: userId },
            raw: true

        })
        if (!user) {
            resolve({
                errCode: 1,
                errMessage: 'user is not found'
            })
        }

        if (user) {

            await db.User.destroy({
                where: { id: userId },
            })
        }

        resolve({
            errCode: 0,
            message: 'delete user success'
        })
    })
}
const editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id) {
                resolve({
                    errCode:3,
                    errMessage: 'Missing require parameter'
                })

            }
            const findUser = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
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
            if (!findUser) {
                resolve({
                    errCode: 2,
                    errMessage: 'user not found',
                })
            }else {
                const dataUpdate = await db.User.update({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId:data.roleId,
                    positionId:data.positionId,
                    if(image) {
                        image:data.image
                    }

                }, {
                    where: { id: data.id }
                })
                resolve({
                    errCode: 0,
                    message: 'update user success'
                })

            }

        } catch (e) {
            reject(e)

        }
    })
}
const getAllCodesService  = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = {}
            const allcodes = await db.Allcode.findAll({
                where:{type}
            })
            res.errCode=0
            res.data=allcodes
            resolve(res)
        } catch (e) {
            reject(e)
            
        }
    })

}
module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    editUser,
    getAllCodesService,
}