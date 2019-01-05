import fs from 'fs';
import Handlebars from 'handlebars';
import fetch from 'node-fetch';
import config from './config/config';

const
    { serverConfig } = config,
    helpers = {
        sendRequest(url, query) {
            return fetch(url, {
                credentials: 'same-origin',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(query),
            })
                .then(res => res.json());
        },

        validateUser(req, res, next) {
            const cookies = req.signedCookies,
                cookie = cookies[Buffer.from(serverConfig.cookieName)
                    .toString('base64')];
            if (cookie) {
                const cookieDecoded = JSON.parse(Buffer.from(cookie, 'base64')
                    .toString('ascii'));
                res.locals.username = cookieDecoded.username;
                res.locals.employee = cookieDecoded.employee;
                next();
            } else {
                res.redirect('/login');
            }
        },

        addVariables(req, res, next) {
            const cookies = req.signedCookies,
                cookie = cookies[Buffer.from(serverConfig.cookieName)
                    .toString('base64')];
            if (cookie && req.body.variables) {
                const cookieDecoded = JSON.parse(Buffer.from(cookie, 'base64')
                    .toString('ascii'));
                req.body.variables.username = cookieDecoded.username;
            }
            next();
        },

        parseHbs(source, context) {
            const html = fs.readFileSync(source, 'utf-8'),
                template = Handlebars.compile(html);
            return template(context);
        },

        concatProperties(properties, verb = 'WHERE') {
            const arrayOfProperties = [];
            Object.keys(properties)
                .forEach((key) => {
                    arrayOfProperties.push(`${key}="${decodeURIComponent(properties[key])}"`);
                });
            console.log(arrayOfProperties.join(', '));

            return arrayOfProperties.length ? `${verb} ${arrayOfProperties.join(', ')}` : '';
        },
    };

export default helpers;