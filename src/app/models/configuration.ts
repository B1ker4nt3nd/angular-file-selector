import { DialogConfiguration } from './dialog-configuration';

export class Configuration {
    constructor(parameters) {
        
    }
    badgeColor: string;
    buttonColor: string;
    translations: { [id: string] : string; };
    dialogConfiguration: DialogConfiguration;
}