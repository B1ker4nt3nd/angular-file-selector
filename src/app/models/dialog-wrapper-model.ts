import { DialogConfiguration } from './dialog-configuration';
import { FileSelectorModel } from "./file-selector.model";

export class DialogWrapperModel {
    constructor(fileSelectorModel: FileSelectorModel, configuration: DialogConfiguration) {
        this.fileSelectorModel = fileSelectorModel;
        this.configuration = configuration;
    }
    fileSelectorModel: FileSelectorModel;
    configuration: DialogConfiguration;
}