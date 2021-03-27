const dotenv = require('dotenv');
const mongoose = require('mongoose');
//connect the mongodb

//read JSON file
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB ul');
  });
//import data to database
const importDataCountryToCountry = async () => {
  try {
    await Tour.create(tours);
    console.log('data succesfuly loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data succesfuly deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
