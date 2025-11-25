// The flat interface converted from ./sample.ts

export interface RootObject {
  string: string;
  number: number;
  float: number;
  boolean: boolean;
  nullValue: unknown;
  undefinedValue: unknown;
  bigint: bigint;
  todos: any[];
  array: number[];
  nestedObject: {
    id: number;
    name: string;
    active: boolean;
    metadata: {
      created: Date;
      tags: string[];
      score: number;
    };
  };
  set: Iterable<any>;
  map: Iterable<any>;
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
