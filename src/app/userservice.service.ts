import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }

  getAdminLogin(name:string,password:string){
    return this.http.get('http://localhost:8083/api/'+name+'/'+password);
  }


  getLoginUser(mobile: string,password: string){
    return this.http.get('http://localhost:8083/api/user/'+mobile+'/'+password);

  }

  url:string="http://localhost:8083/api/user/";
  url1:string="http://localhost:8083/api/user";
  postData(data:any){
    return this.http.post<any>(this.url,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getDataById(id:number){
    return this.http.get<any>(this.url1+"/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  updateData(data:any,id:number){
    return this.http.put<any>(this.url1+"/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteData(id :number){
    return this.http.delete<any>(this.url1+"/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
  getData(){
    return this.http.get<any>(this.url).pipe(map((res:any)=>{
      return res;
    }))
  }
}
