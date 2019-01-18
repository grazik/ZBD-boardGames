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

    getDate(dateObject) {
        const date = new Date(Number(dateObject));
        return date.toLocaleDateString();
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

    returnGame(gameID) {
        return helpers.sendRequest('/api', queries.returnGame(gameID))
            .then(data => data.data.returnGame)
            .catch(err => console.log(err));
    },

    validateInput(target, invalidClass) {
        const { pattern } = target.dataset;

        if (target.value === '') {
            target.classList.add(invalidClass);
            return false;
        }

        if (pattern) {
            const regExp = new RegExp(pattern);
            if (!regExp.test(target.value)) {
                target.classList.add(invalidClass);
                return false;
            }
        }
        
        target.classList.remove(invalidClass);
        return true;
    },

    getNestedValue(obj, keys) {
        return keys.split('.')
            .reduce((value, key) => value[key], obj);
    },

    createNestedObject(obj, key, value) {
        const keys = key.split('.'),
            lastKey = keys.pop(),
            lastObject = keys.reduce((previousObject, currentKey) => {
                if (!previousObject[currentKey]) {
                    previousObject[currentKey] = {};
                }
                return previousObject[currentKey];
            }, obj);
        lastObject[lastKey] = value;
        return obj;
    },
};

export default helpers;