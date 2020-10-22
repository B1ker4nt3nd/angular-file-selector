import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './components/example/example.component';
import { FileSelectorComponent } from './components/file-selector/file-selector.component';

const routes: Routes = [
  { path: '**', redirectTo: 'example', pathMatch: 'full' },
  // { path: 'file-selector', component: FileSelectorComponent },
  { path: 'example', component: ExampleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
