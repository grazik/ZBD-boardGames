import helpers from '../helpers';
import config from '../indexConfig';
import queries from '../queries.js';
import allGames from './allGames';

const { gamesConfig } = config;

class GamesSidePanel {
    init() {
        this.appendHTML()
            .then(() => this.createVariables())
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

    updateTable() {
        const categories = this.options[gamesConfig.category].join(', '),
            availability = this.options[gamesConfig.availability].join(', '),
            min = this.options[gamesConfig.min].join(', '),
            max = this.options[gamesConfig.max].join(', ');

        helpers.sendRequest('/api', queries.getFilteredGames(categories, availability, min, max))
            .then(data => allGames.appendTableBody(data.data.getFilteredGames))
            .catch(err => console.log(err));
    }

    addEvents() {
        this.gamesFilters.addEventListener('change', (e) => {
            const { name } = e.target,
                { value } = e.target;
            if (name === gamesConfig.min || name === gamesConfig.max) {
                this.options[name] = [value];
            } else if (e.target.checked) {
                this.options[name].push(value);
            } else {
                this.options[name] = this.options[name].filter(elem => elem !== value);
            }
            this.updateTable();
        });
    }

    createVariables() {
        this.options = {};
        this.gamesFilters = document.getElementsByClassName(gamesConfig.gamesFiltersClass)[0];
        this.filterInputsClass = Array.prototype.slice.call(document.getElementsByClassName(gamesConfig.filterInputsClass));
        this.populateOptions();
        return Promise.resolve();
    }

    populateOptions() {
        this.filterInputsClass.forEach((inputContainer) => {
            Array.prototype.slice.call(inputContainer.querySelectorAll('input:checked'))
                .forEach((elem) => {
                    if (this.options[elem.name]) {
                        this.options[elem.name].push(elem.value);
                    } else {
                        this.options[elem.name] = [elem.value];
                    }
                });
        });
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
                        <input class="games-filters_input" type="checkbox" name="${gamesConfig.category}" value="${category.CATEGORY_ID}" checked>
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
            options = ['0', '1'];
        let content = '';

        options.forEach((option) => {
            content += `<label class="games-filters_label">
                        <input class="games-filters_input games-filters_input" type="checkbox" name="${gamesConfig.availability}" value="${option}" checked>
                        <span class="games-filters_checkmark"></span>
                        <span class="games-filters_labelValue">${option}</span>
                    </label>`;
        });

        return Promise.resolve(`${body}${content}</div>`);
    }

    generateNumberOfPlayersFilter() {
        const body = `<div class="games-filters_inputs games-filters_players">
                    <h3 class="games-header">Liczba graczy:</h3>`,
            options = [gamesConfig.min, gamesConfig.max],
            values = ['1', '2', '3', '4', '5', '6', '6+'];
        let content = '';

        options.forEach((option) => {
            content += `<div class="games-filters_column">
                            <h3 class=" games-header games-header--sub">${option}</h3>`;

            values.forEach((value) => {
                content += `<label class="games-filters_label">
                        <input class="games-filters_input games-filters_input--radio" type="radio" value="${value}" name="${option}"`;

                if ((option === gamesConfig.min && value === '1') || (option === gamesConfig.max && value === '6+')) {
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