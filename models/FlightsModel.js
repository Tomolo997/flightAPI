const mongoose = require('mongoose');
const flightSchema = new mongoose.Schema(
  {
    from_flight: {
      type: String,
      required: [true, 'A tour must have a name '],
    },
    to_flight: {
      type: String,
      required: [true, 'A tour must have a name '],
    },
    from_date: {
      type: String,
    },
    to_date: {
      type: String,
    },
  },
  //options for schema
  //each time the JSON is send, the virtuals must be true
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Flights = mongoose.model('Flights', flightSchema);

module.exports = Flights;
