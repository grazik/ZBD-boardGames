import helpers from '../helpers';
import config from '../indexConfig';

const { accountPage } = config,
    getDependency = (dependency) => import(`./your${dependency}`);

class AccountSidePanel {
    constructor() {
        this.acctiveElement = document.getElementsByClassName(accountPage.menuLinkClass)[0];
        this.addSubMenuEvent();
    }

    init() {
        this.acctiveElement = document.getElementsByClassName(accountPage.menuLinkClass)[0];
        this.addSubMenuEvent();
    }

    addSubMenuEvent() {
        document.getElementsByClassName(accountPage.menuClass)[0].addEventListener('click', e => this.onSubMenuClick(e));
    }

    onSubMenuClick(e) {
        e.preventDefault();
        if (e.target.classList.contains(accountPage.menuLinkClass)) {
            const dependency = e.target.dataset[accountPage.dataDependency];
            if (e.target !== this.acctiveElement && accountPage.dependencyArray.indexOf(dependency) + 1) { //indexOf returns -1 then value is not in array. First index is 0 (falsy), but +1 makes it 1 (truthy). -1 + 1 = 0, still falsy)
                getDependency(dependency)
                    .then((module) => {
                        this.dependency = dependency;
                        this.acctiveElement = helpers.toggleClass(this.acctiveElement, e.target, 'active');
                        module.default.init();
                    })
                    .catch((err) => console.log(err));
            }
        }
    }
}

export default new AccountSidePanel();