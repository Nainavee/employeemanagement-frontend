import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Newuser } from '../newuser';
import { NewuserService } from '../newuser.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public isCreated: boolean=false;
  public userError!: Newuser;
  public userExists: boolean=false;

  constructor(private userService: NewuserService,public sessionService: SessionService) { }

  ngOnInit(): void {
    // if(this.sessionService.isLoggedIn()){
    //   document.getElementById("logged-in")?.click();
    // }
    if(localStorage.getItem("loggedIn")=="true"){
      document.getElementById("logged-in-link")?.click();
    }
  }

  public signUp(form: NgForm){
      this.userService.signUp(form.value).subscribe(
        data=>{
          console.log(data);
          this.isCreated=true;
          this.userExists=false;
          this.userError=new Newuser();
          form.reset();
          document.getElementById("sign-up-link")?.click();
        },
        error=>{
          console.log(error);
          this.userError=error.error;
          this.isCreated=false;
          if(error.status==409){
            this.isCreated=false;
            this.userExists=true;
            form.reset();
          }

        }
      )
  } 

}
