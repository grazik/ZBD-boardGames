import { adminSidePanel } from './adminSidePanel';
import { adminGames } from './adminContent';
import config from '../indexConfig';

class AdminPanel {
    init() {
        this.appendHTML();
        adminSidePanel.init();
        adminGames.init();
    }

    appendHTML() {
        document.getElementsByClassName(config.mainContentClass)[0].innerHTML = this.generateHTML();
    }

    generateHTML() {
        return '<div class="admin"></div>';
    }
}

export default new AdminPanel();