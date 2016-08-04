/* Student class
 * Represents a student
 * Attributes:
 * name: String, name of the student (or alias)
 * courses: Array, courses that students have taken
 */

Base = require("./base.js");

class Student extends Base {
  constructor(name, courses) {
    super();
    this.name    = name;
    this.courses = courses;
  }

  // Get the courses that are in common with a requirement
  cap(requirement) {
    return courses.filter(course => 
        requirement.subrequirements.map(c => course.simeq(c)) &&
        requirement.min_grade.preceq(course.grade)
        );
  }

  // Check if the student satisfied a requirement
  vdash(requirement) {
    tree = requirement.vdash(student).reason();
    return tree.satisfied;
  }
}

module.exports = Student
