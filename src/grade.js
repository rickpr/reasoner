/* Grade class
 * Attributes:
 * letter: String, the letter grade
 * order: Integer, where this ranks in the partially ordered set
 */

Base = require("./base.js");

class Grade extends Base {
  constructor(letter) {
    super();
    this.letter = letter;
    this.order  = Grade.grade_order(order);
  }

  // Compare this to see if requirement's grade precedes the student's grade
  preceq(grade) {
    return this.order <= grade.order;
  }

  static grade_order(letter) {
    require("./grade_order.json")[letter] || 0;
  }
}

module.exports = Grade;
