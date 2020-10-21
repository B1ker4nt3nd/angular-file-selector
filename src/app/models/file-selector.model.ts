import { Guid } from '../utilities/classes/Guid';

export class FileSelectorModel {
    constructor() {
        
    }
    files: FileModel[];
}

export class FileModel {
    constructor(fileName: string, externalId: string, size = 0, downloadUrl = '') {
        this._name = fileName;
        this._externalId = externalId;
        this._uniqueId = Guid.newGuid();
        this._size = size;
        this._downloadUrl = downloadUrl;
    }
    private _name: string;
    public get fileName(): string { return this._name; }
    
    private _externalId: string;
    public get externalId(): string { return this._externalId; }

    private _uniqueId: string;
    public get uniqueId(): string { return this._uniqueId; }

    private _size: number;
    public get size(): number { return this._size; }

    private _downloadUrl: string;
    public get downloadUrl(): string { return this._downloadUrl; }

    private _content: string | ArrayBuffer;
    /**
     * addFileContent
     */
    public addFileContent(file: File) {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          console.log(fileReader.result);
        }
        fileReader.readAsText(file)
        this._content = fileReader.result;
    }
}