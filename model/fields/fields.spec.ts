import { Dropdown } from './dropdown';
import { FieldValue } from './field';
import { File, FileValue } from './file';
import { Email } from './email';

describe('Fields', () => {
  describe('Dropdown', () => {
    it('should be valid if value is part of valid options', () => {
      // Given
      const dropdown = new Dropdown('Employment Type', { x: 1, y: 1 });
      dropdown.addOption({ label: 'Full Time', value: 'full-time' });
      dropdown.addOption({ label: 'Part Time', value: 'part-time' });

      // When + Then
      const value: FieldValue = 'part-time';

      expect(dropdown.validate(value)).toBeTruthy();
    });

    it('should be invalid if value is not part of valid options', () => {
      // Given
      const dropdown = new Dropdown('Employment Type', { x: 1, y: 1 });
      dropdown.addOption({ label: 'Full Time', value: 'full-time' });
      dropdown.addOption({ label: 'Part Time', value: 'part-time' });

      // When + Then
      const value: FieldValue = 'not-part-of-options';

      expect(dropdown.validate(value)).toBeFalsy();
    });
  });
  describe('Email', () => {
    it('should be valid if value is an email', () => {
      // Given
      const textBox = new Email('Email', { x: 1, y: 1 });

      // When + Then
      expect(textBox.validate('email@email.com')).toBeTruthy();
    });

    it('should be invalid if value is not an email', () => {
      // Given
      const textBox = new Email('Email', { x: 1, y: 1 });

      // When + Then
      expect(textBox.validate('email.com')).toBeFalsy();
    });
  });
  describe('File', () => {
    it('should be valid if control is required and a file has been uploaded', () => {
      // Given
      const file = new File('Documents', { x: 1, y: 1 }, true);

      // When + Then
      const value: FileValue = [
        { fileName: 'CV', size: 12345, type: 'appplication/pdf' },
      ];

      expect(file.validate(value)).toBeTruthy();
    });

    it('should be invalid if control is required and a no file has been uploaded', () => {
      // Given
      const file = new File('Documents', { x: 1, y: 1 }, true);

      // When + Then
      const value: FileValue = [];

      expect(file.validate(value)).toBeFalsy();
    });
  });
});
