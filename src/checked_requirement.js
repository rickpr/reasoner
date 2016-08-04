/* Attributes:
 * name: String, the name of the requirement
 * min_hours: Integer, the minimum number of hours to satisfy the requirement
 * max_hours: Integer, the maximum number of hours the requirment may provide
 * take: Integer, the minimum number of subrequirements to be satisfied
 * subrequirements: Array of subrequirements (requirements and courses)
 */

Base = require('./base.js');

class CheckedRequirement extends Base {
  constructor(name, min_hours, max_hours, take, subrequirements) {
    super();
    this.name            = name;
    this.min_hours       = min_hours;
    this.max_hours       = max_hours;
    this.take            = take;
    this.subrequirements = subrequirements;
  }

  /* The algorithm specifies a need to know whether or not a requirement is
   * ``basic''. This means that every subrequirement is a course.
  get basic() {
    return this.subs.every(sub => sub.type == 'Course');
  }
  */

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
    return this.taken >= this.take && this.hours >= this.min_hours;
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
        this.max_hours + requirement.max_hours);
    // Subrequirements now has courses from both
    subrequirements = cup(requirement);
    // Return the new requirement (probably going to keep merging)
    replacement = new CheckedRequirement(this.name + ", " + requirement.name, hours, hours, subrequirements);
    replacement.hours = hours;
    return replacement;
  }

  // Now that the unused courses have been filtered, reduce
  reason() {
    // Reason each one
    replacement = subrequirements.map(sub => sub.reason())
      // Keep the satisfied ones
      .filter(sub => sub.satisfied)
      // Merge
      .reduce((acc, sub) => acc.merge(sub));
    return replacement;
  }

  check() {
    reasoned = reason();
  }

}

module.exports = CheckedRequirement;
