import express from 'express';

const app = express();

//middleware
app.use(express.json());

app.get(`/products`, (req,res) => {
    console.log('GET /products');
})
app.get(`/products/:id`, (req,res) => {
    console.log("id",req.params.id);
    res.send("id= "+ req.params.id);
})
app.post(`/products`, (req,res) => {
    console.log(req.body);
})
app.put(`/products`, (req,res) => {
    console.log('GET /products');
})
app.delete(`/products`, (req,res) => {
    console.log('GET /products');
})

export const viteNodeApp = app;