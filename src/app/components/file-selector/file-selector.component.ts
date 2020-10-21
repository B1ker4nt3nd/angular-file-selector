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

  constructor(public dialog: MatDialog) {
    // test start
    // data
    const files = [];
    const file1 = new FileModel('test1', 'asdfghjkl');
    files.push(file1);
    const file2 = new FileModel('test2', 'qwertzuiop');
    files.push(file2);
    this.data = { files : files };
    // configuration
    this.configuration = {  
                            badgeColor: 'accent', 
                            dialogConfiguration: { fileNumberLimit: 3, acceptableExtensions: '.txt,.docx,.doc' } 
                          };
    // test end
  }
  @Input() configuration: Configuration;
  @Input() data: FileSelectorModel;

  ngOnInit(): void {
  }

  
  public get badgeValue() : string {
    return this.data?.files?.length.toString() ?? '0';
  }
  

  openFileDialog(): void {
    const data = new DialogWrapperModel(this.data, this.configuration.dialogConfiguration);
    const dialogRef = this.dialog.open(FileSelectorDialogComponent, {
      width: '80%',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: FileSelectorModel)  => {
      console.log('The dialog was closed');
      this.data = result;
    });
  }
}
