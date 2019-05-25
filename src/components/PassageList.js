import Component from './Component.js';
import Logo from './Logo.js';
import PassageLink from './PassageLink.js';
import Footer from './Footer.js';
import passageApi from '../services/passage-api.js';

import templatePassages from '../services/passage-data.js';

class PassageList extends Component {

    render() {
        const dom = this.renderDOM();

        const logo = new Logo();
        const logoDOM = logo.render();

        const footer = new Footer();
        const footerDOM = footer.render();

        const passageParent = dom.querySelector('#passage-list');

        const main = dom.querySelector('main');

        let passages = passageApi.getAll();
        let templateArray = [];

        templatePassages.forEach(passage => {
            if(!passageApi.get(passage.id)) {
                templateArray.push(passage);
                passageApi.save(passage);
            }
        });

        passages = templateArray.concat(passages);

        passages.forEach(passage => {
            const passageLink = new PassageLink({ passage });
            const passageLinkDOM = passageLink.render();
            passageParent.appendChild(passageLinkDOM);
        });

        dom.insertBefore(logoDOM, main);
        dom.appendChild(footerDOM);

        return dom;
    }

    renderTemplate() {
        return /*html*/`
        <div class="container">
            <main>
                <h1>Choose a lesson!</h1>
                <section id="passage-list"></section>
            </main>
        </div>
       
    `;
    }

}

export default PassageList;