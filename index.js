// Your code here
const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [] 
    }
}

const createEmployeeRecords = (employeeData) => {
    return employeeData.map(function(employee){
        return createEmployeeRecord(employee)
    })
}


const createTimeInEvent = (employee, timeStamp) => {
    const [date, hour] = timeStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

const createTimeOutEvent = (employee, timeStamp) => {
    const [date, hour] = timeStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

const hoursWorkedOnDate = (employee, shift) => {
    const inEvent = employee.timeInEvents.find(function(event){
        return event.date === shift
    })

    const outEvent = employee.timeOutEvents.find(function(event){
        return event.date === shift
    })

    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = (employee, shift) => {
    const wage = (hoursWorkedOnDate(employee, shift) * employee.payPerHour)

    return parseFloat(wage.toString())
}

const allWagesFor = (employee) => {
    const eligibleDates = employee.timeInEvents.map(function(event) {
        return event.date
    })

    const payable = eligibleDates.reduce(function(memo, shift){
        return memo + wagesEarnedOnDate(employee, shift)
    }, 0)

    return payable
}

const calculatePayroll = (array) => {
    return array.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}

const findEmployeeByFirstName = (array, firstName) => {
    return array.find(function(record){
        return record.firstName === firstName
    })
}