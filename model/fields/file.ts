import { Coordinates, Dimensions, Field } from './field';

export class File extends Field {
  override dimensions: Dimensions = { height: 2, width: 2 };

  constructor(label: string, placement: Coordinates, required = false) {
    super(label, placement, required);
  }

  validate(value: FileValue): boolean {
    if (!this.required) return true;

    return value.length > 0;
  }
}

export type FileValue = UploadedFile[];

export interface UploadedFile {
  fileName: string;
  size: number;
  type: string;
}
