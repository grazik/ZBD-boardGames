const config = {
    invisibleClass: 'invisible',
    mainContentClass: 'mainContent',
    gameInfo: 'jsGameInfo',
    rentGame: 'jsRentGame',
    returnGame: 'jsReturnGame',
    closeElement: 'jsClose',
    gameIDAtr: 'gameid',
    overlayClass: 'overlay',
    accountPage: {
        userInfo: 'userInfo',
        addressID: 'ADDRESS_ID',
        userID: 'USER_ID',
        dataClass: 'account-data',
        columnClass: 'account-data_column',
        labelsClass: 'account-data_label',
        inputClass: 'account-data_input',
        invalidInputClass: 'account-data_input--invalid',
        menuClass: 'account-menu',
        menuLinkClass: 'account-menu--link',
        dataDependency: 'dependency',
        dependencyArray: ['Account', 'Games', 'Achievements'],
        userData: {
            name: 'userData',
            order: ['NAME', 'LAST_NAME'],
            labels: {
                NAME: 'Imie',
                LAST_NAME: 'Nazwisko',
            },
        },
        address: {
            name: 'address',
            order: ['CITY', 'STREET', 'ZIP', 'PHONE'],
            labels: {
                CITY: 'Miasto',
                STREET: 'Ulica',
                ZIP: 'ZIP',
                PHONE: 'Telefon',
            },
        },
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
    },
    tableConfig: {
        tableClass: 'table',
        tableBodyClass: 'table_body',
        tableHeaderClass: 'table_header',
    },
    infoOverlayConfig: {
        listValues: [
            {
                label: 'Kategoria:',
                key: 'CATEGORY',
            },
            {
                label: 'Liczba graczy:',
                key: 'NUMBER_OF_PLAYERS',
            },
            {
                label: 'Czas gry:',
                key: 'GAME_TIME',
            },
            {
                label: 'Opłata:',
                key: 'BAIL',
            },
        ],
        stars: ['00', '10', '15', '20', '25', '30', '35', '40', '45', '50'],
        starClass: 'star',
        gameRating: 'gameRating',
        yourRating: 'yourRating',
        ratingConfig: [
            {
                label: 'Ocena',
                id: 'gameRating',
                isDisabled: true,
            },
            {
                label: 'Twoja ocena',
                id: 'yourRating',
                isDisabled: false,
            },
        ],
    },
};

export default config;