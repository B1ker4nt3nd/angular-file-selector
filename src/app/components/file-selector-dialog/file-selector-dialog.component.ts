import { FileModelStatus } from './../../enums/file-model-status.enum';
import { FileSelectorDialogResult } from './../../models/file-selector-dialog-result.model';
import { Guid } from './../../utilities/classes/Guid';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWrapperModel } from '../../models/dialog-wrapper-model';
import { FileSelectorModel } from '../../models/file-selector.model';
import { FileModel, ValidationModel } from "../../models/file.model";
import { DialogConfiguration } from './../../models/dialog-configuration';
import { humanFileSize } from './../../utilities/functions/display-file-size';

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
  }
  // PUBLIC METHODS START
  public handleFileInput(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const fileModel = new FileModel(file.name, '', file.size, Guid.newGuid(), file);
      const validateModel = this.getValidationModel();
      // fileModel.validateStatusAndAddFileContent(validateModel, file);
      fileModel.validateStatus(validateModel);
      this.data.files.push(fileModel);
    }
  }
  public actualCombinedFileSize(files: FileModel[] = null) : number {
    if (!files) {
      files =  this.data.files
    }
    return files.filter((x) => x.status === FileModelStatus.Ok).map((x) => x.size).reduce((sum, current) => sum + current, 0);
  }
  public get acceptableExtensionsForCheck() : string[] {
    return this.acceptableExtensions.split(',').map((x: string) => { return x.trim().replace('.', '').toLowerCase()});
  }
  public onOk(){
    this.dialogRef.close(new FileSelectorDialogResult(true, this.data));
  }
  public onCancel(){
    this.dialogRef.close(new FileSelectorDialogResult(false, this.data));
  }
  public get filesInformation() : string {
    let fileNumberPart = `Files selected: ${this.data.files.length}`;
    if (this.configuration.fileNumberLimit > 0) {
      fileNumberPart = fileNumberPart + `/${this.configuration.fileNumberLimit}`;
    }
    fileNumberPart = fileNumberPart + '. ';
    let fileSizePart = `Approved files size: ${humanFileSize(this.actualCombinedFileSize())}`;
    if (this.configuration.maximumCombinedFileSize) {
      fileSizePart = fileSizePart + `/${humanFileSize(this.configuration.maximumCombinedFileSize)}`;
    }
    if (this.configuration.maximumFileSize > 0) {
      fileSizePart = fileSizePart + `. Single file size maximum: ${humanFileSize(this.configuration.maximumFileSize)}`
    }
    return fileNumberPart + fileSizePart;
  }

  public isUrl(fileModel: FileModel) : boolean {
    return !fileModel.isError;
  }
  public isError(fileModel: FileModel): boolean {
    return fileModel.isError;
  }
  public getErrorMessage(fileModel: FileModel): string {
    if (fileModel.isError) {
      switch (fileModel.status) {
        case FileModelStatus.NotAllowedExtension:
          return 'File extension not valid';
        case FileModelStatus.TooBigFile:
            return 'File size too big';
        case FileModelStatus.TooBigCombinedFileSizes:
          return 'File combined size too big';
        case FileModelStatus.TooMuchCombinedFiles:
          return 'Too much file selected';
        default:
          break;
      }
    }
  }
  public isInProcess(item: FileModel): boolean {
    return item.status === FileModelStatus.Initialized;
  }
  public downloadItem(item: FileModel) {
    // if (item.content) {
    //   const byteCharacters = atob(item.content);
    //   const byteNumbers = new Array(byteCharacters.length);
    //   for (let i = 0; i < byteCharacters.length; i++) {
    //       byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   }
    //   const byteArray = new Uint8Array(byteNumbers);

    //   this.downloadFile(byteNumbers);
    // }
    console.log('download item');
  }
  private downloadFile(data: Blob) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  public deleteRow(item: FileModel) {
    const index = this.data.files.map((x: FileModel) => x.uniqueId).indexOf(item.uniqueId);
    if (index > -1) {
      this.data.files.splice(index, 1);
    }
    if (this.hasError) {
      this.data.files.forEach((fileModel: FileModel) => {
        const validateModel = this.getValidationModel();
        fileModel.validateStatus(validateModel);
      });
    }
  }
  public clickOnFileInput() {
    this.fileInput.nativeElement.click();
  }
  public isInProgress(fileModel: FileModel) : boolean {
    return fileModel.status === FileModelStatus.Initialized && fileModel.progressPercentage > 0 && fileModel.progressPercentage < 100;
  }
  // PUBLIC METHODS END
  // PROPERTIES START
  public get saveDisabled(): boolean {
    let isDisabled = false;
    if (this.compareArrays(this.data.files.map((x: FileModel) => x.uniqueId), this.initialData.files.map((x: FileModel) => x.uniqueId))) {
      isDisabled = true;
    }
    if (!isDisabled && this.data.files.some((x) => !x.isValid)) {
      isDisabled = true;
    }
    return isDisabled;
  }
  public get hasError() : boolean {
    return this.data.files.some((x) => x.isError);
  }
  public get isMultipleFileAllowed() : boolean {
    return this.configuration.fileNumberLimit > 1;
  }
  public get acceptableExtensions() : string {
    return this.configuration.acceptableExtensions;
  }  
  public get combinedTooMuchOrTooBigError() : boolean {
    return this.data.files.some((x) => x.status === FileModelStatus.TooBigCombinedFileSizes || x.status === FileModelStatus.TooMuchCombinedFiles);
  }
  public get addFileDisabled() : boolean {
    return this.data.files.some((x) => !x.isValid) || this.combinedTooMuchOrTooBigError || this.configuration.fileNumberLimit > 0 && this.data.files.length >= this.configuration.fileNumberLimit;
  }
  // TRANSLATIONS START
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
  // TRANSLATIONS END
  // PROPERTIES END

  // PRIVATE METHODS START
  private clone(source: FileSelectorModel, keepUniqueId = false): FileSelectorModel {
    const files: FileModel[] = []
    source.files.forEach((file: FileModel) => {
      const newFile: FileModel = new FileModel(file.fileName, file.externalId, file.size, file.downloadUrl, file.file);
      if (keepUniqueId) {
        newFile['_uniqueId'] = file.uniqueId;
      }
      const hasError = newFile.validateStatus(this.getValidationModel(files));
      files.push(newFile);
    })
    const model = new FileSelectorModel(files);
    return model;
  }

  private getValidationModel(files: FileModel[] = null) {
    if (!files) {
      files =  this.data.files
    }
    return new ValidationModel(this.acceptableExtensionsForCheck,
      this.configuration.maximumFileSize,
      this.configuration.maximumCombinedFileSize,
      this.configuration.fileNumberLimit,
      this.actualCombinedFileSize(files),
      files.filter((x: FileModel) => x.status === FileModelStatus.Ok || x.status === FileModelStatus.Initialized).length);
  }
  private compareArrays(array1: string[], array2: string[]): boolean {
    const array2Sorted = array2.slice().sort();
    return array1.length === array2.length && array1.slice().sort().every(function(value, index) {
        return value === array2Sorted[index];
    });
  }
  // PRIVATE METHODS END
}
