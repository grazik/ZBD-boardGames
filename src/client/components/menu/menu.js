import config from '../indexConfig';
import helpers from '../helpers';

const { menuConfig } = config,
    importAccount = () => import('../account/index'),
    importAdmin = () => import('../admin/index'),
    importGames = () => import('../games/index'),
    importLogout = () => import('../logout/index'),
    importContact = () => import('../contact/index'),
    getDependency = (dependency) => {
        switch (dependency) {
            case 'account':
                return importAccount();
            case 'admin':
                return importAdmin();
            case 'logout':
                return importLogout();
            case 'games':
                return importGames();
            case 'contact':
                return importContact();
            default:
                return new Error('Wrong Dependecy');
        }
    };

class Menu {
    init() {
        ``;
        this.menu = document.getElementsByClassName(menuConfig.menuClass)[0];
        this.activeElement = this.menu.getElementsByClassName('active')[0];
        this.addEvents();
    }

    addEvents() {
        this.menu.addEventListener('click', (e) => this.onMenuClick(e));
    }

    onMenuClick(e) {
        e.preventDefault();
        if (e.target.classList.contains(menuConfig.menuLink)) {
            const dependency = e.target.dataset[menuConfig.dataDependency];
            if (e.target !== this.activeElement && menuConfig.dependencyArray.indexOf(dependency) + 1) {
                getDependency(dependency)
                    .then(module => {
                        module.default.init();
                        helpers.moveClass(this.activeElement, e.target, 'active');
                        this.activeElement = e.target;
                    });
            }
        }
    }
}

export default new Menu();