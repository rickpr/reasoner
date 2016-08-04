/* Requirement Class
 * This class is the requirements that come directly from the API.
 * Attributes:
 * name: String, the name of the requirement
 * min_hours: Integer, the minimum hours required to satisfy the requirement
 * max_hours: Integer, the maximum hours the requirement may provide
 * take: Integer, the number of subrequirements needed to satisfy this
 * subrequirements: Array of subrequirements (Requirements and Courses).
 */

Base = require("./base.js");

class Requirement extends Base {
  constructor(name, min_hours, max_hours, min_grade, take, subrequirements) {
    super();
    this.name            = name;
    this.min_hours       = min_hours;
    this.max_hours       = max_hours;
    this.min_grade       = new Grade(min_grade);
    this.take            = take;
    this.subrequirements = subrequirements;
    this.courses.forEach(course => course.min_grade = min_grade);
  }

  /* The algorithm specifies a need to know whether or not a requirement is
   * ``basic''. This means that every subrequirement is a course.
   */
  get basic() {
    return this.subs.every(sub => sub.type == 'Course');
  }

  // Only Course subrequirements
  get courses() {
    return this.subs.filter(sub => sub.type == 'Course');
  }

  // Only Requirement subrequirements
  get subs() {
    return this.subrequirements.filter(sub => sub.type == 'Requirement');
  }

  /* This is the satisfy method specified in the algorithm. Return a
   * CheckedRequirement.
   */
  vdash(student) {
    return new CheckedRequirement(
        this.name,
        this.min_hours, 
        this.max_hours, 
        this.subrequirements.map(sub => sub.vdash(student))
    );
  }

}

module.exports = Requirement;
