import helpers from '../helpers';
import config from '../indexConfig';
import queries from '../queries';

const { contactConfig, tableConfig } = config;

class Contact {
    init() {
        helpers.sendRequest('/api', queries.getAllShops())
            .then(({ data }) => data.getShops)
            .then(context => this.generateContact(context))
            .then(content => this.appendContent(content))
            .catch(err => console.log(err));
    }

    generateContact(context) {
        const contact = document.createElement('div');
        contact.className = 'contact';

        contact.appendChild(this.generateMainContent(context));

        return contact;
    }

    generateMainContent(context) {
        const contactMainContent = document.createElement('div');
        contactMainContent.className = 'contact-mainContent';

        contactMainContent.appendChild(this.generateContent(context));

        return contactMainContent;
    }

    generateContent(context) {
        const content = document.createElement('div');
        content.className = 'contact-content';

        content.appendChild(this.addHeadline());
        content.appendChild(this.generateTable(context));

        return content;
    }

    addHeadline() {
        const headline = document.createElement('h2');
        headline.className = 'section-header';
        headline.innerText = contactConfig.headline;
        return headline;
    }

    generateTable(context) {
        const table = document.createElement(tableConfig.tableClass);
        table.className = tableConfig.tableClass;

        table.appendChild(this.generateTHead(contactConfig.columnNames));
        table.appendChild(this.generateTBody(context));

        return table;
    }

    generateTHead(columnNames) {
        const thead = document.createElement('thead'),
            row = document.createElement('tr');

        thead.appendChild(row);

        thead.className = tableConfig.tableHeaderClass;
        row.className = tableConfig.rowClass;

        columnNames.forEach((column) => {
            row.innerHTML += `<th class="${tableConfig.cellClass}">${column}</th>`;
        });

        this.tHead = thead;
        return thead;
    }

    generateTBody(context) {
        const tbody = document.createElement('tbody');
        tbody.className = tableConfig.tableBodyClass;

        context.forEach(shopData => tbody.appendChild(this.generateRow(shopData)));
        return tbody;
    }

    generateRow(rowData) {
        const row = document.createElement('tr');
        row.className = tableConfig.rowClass;

        contactConfig.order.forEach((columnName) => {
            row.innerHTML += `<td class="${tableConfig.cellClass}">${decodeURIComponent(helpers.getNestedValue(rowData, columnName))}</td>`;
        });
        return row;
    }

    appendContent(content) {
        const mainContent = document.getElementsByClassName('mainContent')[0],
            oldElem = mainContent.firstChild;

        if (oldElem) {
            mainContent.replaceChild(content, oldElem);
        } else {
            mainContent.appendChild(content);
        }
    }
}

export default new Contact();