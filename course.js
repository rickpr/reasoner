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

  /* This is the satisfy method specified in the algorithm. Check whether or
   * not the student has taken the course, and whether or not the minimum grade
   * is satisfied.
   */
  vdash(student) {
    if !(student_course = student.courses.find(course => course.simeq(this)))
      return this.satisfied = false;
    this.hours     = student_course.hours;
    this.grade     = student_course.grade;
    this.satisifed = true;
    return this;
  }

}
