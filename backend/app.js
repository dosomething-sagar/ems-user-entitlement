
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./router/userRoutes');
const manageCity = require('./router/masterRoutes/managecity');
const manageAssembly = require('./router/masterRoutes/manageAssembly');
const manageParliament = require('./router/masterRoutes/manageParliament');
const manageStates = require('./router/masterRoutes/manageStates');
const service= require('./helper/service');
const manageAddress =require('./router/masterRoutes/manageAddress')
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
app.use('/service',service);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
