import config from 'components/indexConfig';

const { accountPage } = config;

class AccountPage {
    constructor() {
        this.dataElements = [];
    }

    init() {
        this.findStructures();
        this.addDataClickEvent();
    }

    findStructures() {
        Array.prototype.slice.call(document.getElementsByClassName(accountPage.dataClass))
            .map((data) => {
                const dataElement = {};
                dataElement.data = data;
                dataElement.inputs = Array.prototype.slice.call(data.getElementsByClassName(accountPage.inputClass));
                dataElement.edditColumn = data.getElementsByClassName(accountPage.columnClass)[2];
                dataElement.eddits = Array.prototype.slice.call(data.getElementsByClassName(accountPage.editClass));
                this.dataElements.push(dataElement);
                return true;
            });
    }

    addDataClickEvent() {
        this.dataElements.map((elem, i) => elem.edditColumn.addEventListener('click', e => this.onDataClick(i, e)));
    }

    onDataClick(i, e) {
        e.preventDefault();
        if (e.target.classList.contains(accountPage.editClass)) {
            const dataElem = this.dataElements[i],
                index = dataElem.eddits.indexOf(e.target);
            dataElem.inputs[index].removeAttribute('disabled');
        }
    }
}

export default new AccountPage();