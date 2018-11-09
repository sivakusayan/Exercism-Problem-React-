/**
 * A cell with settable values.
 */
module.exports = class InputCell {
  /**
   * Constructs an instance of InputCell
   * with the defined value.
   *
   * @param value
   *  The value to assign to this InputCell.
   */
  constructor(value) {
    this.value = value;
  }

  /**
   * Sets the value of this instance
   * of InputCell.
   */
  setValue(value) {
    this.value = value;
  }
};
