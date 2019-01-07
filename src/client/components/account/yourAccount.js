import config from '../indexConfig';
import helpers from '../helpers';
import queries from '../queries';
import updatePopUp from '../updatePopUp/updatePopUp';

const { accountPage } = config;

class YourAccount {
    constructor() {
        const userInfoScriptTag = document.getElementById(accountPage.userInfo);
        if (userInfoScriptTag) {
            const userInfoString = userInfoScriptTag.innerText.trim()
                    .slice(0, -1), // it ends with ;
                context = JSON.parse(userInfoString)[0]; // it's an array
            userInfoScriptTag.remove();

            this.mainContent = document.getElementsByClassName('account-mainContent')[0];
            this.saveButton = this.mainContent.getElementsByClassName('account-buttons_button')[0];
            this.saveVariables(context)
                .then(() => this.addEvents());
        }
    }

    init() {
        helpers.sendRequest('/api', queries.getUserData())
            .then(({ data }) => this.saveVariables(data.getUser))
            .then(() => this.appendHTML())
            .then(() => this.addEvents())
            .catch(err => console.log(err));
    }

    addEvents() {
        this.saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.saveButtonClicked();
        });

        this.mainContent.addEventListener('change', e => this.inputChange(e.target));
    }

    inputChange(target) {
        target.value = target.value.trim();
        const isValid = helpers.validateInput(target, accountPage.invalidInputClass);

        this.inputs[target.name].newValue = target.value;
        if (isValid) {
            this.invalid.delete(target.name);
        } else {
            this.invalid.add(target.name);
        }
    }

    saveButtonClicked() {
        if (this.invalid.size) {
            updatePopUp.init('Błąd', 'Żadne pole nie może być puste', false);
        } else {
            const inputObject = this.generateInputObject();
            if (inputObject) {
                helpers.sendRequest('/api', queries.updateUser(inputObject))
                    .then(({ data }) => {
                        if (data.updateUser) {
                            updatePopUp.init('Sukces', 'Zmiany zostały zapisane', true);
                            this.saveVariables(data.updateUser);
                            return Promise.resolve();
                        }
                        return Promise.reject();
                    })
                    .catch(() => updatePopUp.init('Porażka', 'Wystąpił nieoczekiwany błąd', false));
            } else {
                updatePopUp.init('Sukces', 'Zmiany zostały zapisane', true);
            }
        }
    }

    generateInputObject() {
        const input = {
                USER_ID: this.userData.USER_ID,
                ADDRESS: {
                    ADDRESS_ID: this.address.ADDRESS_ID,
                },
            },
            userChanged = this.appendChangedValues(input, accountPage.userData.order),
            addressChanged = this.appendChangedValues(input.ADDRESS, accountPage.address.order);

        return (userChanged || addressChanged) ? input : false;
    }

    appendChangedValues(parentObj, names) {
        let isSomethingChanged = false;
        names.forEach((name) => {
            const { oldValue, newValue } = this.inputs[name];
            if (oldValue !== newValue) {
                parentObj[name] = newValue;
                isSomethingChanged = true;
            }
        });

        return isSomethingChanged;
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

    saveVariables(data) {
        const { ADDRESS, ...user } = data;
        this.inputs = {};
        this.invalid = this.invalid || new Set();
        this.address = ADDRESS;
        this.userData = user;

        this.populateInputs(user, accountPage.userID);
        this.populateInputs(ADDRESS, accountPage.addressID);

        return Promise.resolve();
    }

    populateInputs(obj, id) {
        Object.keys(obj)
            .forEach((key) => {
                if (key !== id) {
                    this.inputs[key] = {
                        oldValue: obj[key],
                        newValue: obj[key],
                    };
                }
            });
    }
}

export default new YourAccount();