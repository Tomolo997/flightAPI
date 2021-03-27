const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
var cors = require('cors');

//require different files
const TranfromDateToSuitableLink = require('./utils/tranfromDate');
const Flights = require('./models/FlightsModel');
// create application/json parser
const mongoose = require('mongoose');
var unirest = require('unirest');
//from France to US
//express app
const express = require('express');
const app = express();

//Express middleware
app.use(express.json());
app.use(cors());

//mongoose connection of DATABASE
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB collection succesful');
  });

//routes
app.get('/country-to-country', async (req, res) => {
  const { from, to } = req.body;
  var response = await unirest(
    'GET',
    `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${from}/${to}/anytime/anytime?apikey=prtl6749387986743898559646983194`
  );

  //get first data
  const OutboundLegFromFirst = await TranfromDateToSuitableLink(
    response.body.Quotes[0].OutboundLeg.DepartureDate
  );
  const InboundLegFromFirst = await TranfromDateToSuitableLink(
    response.body.Quotes[0].InboundLeg.DepartureDate
  );
  //2021-05-06T00:00:00
  //function to transform date to suit the skyscanner api 2021-11-12 211112
  console.log(TranfromDateToSuitableLink(OutboundLegFromFirst));
  console.log(typeof OutboundLegFromFirst, InboundLegFromFirst);

  const destinationFrom = await response.body.Quotes[0].OutboundLeg.OriginId;
  const destinationTo = await response.body.Quotes[0].OutboundLeg.DestinationId;
  const findDestinatonFrom = response.body.Places.find(
    (el) => el.PlaceId === destinationFrom
  );
  const findDestinatonTo = response.body.Places.find(
    (el) => el.PlaceId === destinationTo
  );
  console.log(findDestinatonFrom);
  res.status(200).json({
    status: 'success',
    link: `https://www.skyscanner.net/transport/flights/${findDestinatonFrom.SkyscannerCode}/${findDestinatonTo.SkyscannerCode}/${OutboundLegFromFirst}/${InboundLegFromFirst}/`,
    data: {
      data: response.body,
    },
  });
});

app.get('/city-to-anywhere', async (req, res) => {
  const { from, to } = req.body;
  console.log(req.body);
  var response = await unirest(
    'GET',
    `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/SL/eur/en-US/${from}/${to}/2021/2021?apikey=prtl6749387986743898559646983194`
  );

  //get first data
  const OutboundLegFromFirst = await TranfromDateToSuitableLink(
    response.body.Quotes[0].OutboundLeg.DepartureDate
  );
  const InboundLegFromFirst = await TranfromDateToSuitableLink(
    response.body.Quotes[0].InboundLeg.DepartureDate
  );
  //2021-05-06T00:00:00
  //function to transform date to suit the skyscanner api 2021-11-12 211112
  console.log(TranfromDateToSuitableLink(OutboundLegFromFirst));
  console.log(typeof OutboundLegFromFirst, InboundLegFromFirst);

  const destinationFrom = await response.body.Quotes[0].OutboundLeg.OriginId;
  const destinationTo = await response.body.Quotes[0].OutboundLeg.DestinationId;
  const findDestinatonFrom = response.body.Places.find(
    (el) => el.PlaceId === destinationFrom
  );
  const findDestinatonTo = response.body.Places.find(
    (el) => el.PlaceId === destinationTo
  );
  console.log(findDestinatonFrom);
  res.status(200).json({
    status: 'success',
    link: `https://www.skyscanner.net/transport/flights/${findDestinatonFrom.SkyscannerCode}/${findDestinatonTo.SkyscannerCode}/${OutboundLegFromFirst}/${InboundLegFromFirst}/`,
    data: {
      data: response.body,
    },
  });
});

app.post('/addFlight', async (req, res) => {
  //create a new user with this statisics => zag,mia,from_date,to_date
  const newFlight = await Flights.create(req.body);

  res.status(200).json({
    status: 'success',
    flight: newFlight,
  });
});

//start Server2021-03
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app running on prt' + port);
});
