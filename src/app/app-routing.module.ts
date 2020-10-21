import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileSelectorComponent } from './components/file-selector/file-selector.component';

const routes: Routes = [
  { path: '**', redirectTo: 'file-selector', pathMatch: 'full' },
  { path: 'file-selector', component: FileSelectorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
