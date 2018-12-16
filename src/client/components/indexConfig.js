const config = {
    mainContentClass: 'mainContent',
    accountPage: {
        dataClass: 'account-data',
        columnClass: 'account-data--column',
        labelsClass: 'account-data--label',
        inputClass: 'account-data--input',
        editClass: 'account-data--edit',
        menuClass: 'account-menu',
        menuLinkClass: 'account-menu--link',
        dataDependency: 'dependency',
        dependencyArray: ['Account', 'Games', 'Achievements'],
    },
    menuConfig: {
        menuClass: 'menu',
        menuLink: 'menu--link',
        dataDependency: 'dependency',
        dependencyArray: ['account', 'games', 'contact', 'logout'],
    },
    gamesConfig: {
        categoriesFilterClass: 'games-filters_categories',
        categoriesCheckboxes: 'games-filters_checkbox',
    },
};

export default config;