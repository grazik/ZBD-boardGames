import helpers from '../helpers';
import config from '../indexConfig';
import queries from '../queries.js';

const { gamesConfig } = config;

class GamesSidePanel {
    init() {
        this.appendHTML()
            .then(() => this.saveDOMElements())
            .then(() => this.addEvents())
            .catch((err) => {
                console.log(err);
            });
    }

    appendHTML() {
        const account = document.getElementsByClassName('games')[0],
            newElement = document.createElement('div');

        return this.generateHTML()
            .then((html) => {
                newElement.innerHTML = html;
                account.prepend(newElement.firstChild);
                return Promise.resolve();
            });
    }

    addEvents() {
        this.categoriesFilterClass.addEventListener('change', (e) => {

        });
    }

    saveDOMElements() {
        this.categoriesFilterClass = document.getElementsByClassName(gamesConfig.categoriesFilterClass)[0];
        this.categoriesCheckboxes = Array.prototype.slice.call(this.categoriesFilterClass.getElementsByClassName(gamesConfig.categoriesCheckboxes));
        return Promise.resolve();
    }

    generateCategoryFilter() {
        const body = `<div class="games-filters_inputs games-filters_categories">
                    <h3 class="games-header">Kategorie:</h3>`;

        return helpers.sendRequest('/api', queries.getCategories())
            .then(({ data }) => {
                const { getCategories } = data;
                let content = '';

                getCategories.forEach((category) => {
                    content += `<label class="games-filters_label">
                        <input class="games-filters_input" type="checkbox" value="${category.CATEGORY_ID}" checked>
                        <span class="games-filters_checkmark"></span>
                        <span class="games-filters_labelValue">${category.NAME}</span>
                    </label>`;
                });

                return `${body}${content} </div>`;
            });
    }

    generateAvailabilityFilter() {
        const body = `<div class="games-filters_inputs games-filters_availability">
                    <h3 class="games-header">Dostępność:</h3>`,
            options = ['Tak', 'Nie'];
        let content = '';

        options.forEach((option) => {
            content += `<label class="games-filters_label">
                        <input class="games-filters_input games-filters_input" type="checkbox" value="${option}" checked>
                        <span class="games-filters_checkmark"></span>
                        <span class="games-filters_labelValue">${option}</span>
                    </label>`;
        });

        return Promise.resolve(`${body}${content}</div>`);
    }

    generateNumberOfPlayersFilter() {
        const body = `<div class="games-filters_inputs games-filters_players">
                    <h3 class="games-header">Liczba graczy:</h3>`,
            options = ['Min', 'Max'],
            values = ['1', '2', '3', '4', '5', '6', '6+'];
        let content = '';

        options.forEach((option) => {
            content += `<div class="games-filters_column">
                            <h3 class=" games-header games-header--sub">${option}</h3>`;

            values.forEach((value) => {
                content += `<label class="games-filters_label">
                        <input class="games-filters_input games-filters_input--radio" type="radio" value="${value}" name="${option}"`;

                if ((option === 'Min' && value === '1') || (option === 'Max' && value === '6+')) {
                    content += 'checked';
                }

                content += `>
                        <span class="games-filters_checkmark"></span>
                        <span class="games-filters_labelValue">${value}</span>
                    </label>`;
            });

            content += '</div>';
        });

        return Promise.resolve(`${body}${content}</div>`);
    }

    generateHTML() {
        const beginning = `<div class="games-sidePanel">
                <h3 class="section-header">Filtry</h3>
                <div class="games-filters">`,
            ending = `</div>
                </div>`,
            promises = [],
            parts = {};

        promises.push(this.generateCategoryFilter()
            .then((categories) => {
                parts.categories = categories;
                return Promise.resolve();
            }));

        promises.push(this.generateAvailabilityFilter()
            .then((availability) => {
                parts.availability = availability;
                return Promise.resolve();
            }));

        promises.push(this.generateNumberOfPlayersFilter()
            .then((numberOfPlayers) => {
                parts.numberOfPlayers = numberOfPlayers;
                return Promise.resolve();
            }));

        return Promise.all(promises)
            .then(() => beginning + parts.categories + parts.availability + parts.numberOfPlayers + ending);
    }
}

export default new GamesSidePanel();