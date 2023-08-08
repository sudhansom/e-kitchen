import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://angular-project-cf39b-default-rtdb.europe-west1.firebasedatabase.app/akitchen.json'; // Replace this with your server API URL

  constructor(private http: HttpClient) {}

  uploadData(form: any): Observable<any> {
    console.log(form.image);
    return this.http.post<any>(`${this.apiUrl}`, form);
  }
  getFormData(){
    return this.http.get<any>(`${this.apiUrl}`);
  }
  updateData(item: any){
    return this.http.put<any>(`https://angular-project-cf39b-default-rtdb.europe-west1.firebasedatabase.app/akitchen/${item.id}.json`, item);
  }
}
