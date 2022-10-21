import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../login/user';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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
  addButtonClickFunction(){
    this.formValue.reset();
    this.showUpdate=false;
    this.showAdd=true;
    this.showUpdateTitle=false;
    this.showAddTitle=true;
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
    let cancel = document.getElementById("cancel");
    this.service.postData(this.userobj).subscribe(a=>{
      console.log(a);
      alert("Record inserted Successfully")
      cancel?.click();this.formValue.reset();
      this.getAllUser();
      
    })
    this.router.navigateByUrl("/")
  }

  getAllUser(){
    this.service.getData().subscribe(a=>{
      this.userData=a;
    })

  }
  deleteUser(row:any){
    this.service.deleteData(row.id).subscribe(a=>{
      alert("Record Deleted Successfully");
      this.getAllUser();
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
  returnLogin(){
    this.router.navigateByUrl("/");
  }
}
