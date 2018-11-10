/**
 * A cell whose values are computed from other cells.
 *
 * @property {Object[]} argCells
 *  Cells being used as arguments for this cell
 * @property {Function} fn
 *  The function that determines what computations
 *  to do with the argCells
 * @property {Object[]} callbackCells
 *  Cells whose callback are invoked whenever this cell's value changes.
 * @property {*} prevValue
 *  Keeps track of the cell's previous value before an arg cell changes.
 */
class ComputeCell {
  /**
   * Constructs an instance of ComputeCell
   * with the defined args and
   * computation callback.
   *
   * @param {Object[]}argCells
   *  The cells to use as arguments in the callback.
   * @param {Function} fn
   *  A function that will be used to do computations
   *  with this instance's arg cells
   */
  constructor(argCells, fn) {
    this.argCells = argCells;
    this.fn = fn;
    this.callbackCells = [];
    this.prevValue = null;

    // Link any arg cells that influence
    // this cell's value
    this.linkArgCells(this);
  }

  /**
   * Goes down the dependency graph, starting at
   * computeCell, and adds it into the computeCell
   * list of every input cell that is visited. Traverses
   * the graph by recursion.
   *
   * @param {Object} computeCell
   *  The compute cell to start from
   *
   */
  linkArgCells(computeCell) {
    for (const argCell of this.argCells) {
      // If argCell is an instance of ComputeCell
      if (argCell.argCells) {
        argCell.linkArgCells(computeCell);
      // Else, it must be an InputCell
      } else {
        argCell.addToComputeCells(computeCell);
      }
    }
  }

  /**
   * Saves the current value into previous value, and
   * does the same for the compute cells above it.
   * Used before an arg cell is updated.
   */
  saveValue() {
    this.prevValue = this.value;
  }

  /**
   * @returns
   *  The return value of fn when called
   *  with the argument argCells.
   */
  get value() {
    return this.fn(this.argCells);
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
   * Invoked whenever a relevant input cell is updated.
   * Checks if this cell's previous value is different from
   * its current value. If it is, call all the added
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
