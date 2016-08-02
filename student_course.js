/* StudentCourse Class
 * A course that a student has taken
 * Attrubutes:
 * name: String, the name of the course
 * hours: The number of credit hours the student receives
 * grade: The grade the student received
 */
class StudentCourse extends Base {
  constructor(name, hours, grade) {
    this.name  = name;
    this.hours = hours;
    this.grade = grade;
  }

  // Check if this is the same as an API course
  simeq(course) {
    return this.name == course.name;
  }

  // Used as an alias for hours, for polymorphism with merge method
  get abs() {
    return this.hours;
  }

  // Used as an alias for self, for polymorphism with merge method
  get subrequirements() {
    return [this];
  }

  // Used as an alias for true for the merge method
  get satisfied() {
    return true;
  }
}
