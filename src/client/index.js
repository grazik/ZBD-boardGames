import './scss/styles.scss';
import './components/index';

if (!PRODUCTION) {
    import('./templates/index.hbs');
    import('./templates/partials/header.hbs');
}