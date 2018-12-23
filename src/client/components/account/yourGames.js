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
                document.getElementsByClassName('account-mainContent')[0].innerHTML = YourGames.generateHTML(data.data.getRentedGames);
            });
    }

    static generateHTML(context) {
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
            </div>`,

            body = (() => {
                let content = '';
                context.forEach((rentedGame) => {
                    const returned = rentedGame.GAME.AVAILABILITY;
                    content += `<tr class="account-table_row">
                                    <td class="account-table_cell">${rentedGame.GAME.TITLE}</td>
                                    <td class="account-table_cell">${rentedGame.RENT_DATE}</td>
                                    <td class="account-table_cell">${rentedGame.RETURN_DATE}</td>
                                    <td class="account-table_cell">${returned ? 'TAK' : 'NIE'}</td>
                                    <td class="account-table_cell">
                                    ${returned ? '<a href="#" class="account-table_link" data-action="rent">Wypożycz</a>' : '<a href="#" class="account-table_link" data-action="return">Zwróć</a>'}
                                    </td>
                                 </tr>`;
                });
                return content;
            })();

        return beginning + body + ending;
    }
}

export default new YourGames();