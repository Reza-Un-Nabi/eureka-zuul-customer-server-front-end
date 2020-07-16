import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class HttpService {

    URL = 'http://localhost:8091/customer-service/api/customer';
    constructor(private http: HttpClient) { }


    get(url:any):Observable<any>{
        return this.http.get<any>(this.URL+url);
    }

    post(url:any,data:any):Observable<any>{
        return this.http.post(this.URL+url,data);
    }
    delete(url:any):Observable<any>{
        return this.http.delete(this.URL+url);
    }

}