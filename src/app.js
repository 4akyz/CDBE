import express from 'express';
import productRouter from './routers/products'

const app = express();

//middleware
app.use(express.json());
app.use('/api', productRouter)

export const viteNodeApp = app;