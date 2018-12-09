import sidePanel from './accountSidePanel';
import yourAccount from './yourAccount';
import config from '../indexConfig';

class Account {
    init() {
        this.appendHTML();
        sidePanel.init();
        yourAccount.init();
    }

    appendHTML() {
        document.getElementsByClassName(config.mainContentClass)[0].innerHTML = this.generateHTML();
    }

    generateHTML() {
        return `<div class="account">
            <div class="account-mainContent"></div>
        </div>`;
    }
}

export default new Account();