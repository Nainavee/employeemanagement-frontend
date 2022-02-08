import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Newuser } from '../newuser';
import { NewuserService } from '../newuser.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userError!: Newuser;
  public invalidCred: boolean=false;

  constructor(private userService: NewuserService,public sessionService: SessionService) { }

  ngOnInit(): void {
    if(localStorage.getItem("loggedIn")=="true"){
      document.getElementById("logged-in-link")?.click();
    }
    // if(this.sessionService.isLoggedIn()){
    //   console.log(this.sessionService.isLoggedIn());
    //   document.getElementById("logged-in-link")?.click();
    // }
  }

  public login(form: NgForm){
    this.userService.login(form.value).subscribe(
      data=>{
        console.log(data);
        this.invalidCred=false;
        localStorage.setItem("loggedIn","true");
        //this.sessionService.setLoggedIn(true);
        form.reset();
          document.getElementById("login-link")?.click();
      },
      error=>{
        console.log(error);
        this.userError=error.error;
        this.sessionService.setLoggedIn(false);
        if(error.status==401){
          this.invalidCred=true;
          form.reset();
        }
      }
    )
  }

}
