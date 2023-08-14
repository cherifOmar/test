import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import { notFoundError, errorHandler } from './middlewares/error-handler.js';

import UsersRoutes from './routes/User.js'; //importer le router du fichier routes/game.js
import ProductsRoutes from './routes/Product.js'; 
import AuthRoutes from './routes/auth.js';
import RoleRoutes from './routes/Role.js';
import ReducUserRoutes from './routes/reducUser_route.js';

const app = express(); // creer l'instance de express a utiliser
const hostname = '127.0.0.1'; //l'@ du serveur
const port = process.env.PORT || 9090; //le port du serveur
const databaseName = 'Market';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/img', express.static('public/images'));



app.use('/product', ProductsRoutes);
app.use('/reducUser',ReducUserRoutes);
app.use('/user', UsersRoutes);
app.use('/role', RoleRoutes);
app.use('/api', AuthRoutes);
app.post('/user/api', (req,res) => {
  console.log(req.body);
  res.redirect('http://localhost:4200/userpages/dashboard')
  });
app.post('/user/confirm-user/:userId', (req,res) => {
 console.log(req.body);
 res.redirect('http://localhost:4200/auth/login')
});

  app.use(notFoundError);
  app.use(errorHandler);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

