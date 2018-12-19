import helpers from '../helpers';
import queries from '../queries';
import config from '../indexConfig';

const { gamesConfig } = config;

class AllGames {
    init() {
        helpers.sendRequest('/api', queries.getAllGames())
            .then(data => this.appendHTML(data.data.getGames))
            .then(context => this.appendTableBody(context))
            .then(() => this.saveVariables())
            .then(() => this.addEvents())
            .catch(err => console.log(err));
    }

    addEvents() {
        this.tBody.addEventListener('click', e => this.onTBodyClick(e));
    }

    saveVariables() {
        this.table = document.getElementsByClassName('games-table')[0];
        this.tBody = document.getElementsByClassName('games-table_body')[0];
        this.tHead = document.getElementsByClassName('games-table_header')[0];
    }

    onTBodyClick(e) {
        e.preventDefault();
        if (e.target.classList.contains(config.borrowGame)) {
            console.log(e.target);
        }
    }

    appendHTML(context) {
        document.getElementsByClassName('games-mainContent')[0].innerHTML = this.generateHTML();
        return Promise.resolve(context);
    }

    appendTableBody(context) {
        let content = '';
        context.forEach((game) => {
            content += `<tr class="games-table_row">
                            <td class="games-table_cell">${game.TITLE}</td>
                            <td class="games-table_cell">${game.CATEGORY.join(', ')}</td>
                            <td class="games-table_cell">${game.NUMBER_OF_PLAYERS}</td>
                            <td class="games-table_cell">${game.AVAILABILITY ? 'TAK' : 'NIE'}</td>
                            <td class="games-table_cell">`;

            if (game.AVAILABILITY) {
                content += `<a href="#" class="games-table_link ${config.borrowGame}">Wypożycz</a>`;
            } else {
                content += '<a href="#" class="games-table_link games-table_link--disabled">Wypożycz</a>';
            }

            content += `</td>
                        </tr>`;
        });
        document.getElementsByClassName(gamesConfig.gamesTableBody)[0].innerHTML = content;
    }

    generateHTML() {
        const beginning = `<h2 class="section-header">Gry</h2>
            <div class="games-content">
                <table class="games-table">
                    <thead class="games-table_header">
                    <tr class="games-table_row">
                        <th class="games-table_cell">Tytuł</th>
                        <th class="games-table_cell">Kategoria</th>
                        <th class="games-table_cell">Liczba graczy</th>
                        <th class="games-table_cell">Dostępność</th>
                        <th class="games-table_cell">Akcja</th>
                    </tr>
                    </thead>
                    <tbody class="games-table_body">`,

            ending = `               
                    </tbody>
                </table>
            </div>`;

        return beginning + ending;
    }
}

export default new AllGames();