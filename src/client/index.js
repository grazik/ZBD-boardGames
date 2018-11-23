import './scss/styles.scss';
import './components/index';

if (!PRODUCTION) {
    import('./templates/index.html');
}