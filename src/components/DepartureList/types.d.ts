export type SortPropName =
  | 'realtimeDeparture'
  | 'routeName'
  | 'destination'
  | 'distance';

export interface SortHeader {
  text: string;
  propName: SortPropName;
}

export interface Sort {
  propName: SortPropName;
  sortDir: number;
}
