import express from 'express';
import fetch from 'node-fetch';
import config from '../config/config';

const loginRouter = express.Router(),
    { serverConfig } = config,
    validateData = req => fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
    })
        .then(respond => respond.json()),

    sendLoginCookies = (data, res) => {
        res.cookie(
            Buffer.from(serverConfig.cookieName)
                .toString('base64'), Buffer.from(JSON.stringify({
                username: `${data.validate.USER_ID}`,
                employee: `${data.validate.EMPLOYEE}`,
            }))
                .toString('base64'),
            { signed: true },
        );
    },

    sendResponse = (data, req, res) => {
        if (data.validate) {
            sendLoginCookies(data, res);
            res.send(JSON.stringify({ data: { validate: true } }));
        } else {
            res.send(JSON.stringify({ data: { validate: false } }));
        }
    };

loginRouter.route('/')
    .get((req, res, next) => {
        req.url = '//../loginPage.html';
        next('route');
    })
    .post((req, res) => {
        validateData(req)
            .then(response => sendResponse(response.data, req, res))
            .catch(err => console.log(err));
    });

export default loginRouter;