const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
console.log(dataBuffer);
console.log(dataBuffer.toString());

const data = JSON.parse(dataBuffer.toString());
data.name='Rishi';
data.age=32;

console.log(data);

fs.writeFileSync('1-json.json', JSON.stringify(data));