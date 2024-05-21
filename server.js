if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const invoiceRouter = require('./routes/invoice');
const userRouter = require('./routes/user');

const app = express();
const prisma = new PrismaClient();

// Enable CORS for all routes and origins
app.use(cors());

app.use(bodyParser.json());

app.use('/invoices', invoiceRouter);
app.use('/users', userRouter);

const startServer = async () => {
  try {
    await prisma.$connect();
    app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

startServer();
