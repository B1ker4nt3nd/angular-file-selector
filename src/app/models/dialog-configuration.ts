export class DialogConfiguration {
    fileNumberLimit: number;
    acceptableExtensions: string; //comma separated list. for example: '.doc,.docx'
    maximumFileSize: number;
    maximumCombinedFileSize: number;
    translations: { [id: string] : string; };
}