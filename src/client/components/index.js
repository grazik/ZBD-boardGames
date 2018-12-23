import './slider/slider';
import menu from './menu/menu';
import account from './account/index';
import games from './account/yourGames';

menu.init();

if (!PRODUCTION) {
    account.init();
    games.init();
}

if (module.hot) {
    module.hot.accept(['./account'], () => {
        account.init();
        games.init();
    });
}