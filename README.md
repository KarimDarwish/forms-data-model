# Forms

This is supposed to show a PoC data model for an implementation of custom forms

# Approach

I have decided to build on top of the given example and also use an OOP approach using TypeScript.

Functionality is modelled using functions, e.g. ``submitForm()``

The usage of the API is demonstrated using tests.

# Functionality

I approached the challenge by splitting it up in the different requirements and then worked on them sequentially.

## Designing a Form

Basic functionality here should include:

- Adding/Removing fields
- Moving fields on the form
- Marking fields as conditional based on a value


### **Design Decisions**

- The form will be implemented/designed as a grid, users can place fields horizontally/vertically as they like
- Fields are implemented using an ``abstract`` class to have shared validation/logic/fields there instead of e.g. using interfaces for this 
- Fields have fixed dimensions (width/height) based on the grid that cannot be changed by users
- Email is a separate field (wanted to introduce a ``TextBoxFormat`` at first that could be Email/Text) as this makes e.g. validations simpler


### **Trade-offs**

- Designing it as a grid means more complexity but means more freedom for users, an alternate approach would be to just index the fields and render them in order

### **Future Improvements**
- Validation about the placement of fields (no overlapping elements, possibly auto-pushing elements if others are moved, etc.)
- Validation when adding a condition to a field that verifies that the referenced field exists (would probably have to be done in the form)
- Possible versioning scheme or setting a form to be live/draft (live -> can be submitted, draft -> cannot) 
- The grid size would need to be specified somewhere/in the form and can then be used to perform further validation

## Sending a Form

Basic functionality here should be:

- Getting a URL that can be made public where users can submit the form (both anonymous and logged in)

### **Design Decisions**
- Currently, the hostname and format of the URL is hardcoded in the form - in a real example this would be provided by e.g. an environment variable

### **Future Improvements**
- A "share" functionality where the URL with a pre-defined text is sent to an email or a user
- Dynamic hostname depending on the environment where our service is deployed

## Submitting a Form

Basic functionality here should be:

- Validating input by user
  - Validating if all required fields have been filled out
  - Validating that no invalid values have been submitted
  - Removing values for fields that should have been hidden (e.g. when the user makes the field visible, enters something and then invisible again)
- Receiving a submission that can then be stored/analyzed

### **Design Decisions**
- Validation rules for specific controls are within each control, that way we increase cohesion and have an easier time adding new controls
- Logic if a form as a whole (a submission) is valid is within the form instead of the submission (form now knows about a submission but that seemed acceptable)


### **Future Improvements**
- Combining ``hasAllRequiredFieldsFilledOut()`` and `isValid()` for a form to a single `validate()` method that returns validation errors

