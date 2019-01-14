import config from '../indexConfig';
import helpers from '../helpers';
import { adminContent } from './adminContent';

const { adminConfig } = config;

class AdminSidePanel {
    init() {
        this.appendHTML();
        this.addEvents();
    }

    appendHTML() {
        this.sidePanel = this.generateContent();
        document.getElementsByClassName('admin')[0].appendChild(this.sidePanel);
    }

    generateContent() {
        const sidePanel = document.createElement('div'),
            adminMenu = document.createElement('nav');

        this.menu = adminMenu;

        sidePanel.className = adminConfig.sidePanelClass;
        adminMenu.className = adminConfig.adminMenuClass;

        sidePanel.innerHTML = '<h3 class="section-header">Menu</h3>';
        this.generateMenu();
        sidePanel.appendChild(adminMenu);

        return sidePanel;
    }

    generateMenu() {
        const menu = document.createElement('ul');

        menu.classList = adminConfig.adminMenuListClass;
        adminConfig.menuElements.forEach((menuItem, i) => {
            menu.innerHTML += `<li class="${adminConfig.adminMenuItemClass}">
                        <a href="#" class="${adminConfig.adminMenuLinkClass} ${i === 0 ? 'active' : ''}" data-${adminConfig.dependency}="${menuItem.dependency}">${menuItem.label}</a>
                    </li>`;
        });

        this.activeElement = menu.getElementsByClassName('active')[0];
        console.log(this.activeElement);
        this.menu.appendChild(menu);
    }

    addEvents() {
        this.menu.addEventListener('click', (e) => this.onMenuClick(e));
    }

    onMenuClick(e) {
        const { target } = e;
        e.preventDefault();
        if (target !== this.activeElement && target.classList.contains(adminConfig.adminMenuLinkClass)) {
            const dependency = target.dataset[adminConfig.dependency];
            if (adminConfig.dependencyArray.indexOf(dependency) + 1) { // indexOf returns -1 then value is not in array. First index is 0 (falsy), but +1 makes it 1 (truthy). -1 + 1 = 0, still falsy)
                this.activeElement = helpers.moveClass(this.activeElement, target, 'active');
                adminContent.reinit(dependency);
            }
        }
    }
}

const adminSidePanel = new AdminSidePanel();

export { adminSidePanel };