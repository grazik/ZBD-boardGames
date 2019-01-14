import { adminSidePanel } from './adminSidePanel';
import { adminContent } from './adminContent';
import config from '../indexConfig';

class AdminPanel {
    init() {
        this.appendHTML();
        adminSidePanel.init();
        adminContent.init();
    }

    appendHTML() {
        document.getElementsByClassName(config.mainContentClass)[0].innerHTML = this.generateHTML();
    }

    generateHTML() {
        return '<div class="admin"></div>';
    }
}

export default new AdminPanel();