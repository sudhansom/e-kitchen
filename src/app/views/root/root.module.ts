import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { RootComponent } from "./root.component";

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
  },
];

@NgModule({
  declarations: [RootComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [],
})

export class RootModule {

}
