const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./models/Patient');

const cors = require('cors'); 
const port = 3001;


const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual URL of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions)); // Use the cors middleware with options


app.use(bodyParser.json());

// Include your CRUD routes here
app.use('/api', require('./routes/patientRoutes'));

sequelize.sync({ force: false }) // Set force: true to recreate tables
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });
