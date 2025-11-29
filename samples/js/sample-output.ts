// The plain interfaces converted from ./sample.ts

export interface RootObject {
  string: string;
  number: number;
  float: number;
  boolean: boolean;
  nullValue: unknown;
  undefinedValue: unknown;
  bigint: bigint;
  todos: any[];
  array: [number, string, boolean, null, object];
  nestedObject: NestedObject;
  set: Set<number>;
  map: Map<string, string>;
  date: Date;
  regexp: RegExp;
  error: Error;
  typedArray: Uint8Array;
  arrayBuffer: ArrayBuffer;
  dataView: DataView;
  promise: Promise<any>;
  generator: Iterable<any>;
  asyncFunction: (...args: any[]) => Promise<any>;
  arrowFunction: (...args: any[]) => any;
  classInstance: (...args: any[]) => any;
  weakMap: WeakMap<object, any>;
  weakSet: WeakSet<object>;
  symbolKey: symbol;
  symbolProperty: symbol;
  test: (...args: any[]) => any;
  symbol: symbol;
}

interface NestedObject {
  id: number;
  name: string;
  active: boolean;
  metadata: Metadata;
}

interface Metadata {
  created: Date;
  tags: string[];
  score: number;
}
