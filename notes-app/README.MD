This is a simple notes application where a user can create, read, remove and list all the existing notes.

Every note contains a title and a body. The entire data is persisted in the file system and stored in a notes.json file.

The application works through command line. Below are the examples of the four commands supported for each operation through command line:

1. Create note: node app.js add --title=<<title of the note>> --body=<<body of the note>>
2. Remove note: node app.js remove --title=<<title of the note>>
3. List note: node app.js list
4. Read note: node app.js read --title=<<title of the note>>


Rishi Bhalla