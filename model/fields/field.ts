import { UUID } from '../shared/uuid';
import { v4 as uuid } from 'uuid';
import { FileValue } from './file';

export type FieldValue = string | boolean | FileValue;

export abstract class Field {
  readonly id: UUID;
  readonly label: string;
  readonly required: boolean;
  abstract dimensions: Dimensions;

  placement: Coordinates;
  condition?: FieldCondition;

  protected constructor(
    label: string,
    placement: Coordinates,
    required: boolean = false
  ) {
    this.id = uuid();
    this.label = label;
    this.placement = placement;
    this.required = required;
  }

  addCondition(dependsOnField: UUID, value: FieldValue) {
    this.condition = {
      dependsOnField,
      value,
    };
  }

  move(placement: Coordinates) {
    this.placement = placement;
  }

  abstract validate(value: FieldValue): boolean;
}


export interface Coordinates {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface FieldCondition {
  dependsOnField: UUID;
  value: FieldValue;
}
