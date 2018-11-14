import express from 'express';
import path from 'path';
import graphQLRouter from './api/graphQL';

const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist/client')));

graphQLRouter.applyMiddleware({ app });

export default app;