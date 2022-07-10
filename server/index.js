import express from 'express';
import mongoose from 'mongoose';

import shareRoutes from './routes/share-routes.js';
import HttpError from './models/http-error.js';

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');

  next();
});

app.use('/api/share/', shareRoutes);

//not found
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

//error handling middleware
app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occurred!',
  });
});

mongoose
  .connect(process.env.DB_ADDRESS || '')
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));