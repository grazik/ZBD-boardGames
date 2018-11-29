import config from '../indexConfig';
import helpers from '../helpers';
import queries from '../queries';

const { accountPage } = config;

class YourAccount {
    constructor() {
        this.dataElements = [];
        this.findStructures();
        this.addDataClickEvent();
    }

    init() {
        this.dataElements = [];
        this.appendHTML()
            .then(() => {
                this.findStructures();
                this.addEvents();
            });
    }

    appendHTML() {
        return new Promise((resolve) => {
            helpers.sendRequest('/api', queries.getUserData())
                .then((data) => {
                    document.getElementsByClassName('account-mainContent')[0].innerHTML = YourAccount.generateHTML(data.data.getUser);
                    resolve();
                })
                .catch(err => console.log(err));
        });
    }

    addEvents() {
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

    static generateHTML(context) {
        return `<h2 class="section-header">Twoje Konto</h2>
        <div class="account-content">
            <h3 class="account-header">Twoje Dane:</h3>
            <div class="account-data">
                <div class="account-data--column">
                    <label class="account-data--label">Imie</label>
                    <label class="account-data--label">Nazwisko</label>
                </div>
                <div class="account-data--column">
                    <input type="text" class="account-data--input" value="${context.NAME}" disabled>
                    <input type="text" class="account-data--input" value="${context.LAST_NAME}" disabled>
                </div>
                <div class="account-data--column">
                    <a href="#" class="account-data--edit">Edytuj</a>
                    <a href="#" class="account-data--edit">Edytuj</a>
                </div>
            </div>
            <h3 class="account-header">Twoj Adres:</h3>
            <div class="account-data">
                <div class="account-data--column">
                    <label class="account-data--label">Miasto</label>
                    <label class="account-data--label">Ulica</label>
                    <label class="account-data--label">ZIP</label>
                    <label class="account-data--label">Telefon</label>
                </div>
                <div class="account-data--column">
                    <input type="text" class="account-data--input" value="${context.ADDRESS.CITY}" disabled>
                    <input type="text" class="account-data--input" value="${context.ADDRESS.STREET}" disabled>
                    <input type="text" class="account-data--input" value="${context.ADDRESS.ZIP}" disabled>
                    <input type="text" class="account-data--input" value="${context.ADDRESS.PHONE}" disabled>
                </div>
                <div class="account-data--column">
                    <a href="#" class="account-data--edit">Edytuj</a>
                    <a href="#" class="account-data--edit">Edytuj</a>
                    <a href="#" class="account-data--edit">Edytuj</a>
                    <a href="#" class="account-data--edit">Edytuj</a>
                </div>
            </div>
        </div>`;
    }
}

export default new YourAccount();