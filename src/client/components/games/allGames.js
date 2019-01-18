import helpers from '../helpers';
import queries from '../queries';
import config from '../indexConfig';
import updatePopUp from '../updatePopUp/updatePopUp';
import filters from './filters';
import { InfoOverlay } from '../infoOverlay/infoOverlay';

const { gamesConfig, tableConfig } = config;

class AllGames {
    init() {
        helpers.sendRequest('/api', queries.getAllGames())
            .then(data => this.appendHTML(data.data.getGames))
            .then(context => this.saveVariables(context))
            .then(context => this.updateTableBody(context))
            .then(() => this.addEvents())
            .catch(err => console.log(err));
    }

    addEvents() {
        this.tBody.addEventListener('click', e => this.onTBodyClick(e));
    }

    saveVariables(context) {
        this.table = document.getElementsByClassName(tableConfig.tableClass)[0];
        this.tBody = document.getElementsByClassName(tableConfig.tableBodyClass)[0];
        this.tHead = document.getElementsByClassName(tableConfig.tableHeaderClass)[0];

        return context;
    }

    onTBodyClick(e) {
        e.preventDefault();
        const { target } = e,
            parentRow = target.parentNode.parentNode;
        if (target.classList.contains(config.rentGame)) {
            this.rentGameEvent(parentRow);
        } else if (target.classList.contains(config.gameInfo)) {
            this.createInfoOverlay(parentRow);
        }
    }

    createInfoOverlay(parentRow) {
        const gameID = parentRow.dataset[config.gameIDAtr];
        helpers.sendRequest('/api', queries.getGame(gameID))
            .then(data => new InfoOverlay(data.data.getGame, this.updateRow.bind(this, parentRow, gameID)));
    }

    rentGameEvent(parentRow) {
        const gameID = parentRow.dataset[config.gameIDAtr];
        helpers.rentGame(gameID)
            .then((result) => {
                if (result) {
                    updatePopUp.init('Sukces', 'Udalo się wypożyczyć gre!', true);
                } else {
                    updatePopUp.init('Porażka', 'Wystąpił problem przy wypożyczeniu', false);
                }
                return Promise.resolve();
            })
            .then(() => {
                this.updateRow(parentRow, gameID);
            });
    }

    updateRow(parentRow, gameID) {
        if (filters.options[gamesConfig.availability].indexOf('0') + 1) {
            return helpers.sendRequest('/api', queries.getGame(gameID))
                .then((data) => {
                    helpers.replaceChild(this.tBody, parentRow, this.generateBodyRow(data.data.getGame), 'tbody');
                    return Promise.resolve();
                });
        }
        this.tBody.removeChild(parentRow);
        return Promise.resolve();
    }


    appendHTML(context) {
        document.getElementsByClassName('games-mainContent')[0].innerHTML = this.generateHTML();
        return context;
    }

    generateBodyRow(game) {
        let content = '';

        content += `<tr class="table_row" data-${config.gameIDAtr}="${game.GAME_ID}" >
                            <td class="table_cell">
                                <a href="#" class="table_link ${config.gameInfo}"> ${decodeURIComponent(game.TITLE)}</a>  
                            </td>
                            <td class="table_cell">${decodeURIComponent(game.CATEGORY.join(', '))}</td>
                            <td class="table_cell">${decodeURIComponent(game.NUMBER_OF_PLAYERS)}</td>
                            <td class="table_cell">${game.AVAILABILITY ? 'TAK' : 'NIE'}</td>
                            <td class="table_cell">`;

        if (game.AVAILABILITY) {
            content += `<a href="#" class="table_link ${config.rentGame}">Wypożycz</a>`;
        } else {
            content += '<span class="table_link table_link--disabled">Wypożycz</span>';
        }

        content += `</td>
               </tr>`;

        return content;
    }

    updateTableBody(context) {
        let content = '';
        context.forEach((game) => {
            content += this.generateBodyRow(game);
        });
        this.tBody.innerHTML = content;
    }

    generateHTML() {
        return `<h2 class="section-header">Gry</h2>
            <div class="games-content">
                <table class="table">
                    <thead class="table_header">
                    <tr class="table_row">
                        <th class="table_cell">Tytuł</th>
                        <th class="table_cell">Kategoria</th>
                        <th class="table_cell">Liczba graczy</th>
                        <th class="table_cell">Dostępność</th>
                        <th class="table_cell">Akcja</th>
                    </tr>
                    </thead>
                    <tbody class="table_body">               
                    </tbody>
                </table>
            </div>`;
    }
}

export default new AllGames();