import { FileSelectorModel } from './file-selector.model';
export class FileSelectorDialogResult {
    constructor(wasChanges: boolean, model: FileSelectorModel) {
        this.propagateResult = wasChanges;
        this.result = model;
    }
    propagateResult: boolean;
    result: FileSelectorModel;
}