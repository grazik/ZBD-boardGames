import express from 'express';
import helpers from '../helpers';

const mainRouter = express.Router();

mainRouter.get('/', helpers.validateUser);
mainRouter.get('/index.html', helpers.validateUser);

export default mainRouter;