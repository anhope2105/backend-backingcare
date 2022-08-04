const express = require('express');
const morgan = require('morgan');
const route = require('./routes')
const viewEngineConfig = require('./config/viewEngine')
const connectDB = require('./config/connectDB')
const app = express();
var cors = require('cors')
app.use(cors({credentials: true, origin: true}))


const port = 8080;


connectDB();
app.use(express.json({limit:'50MB'})) // for parsing application/json
app.use(express.urlencoded({limit:'50MB', extended: true }))
// app.use(morgan('combined'));
route(app);
viewEngineConfig(app);

app.listen(port , () => {
    console.log('Listening to port ' + port)
})