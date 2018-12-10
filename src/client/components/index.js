import './slider/slider';
import menu from './menu/menu';
import account from './account/index';

menu.init();

if (!PRODUCTION) {
    account.init();
}