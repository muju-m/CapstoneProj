import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../login/user';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userobj:User=new User();
  formValue!:FormGroup;
  employeeData!:any;
  showAdd!:boolean;

  constructor(private formBulider:FormBuilder, private service:UserserviceService,private router:Router) { }

  ngOnInit(): void {
    this.formValue=this.formBulider.group({
      name:[''],
      password:[''],
      dob:[''],
      emailid:[''],
      address:[''],
      gender:[''],
      mobile:['']
    }) 
  }
  postUserDetails(){
    this.userobj.id=this.formValue.value.id;
    this.userobj.name=this.formValue.value.name;
    this.userobj.password=this.formValue.value.password;
    this.userobj.dob=this.formValue.value.dob;
    this.userobj.emailid=this.formValue.value.emailid;
    this.userobj.address=this.formValue.value.address;
    this.userobj.gender=this.formValue.value.gender;
    this.userobj.mobile=this.formValue.value.mobile;
    this.service.postData(this.userobj).subscribe(a=>{
      console.log(a);
      alert("Record inserted Successfully")
      
    })
    this.router.navigateByUrl("/")
  }

}
