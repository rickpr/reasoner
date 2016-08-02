/*!
// @name         Nervous Grace
// @namespace    http://idi.unm.edu
// @author       Ricardo Piro-Rael
// @version      0.0.1
// @description  Reasoner for Serialized Stage
*/

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Base class
 * This contains methods that are used in more than one other class.
 */
class Base {
  // The type of the object
  get type() {
    this.constructor.class;
  }

  // Sometimes this needs to be used as a ``function'', rather than as an
  // attribute. This sums the value for an array of courses.
  abs(courses) {
    return courses.reduce((a, e) => a + e.abs, 0);
  }
}

module.exports = Base;

},{}],2:[function(require,module,exports){
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

module.exports = CheckedRequirement;

},{"./base.js":1}],3:[function(require,module,exports){
/* Course class
 * Attributes:
 * name: String, name of the course
 * min_hours: Minimum number of hours the course may provide
 * max_hours: Maximum number of hours the course may provide
 */

Base = require('./base.js');

class Course extends Base {
  constructor(name, min_hours, max_hours) {
    super();
    this.name      = name;
    this.min_hours = min_hours;
    this.max_hours = max_hours;
  }

  /* This is the satisfy method specified in the algorithm. Check whether or
   * not the student has taken the course, and whether or not the minimum grade
   * is satisfied.
   */
  vdash(student) {
    if(!(student_course = student.courses.find(course => course.simeq(this))))
      return this.satisfied = false;
    this.hours     = student_course.hours;
    this.grade     = student_course.grade;
    this.satisifed = true;
    return this;
  }

}

module.exports = Course;

},{"./base.js":1}],4:[function(require,module,exports){
/* Grade class
 * Attributes:
 * letter: String, the letter grade
 * order: Integer, where this ranks in the partially ordered set
 */

Base = require("./base.js");

class Grade extends Base {
  constructor(letter) {
    super();
    this.letter = letter;
    this.order  = Grade.grade_order(order);
  }

  // Compare this to see if requirement's grade precedes the student's grade
  preceq(grade) {
    return this.order <= grade.order;
  }

  static grade_order(letter) {
    require("./grade_order.json")[letter] || 0;
  }
}

module.exports = Grade;

},{"./base.js":1,"./grade_order.json":5}],5:[function(require,module,exports){
module.exports={
  "CR": 1,
  "D-": 2,
  "D": 3,
  "D+": 4,
  "C-": 5,
  "C": 6,
  "C+": 7,
  "B-": 8,
  "B": 9,
  "B+": 10,
  "A-": 11,
  "A": 12,
  "A+": 13
}
},{}],6:[function(require,module,exports){
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

  /* This is the satisfy method specified in the algorithm. Return either a
   * CheckedRequirement ob */
  vdash(student) {
    replacement = new CheckedRequirement(
        this.name,
        this.min_hours, 
        this.max_hours, 
        this.subrequirements.map(sub => sub.vdash(student)).filter(Boolean)
    );
  }

}

module.exports = Requirement;

},{"./base.js":1}],7:[function(require,module,exports){
/* Student class
 * Represents a student
 * Attributes:
 * name: String, name of the student (or alias)
 * courses: Array, courses that students have taken
 */

Base = require("./base.js");

class Student extends Base {
  constructor(name, courses) {
    super();
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

module.exports = Student

},{"./base.js":1}],8:[function(require,module,exports){
/* StudentCourse Class
 * Attrubutes:
 * name: String, the name of the course
 * hours: The number of credit hours the student receives
 * grade: The grade the student received
 */

Base = require("./base.js");

class StudentCourse extends Base {
  constructor(name, hours, grade) {
    super();
    this.name  = name;
    this.hours = hours;
    this.grade = new Grade(grade);
  }

  // Check if this is the same as an API course
  simeq(course) {
    return this.name == course.name && course.min_grade.preceq(this.grade);
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

module.exports = StudentCourse;

},{"./base.js":1}],9:[function(require,module,exports){
var Base               = require('./base.js')
var CheckedRequirement = require('./checked_requirement.js')
var Course             = require('./course.js')
var Grade              = require('./grade.js')
var Requirement        = require('./requirement.js')
var Student            = require('./student.js')
var StudentCourse      = require('./student_course.js')
var Wildcard           = require('./wildcard.js')

},{"./base.js":1,"./checked_requirement.js":2,"./course.js":3,"./grade.js":4,"./requirement.js":6,"./student.js":7,"./student_course.js":8,"./wildcard.js":10}],10:[function(require,module,exports){
Base = require("./base.js");
class Wildcard extends Base {
  constructor(code, match, min_number, max_number, min_hours, exclude) {
    super();
    this.code       = code;
    this.match      = match;
    this.min_number = min_number;
    this.max_number = max_number;
    this.min_hours  = min_hours;
    this.exclude    = exclude;
  }
}

module.exports = Wildcard;

},{"./base.js":1}]},{},[9]);
