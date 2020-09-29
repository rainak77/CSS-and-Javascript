export class Modal {
    constructor(contentId, fallBackText) {
        this.fallBackText = fallBackText;
        this.contentTemplateEl = document.getElementById(contentId);
        this.modalTemplateEL = document.getElementById('modal-template');
    }
    show() {
        if ('content' in document.createElement('template')) {
            const modalElements = document.importNode(this.modalTemplateEL.content, true);

            this.modalElement = modalElements.querySelector('.modal');
            this.backdropElement = modalElements.querySelector('.backdrop');

            const contentElement = document.importNode(this.contentTemplateEl.content, true);
            this.modalElement.appendChild(contentElement);

            document.body.insertAdjacentElement('afterbegin', this.modalElement);
            document.body.insertAdjacentElement('afterbegin', this.backdropElement);

        } else {
            alert(this.fallBackText);
        }
    }
    hide() {
        if (this.modalElement) {
            document.body.removeChild(this.modalElement);
            document.body.removeChild(this.backdropElement);
            this.modalElement = null;
            this.backdropElement = null;
        }
    }
}