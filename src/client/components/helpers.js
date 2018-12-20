const helpers = {
    toggleClass(obj1, obj2, className) {
        obj1.classList.remove(className);
        obj2.classList.add(className);
        return obj2;
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
};

export default helpers;