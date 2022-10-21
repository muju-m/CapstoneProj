import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any={}
  getData: boolean = false;
  constructor(private userservice:UserserviceService, private router:Router) { }

  ngOnInit(): void {
 
  }
  loginUser4(){
    var mobile=this.model.mobile;
    var password=this.model.password

    this.userservice.getLoginUser(mobile,password).subscribe((res:any)=>{
      this.getData=res;

      if(this.getData==true){
        this.router.navigateByUrl("/home");
      }else{
        alert("Invalid Mobile No or Password");
      }
    })
  }
  registerPage() {
    this.router.navigate(['/register']);
  }
  AdminLogin(){
    this.router.navigate(['/adminlogin']);
  }

}



