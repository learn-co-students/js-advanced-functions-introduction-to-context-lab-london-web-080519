// Your code here
function createEmployeeRecord(employeeArray) {
  let employee = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employee;
}

function createEmployeeRecords(employeesArray) {
  let createdEmployees = employeesArray.map(el => createEmployeeRecord(el));
  return createdEmployees;
}

function createTimeInEvent(employee, dateStamp) {
  let dateArray = dateStamp.split(" ");

  let newTimeIn = {
    type: "TimeIn",
    hour: parseInt(dateArray[1]),
    date: dateArray[0]
  };

  employee.timeInEvents.push(newTimeIn);
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let dateArray = dateStamp.split(" ");

  let newTimeOut = {
    type: "TimeOut",
    hour: parseInt(dateArray[1]),
    date: dateArray[0]
  };

  employee.timeOutEvents.push(newTimeOut);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let matchingDateIn = employee.timeInEvents.find(el => el.date === date)
  let matchingDateOut = employee.timeOutEvents.find(el => el.date === date)
  return (matchingDateOut.hour - matchingDateIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  let allDates = employee.timeInEvents.map(el => el.date)
  let wagesEarnedArray = allDates.map(date => wagesEarnedOnDate(employee, date))
  let totalEarned = wagesEarnedArray.reduce((a, b) => a + b)
  return totalEarned
}

function calculatePayroll(employeesArray) {
  let employesWages = employeesArray.map(a => allWagesFor(a))
  return employesWages.reduce((memo, a) => memo + a)
}

function findEmployeeByFirstName(employeesArray, firstName) {
  return employeesArray.find(a => a.firstName === firstName)
}