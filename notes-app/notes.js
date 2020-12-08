const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes';
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if(!duplicateNote) { 
        console.log(chalk.red.inverse('Note title taken!'));
        return;
    }

    notes.push({
        title: title,
        body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if(notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse('No note found!'));
        return;
    }
    
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note removed!'));
}

const listNotes = () => {
    console.log(chalk.green.inverse('Your notes:'));
    loadNotes().forEach(note => {
        console.log(`Title: ${note.title}`);
    });
}

const readNote = (title) => {
    const noteFound = loadNotes().find(note => note.title === title);
    if(!noteFound) {
        console.log(chalk.red.inverse('Note not found!'));
        return;
    }

    console.log(chalk.green.inverse(`Title: ${noteFound.title}\nBody: ${noteFound.body}`));
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json',  JSON.stringify(notes));
}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch(e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}