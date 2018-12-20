import queries from './queries';
import config from './indexConfig';

const helpers = {
    moveClass(obj1, obj2, className) {
        obj1.classList.remove(className);
        obj2.classList.add(className);
        return obj2;
    },

    toggleClass(obj, className) {
        if (obj.classList.contains(className)) {
            obj.classList.remove(className);
        } else {
            obj.classList.add(className);
        }
    },

    sendRequest(url, body) {
        return fetch(url, {
            credentials: 'same-origin',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then(res => res.json());
    },

    replaceChild(parentElem, oldElem, html, tag = 'div') {
        let newElemContent = '';
        const newElem = document.createElement(tag);
        newElem.innerHTML = html;
        newElemContent = newElem.firstChild;

        if (oldElem.parentNode === parentElem) {
            parentElem.replaceChild(newElemContent, oldElem);
        }

        return newElemContent;
    },

    rentGame(gameID) {
        return helpers.sendRequest('/api', queries.rentGame(gameID))
            .then(data => data.data.rentGame)
            .catch(err => console.log(err));
    },
};

export default helpers;