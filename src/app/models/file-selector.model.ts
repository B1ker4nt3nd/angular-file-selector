import { FileModel } from './file.model';

export class FileSelectorModel {
    constructor(files: FileModel[] = []) {
        this.files = files;
    }
    files: FileModel[];
}

