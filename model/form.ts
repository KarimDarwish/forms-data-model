import { Field, FieldValue } from './fields/field';
import { UUID } from './shared/uuid';
import { v4 as uuid } from 'uuid';

export class Form {
  readonly id: UUID;
  readonly name: string;
  private _fields: Field[] = [];

  get fields() {
    return this._fields;
  }

  get publicUrl(): URL {
    return new URL(`https://mytenant.myapp.com/public/forms/${this.id}`);
  }

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
  }

  addField(field: Field) {
    this._fields.push(field);
  }

  removeField(fieldId: UUID) {
    this._fields = this._fields.filter((field) => field.id !== fieldId);
  }

  getVisibleFields(formValue: FormValue): UUID[] {
    const fieldsWithoutCondition = this._fields
      .filter((field) => !field.condition)
      .map((field) => field.id);

    const visibleFieldsWithCondition = this._fields
      .filter((field) => !!field.condition)
      .filter(
        (field) =>
          formValue[field.condition.dependsOnField] === field.condition.value
      )
      .map((field) => field.id);

    return [...fieldsWithoutCondition, ...visibleFieldsWithCondition];
  }

  hasAllRequiredFieldsFilledOut(formValue: FormValue) {
    const requiredFields = this._fields.filter((field) => field.required);

    return requiredFields
      .map((field) => !!formValue[field.id])
      .every((isValid) => isValid);
  }

  isValid(formValue: FormValue) {
    return this._fields.every((field) => field.validate(formValue[field.id]));
  }
}

export type FormValue = { [fieldId: UUID]: FieldValue };
