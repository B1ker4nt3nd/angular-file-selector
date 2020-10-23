import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSelectorComponent } from './components/file-selector/file-selector.component';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { FileSelectorDialogComponent } from './components/file-selector-dialog/file-selector-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayFileSizePipe } from './utilities/pipes/display-file-size-pipe';
import { ExampleComponent } from './components/example/example.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectorComponent,
    FileSelectorDialogComponent,
    DisplayFileSizePipe,
    ExampleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    NgbModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [DisplayFileSizePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
