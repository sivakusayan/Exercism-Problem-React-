/**
 * A cell with settable values.
 */
class InputCell {
  /**
   * Constructs an instance of InputCell
   * with the defined value.
   *
   * @param value
   *  The value to assign to this InputCell.
   */
  constructor(value) {
    this.value = value;
    this.computeCells = [];
  }

  /**
   * Sets the value of this instance
   * of InputCell.
   */
  setValue(value) {
    for (const computeCell of this.computeCells) {
      computeCell.saveValue();
    }
    this.value = value;
    this.notifyComputeCells();
  }

  /**
   * Creates a record that this cell's value
   * is being used by the specified computeCell.
   *
   * @param {Object} computeCell
   *  The compute cell to add
   */
  addToComputeCells(computeCell) {
    if (!this.computeCells.includes(computeCell)) {
      this.computeCells.push(computeCell);
    }
  }

  /**
   * Notifies the compute cells that reference
   * this cell that its value has been changed.
   */
  notifyComputeCells() {
    for (const computeCell of this.computeCells) {
      computeCell.onArgUpdate();
    }
  }
}

module.exports = InputCell;
