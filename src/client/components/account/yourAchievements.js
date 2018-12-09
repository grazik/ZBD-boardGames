class YourAchievements {
    init() {
        this.appendHTML();
        this.addEvents();
    }

    appendHTML() {
        document.getElementsByClassName('account-mainContent')[0].innerHTML = this.generateHTML();
    }

    generateHTML() {
        return `<h2 class="section-header">Twoje Osiągnięcia:</h2>`;
    }

    addEvents() {

    }
}

export default new YourAchievements();