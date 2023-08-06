import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InputFormComponent } from "./input-form.component";
import { ReactiveFormsModule } from "@angular/forms";


const appRoutes: Routes = [
  {
    path: '',
    component: InputFormComponent
  }
]

@NgModule({
  declarations: [
    InputFormComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    ReactiveFormsModule,
  ],
  exports:[],
  providers: [],
  bootstrap: [],
})
export class InputFormModule {}
