/* Grade class
 * Attributes:
 * letter: String, the letter grade
 * order: Integer, where this ranks in the partially ordered set
 */
class Grade {
  constructor(letter, order) {
    this.letter = letter;
    this.order  = order;
  }

  // Compare this to see if requirement's grade precedes the student's grade
  preceq(grade) {
    return this.order <= grade.order;
  }
}
