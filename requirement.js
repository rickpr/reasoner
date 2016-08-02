/* Requirement Class
 * This class is the requirements that come directly from the API.
 * Attributes:
 * name: String, the name of the requirement
 * min_hours: Integer, the minimum hours required to satisfy the requirement
 * max_hours: Integer, the maximum hours the requirement may provide
 * take: Integer, the number of subrequirements needed to satisfy this
 * subrequirements: Array of subrequirements (Requirements and Courses).
 */
class Requirement extends Base {
  constructor(name, min_hours, max_hours, min_grade, take, subrequirements) {
    this.name            = name;
    this.min_hours       = min_hours;
    this.max_hours       = max_hours;
    this.min_grade       = min_grade;
    this.take            = take;
    this.subrequirements = subrequirements;
  }

  get basic() {
    return this.subs.every(sub => sub.type == 'Course');
  }

  get courses() {
    return this.subs.filter(sub => sub.type == 'Course');
  }

  get subs() {
    return this.subrequirements.filter(sub => sub.type == 'Requirement');
  }

  vdash(student) {
    return new CheckedRequirement(
        this.name,
        this.min_hours, 
        this.max_hours, 
        student.cap(this).concat(map(sub => sub.vdash(student), subs)));
  }

}
