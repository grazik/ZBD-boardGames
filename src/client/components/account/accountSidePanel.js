import helpers from '../helpers';
import config from '../indexConfig';

const { accountPage } = config,
    getDependency = (dependency) => import(`./your${dependency}`);

class AccountSidePanel {
    constructor() {
        this.activeElement = document.getElementsByClassName(accountPage.menuLinkClass)[0];
        if (this.activeElement) {
            this.addSubMenuEvent();
        }
    }

    init() {
        this.appendHTML();
        this.activeElement = document.getElementsByClassName(accountPage.menuLinkClass)[0];
        this.addSubMenuEvent();
    }

    addSubMenuEvent() {
        document.getElementsByClassName(accountPage.menuClass)[0].addEventListener('click', e => this.onSubMenuClick(e));
    }

    onSubMenuClick(e) {
        e.preventDefault();
        if (e.target.classList.contains(accountPage.menuLinkClass)) {
            const dependency = e.target.dataset[accountPage.dataDependency];
            if (e.target !== this.activeElement && accountPage.dependencyArray.indexOf(dependency) + 1) { //indexOf returns -1 then value is not in array. First index is 0 (falsy), but +1 makes it 1 (truthy). -1 + 1 = 0, still falsy)
                getDependency(dependency)
                    .then((module) => {
                        this.dependency = dependency;
                        this.activeElement = helpers.moveClass(this.activeElement, e.target, 'active');
                        module.default.init();
                    })
                    .catch((err) => console.log(err));
            }
        }
    }

    appendHTML() {
        const account = document.getElementsByClassName('account')[0],
            newElement = document.createElement('div');
        newElement.innerHTML = this.generateHTML();

        account.prepend(newElement.firstChild);
    }

    generateHTML() {
        return `<div class="account-sidePanel">
            <h3 class="section-header">Menu</h3>
            <nav class="account-menu">
                <ul class="account-menu--list">
                    <li class="account-menu--item">
                        <a href="#" class="account-menu--link active" data-dependency="Account">Twoje konto</a>
                    </li>
                    <li class="account-menu--item">
                        <a href="#" class="account-menu--link" data-dependency="Games">Twoje gry</a>
                    </li>
                    <li class="account-menu--item">
                        <a href="#" class="account-menu--link" data-dependency="Achievements">Twoje osiągnięcia</a>
                    </li>
                </ul>
            </nav>
        </div>`;
    }
}

export default new AccountSidePanel();