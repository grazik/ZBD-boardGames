import config from '../indexConfig';
import helpers from '../helpers';
import queries from '../queries';

class YourAchievements {
    init() {
        this.achievements = {};
        helpers.sendRequest('/api', queries.getAllAchievements())
            .then(() => this.appendHTML());
    }

    appendHTML() {
        const accountMainContent = document.createElement('div'),
            account = document.getElementsByClassName('account')[0],
            oldMainContent = account.getElementsByClassName('account-mainContent')[0];

        accountMainContent.className = 'account-mainContent';
        accountMainContent.innerHTML = '<h2 class="section-header">Twoje Osiągnięcia:</h2>';
        accountMainContent.appendChild(this.generateContent());

        account.replaceChild(accountMainContent, oldMainContent);
    }

    generateContent() {
        const content = document.createElement('div');
        content.className = 'account-content';

        helpers.sendRequest('/api', queries.getAllAchievements())
            .then(({ data }) => data.getAchievements)
            .then((context) => {
                context.forEach(achievement => content.appendChild(this.generateAchievementBox(achievement)));
            })
            .then(() => this.getUserAchievements())
            .then(({ data }) => {
                const { getUserAchievements } = data;
                getUserAchievements.forEach(({ NAME }) => {
                    this.achievements[NAME].classList.remove('account-achievementBox--grey');
                });
            });

        return content;
    }

    getUserAchievements() {
        return helpers.sendRequest('/api', queries.getUserAchievements());
    }

    generateAchievementBox({ NAME, CONDITION, IMAGE, DESCRIPTION }) {
        const box = document.createElement('div'),
            boxContent = document.createElement('div'),
            header = document.createElement('h3'),
            conditionElem = document.createElement('span'),
            text = document.createElement('p');

        box.className = 'account-achievementBox account-achievementBox--grey';
        boxContent.className = 'account-achievementBox_content';
        text.className = 'account-achievementBox_text';
        header.className = 'account-header';
        header.innerText = NAME;

        text.innerText = decodeURIComponent(DESCRIPTION);
        conditionElem.innerText = `Warunek: ${decodeURIComponent(CONDITION)}`;

        box.appendChild(header);
        box.appendChild(boxContent);
        box.appendChild(conditionElem);

        boxContent.appendChild(this.addImage(IMAGE));
        boxContent.appendChild(text);

        this.achievements[NAME] = box;
        return box;
    }


    addImage(image) {
        const imageContainer = document.createElement('div'),
            imageURL = require(`../../images/achievements/${image}`);

        imageContainer.className = 'account-achievementBox_image';
        imageContainer.style.backgroundImage = `url(${imageURL})`;

        imageContainer.innerHTML = `<img src="${imageURL}" alt="${image.split('.')[0]}"/>`;
        return imageContainer;
    }
}

export default new YourAchievements();