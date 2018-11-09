/**
 * A cell whose values are computed from other cells.
 */
module.exports = class ComputeCell {
  /**
   * Constructs an instance of ComputeCell
   * with the defined inputs and
   * computation callback.
   *
   * @param inputCells
   *  The cells to use as input in the callback.
   * @param callback
   *  A function that will be used to do computations
   *  with this instance's input cells
   */
  constructor(inputCells, callback) {
    this.inputCells = inputCells;
    this.callback = callback;
  }

  /**
   * @returns
   *  The return value of callback when called
   *  with the argument inputCells.
   */
  get value() {
    return this.callback(this.inputCells);
  }
};
