export type SortPropName =
  | 'realtimeDeparture'
  | 'routeName'
  | 'destination'
  | 'distance';

export interface SortHeader {
  text: string;
  propName: SortPropName;
  label: string;
}

export interface Sort {
  propName: SortPropName;
  sortDir: number;
}
