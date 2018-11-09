const InputCell = require('./InputCell');
const ComputeCell = require('./ComputeCell');

const inputCell = new InputCell(10);
const computeCell = new ComputeCell([inputCell], inputCells => inputCells[0].value * 2);

console.log(computeCell.value);
