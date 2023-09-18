import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

interface IData {
  name: string,
  quantity: number,
  category: string,
  image: File,
}

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormComponent implements OnInit {
  reactiveForm: FormGroup = new FormGroup<any>({});

  selectedFile: File | null = null;
  imageUrl: File | null = null;
  currentId: string = '';



  constructor(private dataService: DataService) {}

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('name', this.reactiveForm.value.name);
      formData.append('quantity', this.reactiveForm.value.quantity);
      formData.append('category', this.reactiveForm.value.category);
      // this.reactiveForm.value.image = this.imageUrl;
      // const newObject = {
      //   image: this.selectedFile,
      //   name: this.reactiveForm.value.name,
      //   quantity: this.reactiveForm.value.amount,
      //   category: this.reactiveForm.value.category,
      // }
      this.dataService.uploadData(formData).subscribe(data => {
        this.reactiveForm.reset();
        this.imageUrl=null;
      });
    }
  }


  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      image: new FormControl(this.imageUrl),
      name: new FormControl(null),
      quantity: new FormControl(0),
      category: new FormControl(''),
    })
  }
}
