import helpers from '../helpers';

class Logout {
    init() {
        helpers.sendRequest('/logout', {})
            .then(() => location.reload());
        console.log('Logout');
    }
}

export default new Logout();