import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit { 
  formValue!: FormGroup;
  employeeModuleObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate= false;
  }

  postEmployeeDetails(){
    this.employeeModuleObj.firstName = this.formValue.value.firstName;
    this.employeeModuleObj.lastName = this.formValue.value.lastName;
    this.employeeModuleObj.email = this.formValue.value.email;
    this.employeeModuleObj.mobile = this.formValue.value.mobile;
    this.employeeModuleObj.salary= this.formValue.value.salary;

    this.api.postEmployee(this.employeeModuleObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Employee added successfully.");
      let ref= document.getElementById('cancle')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      (err: any)=>{
      alert("Something went wrong");
    });
    
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate= true;
    this.employeeModuleObj.id= row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModuleObj.firstName = this.formValue.value.firstName;
    this.employeeModuleObj.lastName = this.formValue.value.lastName;
    this.employeeModuleObj.email = this.formValue.value.email;
    this.employeeModuleObj.mobile = this.formValue.value.mobile;
    this.employeeModuleObj.salary= this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModuleObj, this.employeeModuleObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref= document.getElementById('cancle')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
      
    })
  }
}
