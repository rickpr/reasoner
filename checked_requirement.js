/* Attributes:
 * name: String, the name of the requirement
 * min_hours: Integer, the minimum number of hours to satisfy the requirement
 * max_hours: Integer, the maximum number of hours the requirment may provide
 * take: Integer, the minimum number of subrequirements to be satisfied
 * subrequirements: Array of subrequirements (requirements and courses)
 */
class CheckedRequirement extends Base {
  constructor(name, min_hours, max_hours, take, subrequirements) {
    this.name            = name;
    this.min_hours       = min_hours;
    this.max_hours       = max_hours;
    this.take            = take;
    this.subrequirements = subrequirements;
  }

  // How many subrequirements did the student satisfy?
  get taken() {
    return this.subrequirements.filter(sub => sub.satisfied).length;
  }

  // How many credit hours is this subrequirement worth independently?
  get abs() {
    return subrequirements.map(sub => sub.abs).reduce((a, e) => a + e, 0); 
  }

  // Is this requirement satisfied (represented as \vdash)?
  get satisfied() {
    return this.taken;
  }

  // The courses in this set, but not the other set (name ``requirement'')
  setminus(requirement) {
    this.subrequirements.filter(course => requirement.subrequirements.indexOf(course) < 0);
  }

  // The courses in either this set, or the other set (named ``requirement'')
  cup(requirement) {
    return [...new Set([...this.subrequirements, ...requirement.subrequirements])];
  }

  // The courses in both this set, and the other set (named ``requirement'')
  cap(requirement) {
    this.subrequirements.filter(course => requirement.includes(course));
  }

  // The merge (\merge) method. This is a binary operator.
  merge(requirement) {
    // Hours in this set or sum of course hours
    hours = Math.min(Math.min(this.abs, abs(setminus(requirement))) + 
        // Hours in the peer set or sum of course hours
        Math.min(requirement.hours, abs(requirement.setminus(this))) +
        // Hours in courses that are in both
        abs(cap(requirement)),
        // Sum of nominal hours of both requirements.
        this.hours + requirement.hours);
    // Subrequirements now has courses from both
    subrequirements = cup(requirement);
    // Return the new requirement (probably going to keep merging)
    return new CheckedRequirement(this.name + ", " + requirement.name, hours, subrequirements);
  }
}
