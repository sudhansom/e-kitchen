import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageUploadService } from 'src/app/services/image-upload.service';


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



  constructor(private imageUploadService: ImageUploadService) {}

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.reactiveForm.value.image = this.imageUrl;
      const newObject = {
        image: this.imageUrl,
        name: this.reactiveForm.value.explanation,
        amount: this.reactiveForm.value.amount,
    }
  }
  }


  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      image: new FormControl(this.imageUrl),
      name: new FormControl(null),
      amount: new FormControl(0),
    })
  }
}
