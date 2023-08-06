import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./views/root/root.module').then((mod)=>mod.RootModule)},
  { path: 'i', loadChildren: () => import('./views/input-form/input-form.module').then((mod)=>mod.InputFormModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
