import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import usersRouter from './routes/user.routes';
import orderRouter from './routes/order.routes'
import buyRouter from './routes/buy.routes'

import dotenv from 'dotenv';
dotenv.config();

export const prisma = new PrismaClient();

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors());

server.use('/user', usersRouter);
server.use('/order', orderRouter);
server.use('/buy', buyRouter);


server.listen(port, () => {
	console.log(`Running on http://localhost:${port}`);
});