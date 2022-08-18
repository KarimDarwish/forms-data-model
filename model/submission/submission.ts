import { UUID } from '../shared/uuid';
import { v4 as uuid } from 'uuid';
import { Form, FormValue } from '../form';

export class Submission {
  readonly id: UUID;
  readonly formId: UUID;
  readonly formValue: FormValue;

  constructor(formId: UUID, formValue: FormValue) {
    this.id = uuid();
    this.formId = formId;
    this.formValue = formValue;
  }
}

export function submitForm(form: Form, value: FormValue): Submission {
  if (!form.hasAllRequiredFieldsFilledOut(value)) {
    throw new Error('Not all required fields have been filled out');
  }

  if (!form.isValid(value)) {
    throw new Error('Invalid value provided for field(s)');
  }

  return new Submission(form.id, getFormValueWithoutInvisibleFields(form, value));
}

function getFormValueWithoutInvisibleFields(
  form: Form,
  value: FormValue
): FormValue {
  const visibleFields = form.getVisibleFields(value);

  return Object.keys(value)
    .filter((fieldId) => visibleFields.includes(fieldId))
    .reduce((updatedValue, fieldId) => {
      updatedValue[fieldId] = value[fieldId];
      return updatedValue;
    }, {});
}
