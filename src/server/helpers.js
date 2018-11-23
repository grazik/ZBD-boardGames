import config from './config/config';

const
    { serverConfig } = config,
    helpers = {
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
    };

export default helpers;