const InputCell = require('./InputCell');
const ComputeCell = require('./ComputeCell');
const CallbackCell = require('./CallbackCell');

const inputCell = new InputCell(1);
console.log(!!inputCell.argCells);

module.exports = {
  InputCell,
  ComputeCell,
  CallbackCell,
};
