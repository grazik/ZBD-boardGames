import './slider/slider';
import menu from './menu/menu';
import games from './games/index';

menu.init();

if (!PRODUCTION) {
    games.init();
}

if (module.hot) {
    module.hot.accept(['./games'], () => {
        games.init();
        const a = document.getElementsByClassName('overlay');
        if (a.length) {
            document.getElementsByTagName('body')[0].removeChild(a[0]);
        }
    });
}