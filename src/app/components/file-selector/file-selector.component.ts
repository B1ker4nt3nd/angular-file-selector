import { DialogWrapperModel } from 'src/app/models/dialog-wrapper-model';
import { FileSelectorModel, FileModel } from './../../models/file-selector.model';
import { Component, Input, OnInit } from '@angular/core';
import { FileSelectorDialogComponent } from '../file-selector-dialog/file-selector-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Configuration } from 'src/app/models/configuration';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  @Input() configuration: Configuration;
  @Input() fileModels: FileSelectorModel;

  ngOnInit(): void {
  }

  
  public get badgeValue() : string {
    return this.fileModels?.files?.length.toString() ?? '0';
  }

  openFileDialog(): void {
    const data = new DialogWrapperModel(this.fileModels, this.configuration.dialogConfiguration);
    const dialogRef = this.dialog.open(FileSelectorDialogComponent, {
      autoFocus: false,
      width: '80%',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: FileSelectorModel)  => {
      console.log('The dialog was closed');
      this.fileModels = result;
    });
  }
  
  public get badgeColor() : string {
    return this.configuration.badgeColor ?? 'accent';
  }
  
  public get buttonColor() : string {
    return this.configuration.buttonColor ?? 'primary';
  }
  
  public get buttonText() : string {
    return this.configuration.translates['buttonText'];
  }
  
}
