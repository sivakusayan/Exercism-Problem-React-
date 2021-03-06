/**
 * A cell containing a callback. Whenever a cell that is subscribed to this
 * callback cell has its value changed, the callback cell will push the
 * new value into the values array.
 *
 * @property {Function} callback
 *  The callback that is invoked
 * @property {*[]} values
 *  Keeps track of values fed by compute cells.
 */
module.exports = class CallbackCell {
  /**
   * Constructs an instance of CallbackCell
   * with the defined value.
   *
   * @param {Function} callback
   *  The callback to assign to this CallbackCell.
   */
  constructor(callback) {
    this.callback = callback;
    this.values = [];
  }

  /**
   * Invokes the callback with the specified cell,
   * and pushes the return value into values.
   *
   * @param {Object} cell
   *  The desired cell argument
   */
  addToValues(cell) {
    this.values.push(this.callback(cell));
  }
};
