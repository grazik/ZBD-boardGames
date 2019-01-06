import config from '../indexConfig';
import helpers from '../helpers';
import queries from '../queries';

const { accountPage } = config;

class YourAccount {
    constructor() {
        this.dataElements = [];
        // this.findStructures();
        // this.addDataClickEvent();
    }

    init() {
        helpers.sendRequest('/api', queries.getUserData())
            .then(({ data }) => this.saveVariables(data))
            .then(() => this.appendHTML())
            .then(() => this.addEvents())
            .catch(err => console.log(err));
    }

    addEvents() {
        this.saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Clicked');
        });

        this.mainContent.addEventListener('change', (e) => {
            const { target } = e;
            console.log(target);
            helpers.validateInput(target, accountPage.invalidInputClass);
        });
    }

    appendHTML() {
        const accountMainContent = document.createElement('div'),
            account = document.getElementsByClassName('account')[0],
            oldMainContent = account.getElementsByClassName('account-mainContent');

        accountMainContent.className = 'account-mainContent';
        accountMainContent.innerHTML = '<h2 class="section-header">Twoje Konto</h2>';
        accountMainContent.appendChild(this.generateContent());

        if (oldMainContent.length) {
            account.replaceChild(accountMainContent, oldMainContent[0]);
        } else {
            account.appendChild(accountMainContent);
        }

        this.mainContent = accountMainContent;
        return Promise.resolve();
    }

    generateContent() {
        const content = document.createElement('div'),
            userDataHeader = document.createElement('h3'),
            addressHeader = document.createElement('h3');

        content.className = 'account-content';
        userDataHeader.className = 'account-header';
        userDataHeader.innerText = 'Twoje Dane:';

        addressHeader.className = 'account-header';
        addressHeader.innerText = 'Twój adres:';

        content.appendChild(userDataHeader);
        content.appendChild(this.generateDataSection(this.userData, accountPage.userData));

        content.appendChild(addressHeader);
        content.appendChild(this.generateDataSection(this.address, accountPage.address));

        content.appendChild(this.generateButtons());

        return content;
    }

    generateDataSection(dataObj, { order, labels }) {
        const data = document.createElement('div'),
            labelColumn = document.createElement('div'),
            inputColumn = document.createElement('div');

        data.className = accountPage.dataClass;
        labelColumn.className = accountPage.columnClass;
        inputColumn.className = accountPage.columnClass;

        order.forEach((dataKey) => {
            const input = document.createElement('input');
            labelColumn.innerHTML += `<label class="${accountPage.labelsClass}">${labels[dataKey]}</label>`;
            input.type = 'text';
            input.className = accountPage.inputClass;
            input.name = dataKey;
            input.value = dataObj[dataKey];

            this.inputs.push(input);

            inputColumn.appendChild(input);
        });

        data.appendChild(labelColumn);
        data.appendChild(inputColumn);

        return data;
    }

    generateButtons() {
        const buttonsContainer = document.createElement('div'),
            saveButton = document.createElement('a');

        this.saveButton = saveButton;

        saveButton.className = 'account-buttons_button';
        saveButton.href = '#';
        saveButton.innerText = 'Zapisz';

        buttonsContainer.className = 'account-buttons';
        buttonsContainer.appendChild(saveButton);

        return buttonsContainer;
    }

    saveVariables({ getUser }) {
        const { ADDRESS, ...user } = getUser;
        this.inputs = [];
        this.address = ADDRESS;
        this.userData = user;
    }
}

export default new YourAccount();