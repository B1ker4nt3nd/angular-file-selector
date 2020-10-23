import { FileSelectorDialogResult } from './../../models/file-selector-dialog-result.model';
import { Guid } from './../../utilities/classes/Guid';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWrapperModel } from 'src/app/models/dialog-wrapper-model';
import { FileModel, FileSelectorModel } from 'src/app/models/file-selector.model';
import { DialogConfiguration } from 'src/app/models/dialog-configuration';

@Component({
  selector: 'app-file-selector-dialog',
  templateUrl: './file-selector-dialog.component.html',
  styleUrls: ['./file-selector-dialog.component.scss']
})
export class FileSelectorDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  private initialData: FileSelectorModel;
  
  public get configuration() : DialogConfiguration {
    return this.inputInformation.configuration;
  }
  
  private _data : FileSelectorModel;
  public get data() : FileSelectorModel {
    return this._data;
  }
  public set data(v : FileSelectorModel) {
    this._data = v;
    if (!this.initialData) {
      this.initialData = this.clone(v, true);
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

  public handleFileInput(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (this.configuration.maximumFileSize > 0 && file.size > this.configuration.maximumFileSize) {
        // TODO
        console.log('Maximum file size error');
        break;
      }

      const fileModel = new FileModel(file.name, '', file.size, Guid.newGuid());
      fileModel.addFileContent(file);
      this.data.files.push(fileModel);
      console.log(`test: ${this.data.files.map(x => x.size).reduce((sum, current) => sum + current, 0)}`);
      if (this.configuration.maximumCombinedFileSize > 0 &&
        this.data.files.map(x => x.size).reduce((sum, current) => sum + current, 0) > this.configuration.maximumCombinedFileSize) {
          // TODO
          this.data.files.pop();
          console.log('Maximum Combined file size error');
          break;
        }
    }
    
    // this.fileToUpload = files.item(0);
    // Array.from(files).forEach(file => { 
    //   if (this.configuration.maximumFileSize > 0 && file.size > this.configuration.maximumFileSize) {
    //     // TODO
    //     console.log('Maximum file size error');
    //   }
    //   const fileModel = new FileModel(file.name, '', file.size, Guid.newGuid());
    //   fileModel.addFileContent(file);
    //   this.data.files.push(fileModel);
    //  });
  }

  public onOk(){
    this.dialogRef.close(new FileSelectorDialogResult(true, this.data));
  }

  public onCancel(){
    this.dialogRef.close(new FileSelectorDialogResult(false, this.data));
  }
  
  /**
   * saveDisabled
   */
  public get saveDisabled(): boolean {
    return this.compareArrays(this.data.files.map((x: FileModel) => x.uniqueId), this.initialData.files.map((x: FileModel) => x.uniqueId));
  }
  private compareArrays(array1: string[], array2: string[]): boolean {
    const array2Sorted = array2.slice().sort();
    return array1.length === array2.length && array1.slice().sort().every(function(value, index) {
        return value === array2Sorted[index];
    });
  }
  public isUrl(item: FileModel) : boolean {
    return item.downloadUrl !== '';
  }
  /**
   * deleteRow(item)
   */
  public deleteRow(item: FileModel) {
    const index = this.data.files.map((x: FileModel) => x.uniqueId).indexOf(item.uniqueId);
    if (index > -1) {
      this.data.files.splice(index, 1);
    }
  }
  public clickOnFileInput() {
    this.fileInput.nativeElement.click();
  }
  
  public get isMultipleFileAllowed() : boolean {
    return this.configuration.fileNumberLimit > 1;
  }
  
  public get acceptableExtensions() : string {
    return this.configuration.acceptableExtensions;
  }
  
  public get cancelButtonText() : string {
    return this.configuration.translations['cancelButtonText'] ?? 'Cancel';
  }
  public get okButtonText() : string {
    return this.configuration.translations['okButtonText'] ?? 'Ok';
  }
  public get attachButtonText() : string {
    return this.configuration.translations['attachButtonText'] ?? 'Attach File';
  }
  public get cancelButtonColor() : string {
    return this.configuration.translations['cancelButtonColor'] ?? '';
  }
  public get okButtonColor() : string {
    return this.configuration.translations['okButtonColor'] ?? 'primary';
  }
  public get attachButtonColor() : string {
    return this.configuration.translations['attachButtonColor'] ?? 'accent';
  }
  public get titleText() : string {
    return this.configuration.translations['title'] ?? 'File Uloader Module!';
  }
  public get detailsText() : string {
    return this.configuration.translations['text'] ?? '';
  }

  private clone(source: FileSelectorModel, keepUniqueId = false): FileSelectorModel {
      const files: FileModel[] = []
      source.files.forEach((file: FileModel) => {
        const newFile: FileModel = new FileModel(file.fileName, file.externalId, file.size, file.downloadUrl, file.content);
        if (keepUniqueId) {
          newFile['_uniqueId'] = file.uniqueId;
        }
        files.push(newFile);
      })
      const model = new FileSelectorModel(files);
      return model;
  }
}
