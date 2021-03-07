import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signIn.js';
import handleProfileGet from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgres',
      database : 'smart-brain'    
    }
});

console.log(db.select('*').from('users').then(data => {
    console.log(data);
}));

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {res.send(database.users)});
app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db, )});
app.put('/image', (req, res) => {handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {handleApiCall(req, res, db)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port 3000 ${process.env.PORT}`);
}); 