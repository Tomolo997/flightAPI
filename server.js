const dotenv = require('dotenv');
const fetch = require('node-fetch');
var cors = require('cors');
const mongoose = require('mongoose');
var unirest = require('unirest');
//from France to US
const express = require('express');
const app = express();

app.use(cors());
dotenv.config({ path: './config.env' });
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
  var response = await unirest(
    'GET',
    'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/FR/eur/en-US/ZAG-sky/DPS-sky/2021/2021?apikey=prtl6749387986743898559646983194'
  );
  res.status(200).json({
    status: 'success',
    link: `https://www.skyscanner.net/transport/flights/ZAG/DPS/21/21/`,
    data: {
      data: response.body.Quotes,
    },
  });
});

//start Server2021-03
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app running on prt' + port);
});
