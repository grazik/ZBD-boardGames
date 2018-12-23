import config from '../indexConfig';
import gamesSidePanel from './filters';
import allGames from './allGames';

class Games {
    init() {
        this.appendHTML();
        allGames.init();
        gamesSidePanel.init();
    }

    appendHTML() {
        document.getElementsByClassName(config.mainContentClass)[0].innerHTML = this.generateHTML();
    }

    generateHTML() {
        return `<div class="games">
            <div class="games-mainContent"></div>
        </div>`;
    }
}

export default new Games();