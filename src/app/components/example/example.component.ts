import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PRIMARY_OUTLET } from '@angular/router';
import { Configuration } from 'src/app/models/configuration';
import { FileModel, FileSelectorModel } from 'src/app/models/file-selector.model';
import { FileSelectorComponent } from '../file-selector/file-selector.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  initialFileSelectorModel: FileSelectorModel;
  configuration: Configuration;
  
  resultFileSelectorModel: FileSelectorModel;

  @ViewChild(FileSelectorComponent) public fileSelectorComponent: FileSelectorComponent;
  
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    
    const files = [];
    // Test start
    const file1 = new FileModel('test1', 'asdfghjkl', 12);
    files.push(file1);
    const file2 = new FileModel('test2', 'qwertzuiop', 13);
    files.push(file2);
    // Test end

    // Setup file uploader module START
    this.initialFileSelectorModel = { files : files };

    let configTranslates: { [id: string] : string; } = {};
    configTranslates['buttonText'] = 'Attach Files';

    let dialogConfigTranslates: { [id: string] : string; } = {};
    dialogConfigTranslates['okButtonText'] = 'OK';
    dialogConfigTranslates['cancelButtonText'] = 'Cancel';
    dialogConfigTranslates['attachButtonText'] = 'Upload';
    dialogConfigTranslates['okButtonText'] = 'OK';
    dialogConfigTranslates['cancelButtonText'] = 'Cancel';
    dialogConfigTranslates['attachButton'] = 'Upload';
    dialogConfigTranslates['title'] = 'File selector module';
    dialogConfigTranslates['text'] = 'Please select files for upload';

    this.configuration = {  
      badgeColor: 'accent',
      buttonColor: 'primary',
      translations: configTranslates,
      dialogConfiguration: { 
              fileNumberLimit: 3, 
              acceptableExtensions: '.txt,.docx,.doc',
              maximumFileSize: 0,
              maximumCombinedFileSize: 0,
              translations: dialogConfigTranslates
            } 
    } as Configuration;
    // Setup file uploader module END
  }
  ngAfterViewInit(): void {
    // this.resultFileSelectorModel =  this.fileSelectorComponent.fileModels;
    // setTimeout(() => this.resultFileSelectorModel.files = this.fileSelectorComponent.fileModels.files, 0);
    this.cdr.detectChanges();
  }
  /**
   * onValueChanges
   */
  public onValueChanges(newValue: FileSelectorModel) {
    console.log(JSON.stringify(newValue));
  }
}
