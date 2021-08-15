// configurar Xpress
import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

const app = express();
app.set('pkg', pkg);//colocar un nombre y un valor a una variable
app.use(morgan('dev'));//muestra peticiones por consola

app.get('/', (req, res) => {
    res.json({
        author:app.get('pkg').author,
        description:app.get('pkg').description,
        version:app.get('pkg').version,
    });
})

export default app;