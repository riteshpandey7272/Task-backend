const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/restro';

async function checkAndCreateDatabase() {
  try {
    await mongoose.connect(dbURI);

    const adminDb = mongoose.connection.db.admin();

    const dbs = await adminDb.listDatabases();
    const dbExists = dbs.databases.some(db => db.name === 'restro');

    if (!dbExists) {
      console.log('Database does not exist. MongoDB will create it implicitly when data is written.');
    } else {
      console.log('Database already exists.');
    }
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

checkAndCreateDatabase().then(() => {
}).catch(err => {
  console.error('Error in checkAndCreateDatabase:', err);
});

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
