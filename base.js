/* Base class
 * This contains methods that are used in more than one other class.
 */
class Base {
  // The type of the object
  get type() {
    this.constructor.class;
  }

  // Sometimes this needs to be used as a ``function'', rather than as an
  // attribute. This sums the value for an array of courses.
  abs(courses) {
    return courses.reduce((a, e) => a + e.abs, 0);
  }
}
