import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  model:any={}
  getData: boolean = false;
  constructor(private userservice:UserserviceService, private router:Router) { }

  ngOnInit(): void {
  }
  adminlogin(){
    var name = this.model.name;
    var password = this.model.password;
    this.userservice.getAdminLogin(name,password).subscribe((res:any)=>{
      this.getData=res;

      if(this.getData==true){
        this.router.navigateByUrl("/admin")
      }else{
        alert("Invalid Admin")
      }
    })
  }

}
