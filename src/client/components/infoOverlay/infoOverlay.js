import config from '../indexConfig';
import helpers from '../helpers';
import updatePopUp from '../updatePopUp/updatePopUp';
import queries from '../queries';
import globals from '../globals';

const { infoOverlayConfig } = config;

class InfoOverlay {
    constructor(game, updateRow, caller, parentRow) {
        this.game = game;
        this.createOverlay();
        this.addEvents();
        this.selectRating(this.gameRating, this.game.OPINION);
        this.selectRating(this.yourRating, this.game.YOUR_OPINION);
        this.updateRow = updateRow;
        this.caller = caller;
        this.objToModify = parentRow;
        globals.body.appendChild(this.overlay);
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add(config.overlayClass, config.closeElement);
        this.overlay = overlay;
        this.addContent();
    }

    addContent() {
        const descriptionBox = document.createElement('div');
        descriptionBox.className = 'descriptionBox';

        descriptionBox.appendChild(this.addHeader());
        descriptionBox.appendChild(this.addBody());
        descriptionBox.appendChild(this.addFooter());

        this.overlay.appendChild(descriptionBox);
    }

    addHeader() {
        const header = document.createElement('div');
        header.className = 'descriptionBox-header';
        header.innerHTML = `<h3 class="section-header">${this.game.TITLE}</h3>`;
        return header;
    }

    addBody() {
        const body = document.createElement('div'),
            details = document.createElement('div'),
            { IMAGE, DESCRIPTION } = this.game;

        body.className = 'descriptionBox-body';
        details.className = 'descriptionBox-details';

        if (IMAGE) {
            body.appendChild(this.addImage(IMAGE));
        }

        body.appendChild(details);

        if (DESCRIPTION) {
            details.appendChild(this.addDescription(DESCRIPTION));
        }

        details.appendChild(this.addDetailsList(this.game));

        return body;
    }

    addDetailsList(game) {
        const list = document.createElement('ul');
        list.className = 'descriptionBox-detailsList';

        infoOverlayConfig.listValues.forEach((elem) => {
            const listItem = document.createElement('li');

            listItem.className = 'descriptionBox-detailsList_item';
            listItem.innerHTML = `<h3 class="descriptionBox-detailsList_label">${elem.label}</h3>
                <span class="descriptionBox-detailsList_value">${game[elem.key]}</span>`;

            list.appendChild(listItem);
        });

        infoOverlayConfig.ratingConfig.forEach((rating) => {
            list.appendChild(this.addRating(rating));
        });

        return list;
    }

    addImage(image) {
        const imageContainer = document.createElement('div'),
            imageURL = require(`../../images/games/${image}`);

        imageContainer.className = 'descriptionBox-image';
        imageContainer.style.backgroundImage = `url(${imageURL})`;

        imageContainer.innerHTML = `<img src="${imageURL}" alt="${image.split('.')[0]}"/>`;
        return imageContainer;
    }

    addDescription(description) {
        const text = document.createElement('p');
        text.className = 'descriptionBox-text';
        text.innerText = `${decodeURIComponent(description)}`;

        return text;
    }

    addRating({ label, id, isDisabled }) {
        const listItem = document.createElement('li'),
            ratingContainer = document.createElement('div'),
            fieldset = document.createElement('fieldset');

        ratingContainer.className = 'ratingContainer';
        listItem.className = 'descriptionBox-detailsList_item';
        listItem.innerHTML = `<h3 class="descriptionBox-detailsList_label">${label}</h3>`;
        fieldset.classList.add('rating');
        if (isDisabled) {
            fieldset.classList.add('disabled');
        }

        infoOverlayConfig.stars.forEach((value) => {
            let starType = '',
                maxValue;
            if (value === '00') {
                starType = 'clear';
                maxValue = 1.0;
            } else if (value === '10') {
                starType = 'full';
                maxValue = 1.25;
            } else {
                starType = 'half';
                maxValue = Number(value) / 10 + 0.25;
            }

            fieldset.innerHTML += `<label class="star star--${starType}" for="${id}${value}"></label>
                <input type="radio" id="${id}${value}" value="${Number(value) / 10}" data-max="${maxValue}" name="${id}" ${isDisabled ? 'disabled' : ''}>`;
        });

        ratingContainer.appendChild(fieldset);
        ratingContainer.innerHTML += '<span class="descriptionBox-detailsList_value">0/5</span>';

        listItem.appendChild(ratingContainer);

        this[id] = ratingContainer;
        return listItem;
    }

    addFooter() {
        const footer = document.createElement('div'),
            buttons = document.createElement('div'),
            rentButton = this.generateRentButton();

        footer.className = 'descriptionBox-footer';

        buttons.className = 'descriptionBox-footer_buttons';
        buttons.innerHTML = `<a href="#" class="descriptionBox-footer_button ${config.closeElement}">Zamknij</a>`;
        buttons.appendChild(rentButton);

        this.buttons = buttons;
        this.rentButton = rentButton;
        footer.appendChild(buttons);
        return footer;
    }

    generateRentButton() {
        let rentButton;

        if (this.game.AVAILABILITY) {
            rentButton = document.createElement('a');
            rentButton.href = '#';
            rentButton.classList.add(config.rentGame);
        } else {
            rentButton = document.createElement('span');
            rentButton.classList.add('descriptionBox-footer_button--disabled');
        }

        rentButton.classList.add('descriptionBox-footer_button');
        rentButton.innerText = 'Wypozycz';

        return rentButton;
    }

    addEvents() {
        this.overlay.addEventListener('click', (e) => {
            this.onClick(e);
        });

        this.overlay.addEventListener('change', (e) => {
            this.onChange(e.target);
        });
    }

    onChange(target) {
        helpers.sendRequest('/api', queries.rateGame(this.game.GAME_ID, Number(target.value)))
            .then((data) => {
                const results = data.data.rateGame;
                this.selectRating(this.gameRating, results.OPINION);
                this.selectRating(this.yourRating, results.YOUR_OPINION);
                updatePopUp.init('Sukces', 'Zapisano głos', true);
            })
            .catch(err => console.log(err));
    }

    onClick(e) {
        const { target } = e;
        if (target.classList.contains(config.closeElement)) {
            e.preventDefault();
            this.closeOverlay();
        } else if (target.classList.contains(config.rentGame)) {
            e.preventDefault();
            this.rentGame();
        }
    }

    rentGame() {
        helpers.rentGame(this.game.GAME_ID)
            .then((data) => {
                this.game.AVAILABILITY = false;
                if (data) {
                    const newRentButton = this.generateRentButton();
                    updatePopUp.init('Sukces', 'Udalo sie wypozyczyc gre', true);
                    this.buttons.replaceChild(newRentButton, this.rentButton);
                    this.rentButton = newRentButton;
                    this.updateRow.call(this.caller, this.objToModify, this.game.GAME_ID);
                } else {
                    updatePopUp.init('Porażka', 'Wystapil blad przy wypożyczeniu gry', false);
                }
            });
    }

    closeOverlay() {
        globals.body.removeChild(this.overlay);
        this.overlay = null;
    }

    selectRating(rating, value) {
        const inputs = Array.prototype.slice
                .call(rating.querySelectorAll('input')),
            realValue = value || 0;
        inputs.find(elem => Number(elem.dataset.max) > realValue).checked = true;
        rating.getElementsByClassName('descriptionBox-detailsList_value')[0].innerText = `${realValue}/5`;
    }
}

export {
    InfoOverlay
};