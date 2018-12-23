import helpers from '../helpers';
import queries from '../queries';
import config from '../indexConfig';
import updatePopUp from '../updatePopUp/updatePopUp';

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
        const { target } = e;
        if (target.classList.contains(config.returnGame)) {
            this.returnGameEvent(target)
                .then(() => this.updateTableBody())
                .catch(err => console.log(err));
        } else if (target.classList.contains(config.rentGame)) {
            this.rentGameEvent(target)
                .then(() => this.updateTableBody())
                .catch(err => console.log(err));
        }
    }

    returnGameEvent(target) {
        const gameID = target.dataset[config.gameIDAtr];
        return helpers.returnGame(gameID)
            .then((result) => {
                if (result) {
                    updatePopUp.init('Sukces', 'Udalo się zwrócić gre!', true);
                } else {
                    updatePopUp.init('Porażka', 'Wystąpił problem przy zwrocie', false);
                }
                return Promise.resolve();
            });
    }

    rentGameEvent(target) {
        const gameID = target.dataset[config.gameIDAtr];
        return helpers.rentGame(gameID)
            .then((result) => {
                if (result) {
                    updatePopUp.init('Sukces', 'Udalo się wypożyczyć gre!', true);
                } else {
                    updatePopUp.init('Porażka', 'Wystąpił problem przy wypożyczeniu', false);
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
        content += `<tr class="table_row">
                        <td class="table_cell">${GAME.TITLE}</td>
                        <td class="table_cell">${helpers.getDate(rentedGame.RENT_DATE)}</td>
                        <td class="table_cell">${helpers.getDate(rentedGame.RETURN_DATE)}</td>
                        <td class="table_cell">${rentedGame.Returned ? 'TAK' : 'NIE'}</td>
                        <td class="table_cell">`;

        if (!rentedGame.Returned) {
            content += `<a href="#" class="table_link ${config.returnGame}" data-${config.gameIDAtr}="${GAME.GAME_ID}">Zwróć</a>`;
        } else if (GAME.AVAILABILITY) {
            content += `<a href="#" data-${config.gameIDAtr}="${GAME.GAME_ID}" class="table_link ${config.rentGame}">Wypożycz</a>`;
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
                data.data.getRentedGames.forEach((game) => {
                    content += this.generateBodyRow(game);
                });
                this.tBody.innerHTML = content;
            });
    }
}

export default new YourGames();