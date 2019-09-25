// Your code here

function createEmployeeRecord(array) {
	return {
		firstName: array[0],
		familyName: array[1],
		title: array[2],
		payPerHour: array[3],
		timeInEvents: [],
		timeOutEvents: [],
	};
}

function createEmployees(array) {
	return array.map(item => createEmployeeRecord(item));
}

function createTimeInEvent(object, time) {
	object.timeInEvents.push({
		type: "TimeIn",
		date: time.split(" ")[0],
		hour: parseInt(time.split(" ")[1]),
	});
	return object;
}

function createTimeOutEvent(object, time) {
	object.timeOutEvents.push({
		type: "TimeOut",
		date: time.split(" ")[0],
		hour: parseInt(time.split(" ")[1]),
	});
	return object;
}

function hoursWorkedOnDate(object, day) {
	return (
		(object.timeOutEvents.find(item => item.date == day).hour -
			object.timeInEvents.find(item => item.date == day).hour) /
		100
	);
}

function wagesEarnedOnDate(object, day) {
	return hoursWorkedOnDate(object, day) * object.payPerHour;
}

function allWagesFor(object) {
	return object.timeOutEvents.reduce((acc, curr) => {
		return acc + wagesEarnedOnDate(object, curr.date);
	}, 0);
}

function calculatePayroll(array) {
	return array.reduce((acc, curr) => {
		return acc + allWagesFor(curr);
	}, 0);
}

function createEmployeeRecords(array) {
	return array.map(item => createEmployeeRecord(item));
}

function findEmployeeByFirstName(array, name) {
	return array.find(element => element.firstName == name);
}
