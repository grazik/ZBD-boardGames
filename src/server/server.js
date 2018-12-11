import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import helpers from './helpers';
import mainRouter from './routers/mainRouter';
import graphQLRouter from './api/graphQL';

const app = express();

app.use(cookieParser('Monia<3Grazia'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);

app.post('/api', helpers.addVariables);

graphQLRouter.applyMiddleware({
    app,
    path: '/api',
});

app.use(express.static(path.resolve(__dirname, '../../dist/client')));

app.get('*', (req, res) => {
    res.redirect('/');
});

export default app;