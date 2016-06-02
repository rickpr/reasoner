class Grade {
  constructor(letter, order) {
    this.letter = letter;
    this.order  = order;
  }

  preceq(grade) {
    return this.order <= grade.order;
  }
}
