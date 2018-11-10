const InputCell = require('./InputCell');
const ComputeCell = require('./ComputeCell');
const CallbackCell = require('./CallbackCell');

const inputCell = new InputCell(1);
const output = new ComputeCell(
  [inputCell],
  inputs => inputs[0].value + 1,
);

const callback1 = new CallbackCell(cell => cell.value);
const callback2 = new CallbackCell(cell => cell.value);

output.addCallback(callback1);
output.addCallback(callback2);

inputCell.setValue(31);

output.removeCallback(callback1);

const callback3 = new CallbackCell(cell => cell.value);
output.addCallback(callback3);

inputCell.setValue(41);

console.log(callback1.values);

// expect(callback1.values).toEqual([32]);
// expect(callback2.values).toEqual([32, 42]);
// expect(callback3.values).toEqual([42]);

module.exports = {
  InputCell,
  ComputeCell,
  CallbackCell,
};
