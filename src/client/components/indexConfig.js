const config = {
    saveElem: 'jsSave',
    deleteElem: 'jsDelete',
    editElem: 'jsEdit',
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
            patterns: {
                PHONE: '^\\d{9}$',
                ZIP: '^\\d{2}-\\d{3}$',
            },
        },
    },
    menuConfig: {
        menuClass: 'menu',
        menuLink: 'menu--link',
        dataDependency: 'dependency',
        dependencyArray: ['account', 'games', 'contact', 'logout', 'admin'],
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
        rowClass: 'table_row',
        cellClass: 'table_cell',
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
    adminConfig: {
        sidePanelClass: 'admin-sidePanel',
        adminMenuClass: 'admin-menu',
        adminMenuListClass: 'admin-menu_list',
        adminMenuItemClass: 'admin-menu_item',
        adminMenuLinkClass: 'admin-menu_link',
        menuElements: [
            {
                dependency: 'games',
                label: 'Gry',
            }, {
                dependency: 'users',
                label: 'Użytkownicy',
            }, {
                dependency: 'categories',
                label: 'Kategorie',
            },
            {
                dependency: 'shops',
                label: 'Sklepy',
            },
            {
                dependency: 'achievements',
                label: 'Osiągnięcia',
            },
        ],
        dependency: 'dependency',
        dependencyArray: ['games', 'shops', 'users', 'achievements', 'categories'],
        adminMainContentClass: 'admin-mainContent',
        buttonsClass: 'admin-buttons',
        buttonClass: 'admin-buttons_button',
        adminContentClass: 'admin-content',
        games: {
            configOverlayKey: 'game',
            name: 'games',
            button: 'Dodaj grę',
            header: 'Gry:',
            id: 'GAME_ID',
            columnNames: ['Tytuł', 'Kategoria', 'Dostępność', 'Akcja'],
            order: ['TITLE', 'CATEGORY', 'AVAILABILITY'],
            condition: 'AVAILABILITY',
            actions: [
                {
                    name: 'edit',
                    label: 'Edytuj',
                    actionClass: 'editElem',
                },
                {
                    name: 'delete',
                    label: 'Usuń',
                    actionClass: 'deleteElem',
                },
            ],
            queries: {
                getOne: {
                    query: 'getGame',
                    queryResult: 'getGame',
                },
                getAll: {
                    query: 'getAllGames',
                    queryResult: 'getGames',
                },
                deleteOne: {
                    query: 'deleteGame',
                    queryResult: 'deleteGame',
                },
            },
        },
        users: {
            name: 'users',
            header: 'Użytkownicy',
            id: 'USER_ID',
            columnNames: ['Nick', 'Imię', 'Nazwisko', 'Akcja'],
            order: ['USER_ID', 'NAME', 'LAST_NAME'],
            condition: 'HasEverythingReturned',
            actions: [
                {
                    name: 'delete',
                    label: 'Usuń',
                    actionClass: 'deleteElem',
                },
            ],
            queries: {
                getOne: {
                    query: 'getUserAdmin',
                    queryResult: 'getUser',
                },
                getAll: {
                    query: 'getAllUsers',
                    queryResult: 'getUsers',
                },
                deleteOne: {
                    query: 'deleteUser',
                    queryResult: 'deleteUser',
                },
            },
        },
        categories: {
            configOverlayKey: 'category',
            name: 'categories',
            header: 'Kategorie',
            id: 'CATEGORY_ID',
            button: 'Dodaj kategorię',
            columnNames: ['Nazwa', 'Akcja'],
            order: ['NAME'],
            actions: [
                {
                    name: 'edit',
                    label: 'Edytuj',
                    actionClass: 'editElem',
                },
                {
                    name: 'delete',
                    label: 'Usuń',
                    actionClass: 'deleteElem',
                },
            ],
            queries: {
                getOne: {
                    query: 'getCategory',
                    queryResult: 'getCategory',
                },
                getAll: {
                    query: 'getCategories',
                    queryResult: 'getCategories',
                },
                deleteOne: {
                    query: 'deleteCategory',
                    queryResult: 'deleteCategory',
                },
            },
        },
        shops: {
            configOverlayKey: 'shop',
            name: 'shops',
            header: 'Sklepy',
            id: 'SHOP_ID',
            button: 'Dodaj sklep',
            condition: 'isNotCentral',
            columnNames: ['Miasto', 'Ulica', 'ZIP', 'Telefon', 'Akcja'],
            order: ['ADDRESS.CITY', 'ADDRESS.STREET', 'ADDRESS.ZIP', 'ADDRESS.PHONE'],
            actions: [
                {
                    name: 'edit',
                    label: 'Edytuj',
                    actionClass: 'editElem',
                },
                {
                    name: 'delete',
                    label: 'Usuń',
                    actionClass: 'deleteElem',
                },
            ],
            queries: {
                getOne: {
                    query: 'getShop',
                    queryResult: 'getShop',
                },
                getAll: {
                    query: 'getAllShops',
                    queryResult: 'getShops',
                },
                deleteOne: {
                    query: 'deleteShop',
                    queryResult: 'deleteShop',
                },
            },
        },
        achievements: {
            configOverlayKey: 'achievement',
            name: 'achievements',
            header: 'Osiągnięcia',
            button: 'Dodaj osiągnięcie',
            id: 'ACHIEVEMENT_ID',
            columnNames: ['Nazwa', 'Warunek', 'Akcja'],
            order: ['NAME', 'CONDITION'],
            actions: [
                {
                    name: 'edit',
                    label: 'Edytuj',
                    actionClass: 'editElem',
                },
                {
                    name: 'delete',
                    label: 'Usuń',
                    actionClass: 'deleteElem',
                },
            ],
            queries: {
                getOne: {
                    query: 'getAchievement',
                    queryResult: 'getAchievement',
                },
                getAll: {
                    query: 'getAllAchievements',
                    queryResult: 'getAchievements',
                },
                deleteOne: {
                    query: 'deleteAchievement',
                    queryResult: 'deleteAchievement',
                },
            },
        },
    },
    configOverlayConfig: {
        invalidInputClass: 'configBox-inputSet_input--invalid',
        buttons: [
            {
                label: 'Zamknij',
                classes: 'configBox-button jsClose',
            },
            {
                label: 'Zapisz',
                classes: 'configBox-button jsSave',
            },
        ],
        game: {
            id: 'GAME_ID',
            headline: 'Gra:',
            inputs: [
                {
                    label: 'Tytuł',
                    name: 'TITLE',
                    required: true,
                },
                {
                    label: 'Liczba graczy',
                    name: 'NUMBER_OF_PLAYERS',
                    required: true,
                    pattern: '^[0-9]+-[0-9]+$',
                },
                {
                    label: 'Czas gry',
                    name: 'GAME_TIME',
                    required: true,
                    type: 'number',
                },
                {
                    label: 'Opłata',
                    name: 'BAIL',
                    required: true,
                    type: 'number',
                },
                {
                    label: 'Miniaturka',
                    name: 'IMAGE',
                    required: false,
                },
            ],
            textAreas: [
                {
                    label: 'Opis',
                    name: 'DESCRIPTION',
                    required: false,
                    type: 'textarea',
                },
            ],
            checkboxes: [
                {
                    query: 'getCategories',
                    queryResult: 'getCategories',
                    label: 'NAME',
                    name: 'NAME',
                    required: false,
                    field: 'CATEGORY',
                    type: 'checkbox',
                },
            ],
            queries: {
                updateOne: {
                    query: 'updateGame',
                    queryResult: 'updateGame',
                },
                getOne: {
                    query: 'getGame',
                    queryResult: 'getGame',
                },
                addNew: {
                    query: 'addGame',
                    queryResult: 'addGame',
                },
            },
        },
        achievement: {
            id: 'ACHIEVEMENT_ID',
            headline: 'Osiągnięcie',
            inputs: [
                {
                    label: 'Nazwa',
                    name: 'NAME',
                    required: true,
                },
                {
                    label: 'Warunek',
                    name: 'CONDITION',
                    type: 'number',
                    required: true,
                },
                {
                    label: 'Miniaturka',
                    name: 'IMAGE',
                    pattern: '^[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$',
                    required: false,
                },
            ],
            textAreas: [
                {
                    label: 'Opis',
                    name: 'DESCRIPTION',
                    required: false,
                    type: 'textarea',
                },
            ],
            queries: {
                updateOne: {
                    query: 'updateAchievement',
                    queryResult: 'updateAchievement',
                },
                getOne: {
                    query: 'getAchievement',
                    queryResult: 'getAchievement',
                },
                addNew: {
                    query: 'addAchievement',
                    queryResult: 'addAchievement',
                },
            },
        },
        shop: {
            id: 'SHOP_ID',
            headline: 'Sklep',
            inputs: [
                {
                    label: 'Miasto',
                    name: 'ADDRESS.CITY',
                    required: true,
                },
                {
                    label: 'Ulica',
                    name: 'ADDRESS.STREET',
                    required: true,
                },
                {
                    label: 'Telefon',
                    name: 'ADDRESS.PHONE',
                    pattern: '^\\d{9}$',
                    required: true,
                },
                {
                    label: 'ZIP',
                    name: 'ADDRESS.ZIP',
                    pattern: '^\\d{2}-\\d{3}$',
                    required: true,
                },
            ],
            checkboxes: [
                {
                    query: 'getEmployees',
                    queryResult: 'getEmployees',
                    label: 'EMPLOYEE_ID',
                    name: 'EMPLOYEE_ID',
                    required: false,
                    field: 'EMPLOYEES',
                    type: 'checkbox',
                },
            ],
            queries: {
                updateOne: {
                    query: 'updateShop',
                    queryResult: 'updateShop',
                },
                getOne: {
                    query: 'getShop',
                    queryResult: 'getShop',
                },
                addNew: {
                    query: 'addShop',
                    queryResult: 'addShop',
                },
            },
        },
        category: {
            id: 'CATEGORY_ID',
            headline: 'Kategoria',
            inputs: [
                {
                    label: 'Nazwa',
                    name: 'NAME',
                    required: true,
                },
            ],
            queries: {
                updateOne: {
                    query: 'updateCategory',
                    queryResult: 'updateCategory',
                },
                getOne: {
                    query: 'getCategory',
                    queryResult: 'getCategory',
                },
                addNew: {
                    query: 'addCategory',
                    queryResult: 'addCategory',
                },
            },
        },
    },
    contactConfig: {
        headline: 'Kontakt:',
        columnNames: ['Miasto', 'Ulica', 'Telefon', 'ZIP', 'Liczba pracowników'],
        order: ['ADDRESS.CITY', 'ADDRESS.STREET', 'ADDRESS.PHONE', 'ADDRESS.ZIP', 'NUMBER_OF_EMPLOYEES'],
    },
};

export default config;