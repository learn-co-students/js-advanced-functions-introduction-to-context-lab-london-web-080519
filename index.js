// Your code here

const createEmployeeRecord = (arr) => {
    let newEmployee = {
        firstName: arr[0],
        familyName: arr[1], 
        title: arr[2], 
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
}

const createEmployees = (arr) => {
    return arr.map(createEmployeeRecord)
}

const createTimeInEvent = (obj, date) => {
    let dateSplit = date.split(" ")
    let newTimeIn = {
        type: "TimeIn",
        hour: parseInt(dateSplit[1]),
        date: dateSplit[0]
    }
    obj.timeInEvents.push(newTimeIn)
    return obj
}

const createTimeOutEvent = (obj, date) => {
    let dateSplit = date.split(" ")
    let newTimeOut = {
        type: "TimeOut",
        hour: parseInt(dateSplit[1]),
        date: dateSplit[0]
    }
    obj.timeOutEvents.push(newTimeOut)
    return obj
}

const hoursWorkedOnDate = (obj, date) => {
    let dateTimeIn = obj["timeInEvents"].find((el) => {
        if (el.date === date) 
        return el
    })
    let dateTimeOut = obj["timeOutEvents"].find((el) => {
        if (el.date === date) 
        return el
    })
    return (dateTimeOut.hour - dateTimeIn.hour) / 100
}

const wagesEarnedOnDate = (obj, date) => {
    let hours = hoursWorkedOnDate(obj, date)
    return obj.payPerHour * hours
}

const allWagesFor = (obj) => {
    let dates = []
    obj["timeInEvents"].map(day=> dates.push(day["date"]))
    let wages = dates.map(date => wagesEarnedOnDate(obj, date))
    return wages.reduce((a,b) => a+b)
}

const createEmployeeRecords = (arrs) => {
    return arrs.map(createEmployeeRecord)
}

const findEmployeeByFirstName = (srcArray, first) => {
    let answer = {}
    srcArray.map(record => {
        if (record["firstName"] == first) {
            answer = record
        }
    })
    return answer
}

const calculatePayroll = (arr) => {
    return arr.map(employee=> allWagesFor(employee)).reduce((a,b) => a+b)
}