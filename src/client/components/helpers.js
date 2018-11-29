const helpers = {
    toggleClass(obj1, obj2, className) {
        obj1.classList.remove(className);
        obj2.classList.add(className);
        return obj2;
    },

    sendRequest(url, query) {
        return fetch(url, {
            credentials: 'same-origin',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(query),
        })
            .then(res => res.json());
    },
};

export default helpers;