import helpers from '../helpers';
import queries from '../queries';

class AllGames {
    init(context) {
        this.determineContext(context)
            .then(data => this.appendHTML(data.data.getGames))
            .then(() => {
                this.addEvents();
            })
            .catch(err => console.log(err));
    }

    determineContext(context) {
        if (context) {
            return Promise.resolve(context);
        }
        return helpers.sendRequest('/api', queries.getAllGames());
    }

    addEvents() {

    }


    appendHTML(context) {
        document.getElementsByClassName('games-mainContent')[0].innerHTML = AllGames.generateHTML(context);
        return Promise.resolve();
    }

    static generateHTML(context) {
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
            </div>`,

            body = (() => {
                let content = '';
                context.forEach((game) => {
                    content += `<tr class="games-table_row">
                            <td class="games-table_cell">${game.TITLE}</td>
                            <td class="games-table_cell">${game.CATEGORY.join(', ')}</td>
                            <td class="games-table_cell">${game.NUMBER_OF_PLAYERS}</td>
                            <td class="games-table_cell">${game.AVAILABILITY ? 'TAK' : 'NIE'}</td>
                            <td class="games-table_cell">Wypożycz</td>
                        </tr>`;
                });
                return content;
            })();

        return beginning + body + ending;
    }
}

export default new AllGames();