import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = environment.url;
  constructor(private request:HttpClient) { }

  get(url:string, data?:any, external?:boolean) {
    let urlFinal = '';
    if(external){
      urlFinal = url;
    }else{
      urlFinal = this.baseUrl+url;
    }
    return this.request.get(urlFinal, { params: data});
  }

  save(url:string, data?:any, external?:boolean) {
    let urlFinal = '';
    if(external){
      urlFinal = url;
    }else{
      urlFinal = this.baseUrl+url;
    }
    return this.request.post(urlFinal, data);
  }

  put(url:string, data?:any, external?:boolean) {
    let urlFinal = '';
    if(external){
      urlFinal = url;
    }else{
      urlFinal = this.baseUrl+url;
    }
    return this.request.put(urlFinal, data);
  }

  delete(url:string, data?:any, external?:boolean) {
    let urlFinal = '';
    if(external){
      urlFinal = url;
    }else{
      urlFinal = this.baseUrl+url;
    }
    return this.request.delete(urlFinal, {params: data});
  }
}
