class StudentCourse extends Base {
  constructor(name, hours, grade) {
    this.name  = name;
    this.hours = hours;
    this.grade = grade;
  }

  simeq(course) {
    return this.name == course.name;
  }
}
