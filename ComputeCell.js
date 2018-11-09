/**
 * A cell whose values are computed from other cells.
 */
class ComputeCell {
  /**
   * Constructs an instance of ComputeCell
   * with the defined args and
   * computation callback.
   *
   * @param ArgCells
   *  The cells to use as arguments in the callback.
   * @param fn
   *  A function that will be used to do computations
   *  with this instance's arg cells
   */
  constructor(argCells, fn) {
    this.argCells = argCells;
    this.fn = fn;
    this.callbackCells = [];
    this.prevValue = null;

    this.linkInputCells(this);
  }

  linkInputCells(computeCell) {
    for (const argCell of this.argCells) {
      if (argCell.argCells) {
        argCell.linkInputCells(computeCell);
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
   * Invoked whenever an arg value is updated.
   * Checks if the previous value is different from
   * the current value. If it is, call all the added
   * callback cells.
   */
  onArgUpdate() {
    if (this.prevValue !== this.value) {
      // Notify callback cells subscribed to changes
      for (const callbackCell of this.callbackCells) {
        callbackCell.addToValues(this);
      }
    }
  }
}

module.exports = ComputeCell;
