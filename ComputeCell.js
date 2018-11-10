/**
 * A cell whose values are computed from other cells.
 *
 * @property {Object[]} inputCells
 *  Cells being used as inputs for this cell
 * @property {Function} fn
 *  The function that determines what computations
 *  to do with the inputCells
 * @property {Object[]} callbackCells
 *  Cells whose callback are called whenever this cell's value changes.
 * @property {*} prevValue
 *  Keeps track of the cell's previous value before an input cell changes.
 */
class ComputeCell {
  /**
   * Constructs an instance of ComputeCell
   * with the defined inputs and
   * computation callback.
   *
   * @param {Object[]}inputCells
   *  The cells to use as inputuments in the callback.
   * @param {Function} fn
   *  A function that will be used to do computations
   *  with this instance's input cells
   */
  constructor(inputCells, fn) {
    this.inputCells = inputCells;
    this.fn = fn;
    this.callbackCells = [];
    this.prevValue = null;

    this.linkInputCells(this);
  }

  /**
   * Goes down the dependency graph, starting at
   * computeCell, and adds that computeCell into
   * the computeCell list of every input cell that
   * is visited.
   *
   * @param {Object} computeCell
   *  The compute cell to start from
   *
   */
  linkInputCells(computeCell) {
    for (const inputCell of this.inputCells) {
      if (inputCell.inputCells) {
        inputCell.linkInputCells(computeCell);
      } else {
        inputCell.addToComputeCells(computeCell);
      }
    }
  }

  /**
   * Saves the current value into previous value, and
   * does the same for the compute cells above it.
   * Used before an input cell is updated.
   */
  saveValue() {
    this.prevValue = this.value;
  }

  /**
   * @returns
   *  The return value of fn when called
   *  with the inputument inputCells.
   */
  get value() {
    return this.fn(this.inputCells);
  }

  /**
   * Add a callback cell whose callback will be
   * invoked everytime the value of this instance
   * changes.
   *
   * @param {Object} callbackCell
   *  The callbackCell to add
   */
  addCallback(callbackCell) {
    this.callbackCells.push(callbackCell);
  }

  /**
   * Unsubscribes a callback cell from this cell.
   *
   * @param {Object} callbackCell
   *  The callbackCell to unsubscribe
   */
  removeCallback(callbackCell) {
    this.callbackCells = this.callbackCells.filter(cell => cell !== callbackCell);
  }

  /**
   * Invoked whenever an input value is updated.
   * Checks if the previous value is different from
   * the current value. If it is, call all the added
   * callback cells.
   */
  onInputUpdate() {
    if (this.prevValue !== this.value) {
      // Notify callback cells subscribed to changes
      for (const callbackCell of this.callbackCells) {
        callbackCell.addToValues(this);
      }
    }
  }
}

module.exports = ComputeCell;
