import config from '../indexConfig';
import helpers from '../helpers';
import updatePopUp from '../updatePopUp/updatePopUp';
import queries from '../queries';
import globals from '../globals';

const { configOverlayConfig } = config;

class ConfigOverlay {
    constructor(type, settings, modifyCaller, id) {
        this.type = type;
        this.settings = configOverlayConfig[settings];
        this.inputs = {};
        this.id = id;
        this.modifyCaller = modifyCaller;

        this.createOverlay()
            .then(() => this.addEvents());
    }

    addEvents() {
        this.overlay.addEventListener('click', (e) => {
            const { target } = e;
            if (target.classList.contains(config.closeElement)) {
                e.preventDefault();
                this.closeOverlay();
            } else if (target.classList.contains(config.saveElem)) {
                e.preventDefault();
                this.saveObject();
            }
        });

        this.overlay.addEventListener('change', (e) => {
            e.target.value = e.target.value.trim();
        });
    }

    createObjectToSave() {
        const object = {},
            { checkboxes } = this.settings,

            invalid = Object.keys(this.inputs)
                .some((inputKey) => {
                    const { input, type } = this.inputs[inputKey];

                    if (!input.validity.valid) {
                        return true;
                    }

                    if (type === 'checkbox') {
                        const { fieldIndex } = input.dataset,
                            { field } = checkboxes[fieldIndex];
                        if (!object[field]) {
                            object[field] = [];
                        }
                        if (input.checked) {
                            object[field].push(input.name);
                        }
                    } else {
                        if (inputKey === 'PASSWORD') {
                            helpers.createNestedObject(object, input.name, btoa(input.value));
                        } else {
                            helpers.createNestedObject(object, input.name, encodeURIComponent(input.value));
                        }
                    }

                    return false;
                });

        if (invalid) {
            return null;
        }

        if (this.addressID) {
            object.ADDRESS.ADDRESS_ID = this.addressID;
        }
        if (this.type === 'edit') {
            object[this.settings.id] = this.id;
        }
        return object;
    }

    sendRequest({ query, queryResult }, objectToSave, successText, failureText) {
        return helpers.sendRequest('/api', queries[query](objectToSave))
            .then(data => data.data[queryResult])
            .then((results) => {
                if (results) {
                    updatePopUp.init('Sukces', successText, true);
                } else {
                    updatePopUp.init('Błąd', failureText, false);
                }
                return Promise.resolve(results);
            });
    }


    request(objectToSave, setOfQueries) {
        let successText,
            failureText,
            usedQuery;
        if (this.type === 'edit') {
            successText = 'zmiany zostały zapisane';
            failureText = 'W czasie modyfikacji krotek wystąpił błąd';
            usedQuery = setOfQueries.updateOne;
        } else {
            successText = 'Dodano nową krotkę';
            failureText = 'W czasie dodawania krotki wystąpił błąd';
            usedQuery = setOfQueries.addNew;
        }

        return this.sendRequest(usedQuery, objectToSave, successText, failureText);
    }

    saveObject() {
        const objectToSave = this.createObjectToSave();
        if (objectToSave) {
            this.request(objectToSave, this.settings.queries)
                .then((results) => {
                    if (this.type === 'new') {
                        if (results && this.modifyCaller) {
                            this.modifyCaller(results);
                        }
                    } else {
                        this.modifyCaller();
                    }
                });
        } else {
            updatePopUp.init('Błąd', 'Sprawdz poprawność danych', false);
        }
    }

    closeOverlay() {
        this.overlay.remove();
    }

    addButtons() {
        const buttons = document.createElement('div');
        buttons.className = 'configBox-buttons';

        configOverlayConfig.buttons.forEach((button) => {
            const newButton = document.createElement('a');

            newButton.href = '#';
            newButton.className = button.classes;
            newButton.innerText = button.label;

            buttons.appendChild(newButton);
        });

        this.buttons = buttons;
        return buttons;
    }

    populateInputType(inputType, results) {
        if (inputType && inputType.length) {
            inputType.forEach(({ name }) => {
                const value = helpers.getNestedValue(results, name);
                if (value) {
                    this.inputs[name].input.value = decodeURIComponent(value);
                }
            });
        }
    }

    populateCheckboxes({ field }, results) {
        results[field].forEach((checkboxField) => {
            this.inputs[checkboxField].input.checked = true;
        });
    }

    populateInputs() {
        const { query, queryResult } = this.settings.queries.getOne,
            { inputs, textAreas, checkboxes } = this.settings;
        return helpers.sendRequest('/api', queries[query](this.id))
            .then(({ data }) => data[queryResult])
            .then((results) => {
                [inputs, textAreas].forEach(inputType => this.populateInputType(inputType, results));
                if (checkboxes && checkboxes.length) {
                    checkboxes.forEach(checkboxType => this.populateCheckboxes(checkboxType, results));
                }
                if (results.ADDRESS && results.ADDRESS.ADDRESS_ID) {
                    this.addressID = results.ADDRESS.ADDRESS_ID;
                }
            });
    }

    checkType() {
        if (this.type === 'edit') {
            return this.populateInputs();
        }
        return Promise.resolve();
    }

    appendCheckboxes(checkboxes, configBox) {
        if (checkboxes && checkboxes.length) {
            checkboxes.forEach(checkboxSet => configBox.appendChild(checkboxSet));
        }
        return Promise.resolve();
    }

    populateCheckboxContainer(checkboxesContainer, data, { label, name, required, type }, fieldIndex) {
        data.forEach((checkboxData) => {
            const checkboxSet = this.generateInput({
                label: checkboxData[label],
                name: checkboxData[name],
                required,
                type,
            }, 'input', fieldIndex);

            checkboxesContainer.appendChild(checkboxSet);
        });
    }

    checkboxPromiseFactory(checkboxConfig, checkboxContainers, fieldIndex) {
        return helpers.sendRequest('/api', queries[checkboxConfig.query]())
            .then(({ data }) => {
                const checkboxesContainer = document.createElement('div');

                checkboxesContainer.className = 'configBox-checkboxes';
                checkboxContainers.push(checkboxesContainer);

                this.populateCheckboxContainer(checkboxesContainer, data[checkboxConfig.queryResult], checkboxConfig, fieldIndex);
            });
    }

    generateCheckboxes() {
        return new Promise((resolve) => {
            if (this.settings.checkboxes) {
                let result = Promise.resolve();
                const checkboxContainers = [];

                this.settings.checkboxes.forEach((checkboxConfig, fieldIndex) => {
                    result = result.then(() => this.checkboxPromiseFactory(checkboxConfig, checkboxContainers, fieldIndex));
                });
                return result.then(() => resolve(checkboxContainers));
            }
            return resolve();
        });
    }

    generateInput({ label, name, required, type = 'text', pattern }, tag, fieldIndex) {
        const inputObj = document.createElement(tag),
            labelObj = document.createElement('label'),
            inputSet = document.createElement('div');

        inputSet.className = 'configBox-inputSet';
        inputSet.appendChild(labelObj);
        inputSet.appendChild(inputObj);

        inputObj.className = 'configBox-inputSet_input';
        inputObj.placeholder = label;
        inputObj.id = name;
        inputObj.name = name;
        inputObj.required = required;

        if (pattern) {
            inputObj.pattern = pattern;
        }

        labelObj.className = 'configBox-inputSet_label';
        labelObj.innerText = decodeURIComponent(label);
        labelObj.htmlFor = name;

        if (type !== 'textarea') {
            inputObj.type = type;
            if (type === 'checkbox') {
                const checkmark = document.createElement('span');
                inputSet.insertBefore(inputObj, labelObj);
                labelObj.appendChild(checkmark);

                inputSet.classList.add('configBox-inputSet--checkboxes');
                inputObj.classList.add('configBox-inputSet_input--checkbox');
                checkmark.className = 'configBox-inputSet_checkmark';

                inputObj.dataset.fieldIndex = fieldIndex;
            }
        } else if (tag === 'textarea') {
            inputObj.rows = 12;
            inputSet.classList.add('configBox-inputSet--textareas');
        }

        if (required) {
            inputSet.classList.add('configBox-inputSet--required');
        }

        this.inputs[name] = {
            input: inputObj,
            type: type || tag,
        };
        return inputSet;
    }

    generateInputs(inputsArray, tag) {
        const inputsContainer = document.createElement('div');
        inputsContainer.className = 'configBox-inputs';

        inputsArray.forEach(input => inputsContainer.appendChild(this.generateInput(input, tag)));

        return inputsContainer;
    }

    createMainHeadline() {
        const headline = document.createElement('h2');
        headline.className = 'section-header';
        headline.innerText = this.settings.headline;

        return headline;
    }

    addContent() {
        const configBox = document.createElement('section');
        configBox.className = 'configBox page_wrapper';

        configBox.appendChild(this.createMainHeadline());
        configBox.appendChild(this.generateInputs(this.settings.inputs, 'input'));
        if (this.settings.textAreas) {
            configBox.appendChild(this.generateInputs(this.settings.textAreas, 'textarea'));
        }
        return this.generateCheckboxes()
            .then(checkboxes => this.appendCheckboxes(checkboxes, configBox))
            .then(() => this.checkType())
            .then(() => {
                configBox.appendChild(this.addButtons());
                this.overlay.appendChild(configBox);
                globals.body.append(this.overlay);
            });
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add(config.overlayClass, config.closeElement);
        this.overlay = overlay;
        return this.addContent();
    }
}

export { ConfigOverlay };