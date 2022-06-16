import { Injectable } from '@angular/core';
import {BlockUIService} from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private blockUIService: BlockUIService) {
  }

  start(blockId?: string): void {
    blockId = blockId || 'globalBlockUi';
    this.blockUIService.start(blockId);
  }

  stop(blockId?: string): void {
    blockId = blockId || 'globalBlockUi';
    this.blockUIService.stop(blockId);
  }
}
