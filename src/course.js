/* Course class
 * Attributes:
 * name: String, name of the course
 * min_hours: Minimum number of hours the course may provide
 * max_hours: Maximum number of hours the course may provide
 */

Base = require('./base.js');

class Course extends Base {
  constructor(name, min_hours, max_hours) {
    super();
    this.name      = name;
    this.min_hours = min_hours;
    this.max_hours = max_hours;
  }

  /* This is the satisfy method specified in the algorithm. Check whether or
   * not the student has taken the course, and whether or not the minimum grade
   * is satisfied.
   */
  vdash(student) {
    replacement = new CheckedRequirement(this.name, this.min_hours, this.max_hours, 1);
    if(!(student_course = student.courses.find(course => course.simeq(this)))) {
      replacement.satisfied = false;
    } else {
      replacement.hours           = student_course.hours;
      replacement.subrequirements = [student_course];
      replacement.satisifed       = true;
    }
    return replacement;
  }

}

module.exports = Course;
