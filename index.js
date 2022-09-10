// Your code here
function createEmployeeRecord(employee){

    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
   
}

function createEmployeeRecords(employees){
    return employees.map((employee)=>createEmployeeRecord(employee));
}

function createTimeInEvent(empObj, timeInStamp) {
    
    let [date, hour] = timeInStamp.split(" ")
    
    empObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })

    return empObj
}

function createTimeOutEvent(empObj, timeInStamp) {
    
    let [date, hour] = timeInStamp.split(" ")
    
    empObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })

    return empObj
}

function hoursWorkedOnDate(empObj, date){
   const timeIn = empObj.timeInEvents.find(empObj => empObj.date === date)
   const timeOut = empObj.timeOutEvents.find(empObj => empObj.date === date)
      
   return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(empObj, date){

return empObj.payPerHour * hoursWorkedOnDate(empObj, date)

}

function allWagesFor(empObj){
    const eligibleDates = empObj.timeInEvents.map(function (e){
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(empObj, d)
    }.bind(empObj), 0)

    return payable
}

function calculatePayroll(employeeRecords){
return employeeRecords.map(employee => allWagesFor(employee)).reduce((currentValue, total)=> currentValue + total)
}