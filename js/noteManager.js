class NoteManager {
    constructor(notesContainerId) {
        this.notesContainer = document.getElementById(notesContainerId);

        if (!this.notesContainer) {
            alert('Ошибка! Проверьте параметры конструктора NoteManager');
        }

        this.notes = null;
        this.load();
    }

    load() {
        this.notes = [];
        let notes = localStorage.getItem('notes');

        if (notes) {
            notes = JSON.parse(notes);
            notes.forEach(element => {
                let note = new Note(this);
                note.fromObject(element);
                this.notes.push(note);
                this.notesContainer.appendChild(note.getNoteElement());
            });
        }
    }

    save() {
        let notes = [];
        this.notes.forEach(element => {
            notes.push(element.toObject());
        });

        localStorage.setItem('notes', JSON.stringify(notes));
    }

    addNote(note) {
        note.createNoteElement();
        this.notes.push(note);
        this.notesContainer.appendChild(note.getNoteElement());
        this.save();
    }

    deleteNote(note) {
        let index = this.notes.indexOf(note);
        if (index > -1) {
            note.removeNoteElement();
            this.notes.splice(index, 1);
            this.save();
        }
    }
}