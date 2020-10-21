import { Pipe, PipeTransform } from '@angular/core';
import { humanFileSize } from '../functions/display-file-size';

@Pipe({ name: 'filesize' })
export class DisplayFileSizePipe implements PipeTransform {
  transform(sizeInBytes: number) {
    return humanFileSize(sizeInBytes);
  }
}