import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://backend-ekitchen-production.up.railway.app/api/products'

  constructor(private http: HttpClient) {}

  uploadData(form: any): Observable<any> {
    console.log('my image..',form.image);
    return this.http.post<any>(`${this.apiUrl}`, form);
  }
  getFormData(){
    return this.http.get<any>(`${this.apiUrl}`);
  }
  updateData(item: any){
    return this.http.put<any>(`${this.apiUrl}/${item._id}`, item);
  }
}
