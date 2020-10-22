import { Guid } from '../utilities/classes/Guid';

export class FileSelectorModel {
    constructor(files: FileModel[] = []) {
        this.files = files;
    }
    files: FileModel[];
}

export class FileModel {
    constructor(fileName: string, externalId: string, size = 0, downloadUrl = null, content: string | ArrayBuffer = null) {
        this._name = fileName;
        this._externalId = externalId;
        this._uniqueId = Guid.newGuid();
        this._size = size;
        this._downloadUrl = downloadUrl;
        this._content = content
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
    public get content(): string | ArrayBuffer { return this._content; }

    /**
     * addFileContent
     */
    public addFileContent(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // Once loaded, do something with the string
        reader.addEventListener('load', (event) => {
            this._content = event.target.result;
        });
    }
}