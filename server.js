const dotenv = require('dotenv');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
var unirest = require('unirest');
//from France to US

dotenv.config({ path: './config.env' });
const express = require('express');
const app = express();
//connect the mongodb
const url = 'mongodb://127.0.0.1:27017/airline-cheap-flights';
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB collection succesful');
  });

//routes
app.get('/', async (req, res) => {
  var request = await unirest(
    'GET',
    'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/FR/eur/en-US/VCE-sky/PMO-sky/2021/2021?apikey=prtl6749387986743898559646983194'
  );
  res.status(200).json({
    status: 'success',
    data: {
      data: request,
    },
  });
  console.log(response);
});

//start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app running on prt' + port);
});
