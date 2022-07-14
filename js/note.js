class Note {
    constructor(noteManager) {
        this.noteManager = noteManager;
        this.header = '';
        this.text = '';

        this.noteElement = null;
        this.headerElement = null;
        this.textElement = null;
        this.headerInput = null;
        this.textInput = null;
        this.deleteElement = null;
    }

    createElement(elementName, className, textContent) {
        let element = document.createElement(elementName);
        element.className = className;

        switch (String(elementName)) {
            case 'input':
                element.type = 'text';
                element.value = textContent;
                break;
            case 'img':
                element.src = textContent;
                element.title = 'Удалить';
                break;
            default:
                element.textContent = textContent;
        }

        return element;
    }

    createNoteElement() {
        this.headerElement = this.createElement('div', 'noteHeader visible', this.header);
        this.headerElement.addEventListener('click', this.headerClick.bind(this));
        this.headerInput = this.createElement('input', 'invisible', this.header);
        this.headerInput.addEventListener('keypress', this.headerInputKeypress.bind(this));

        this.textElement = this.createElement('div', 'noteText visible', this.text);
        this.textElement.addEventListener('click', this.textClick.bind(this));
        this.textInput = this.createElement('input', 'invisible', this.text);
        this.textInput.addEventListener('keypress', this.textInputKeypress.bind(this));

        this.deleteElement = this.createElement('img', 'noteDeleteButton', 'images/delete.png');
        this.deleteElement.addEventListener('click', this.deleteClick.bind(this));

        let noteContents = this.createElement('div', 'noteContents', '');
        noteContents.appendChild(this.headerElement);
        noteContents.appendChild(this.headerInput);
        noteContents.appendChild(this.textElement);
        noteContents.appendChild(this.textInput);
        noteContents.appendChild(this.deleteElement);

        this.noteElement = this.createElement('div', 'note noteFlex', '');
        this.noteElement.appendChild(noteContents);

        return this.noteElement;
    }

    removeNoteElement() {
        if (this.noteElement) {
            this.noteElement.remove();
        }
    }

    getNoteElement() {
        return this.noteElement;
    }

    setHeader(header) {
        if (typeof header === 'string' && header.length >= 1) {
            this.header = header;
            if (this.noteElement) {
                this.headerElement.textContent = this.header;
                this.headerInput.value = this.header;
            }
            return true;
        } else {
            return false;
        }
    }

    getHeader() {
        return this.header;
    }

    setText(text) {
        if (typeof text === 'string' && text.length >= 10) {
            this.text = text;
            if (this.noteElement) {
                this.textElement.textContent = this.text;
                this.textInput.value = this.text;
            }
            return true;
        } else {
            return false;
        }
    }

    getText() {
        return this.text;
    }

    toObject() {
        return {
            header: this.getHeader(),
            text: this.getText()
        };
    }

    fromObject(obj) {
        this.setHeader(obj.header);
        this.setText(obj.text);
        return this.createNoteElement();
    }

    deleteClick(event) {
        event.stopPropagation();
        this.noteManager.deleteNote(this);
    }

    headerClick() {
        this.headerElement.className = 'invisible';
        this.headerInput.className = 'noteInput visible';
        this.headerInput.focus();
    }

    headerInputKeypress(event) {
        if (event.key !== 'Enter') return;

        if (this.setHeader(this.headerInput.value)) {
            this.headerElement.className = 'noteHeader visible';
            this.headerInput.className = 'invisible';
            this.noteManager.save();
        } else {
            this.headerInput.classList.add('redBg');
        }
    }

    textClick() {
        this.textElement.className = 'invisible';
        this.textInput.className = 'noteInput visible';
        this.textInput.focus();
    }

    textInputKeypress(event) {
        if (event.key !== 'Enter') return;

        if (this.setText(this.textInput.value)) {
            this.textElement.className = 'noteText visible';
            this.textInput.className = 'invisible';
            this.noteManager.save();
        } else {
            this.textInput.classList.add('redBg');
        }
    }
}