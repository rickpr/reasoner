/* Course class
 * Attributes:
 * name: String, name of the course
 * min_hours: Minimum number of hours the course may provide
 * max_hours: Maximum number of hours the course may provide
 */
class Course extends base {
  constructor(name, min_hours, max_hours) {
    this.name      = name;
    this.min_hours = min_hours;
    this.max_hours = max_hours;
  }

}
