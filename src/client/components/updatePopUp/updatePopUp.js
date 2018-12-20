import globals from '../globals';
import helpers from '../helpers';
import config from '../indexConfig';

class UpdatePopUp {
    init(title, text, isPositive) {
        this.title = title;
        this.text = text;
        this.isPositive = isPositive;

        if (this.popUp) {
            this.popUp = helpers.replaceChild(globals.body, this.popUp, this.generateHTML());
            clearTimeout(this.timeout);
        } else {
            this.appendPopUp();
        }

        this.timeout = setTimeout(() => this.removePopUp(), 3000);

        setTimeout(() => helpers.toggleClass(this.popUp, config.invisibleClass), 0);
        this.addEvents();
    }

    appendPopUp() {
        const elem = document.createElement('div');
        elem.innerHTML = this.generateHTML();
        this.popUp = elem.firstChild;
        globals.body.appendChild(elem.firstChild);
    }

    generateHTML() {
        let content = '';

        if (this.isPositive) {
            content += `<div class="updatePopUp ${config.invisibleClass}">`;
        } else {
            content += `<div class="updatePopUp updatePopUp--failure ${config.invisibleClass}">`;
        }

        content += `<div class="updatePopUp-header">
                        <h3 class="updatePopUp-title">${this.title}</h3>
                        <span class="updatePopUp-close">X</span>
                    </div>
                   <p class="updatePopUp-text">${this.text}</p>
                </div>`;
        return content;
    }

    addEvents() {
        this.popUp.addEventListener('click', (e) => {
            this.removePopUp();
        });
    }

    removePopUp() {
        clearTimeout(this.timeout);
        helpers.toggleClass(this.popUp, config.invisibleClass);
        setTimeout(() => {
            globals.body.removeChild(this.popUp);
            this.popUp = null;
        }, 300);
    }
}

export default new UpdatePopUp();