import helpers from '../helpers';
import config from '../indexConfig';
import query from '../queries';

const { adminConfig } = config;

class AdminGames {
    init() {
        helpers.sendRequest('/api', query.getAllShops())
            .then(({ data }) => data.getShops)
            .then(context => this.createHTML(context, adminConfig.shops))
            .catch(err => console.log(err));
    }

    reinit(configKey) {
        const configObj = adminConfig[configKey];

        helpers.sendRequest('/api', query[configObj.query]())
            .then(({ data }) => data[configObj.queryResult])
            .then(context => this.regenerateHTML(configObj, context))
            .catch(err => console.log(err));
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
        const row = document.createElement('tr'),
            actionElement = document.createElement('td');

        console.log(rowData);
        actionElement.className = 'table_cell';
        row.className = 'table_row';
        row.dataset.id = rowData[configObject.id];

        configObject.order.forEach((columnName) => {
            row.innerHTML += `<td class="table_cell">${helpers.getNestedValue(rowData, columnName)}</td>`;
        });

        row.appendChild(actionElement);
        configObject.actions.forEach((action) => {
            actionElement.innerHTML += `<span> ${action} </span>`;
        });

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
}

const adminGames = new AdminGames();

window.a = adminGames;

export { adminGames };