class NoteForm {
    constructor(noteManager, headerInputId, headerErrorId, textInputId, textErrorId, submitButtonId) {
        this.noteManager = noteManager;

        this.headerInput = document.getElementById(headerInputId);
        this.headerErrorDiv = document.getElementById(headerErrorId);
        this.textInput = document.getElementById(textInputId);
        this.textErrorDiv = document.getElementById(textErrorId);
        this.submitButton = document.getElementById(submitButtonId);

        if (this.noteManager
            && this.headerInput
            && this.headerErrorDiv
            && this.textInput
            && this.textErrorDiv
            && this.submitButton
        ) {
            this.submitButton.addEventListener('click', this.submit.bind(this));
        } else {
            alert('Ошибка! Проверьте параметры конструктора NoteForm.');
        }
    }

    clear() {
        this.headerInput.value = '';
        this.textInput.value = '';
    }

    submit(event) {
        event.preventDefault();

        let isError = false;
        let note = new Note(this.noteManager);

        if (note.setText(this.textInput.value)) {
            this.textInput.className = 'noteInput';
            this.textErrorDiv.className = 'invisible';
        } else {
            this.textInput.className = 'noteInput redBg';
            this.textErrorDiv.className = 'errorDiv';
            this.textInput.focus();
            isError = true;
        }

        if (note.setHeader(this.headerInput.value)) {
            this.headerInput.className = 'noteInput';
            this.headerErrorDiv.className = 'invisible';
        } else {
            this.headerInput.className = 'noteInput redBg';
            this.headerErrorDiv.className = 'errorDiv';
            this.headerInput.focus();
            isError = true;
        }

        if (!isError) {
            this.noteManager.addNote(note);
            this.clear();
            this.headerInput.focus();
        }
    }
}