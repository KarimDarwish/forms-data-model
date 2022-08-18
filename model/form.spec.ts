import { Form, FormValue } from './form';
import { TextBox } from './fields/textBox';
import { Boolean } from './fields/boolean';
import { File } from './fields/file';
import { Dropdown } from './fields/dropdown';
import { Email } from './fields/email';

describe('Forms', () => {
  describe('Designing Forms', () => {
    it('should be able to add fields', () => {
      // Given
      const form = new Form('Collect User Information');
      const textBox = new TextBox('First Name', { x: 1, y: 1 });

      // When
      form.addField(textBox);

      // Then
      expect(form.fields.length).toEqual(1);
    });

    it('should be able to remove fields', () => {
      // Given
      const form = new Form('Collect User Information');
      const textBox = new TextBox('First Name', { x: 1, y: 1 });
      const dropdown = new Dropdown('Employment Type', { x: 1, y: 2 });

      form.addField(textBox);
      form.addField(dropdown);

      expect(form.fields.length).toEqual(2);

      // When
      form.removeField(dropdown.id);

      // Then
      expect(form.fields.length).toEqual(1);
    });

    it('should be able to move fields', () => {
      // Given
      const form = new Form('Collect User Information');
      const textBox = new TextBox('First Name', { x: 1, y: 1 });

      form.addField(textBox);

      // When
      textBox.move({ x: 1, y: 2 });

      // Then
      expect(form.fields[0].placement).toEqual({ x: 1, y: 2 });
    });
  });

  describe('Sending Forms', () => {
    it('should return URL with ID of form when getting URL', () => {
      // Given
      const form = new Form('Candidate Survey');

      // When + Then
      expect(form.publicUrl.href).toContain(form.id);
    });
  });

  describe('Submitting Forms', () => {
    describe('Conditional Fields', () => {

      //this could be inlined into a single test with e.g. it.each([..])
      it('should return field as visible if condition is true', () => {
        // Given
        const form = new Form('Employee Survey');
        const boolean = new Boolean('Got Files?', { x: 1, y: 1 });
        const file = new File('Upload Files', { x: 1, y: 3 });

        file.addCondition(boolean.id, true);
        form.addField(boolean);
        form.addField(file);

        // When
        const visibleFields = form.getVisibleFields({
          [boolean.id]: true,
        });

        // Then
        expect(visibleFields).toEqual([boolean.id, file.id]);
      });

      it('should not return field as visible if condition is true', () => {
        // Given
        const form = new Form('Employee Survey');
        const boolean = new Boolean('Got Files?', { x: 1, y: 1 });
        const file = new File('Upload Files', { x: 1, y: 3 });

        file.addCondition(boolean.id, true);
        form.addField(boolean);
        form.addField(file);

        // When
        const visibleFields = form.getVisibleFields({
          [boolean.id]: false,
        });

        // Then
        expect(visibleFields).toEqual([boolean.id]);
      });
    });

    describe('Required Fields', () => {
      it('should return false if not all required fields have been filled out', () => {
        // Given
        const form = new Form('Employee Survey');
        const emailField = new Email('Email', { x: 1, y: 1 }, true);

        form.addField(emailField);

        const formValue = {};

        // When + Then
        expect(form.hasAllRequiredFieldsFilledOut(formValue)).toBeFalsy();
      });

      it('should return true if all required fields have been filled out', () => {
        // Given
        const form = new Form('Employee Survey');
        const emailField = new Email('Email', { x: 1, y: 1 }, true);

        form.addField(emailField);

        const formValue = { [emailField.id]: 'my@email.com' };

        // When + Then
        expect(form.hasAllRequiredFieldsFilledOut(formValue)).toBeTruthy();
      });
    });

    describe('Validation', () => {
      it('should be valid if all controls are valid', () => {
        // Given
        const form = new Form('Employee Survey');
        const emailField = new Email('Email', { x: 1, y: 1 }, true);
        const dropdown = new Dropdown(
          'Email',
          { x: 1, y: 1 },
          [{ label: 'Full Time', value: 'full-time' }],
          true
        );

        form.addField(emailField);
        form.addField(dropdown);

        // When + Then
        const formValue: FormValue = {
          [emailField.id]: 'email@email.com',
          [dropdown.id]: 'full-time',
        };

        expect(form.isValid(formValue)).toBeTruthy();
      });

      it('should be invalid if not all controls are valid', () => {
        // Given
        const form = new Form('Employee Survey');
        const emailField = new Email('Email', { x: 1, y: 1 }, true);
        const dropdown = new Dropdown(
          'Email',
          { x: 1, y: 1 },
          [{ label: 'Full Time', value: 'full-time' }],
          true
        );

        form.addField(emailField);
        form.addField(dropdown);

        // When + Then
        const formValue: FormValue = {
          [emailField.id]: 'email@email.com',
          [dropdown.id]: 'random-option',
        };

        expect(form.isValid(formValue)).toBeFalsy();
      });
    });
  });
});
