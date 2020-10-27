import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Configuration } from './../../models/configuration';
import { DialogWrapperModel } from './../../models/dialog-wrapper-model';
import { FileSelectorDialogResult } from './../../models/file-selector-dialog-result.model';
import { FileSelectorDialogComponent } from '../file-selector-dialog/file-selector-dialog.component';
import { FileSelectorModel } from './../../models/file-selector.model';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  @Input() configuration: Configuration;
  @Input() fileModels: FileSelectorModel;
  @Output() fileSelectorResult = new EventEmitter<FileSelectorModel>();
  
  ngOnInit(): void {
    this.fileSelectorResult.next(this.fileModels);
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

    dialogRef.afterClosed().subscribe((response: FileSelectorDialogResult)  => {
      console.log('The dialog was closed');
      if (response.propagateResult) {
        this.fileModels = response.result;
        this.fileSelectorResult.next(this.fileModels);
      }
    });
  }
  
  public get badgeColor() : string {
    return this.configuration.badgeColor ?? 'accent';
  }
  
  public get buttonColor() : string {
    return this.configuration.buttonColor ?? 'primary';
  }
  
  public get buttonText() : string {
    return this.configuration.translations['buttonText'];
  }
  
}
