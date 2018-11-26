import Siema from 'siema';

class Slider {
    constructor() {
        this.siema = new Siema({
            loop: true,
            duration: 500,
        });
        // setInterval(() => this.siema.next(), 3000);
    }
}

export default new Slider();