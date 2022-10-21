import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../login/user';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userobj:User=new User();
  
  formValue!:FormGroup;
  userData!:any;

  showAdd!:boolean;
  showUpdate!:boolean;
  showUpdateTitle!:boolean
  showAddTitle!:boolean;

  constructor(private formBulider:FormBuilder, private service:UserserviceService, private router:Router) { }

  ngOnInit(): void {
    this.formValue=this.formBulider.group({
      id:[''],
      name:[''],
      password:[''],
      dob:[''],
      emailid:[''],
      address:[''],
      gender:[''],
      mobile:['']
    }) 
    this.getAllUser();
  }
  


  getAllUser(){
    this.service.getData().subscribe(a=>{
      this.userData=a;
    })

  }

  updateUser(row:any){
    this.showUpdate=true;
    this.showAdd=false;
    this.showUpdateTitle=true;
    this.showAddTitle=false;
    this.userobj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['password'].setValue(row.password);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['emailid'].setValue(row.emailid);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['mobile'].setValue(row.mobile);
  }

  updateUserDetails(){
    this.userobj.name=this.formValue.value.name;
    this.userobj.password=this.formValue.value.password;
    this.userobj.dob=this.formValue.value.dob;
    this.userobj.mobile=this.formValue.value.mobile;
    this.userobj.address=this.formValue.value.address;
    this.userobj.emailid=this.formValue.value.emailid;
    this.userobj.gender=this.formValue.value.gender;
    this.service.updateData(this.userobj,this.userobj.id).subscribe(a=>{
      alert("Record Updated Successfully");
      let cancel=document.getElementById("cancel");
      cancel?.click();
      this.formValue.reset();
      this.getAllUser();
    })
  }
  getUserById(row:any){
    this.service.getDataById(row.id).subscribe(a=>{
      this.userData=a;
    })

  }

  loginPage(){
    this.router.navigateByUrl("/");
  }
  registerPage(){
    this.router.navigateByUrl("/register");
  }
}
