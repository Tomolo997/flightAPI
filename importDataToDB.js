const dotenv = require('dotenv');
const mongoose = require('mongoose');
//connect the mongodb

//read JSON file
const tours = JSON.parse(
  fs.readFileSync(__dirname + '/tours-simple.json', 'utf-8')
);
//import data to database
const importData = async () => {
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
