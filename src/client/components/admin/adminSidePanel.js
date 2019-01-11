import config from '../indexConfig';

const { adminConfig } = config;

class AdminSidePanel {
    init() {
        document.getElementsByClassName('admin')[0].appendChild(this.generateContent());
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
                        <a href="#" class="${adminConfig.adminMenuLinkClass} ${i === 0 ? 'active' : ''}" data-dependency="${menuItem.dependency}">${menuItem.label}</a>
                    </li>`;
        });

        this.menu.appendChild(menu);
    }
}

const adminSidePanel = new AdminSidePanel();

export { adminSidePanel };