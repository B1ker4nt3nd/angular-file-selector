import { DialogConfiguration } from './dialog-configuration';

export class Configuration {
    constructor(parameters) {
        
    }
    badgeColor: string;
    buttonColor: string;
    translates: { [id: string] : string; };
    dialogConfiguration: DialogConfiguration;
}