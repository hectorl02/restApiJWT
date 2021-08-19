// configurar Xpress
import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import helmet from "helmet";
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { createRoles, createAdmin } from './libs/initialSetup';


const app = express();
createAdmin();
createRoles();
app.set('pkg', pkg);//colocar un nombre y un valor a una variable
app.use(morgan('dev'));//muestra peticiones por consola
app.use(express.json());
app.use(helmet());

app.get('/', (req, res) => {
    res.json({
        author:app.get('pkg').author,
        description:app.get('pkg').description,
        version:app.get('pkg').version,
    });
})

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

export default app;