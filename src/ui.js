export class UI {
    constructor() {
        this.employeesList = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
    }

    addAllEmployeeToUI(employees) {
        let result = "";
        employees.forEach(employee => {
            result += `
            <tr  class="our-table">
                <td class ="td-item-name">${employee.name}</td>
                <td class ="td-item-department">${employee.department}</td>
                <td class ="td-item-salary">${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
                <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
            </tr>`
        });

        this.employeesList.innerHTML = result;
    }

    addEmployeeToUI(employee) {
        this.employeesList.innerHTML += `
        <tr  class="our-table">
            <td class ="td-item-name">${employee.name}</td>
            <td class ="td-item-department">${employee.department}</td>
            <td class ="td-item-salary">${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
            <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
        </tr>`
    }

    deleteEmployeeFromUI(element) {
        element.remove();
    }

    toggleUpdateButton(target) {
        if (this.updateButton.style.display === "none") {
            this.updateButton.style.display = "block";
            this.changeUpdateButtonText(target, this.updateButton.style.display);
            this.addEmployeeInfoToInput(target);
            console.log("this is if block");
        }
        else {
            console.log("this else if block");
            this.changeUpdateButtonText(target, this.updateButton.style.display);
            this.updateButton.style.display = "none";
            this.clearInputs();
        }
    }

    changeUpdateButtonText(target, display) {
        // console.log(target.children[4].children[0].textContent);
        if (display === "block") {
            target.children[4].children[0].textContent = "İptal";
        } else {
            console.log("haaaaaaaaaa");
            target.children[4].children[0].textContent = "Güncelle";
        }
    }


    addEmployeeInfoToInput(target) {
        this.nameInput.value = target.children[0].textContent;
        this.departmentInput.value = target.children[1].textContent;
        this.salaryInput.value = target.children[2].textContent;

    }

    updateEmployeeOnUI(employee, parent) {

        parent.innerHTML = `
        <tr  class="our-table">
            <td class ="td-item-name">${employee.name}</td>
            <td class ="td-item-department">${employee.department}</td>
            <td class ="td-item-salary">${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id="update-employee" class="btn btn-danger">Güncelle</a></td>
            <td> <a href="#" id="delete-employee" class="btn btn-danger">Sil</a></td>
        </tr>`
        this.clearInputs();
    }

    clearInputs() {
        this.nameInput.value = "";
        this.departmentInput.value = "";
        this.salaryInput.value = "";
    }
}
