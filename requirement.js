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
    return this.subrequirements.every(sub => sub.type == 'Course');
  }

  vdash(student) {
  }

}
