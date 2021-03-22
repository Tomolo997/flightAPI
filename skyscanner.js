//calling the skyscanner API
var unirest = require('unirest');

//from France to US
var req = unirest(
  'GET',

  'http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/FR/eur/en-US/LJU-sky/TFS-sky/2021/2021?apikey=prtl6749387986743898559646983194'
);
/*
/browsequotes/v1.0/{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
*/

/*/browseroutes/v1.0/{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}/{inboundPartialDate}
 */

// req.query({
//   shortapikey: 'ra66933236979928',
//   apiKey: '{shortapikey}',
// });

// req.headers({
//   'x-rapidapi-key': 'cb87a1d8e3msh720b35361aef2c4p108c3bjsn6a7e31b76186',
//   'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
//   useQueryString: true,
// });

req.end(function (res) {
  if (res.error) console.log(res.error);
  console.log(res.body);
});
