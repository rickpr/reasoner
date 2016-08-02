/* Student class
 * Represents a student
 * Attributes:
 * name: String, name of the student (or alias)
 * courses: Array, courses that students have taken
 */
class Student extends Base {
  constructor(name, courses) {
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
    requirements.reduce(
        (a, e) => a.merge(e), CheckedRequirement.new('merge', 0, 0, 'F', 0, [])
    );
  }
}
