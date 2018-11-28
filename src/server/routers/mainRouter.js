import express from 'express';
import path from 'path';
import jsdom from 'jsdom';
import helpers from '../helpers';
import queries from '../queries';

const mainRouter = express.Router(),
    { JSDOM } = jsdom;

mainRouter.get('/', helpers.validateUser);
mainRouter.get('/index.html', helpers.validateUser);

mainRouter.get(['/', '/index.html'], (req, res) => {
    const promiseArray = [];
    let dom,
        html;

    promiseArray.push(helpers.sendRequest('http://localhost:3000/api', queries.getUser(res.locals.username))
        .then((data) => {
            html = helpers.parseHbs(path.resolve(__dirname, '../views', 'accountPage.hbs'), data.data.getUser);
        }));

    promiseArray.push(JSDOM.fromFile(path.resolve(__dirname, '../../../dist/client/index.html'), {})
        .then((result) => {
            dom = result;
        }));

    Promise.all(promiseArray)
        .then(() => {
            dom.window.document.getElementsByClassName('mainContent')[0].innerHTML = html;
            res.send(dom.serialize());
        })
        .catch(err => console.log(err));
});

export default mainRouter;