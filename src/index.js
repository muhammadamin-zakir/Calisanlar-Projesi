// Elementleri seç!
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");
const filter = document.getElementById("filter");
const formSelecet = document.querySelector(".form-select");


import { Request } from "./requests";
import { UI } from "./ui";

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;


// request.get()
//     .then(employees => console.log(employees))
//     .catch(err => console.log(err));

// request.post({ name: "Mehmet şeker", department: "Bilişim", salary: "43265" })
//     .then(employee => console.log(employee))
//     .catch(err => console.log(err));

// request.put(3, { name: "Mahmut Mahmut", department: "Marketing", salary: 7896 })
//     .then(employee => console.log(employee))
//     .catch(err => console.log(err));

// request.delete(3)
//     .then(employee => console.log(employee))
//     .catch(err => console.log("Hata!" + err));


eventListeners();

function eventListeners() {
    //DOMContentLoaded => sayfa yüklendiğinde çalışır.
    document.addEventListener("DOMContentLoaded", getAllEmployees);
    form.addEventListener("submit", addEmployee);
    employeesList.addEventListener("click", UpdateOrDelete);
    updateEmployeeButton.addEventListener("click", updateEmployee);
    filter.addEventListener("keyup", filterItems);
}


function filterItems(e) {
    const filterValue = String(e.target.value.toLowerCase());
    const tdItemName = document.querySelectorAll(".td-item-name");
    const tdItemDepartment = document.querySelectorAll(".td-item-department");
    const tdItemSalary = document.querySelectorAll(".td-item-salary");
    // console.log(formSelecet.options[options.selected]);


    if (formSelecet.value === "İsim") {
        tdItemName.forEach(name => {
            const text = name.textContent.toLocaleLowerCase();

            if (text.indexOf(filterValue) === -1) {
                name.parentElement.setAttribute("style", "display:none !important");
            } else {
                name.parentElement.setAttribute("style", "display:table-row !important");
            }
        });

    } else if (formSelecet.value === "Departman") {
        tdItemDepartment.forEach(departmentName => {
            const text = departmentName.textContent.toLocaleLowerCase();

            if (text.indexOf(filterValue) === -1) {
                departmentName.parentElement.setAttribute("style", "display:none !important");
            } else {
                departmentName.parentElement.setAttribute("style", "display:table-row !important");
            }
        });

    } else if (formSelecet.value === "Maaş") {
        tdItemSalary.forEach(salarayName => {
            const text = salarayName.textContent.toLocaleLowerCase();

            if (text.indexOf(filterValue) === -1) {
                salarayName.parentElement.setAttribute("style", "display:none !important");
            } else {
                salarayName.parentElement.setAttribute("style", "display:table-row !important");
            }
        });
    }
}

function getAllEmployees() {
    request.get()
        .then(employees => {
            ui.addAllEmployeeToUI(employees);
        })
        .catch(err => console.log(err));
}

function addEmployee(e) {

    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = Number(salaryInput.value.trim());

    if (employeeName === "" || employeeDepartment === "" || employeeSalary === "") {
        alert("lütfen tüm alanları doldurunuz!")
    } else {
        request.post({ name: employeeName, department: employeeDepartment, salary: employeeSalary })
            .then(employee => {
                ui.addEmployeeToUI(employee);
            })
            .catch(err => console.log(err));
    }
    ui.clearInputs();
    e.preventDefault();
}

function UpdateOrDelete(e) {
    if (e.target.id === "delete-employee") {
        // delete
        deleteEmployee(e.target);

    } else if (e.target.id === "update-employee") {
        // update
        updateEmployeeController(e.target.parentElement.parentElement);

    }
}

function deleteEmployee(targetEmployee) {
    // console.log(targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent);
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id)
        .then(message => {
            const element = targetEmployee.parentElement.parentElement;
            ui.deleteEmployeeFromUI(element);
        })
        .catch(err => console.log(err))
}

function updateEmployeeController(targetEmployee) {
    // console.log(targetEmployee.children[0].textContent);
    ui.toggleUpdateButton(targetEmployee);

    if (updateState === null) {
        updateState = {
            updateId: targetEmployee.children[3].textContent,
            updateParent: targetEmployee,
        }
    } else {
        updateState = null;
    }
}

function updateEmployee() {
    if (updateState) { //updateState null değilse çalışır.
        //güncelleme
        const data = {
            name: nameInput.value.trim(),
            department: departmentInput.value.trim(),
            salary: Number(salaryInput.value.trim())
        }

        request.put(updateState.updateId, data)
            .then(updatedEmployee => {
                ui.updateEmployeeOnUI(updatedEmployee, updateState.updateParent);
            })
            .catch(err => console.log(err));
    }
}