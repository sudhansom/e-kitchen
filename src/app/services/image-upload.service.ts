import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private apiUrl = 'https://angular-project-866ab-default-rtdb.europe-west1.firebasedatabase.app/driving.json'; // Replace this with your server API URL

  constructor(private http: HttpClient) {}

  uploadForm(form: any): Observable<any> {
    console.log(form.image);
    return this.http.post<any>(`${this.apiUrl}`, form);
    // return of('')
  }
  getFormData(){
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
