import { Router } from 'express';
import config from '../config/config';

const logoutRouter = Router(),
    { serverConfig } = config;

logoutRouter.post('/', (req, res) => {
    res.cookie(
        Buffer.from(serverConfig.cookieName)
            .toString('base64'), '',
        { signed: true },
    );
    res.send('{}');
});

export default logoutRouter;