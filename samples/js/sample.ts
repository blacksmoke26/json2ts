export default {
  string: 'hello world',
  number: 42,
  float: 3.14,
  boolean: true,
  nullValue: null,
  undefinedValue: undefined,
  bigint: 9007199254740991n,
  array: [1, 'two', true, null, { nested: 'object' }],
  nestedObject: {
    id: 123,
    name: 'John Doe',
    active: true,
    metadata: {
      created: new Date(),
      tags: ['user', 'admin'],
      score: 98.7,
    },
  },
  set: new Set([1, 2, 3, 4]),
  map: new Map([['key1', 'value1'], ['key2', 'value2']]),
  date: new Date(),
  regexp: /pattern/g,
  error: new Error('Something went wrong'),
  typedArray: new Uint8Array([1, 2, 3]),
  arrayBuffer: new ArrayBuffer(8),
  dataView: new DataView(new ArrayBuffer(16)),
  promise: Promise.resolve('success'),
  generator: (function* () {
    yield 1;
    yield 2;
    yield 3;
  })(),
  asyncFunction: async function() {
    return 'async result';
  },
  arrowFunction: () => {
    return 'arrow';
  },
  classInstance: class TestClass {
    constructor(public value: number) {
    }

    method() {
      return this.value * 2;
    }
  },
  weakMap: new WeakMap(),
  weakSet: new WeakSet(),
  symbolKey: Symbol('description'),
  symbolProperty: Symbol.for('globalSymbol'),
  test() {
  },
  symbol: Symbol(1),
};
