'use strict';

const fs = require('fs');

let student = new Date();
console.log(student)
let data = JSON.stringify(student);
fs.writeFileSync('date.json', data);