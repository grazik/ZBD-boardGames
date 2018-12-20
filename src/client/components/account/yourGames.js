import helpers from '../helpers';
import queries from '../queries';

class YourGames {
    init() {
        this.appendHTML()
            .then(() => {
                this.addEvents();
            })
            .catch(err => console.log(err));
    }

    addEvents() {

    }

    appendHTML() {
        return helpers.sendRequest('/api', queries.getUserGames())
            .then((data) => {
                document.getElementsByClassName('account-mainContent')[0].innerHTML = this.generateHTML(data.data.getRentedGames);
            })
            .catch(err => console.log(err));
    }

    generateRow(rentedGame) {
        let content = '';
        const returned = rentedGame.Returned;
        content += `<tr class="account-table_row">
                        <td class="account-table_cell">${rentedGame.GAME.TITLE}</td>
                        <td class="account-table_cell">${helpers.getDate(rentedGame.RENT_DATE)}</td>
                        <td class="account-table_cell">${helpers.getDate(rentedGame.RETURN_DATE)}</td>
                        <td class="account-table_cell">${returned ? 'TAK' : 'NIE'}</td>
                        <td class="account-table_cell">
                        ${returned ? '<a href="#" class="account-table_cell--link" data-action="rent">Wypożycz</a>' : '<a href="#" class="account-table_cell--link" data-action="return">Zwróć</a>'}
                        </td>
                     </tr>`;

        return content;
    }

    generateHTML(context) {
        const beginning = `<h2 class="section-header">Twoje Gry:</h2>
            <div class="account-content">
                <table class="account-table">
                    <thead class="account-table_header">
                    <tr class="account-table_row">
                        <th class="account-table_cell">Tytuł</th>
                        <th class="account-table_cell">Data wypożyczenia</th>
                        <th class="account-table_cell">Data zwrotu</th>
                        <th class="account-table_cell">Zwrócono</th>
                        <th class="account-table_cell">Akcja</th>
                    </tr>
                    </thead>
                    <tbody class="account-table_body">`,

            ending = `               
                    </tbody>
                </table>
            </div>`;

        let content = '';

        context.forEach((rentedGame) => {
            content += this.generateRow(rentedGame);
        });

        return beginning + content + ending;
    }
}

export default new YourGames();