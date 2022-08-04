

const homeRouter = require('./home')

const route = (app) => {
    app.use('/',homeRouter);
}
module.exports=route