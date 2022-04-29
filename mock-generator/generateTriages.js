const fs = require('fs');
const users = JSON.parse(fs.readFileSync('mock/users.json', 'utf8'));
const patients = JSON.parse(fs.readFileSync('mock/patients.json', 'utf8'));

//read args from command line
const args = process.argv.slice(2);
let num = args[0] || 50;
num = num > 0 ? num : 50;

const filename = args[1] || 'mock/triages.json';

function idsByType(type) {
  return users.filter(user => user.role === type).map(user => user.id);
}

function getRandomId(ids) {
  return ids[Math.floor(Math.random() * ids.length)];
}
function loremIpsum(num) {
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(' ').slice(0, num).join(' ');
}

function randomBoolean() {
  return Math.random() >= 0.5;
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function randomTriageColor() {
  return ['GREEN', 'YELLOW', 'RED', 'WHITE', 'BLACK'][Math.floor(Math.random() * 5)];
}

const doctorsIds = idsByType('DOCTOR');
const operatorsIds = idsByType('OPERATOR');
const patientsIds = patients.map(patient => patient.id);


let triages = [];
for (let i = 1; i <= num; i++) {
  const doctorId = Number(getRandomId(doctorsIds));
  const patientId = Number(getRandomId(patientsIds));
  const operatorId = Number(getRandomId(operatorsIds));
  const triageDate = getRandomDate(new Date(2017, 0, 1), new Date());
  const state = randomBoolean();
  const notes = loremIpsum(Math.floor(Math.random() * 20));
  const triageColor = randomTriageColor();
  const triage = {
    id: i,
    doctorId,
    patientId,
    operatorId,
    triageDate,
    state,
    notes,
    triageColor,
  };
  triages.push(triage);
}

fs.writeFileSync(filename, JSON.stringify(triages, null, 2));





