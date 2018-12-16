import './slider/slider';
import menu from './menu/menu';
import account from './account/index';

import games from './games/index';

menu.init();

if (!PRODUCTION) {
    games.init();
}

if (module.hot) {
    module.hot.accept(['./games'], () => {
        games.init();
    });
}