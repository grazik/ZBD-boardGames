import './scss/styles.scss';
import './components/loginPage';

if (!PRODUCTION) {
    import('./templates/loginPage.html');
}