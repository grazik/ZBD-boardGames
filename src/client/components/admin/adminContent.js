import helpers from '../helpers';
import config from '../indexConfig';
import queries from '../queries';
import updatePopUp from '../updatePopUp/updatePopUp';
import { ConfigOverlay } from '../configOverlay/configOverlay';

const { adminConfig } = config;

class AdminGames {
    init() {
        helpers.sendRequest('/api', queries.getAllGames())
            .then(({ data }) => data.getGames)
            .then(context => this.createHTML(context, adminConfig.games))
            .then(() => this.addEvents(adminConfig.games))
            .catch(err => console.log(err));
    }

    reinit(configKey) {
        const configObj = adminConfig[configKey],
            { query, queryResult } = configObj.queries.getAll;

        helpers.sendRequest('/api', queries[query]())
            .then(({ data }) => data[queryResult])
            .then(context => this.regenerateHTML(configObj, context))
            .then(() => this.addEvents(configObj))
            .catch(err => console.log(err));
    }

    addEvents(configObj) {
        this.tBody.addEventListener('click', e => this.onTbodyClick(e, configObj));
        if (this.buttonsContaier) {
            this.buttonsContaier.addEventListener('click', e => this.onButtonClick(e, configObj));
        }
    }

    onButtonClick(e, { configOverlayKey }) {
        e.preventDefault();
        const { target } = e;
        if (target.classList.contains(adminConfig.buttonClass)) {
            const configOverlay = new ConfigOverlay('new', configOverlayKey);
        }
    }

    onTbodyClick(e, configObj) {
        e.preventDefault();

        const { target } = e,
            parentRow = target.parentNode.parentNode.parentNode.parentNode,
            { id } = parentRow.dataset;
        if (target.classList.contains(config.deleteElem)) {
            this.deleteElem(configObj.queries.deleteOne, id)
                .then(() => this.changeRow(parentRow, id, configObj));
        } else if (target.classList.contains(config.editElem)) {
            const configOverlay = new ConfigOverlay('edit', configObj.configOverlayKey, this.changeRow.bind(this, parentRow, id, configObj), id);
        }
    }

    deleteElem({ query, queryResult }, id) {
        return helpers.sendRequest('/api', queries[query](id))
            .then(({ data }) => {
                const result = data[queryResult];
                if (result) {
                    updatePopUp.init('Sukces', 'Udało się usunąć rekord', true);
                } else {
                    updatePopUp.init('Błąd', 'Wystąpił błąd przy próbie usunięcia', false);
                }
            })
            .catch(err => console.log(err));
    }

    changeRow(row, id, configObject) {
        const { query, queryResult } = configObject.queries.getOne;

        return helpers.sendRequest('/api', queries[query](id))
            .then(({ data }) => data[queryResult])
            .then((result) => {
                if (result) {
                    const newRow = this.generateRow(result, configObject);
                    this.tBody.replaceChild(newRow, row);
                } else {
                    row.remove();
                }
            });
    }

    regenerateHTML(configObject, context) {
        const newTable = this.generateTable(context, configObject);
        this.header.innerText = configObject.header;
        this.content.replaceChild(newTable, this.table);

        if (configObject.button && this.buttonsContaier) {
            const newButtonContainer = this.generateButtons(configObject.button);
            this.content.replaceChild(newButtonContainer, this.buttonsContaier);
            this.buttonsContaier = newButtonContainer;
        } else if (this.buttonsContaier && !configObject.button) {
            this.buttonsContaier.remove();
            this.buttonsContaier = null;
        } else if (configObject.button && !this.buttonsContaier) {
            this.buttonsContaier = this.generateButtons(configObject.button);
            this.content.insertBefore(this.buttonsContaier, newTable);
        }

        this.table = newTable;
    }

    createHTML(context, configObject) {
        const adminMainContent = document.createElement('div'),
            admin = document.getElementsByClassName('admin')[0],
            oldMainContent = document.getElementsByClassName('admin-mainContent'),
            header = document.createElement('h2');

        this.content = this.generateContent(context, configObject);

        header.className = 'section-header';
        header.innerText = configObject.header;

        adminMainContent.className = adminConfig.adminMainContentClass;
        adminMainContent.appendChild(header);
        adminMainContent.appendChild(this.content);

        this.header = header;

        if (oldMainContent.length) {
            admin.replaceChild(adminMainContent, oldMainContent[0]);
        } else {
            admin.appendChild(adminMainContent);
        }
    }

    generateContent(context, configObject) {
        const content = document.createElement('div');

        this.table = this.generateTable(context, configObject);

        content.className = adminConfig.adminContentClass;

        if (configObject.button) {
            this.buttonsContaier = this.generateButtons(configObject.button);
            content.appendChild(this.buttonsContaier);
        }

        content.appendChild(this.table);

        return content;
    }

    generateButtons(btnConfig) {
        const buttonsContainer = document.createElement('div'),
            button = document.createElement('a');

        button.className = adminConfig.buttonClass;
        button.href = '#';
        button.innerText = btnConfig;

        buttonsContainer.className = adminConfig.buttonsClass;
        buttonsContainer.appendChild(button);

        return buttonsContainer;
    }

    generateTable(context, configObject) {
        const table = document.createElement('table');

        table.className = 'table';

        table.appendChild(this.generateTHead(configObject.columnNames));
        table.appendChild(this.generateTBody(context, configObject));

        return table;
    }

    generateTBody(context, configObject) {
        const tbody = document.createElement('tbody');

        tbody.className = 'table_body';

        context.forEach(row => tbody.appendChild(this.generateRow(row, configObject)));

        this.tBody = tbody;
        return tbody;
    }

    generateRow(rowData, configObject) {
        console.log(rowData);
        const row = document.createElement('tr'),
            actionElement = document.createElement('td');

        actionElement.className = 'table_cell';
        row.className = 'table_row';
        row.dataset.id = rowData[configObject.id];

        configObject.order.forEach((columnName) => {
            row.innerHTML += `<td class="table_cell">${helpers.getNestedValue(rowData, columnName)}</td>`;
        });

        row.appendChild(this.appendActions(configObject, rowData));

        return row;
    }

    generateTHead(columnNames) {
        const thead = document.createElement('thead'),
            row = document.createElement('tr');

        thead.appendChild(row);

        thead.className = 'table_header';
        row.className = 'table_row';

        columnNames.forEach((column) => {
            row.innerHTML += `<th class="table_cell">${column}</th>`;
        });

        this.tHead = thead;
        return thead;
    }

    appendActions(configObject, data) {
        const actionElement = document.createElement('td');
        actionElement.className = 'table_cell';

        if (configObject.condition) {
            actionElement.appendChild(this.appendConditionalActions(configObject, data));
        } else {
            actionElement.appendChild(this.appendGenericActions(configObject));
        }
        return actionElement;
    }

    appendConditionalActions(configObject, data) {
        const actionList = document.createElement('ul');
        actionList.className = 'table_list';

        configObject.actions.forEach((action) => {
            const listItem = document.createElement('li');
            listItem.className = 'table_list-item';
            if (action.name === 'delete' && !data[configObject.condition]) {
                listItem.innerHTML += `<span class="table_link table_link--disabled">${action.label}</span>`;
            } else {
                listItem.innerHTML += `<a href="#" class="table_link ${config[action.actionClass]}">${action.label}</a>`;
            }
            actionList.appendChild(listItem);
        });

        return actionList;
    }

    appendGenericActions(configObject) {
        const actionList = document.createElement('ul');
        actionList.className = 'table_list';

        configObject.actions.forEach((action) => {
            const listItem = document.createElement('li');
            listItem.className = 'table_list-item';
            listItem.innerHTML += `<a href="#" class="table_link ${config[action.actionClass]}">${action.label}</a>`;
            actionList.appendChild(listItem);
        });

        return actionList;
    }
}

const adminContent = new AdminGames();

export { adminContent };