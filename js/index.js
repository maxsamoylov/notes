window.onload = () => {
    let noteManager = new NoteManager('notesContainer');

    let form = new NoteForm(
        noteManager,
        'headerInput',
        'headerError',
        'textInput',
        'textError',
        'noteSubmit'
    );
};