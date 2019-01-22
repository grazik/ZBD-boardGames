import queries from '../queries';
import config from '../loginConfig';
import helpers from '../helpers';

const { loginConfig } = config;
import { ConfigOverlay } from '../configOverlay/configOverlay';

class LoginPage {
    constructor() {
        this.content = document.getElementsByClassName(loginConfig.contentClass)[0];
        this.error = false;
        this.inputFields = [].slice.call(document.getElementsByClassName(loginConfig.formInputClass));
        this.loginButton = document.getElementsByClassName(loginConfig.formSignInClass)[0];
        this.signInButton = document.getElementsByClassName(loginConfig.createAccount)[0];
    }

    init() {
        this.addEvents();
    }

    addEvents() {
        this.loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.validateInputs()) {
                helpers.sendRequest(loginConfig.loginUrl, queries.validateUser(this.inputFields[0].value, btoa(this.inputFields[1].value)))
                    .then((res) => {
                        if (!res.data.validate) {
                            this.addErrorMsg();
                        } else {
                            window.location.replace('/');
                        }
                    })
                    .catch(err => console.log(err));
            }
        });

        this.signInButton.addEventListener('click', (e) => {
            e.preventDefault();
            const configOverlay = new ConfigOverlay('new', 'user', null);
        });
    }

    validateInputs() {
        return !this.inputFields.map((input) => {
            if (!input.value) {
                input.classList.add('content-form_input--invalid');
                return false;
            }
            input.classList.remove('content-form_input--invalid');
            return true;
        })
            .filter(value => !value).length;
    }

    addErrorMsg() {
        if (!this.error) {
            const content = document.createElement('div');
            content.innerHTML = loginConfig.errorMsg.content;
            this.error = content.firstChild;
            this.content.prepend(this.error);
            this.addErrorClose();
        }
    }

    addErrorClose() {
        this.error.addEventListener('click', (e) => {
            if (e.target.classList.contains(loginConfig.errorMsg.closeClass)) {
                this.error.classList.add(loginConfig.removingClass);
                setTimeout(() => {
                    this.error.remove();
                    this.error = null;
                }, 500);
            }
        });
    }
}

export default LoginPage;