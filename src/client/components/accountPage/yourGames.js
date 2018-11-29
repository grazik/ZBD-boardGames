class YourGames {
    init() {
        this.appendHTML();
        this.addEvents();
    }

    addEvents() {

    }

    appendHTML() {
        document.getElementsByClassName('account-mainContent')[0].innerHTML = this.generateHTML();
    }

    generateHTML() {
        return `<h2 class="section-header">Twoje Gry:</h2>
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
                    <tbody class="account-table_body">
                    <tr class="account-table_row">
                        <td class="account-table_cell">NEUROSHIMA HEX 3.0</td>
                        <td class="account-table_cell">2018-08-24</td>
                        <td class="account-table_cell">2018-09-06</td>
                        <td class="account-table_cell">TAK</td>
                        <td class="account-table_cell">
                            <a href="#" class="account-table_cell--link" data-action="rent">Wypozycz</a>
                        </td>
                    </tr>
                    <tr class="account-table_row">
                        <td class="account-table_cell">TAJNIACY</td>
                        <td class="account-table_cell">2018-11-25</td>
                        <td class="account-table_cell">2018-12-20</td>
                        <td class="account-table_cell">NIE</td>
                        <td class="account-table_cell">
                            <a href="#" class="account-table_cell--link" data-action="return">Zwroc</a>
                        </td>
                    </tr>
                    <tr class="account-table_row">
                        <td class="account-table_cell">NEUROSHIMA HEX 3.0</td>
                        <td class="account-table_cell">2018-08-24</td>
                        <td class="account-table_cell">2018-09-06</td>
                        <td class="account-table_cell">TAK</td>
                        <td class="account-table_cell">
                            <a href="#" class="account-table_cell--link" data-action="rent">Wypozycz</a>
                        </td>
                    </tr>
                    <tr class="account-table_row">
                        <td class="account-table_cell">TAJNIACY</td>
                        <td class="account-table_cell">2018-11-25</td>
                        <td class="account-table_cell">2018-12-20</td>
                        <td class="account-table_cell">NIE</td>
                        <td class="account-table_cell">
                            <a href="#" class="account-table_cell--link" data-action="return">Zwroc</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>`;
    }
}

export default new YourGames();