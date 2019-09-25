// Your code here
function createEmployeeRecord(employeeDetails) {
    return {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployees(arrayOfEmployees) {
    return arrayOfEmployees.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, datetime) {
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: datetime.split(' ')[0],
        hour: parseInt(datetime.split(' ')[1])
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, datetime) {
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: datetime.split(' ')[0],
        hour: parseInt(datetime.split(' ')[1])
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(record => record.date === date)
    let timeOutEvent = employeeRecord.timeOutEvents.find(record => record.date === date)
    return (timeOutEvent.hour - timeInEvent.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    let dates = employeeRecord.timeInEvents.map(e => e.date)
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0)
}

function calculatePayroll(employees) {
    return employees.reduce((total, employee)=> total + allWagesFor(employee), 0)
}

function createEmployeeRecords(arrayOfEmployees) {
    return arrayOfEmployees.map(createEmployeeRecord)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
}