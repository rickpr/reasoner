var Base               = require('./base.js')
var CheckedRequirement = require('./checked_requirement.js')
var Course             = require('./course.js')
var Grade              = require('./grade.js')
var Requirement        = require('./requirement.js')
var Student            = require('./student.js')
var StudentCourse      = require('./student_course.js')
var Wildcard           = require('./wildcard.js')

function json_to_courses(name, courses) {
  return new Student(name, courses.map(
        course => StudentCourse.new(course.name, course.hourse, course.grade)
  );
}


