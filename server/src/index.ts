import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import usersRouter from './routes/user.routes';
import orderRouter from './routes/order.routes'
import categoryRouter from './routes/category.routes'
import productRouter from './routes/product.routes'

import path from "path"
import buyRouter from './routes/buy.routes'

import dotenv from 'dotenv';
dotenv.config();

export const prisma = new PrismaClient();

const server = express();
const port = process.env.PORT;
const publicPath = path.join(__dirname, '..','./react');

server.use(express.static(publicPath));
server.use(express.static("*/"));


server.use(express.json());
server.use(cors());

server.use('/user', usersRouter);
server.use('/category', categoryRouter);
server.use('/product', productRouter);
server.use('/order', orderRouter);
server.use('/buy', buyRouter);

server.get('*', (req, res) => {    
	res.sendFile(path.join(publicPath, 'index.html')), function(err: any) {             
	if (err) {                 
		 res.status(500).send(err) 
		 }        
	};
});


server.listen(port, () => {
	console.log(port);
});