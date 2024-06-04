import express from 'express';
import { createUser } from "../controller/User.controller.js";
import { SearchUser } from '../controller/User.controller.js';
const Users = express.Router();

Users.post('/users', createUser);

Users.get('/Myuser/:auth0_id', SearchUser)

export default Users;
