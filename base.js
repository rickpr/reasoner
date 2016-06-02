class Base {
  get type() {
    this.constructor.class;
  }

  abs(courses) {
    return courses.map(course => course.hours).reduce((a, e) => a + e, 0);
  }
}
