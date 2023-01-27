var Employee = {
  company: 'xyz'
}
var emp1 = Object.create(Employee);
delete emp1.company
// What's the value of emp1.company


var trees = ["xyz", "xxxx", "test", "ryan", "apple"];
delete trees[3];
// What's the value of trees.length
