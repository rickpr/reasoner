class CheckedRequirement extends Base {
  constructor(name, hours, subrequirements) {
    this.name            = name;
    this.hours           = hours;
    this.subrequirements = subrequirements;
  }

  get taken() {
    return this.subrequirements.length;
  }

  setminus(requirement) {
    this.subrequirements.filter(course => requirement.indexOf(course) < 0);
  }

  cup(requirement) {
    return [...new Set([...this.subrequirements, ...requirement.subrequirements])];
  }

  cap(requirement) {
    this.subrequirements.filter(course => requirement.includes(course));
  }

  merge(requirement) {
    hours = Math.min(Math.min(this.hours, abs(setminus(requirement))) + 
        Math.min(requirement.hours, abs(requirement.setminus(this))) +
        abs(cap(requirement)),
        this.hours + requirement.hours);
    subrequirements = cup(requirement);
    return new CheckedRequirement(this.name + ", " + requirement.name, hours, subrequirements);
  }
}
