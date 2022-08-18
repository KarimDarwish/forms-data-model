import { Coordinates, Dimensions, Field } from './field';

export class Email extends Field {
  override dimensions: Dimensions = { height: 1, width: 2 };

  constructor(label: string, placement: Coordinates, required = false) {
    super(label, placement, required);
  }

  validate(value: string): boolean {
    return value.includes('@');
  }
}
