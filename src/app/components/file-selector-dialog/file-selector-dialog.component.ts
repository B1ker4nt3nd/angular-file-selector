import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWrapperModel } from 'src/app/models/dialog-wrapper-model';
import { FileModel, FileSelectorModel } from 'src/app/models/file-selector.model';

@Component({
  selector: 'app-file-selector-dialog',
  templateUrl: './file-selector-dialog.component.html',
  styleUrls: ['./file-selector-dialog.component.scss']
})
export class FileSelectorDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  private initialData: FileSelectorModel;

  private _data : FileSelectorModel;
  public get data() : FileSelectorModel {
    return this._data;
  }
  public set data(v : FileSelectorModel) {
    this._data = v;
    if (!this.initialData) {
      this.initialData = this.clone(v);
    }
  }
  
  constructor(
    public dialogRef: MatDialogRef<FileSelectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputInformation: DialogWrapperModel) {
  }

  ngOnInit(): void {
    this.data = this.clone(this.inputInformation.fileSelectorModel);
    // this.data = this.inputInformation.fileSelectorModel;
  }

  public onOk(){
    this.dialogRef.close(this.data);
  }

  public onCancel(){
    this.dialogRef.close(this.initialData);
  }
  
  public isUrl(item: FileModel) : boolean {
    return item.downloadUrl !== '';
  }
  public handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
    Array.from(files).forEach(file => { 
      const fileModel = new FileModel(file.name, '', file.size, '');
      fileModel.addFileContent(file);
      this.data.files.push(fileModel);
     });
  }
  public clickOnFileInput() {
    this.fileInput.nativeElement.click();
  }
  
  public get isMultipleFileAllowed() : boolean {
    return this.inputInformation.configuration.fileNumberLimit > 1;
  }
  
  public get acceptableExtensions() : string {
    return this.inputInformation.configuration.acceptableExtensions;
  }
  private clone(source: FileSelectorModel): FileSelectorModel {
    // const cloneObject: FileSelectorModel = { ...source } as FileSelectorModel;
    let cloneObject = Object.create(source) as FileSelectorModel;
    // cloneObject = { ...source } as FileSelectorModel

    cloneObject.files = [];
    source.files.forEach((item: FileModel) => {
      // const cloneItem: FileModel = { ...item } as FileModel;
      const cloneItem: FileModel = Object.create(item) as FileModel;
      cloneObject.files.push(cloneItem);
    });
    return cloneObject;
  }
}
