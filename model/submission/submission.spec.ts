import { Form } from '../form';
import { submitForm } from './submission';
import { Boolean } from '../fields/boolean';
import { Email } from '../fields/email';

describe('Submission', () => {
  it('should return a submission with the value', () => {
    // Given
    const form = new Form('Candidate Survey');
    const emailField = new Email('Email', { x: 1, y: 1 }, true);

    form.addField(emailField);

    // When
    const formValue = { [emailField.id]: 'my@email.com' };

    const submission = submitForm(form, formValue);

    // Then
    expect(submission).toBeTruthy();
    expect(submission.formValue).toEqual(formValue);
  });

  it('should validate the format of the values', () => {
    // Given
    const form = new Form('Candidate Survey');
    const emailField = new Email('Email', { x: 1, y: 1 }, true);

    form.addField(emailField);

    // When + Then
    const formValue = { [emailField.id]: 'not-an-email' };

    expect(() => submitForm(form, formValue)).toThrowError(
      'Invalid value provided for field(s)'
    );
  });

  it('should validate that all required values are filled out', () => {
    // Given
    const form = new Form('Candidate Survey');
    const emailField = new Email('Email', { x: 1, y: 1 }, true);

    form.addField(emailField);

    // When
    const formValue = {};

    //Then
    expect(() => submitForm(form, formValue)).toThrowError(
      'Not all required fields have been filled out'
    );
  });

  it('should discard value for field that should not be visible', () => {
    // Given
    const form = new Form('Candidate Survey');
    const boolean = new Boolean('Include Email?', { x: 1, y: 1 });
    const emailField = new Email('Email', { x: 1, y: 1 });

    emailField.addCondition(boolean.id, true);

    form.addField(boolean);
    form.addField(emailField);

    // When
    const formValue = {
      [boolean.id]: false,
      [emailField.id]: 'user-untoggled-again@test.com',
    };

    const submission = submitForm(form, formValue);

    // Then
    expect(submission).toBeTruthy();
    expect(submission.formValue).toEqual({
      [boolean.id]: false,
    });
  });
});
