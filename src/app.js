// configurar Xpress
import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import productsRoutes from './routes/products.routes';

const app = express();
app.set('pkg', pkg);//colocar un nombre y un valor a una variable
app.use(morgan('dev'));//muestra peticiones por consola
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        author:app.get('pkg').author,
        description:app.get('pkg').description,
        version:app.get('pkg').version,
    });
})

app.use('/products',productsRoutes);

export default app;