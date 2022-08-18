import { Coordinates, Dimensions, Field, FieldValue } from './field';

export class Boolean extends Field {
  override dimensions: Dimensions = { height: 1, width: 1 };

  constructor(label: string, placement: Coordinates, required = false) {
    super(label, placement, required);
  }

  validate(value: FieldValue): boolean {
    return true;
  }
}
