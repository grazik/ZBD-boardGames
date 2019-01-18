import helpers from '../helpers';
import queries from '../queries';
import config from '../indexConfig';
import updatePopUp from '../updatePopUp/updatePopUp';
import { InfoOverlay } from '../infoOverlay/infoOverlay';

const { tableConfig } = config;

class YourGames {
    init() {
        this.appendHTML()
            .then(() => this.saveVariables())
            .then(() => this.updateTableBody())
            .then(() => this.addEvents())
            .catch(err => console.log(err));
    }

    saveVariables() {
        this.table = document.getElementsByClassName(tableConfig.tableClass)[0];
        this.tBody = document.getElementsByClassName(tableConfig.tableBodyClass)[0];
        this.tHead = document.getElementsByClassName(tableConfig.tableHeaderClass)[0];

        return Promise.resolve();
    }

    addEvents() {
        this.tBody.addEventListener('click', e => this.onTBodyClick(e));
    }

    onTBodyClick(e) {
        e.preventDefault();
        const { target } = e,
            parentRow = target.parentNode.parentNode;

        if (target.classList.contains(config.returnGame)) {
            this.clickEvent(parentRow, helpers.returnGame, 'Udało się zwrócić grę', 'Wystąpił błąd przy próbie zwrócenia gry')
                .then(() => this.updateTableBody())
                .catch(err => console.log(err));
        } else if (target.classList.contains(config.rentGame)) {
            this.clickEvent(parentRow, helpers.rentGame, 'Udało się wypożyczyc grę', 'Wystąpił problem przy wypożyczeniu')
                .then(() => this.updateTableBody())
                .catch(err => console.log(err));
        } else if (target.classList.contains(config.gameInfo)) {
            this.createInfoOverlay(parentRow);
        }
    }

    createInfoOverlay(parentRow) {
        const gameID = parentRow.dataset[config.gameIDAtr];
        helpers.sendRequest('/api', queries.getGame(gameID))
            .then(data => new InfoOverlay(data.data.getGame, this.updateTableBody.bind(this)));
    }

    clickEvent(parentRow, fn, success, failure) {
        const gameID = parentRow.dataset[config.gameIDAtr];
        return fn(gameID)
            .then((result) => {
                if (result) {
                    updatePopUp.init('Sukces', success, true);
                } else {
                    updatePopUp.init('Porażka', failure, false);
                }
                return Promise.resolve();
            });
    }

    appendHTML() {
        document.getElementsByClassName('account-mainContent')[0].innerHTML = this.generateHTML();
        return Promise.resolve();
    }

    generateBodyRow(rentedGame) {
        let content = '';
        const { GAME } = rentedGame;
        content += `<tr class="table_row" data-${config.gameIDAtr}="${GAME.GAME_ID}">
                        <td class="table_cell">
                            <a href="#" class="table_link ${config.gameInfo}">${GAME.TITLE}</a>  
                        </td>
                        <td class="table_cell">${helpers.getDate(rentedGame.RENT_DATE)}</td>
                        <td class="table_cell">${helpers.getDate(rentedGame.RETURN_DATE)}</td>
                        <td class="table_cell">${rentedGame.Returned ? 'TAK' : 'NIE'}</td>
                        <td class="table_cell">`;

        if (!rentedGame.Returned) {
            content += `<a href="#" class="table_link ${config.returnGame}">Zwróć</a>`;
        } else if (GAME.AVAILABILITY) {
            content += `<a href="#"  class="table_link ${config.rentGame}">Wypożycz</a>`;
        } else {
            content += '<span class="table_link table_link--disabled">Wypożycz</span>';
        }

        content += `</td>
                     </tr>`;

        return content;
    }

    generateHTML() {
        return `<h2 class="section-header">Twoje Gry:</h2>
            <div class="account-content">
                <table class="table">
                    <thead class="table_header">
                    <tr class="table_row">
                        <th class="table_cell">Tytuł</th>
                        <th class="table_cell">Data wypożyczenia</th>
                        <th class="table_cell">Data zwrotu</th>
                        <th class="table_cell">Zwrócono</th>
                        <th class="table_cell">Akcja</th>
                    </tr>
                    </thead>
                    <tbody class="table_body">             
                    </tbody>
                </table>
            </div>`;
    }

    updateTableBody() {
        let content = '';
        return helpers.sendRequest('/api', queries.getUserGames())
            .then((data) => {
                if (data.data) {
                    data.data.getRentedGames.forEach((game) => {
                        content += this.generateBodyRow(game);
                    });
                }
                this.tBody.innerHTML = content;
            });
    }
}

export default new YourGames();