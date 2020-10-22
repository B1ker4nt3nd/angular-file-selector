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
    const file1 = new FileModel('test1', 'asdfghjkl', 12);
    files.push(file1);
    const file2 = new FileModel('test2', 'qwertzuiop', 13);
    files.push(file2);
    this.initialFileSelectorModel = { files : files };

    let configTranslates: { [id: string] : string; } = {};
    configTranslates['buttonText'] = 'Attach Files';

    this.configuration = {  
      badgeColor: 'accent',
      buttonColor: 'primary',
      translates: configTranslates,
      dialogConfiguration: { 
              fileNumberLimit: 3, 
              acceptableExtensions: '.txt,.docx,.doc',
              maximumFileSize: 0,
              maximumCombinedFileSize: 0
            } 
    } as Configuration;
  }
  ngAfterViewInit(): void {
    // this.resultFileSelectorModel =  this.fileSelectorComponent.fileModels;
    // setTimeout(() => this.resultFileSelectorModel.files = this.fileSelectorComponent.fileModels.files, 0);
    this.cdr.detectChanges();
  }
}
