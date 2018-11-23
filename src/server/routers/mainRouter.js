import helpers from '../helpers';
import express from 'express';

const mainRouter = express.Router();

mainRouter.get('/', helpers.validateUser);
mainRouter.get('/index.html', helpers.validateUser);

export default mainRouter;