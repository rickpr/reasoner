class Wildcard extends Base {
  constructor(code, match, min_number, max_number, min_hours, exclude) {
    this.code       = code;
    this.match      = match;
    this.min_number = min_number;
    this.max_number = max_number;
    this.min_hours  = min_hours;
    this.exclude    = exclude;
  }
}
