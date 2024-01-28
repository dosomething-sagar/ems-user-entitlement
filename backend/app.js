
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./router/userRoutes');
const manageCity = require('./helper/managecity');
const manageAssembly = require('./helper/manageAssembly');
const manageParliament = require('./helper/manageParliament');
const manageStates = require('./helper/manageStates');
const service= require('./helper/service');
const userManage =require('./helper/userManage')
const manageAddress =require('./helper/manageAddress')
const manageLogins =require('./helper/Login')

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: '*', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


app.use('/api/user', userRoutes);
app.use('/api/cities', manageCity);
app.use('/api/assemblies', manageAssembly);
app.use('/api/parliaments',manageParliament)
app.use('/api/states',manageStates)
app.use('/api/address',manageAddress)
app.use('/api/user_logins',manageLogins)
app.use('/api/user_profile',userManage)
app.use('/service',service);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
