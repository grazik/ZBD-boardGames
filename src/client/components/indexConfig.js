const config = {
    mainContentClass: 'mainContent',
    borrowGame: 'jsRentGame',
    gameIDAtr: 'gameid',
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
        gamesFiltersClass: 'games-filters',
        filterInputsClass: 'games-filters_inputs',
        categoriesCheckboxes: 'games-filters_checkbox',
        min: 'min',
        max: 'max',
        category: 'category',
        availability: 'availability',
        gamesTableBody: 'games-table_body',
    },
};

export default config;