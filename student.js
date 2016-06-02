class Student extends Base {
  constructor(name, courses) {
    this.name    = name;
    this.courses = courses;
  }

  cap(requirement) {
    courses.filter(course => requirement.subrequirements.map(c => c.name).includes(course.name) && 
        requirement.min_grade.preceq(course.grade));
  }

  basic_vdash(requirement) {
    intersection = cap(requirement.subrequirements);
    return new CheckedRequirement(requirement.name, requirement.hours, requirement.subrequirements));
  }

  vdash(requirement) {
    requirements = requirement.subrequirements.filter(requirement => requirement.type == 'Requirement');
    courses = requirement.subrequirements.filter(requirement => requirement.type == 'Course');
    satisfied_requirements = requirements.reduce((a, e) => a.merge(vdash(e)), Requirement.new('merge', 0, 0, 'F', 0, []));
    satisfied_courses = cap(new Requirement('merge', 0, 0, 'F', 0, courses));
  }
}
