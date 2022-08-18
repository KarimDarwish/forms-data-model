import { Coordinates, Dimensions, Field, FieldValue } from './field';

export interface DropdownOption {
  label: string;
  value: string;
}

export class Dropdown extends Field {
  override dimensions: Dimensions = { height: 1, width: 2 };

  private _options: DropdownOption[] = [];

  get options() {
    return this._options;
  }

  constructor(
    label: string,
    placement: Coordinates,
    options: DropdownOption[] = [],
    required = false
  ) {
    super(label, placement, required);
    this._options = options;
  }

  addOption(option: DropdownOption) {
    this._options.push(option);
  }

  removeOption(index: number) {
    this._options = this._options.filter((option, i) => i !== index);
  }

  validate(value: string): boolean {
    return !!this.options.find((option) => option.value === value);
  }
}
