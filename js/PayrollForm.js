//UC9
window.addEventListener('DOMContentLoaded', (event) => {
    let empId = localStorage.getItem("EditId");
    if(empId){
        localStorage.removeItem("EditId");
        let empPayrollList = JSON.parse(localStorage.getItem("EmpPayrollList"));
        let editEmpObj = empPayrollList.find(employee => employee.id == empId);
        if(!editEmpObj){
            window.location.href = "PayrollApp.html";
        }
        setFormValue(editEmpObj);
    }
});

function setFormValue(editEmpObj){
    document.querySelector('#name').value = editEmpObj.empName;
    document.querySelector("input[name='profile']:checked").value = editEmpObj.profileImg;
    document.querySelector("input[name='gender']:checked").value = editEmpObj.gender;
    document.querySelectorAll("input[type='checkbox']:checked").value = editEmpObj.dept;
    document.querySelector('#salary').value = editEmpObj.salary;

    let date = editEmpObj.startDate;
    let dateList = date.split('-');
    document.querySelector('#day').value = dateList[2];
    document.querySelector('#month').value = dateList[1];
    document.querySelector('#year').value = dateList[0];
    document.querySelector('#notes').value = editPersonObj.notes;
}

class Employee{

    empName;
    profileImg;
    gender;
    dept;
    salary;
    startDate;
    notes;
    id;

    set empName(empName){
        this.empName = empName;
    }
    set profileImg(profileImg){
        this.profileImg = profileImg;
    }
    set gender(gender){
        this.gender = gender;
    }
    set dept(dept){
        this.dept = dept;
    }
    set salary(salary){
        this.salary = salary;
    }
    set startDate(startDate){
        this.startDate = startDate;
    }
    set notes(notes){
        this.notes = notes;
    }
    set id(id){
        this.id = id;
    }
}

//UC8   
const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input',function() {
    output.textContent = salary.value;
});

function validateName(empObj){
    const empName = document.querySelector('#name');
    const nameError = document.querySelector('.name-error');
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if(nameRegex.test(empName.value)){
        nameError.textContent = "";
        empObj.empName = empName.value;
    }
    else{
        throw "Name is incorrect";
    }

}

function validateDate(empObj){
    let startDate = document.querySelector('#year').value+'-'+document.querySelector('#month').value+'-'+document.querySelector('#day').value;
    let today = new Date();
    let givenDate = new Date(startDate+" 0:00:00");

    if(givenDate > today){
        throw 'Invalid date';
    }else{
        empObj.startDate = startDate;
    }
}

function saveData(empObj){
    let empPayrollList = JSON.parse(localStorage.getItem("EmpPayrollList"));
    if(empPayrollList != null){
        empPayrollList.push(empObj);
    }
    else{
        empPayrollList = [empObj];
    }
    console.log(empPayrollList);
    localStorage.setItem("EmpPayrollList", JSON.stringify(empPayrollList));
    alert("Submitted Successfully !");
}

function formReset() {
    document.getElementById("payrollForm").reset();
}

function onSubmit(){
    try{

        let empObj = new Employee();

        validateName(empObj);

        const profileImg = document.querySelector("input[name='profile']:checked");
        empObj.profileImg = profileImg.value;

        const gender = document.querySelector("input[name='gender']:checked");
        empObj.gender = gender.value;

        const dept = document.querySelectorAll("input[type='checkbox']:checked");
        let deptList = [];
        for (let i = 0; i < dept.length; i++) {   
            deptList.push(dept[i].value);
        }   
        empObj.dept = deptList;

        const notes = document.querySelector('#notes');
        empObj.notes = notes.value;

        validateDate(empObj);

        empObj.salary = salary.value;

        empObj.id = new Date().getTime();
        saveData(empObj);
        formReset();

    }catch(e){
        alert(e);
        console.log(e);
    }
    return false;
}

 