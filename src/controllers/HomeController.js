const db = require('../models/index')
const CRUDservice = require('../services/CRUDservice')
class HomeController {
    home(req,res) {
        db.User.findAll()
        .then(data => {
            res.render('home' , {
                data:JSON.stringify(data)
            })
        })
    }
    // [GET] /crud
    getCRUD (req, res) {
        return res.render('crud');
    }
    // [POST] /post-crud
    async postCRUD (req, res) {
        const log = await CRUDservice.createNewUser(req.body)
        .then(()=> {
            res.redirect("/get-crud")
        })
       

    }
    async readGetCRUD(req, res) {
       const data = await CRUDservice.displayGetCRUD()
       res.render('displayCRUD' , { data })
    }
    async editCRUD (req, res) {
        const _id = req.query.id
        if(_id) {
           const data =  await CRUDservice.editCRUDbyId(_id)
            res.render('editCRUD',{ data })

        }else{
            console.log("user not found")
        }
    }
    async putCRUD (req, res) {
        const dataEdit = req.body
        const dataId = req.params.id
        
        await CRUDservice.putCRUDbyId(dataEdit,dataId)
        res.redirect('/get-crud')

    }
    async deleteCRUD (req, res) {
        const deleteId = req.query.id
        if(deleteId) {
        const dataDelete = await CRUDservice.deleteCRUDbyId(deleteId)
            .then(() => {
                res.redirect('/get-crud')
            })

        }else {
            res.send('id user not found')
        }

        
    }
      
}

module.exports = new HomeController;