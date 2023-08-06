import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/akitchen.json'; // Replace this with your server API URL

  constructor(private http: HttpClient) {}

  uploadData(form: any): Observable<any> {
    console.log(form.image);
    return this.http.post<any>(`${this.apiUrl}`, form);
  }
  getFormData(){
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
