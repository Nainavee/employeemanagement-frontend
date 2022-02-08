import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public editEmployee!: Employee | null;
  public employeeToDelete!: Employee | null;
  public employees!: Employee[];
  public newEmployee= new Employee();
  public userError!: Employee;
  public isCreated: boolean=false;
  public userExists: boolean=false;
  public isUpdated: boolean=false;

  constructor(private employeeService: EmployeeService,public sessionService: SessionService) { }

  ngOnInit(): void {
    if(localStorage.getItem("loggedIn")=="false"){
      document.getElementById("home-check-link")?.click();
    }
    else{
    this.getEmployees();
    }
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[])=>{
        this.employees=response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public openModal(employee: Employee | null, mode: string): void{
    const container =document.getElementById('main-container');
    const button= document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode=== 'add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode=== 'update'){
      this.editEmployee=employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode=== 'delete'){
      this.employeeToDelete=employee;
      button.setAttribute('data-target','#deleteModal');
    }
    container!.appendChild(button);
    button.click();
  }

  public addEmployee(form: NgForm){
   
    console.log(form.value);
    this.employeeService.addEmployee(form.value).subscribe(
      // (response: Employee)=>{
      //   console.log(response);
      //   this.getEmployees();
      //   form.reset();
      // },
      // (error: HttpErrorResponse)=>{
      //   alert(error.message);
      // }
      data=>{
        console.log(data);
        this.newEmployee=new Employee();
        this.isCreated=true;
        this.userExists=false;
        this.userError=new Employee();
        this.getEmployees();
        form.reset();
        document.getElementById('cancel-add')?.click();
      },
      error=>{
        this.userError=error.error;
        this.isCreated=false;
        if(error.status==409){
          this.isCreated=false;
          this.userExists=true;
          form.reset();
          document.getElementById('cancel-add')?.click();
        }
        console.log(error);
      }
    )
  }

  public updateEmployee(form: NgForm){
    console.log(form.value);
    this.employeeService.updateEmployee(form.value).subscribe(
      // (response: Employee)=>{
      //   console.log(response);
      //   this.getEmployees();
      // },
      // (error: HttpErrorResponse)=>{
      //   alert(error.message);
      // }
      data=>{
        console.log(data);
        this.newEmployee=new Employee();
        this.isUpdated=true;
        this.userExists=false;
        this.userError=new Employee();
        this.getEmployees();
        document.getElementById("cancel-update")?.click();
      },
      error=>{
        this.userError=error.error;
        this.isUpdated=false;
        if(error.status==409){
          this.isUpdated=false;
          this.userExists=true;
          document.getElementById('cancel-update')?.click();
        }
        
        console.log(error);
        
      }
      
    )
  }

  public deleteEmployee(employeeId: number){
    document.getElementById("cancel-delete")?.click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void)=>{
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
    
  }

  public searchEmployee(key: String){
      const searchResults: Employee[]=[];
      for(const employee of this.employees){
        if(employee.name.toLowerCase().indexOf(key.toLowerCase())!==-1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase())!==-1
        || employee.email.toLowerCase().indexOf(key.toLowerCase())!==-1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase())!==-1){
          searchResults.push(employee);
        }
      }
      this.employees=searchResults;
      if(!key){
        this.getEmployees();
      }
  }

  public logOut(){
    localStorage.setItem("loggedIn","false");
      document.getElementById("home-check-link")?.click();
    
    // this.sessionService.setLoggedIn(false);
    // document.getElementById("home-check-link")?.click();
  }

}
