// Replace const (http://es6-features.org/#Constants) and arrow functions (http://es6-features.org/#ExpressionBodies)
const assertEquals = (expected, actual, description) => {
  try {
    deepEquals(expected, actual)
  }
  catch (error) {
    // Replace template literals (http://es6-features.org/#StringInterpolation)
    throw new Error(`${description ? description + ': ' : ''}${error.message}`)
  }
}

// Replace default parameter values (http://es6-features.org/#DefaultParameterValues)
const deepEquals = (a, b, trace='') => {
  // Replace let (http://es6-features.org/#BlockScopedVariables)
  let typeA = getType(a)
  let typeB = getType(b)

  if (typeA === 'undefined' && typeB !== 'undefined')
    throw new Error(`Found ${trace}, none expected`)

  if (typeB === 'undefined' && typeA !== 'undefined')
    throw new Error(`Expected ${trace}, but was not found`)

  if (typeA !== typeB)
    throw new Error(`Expected type ${getType(a)}, but found type ${getType(b)}`)

  if (typeof a !== 'object' && a !== b)
    throw new Error(`Expected ${trace ? trace + ' ' : ''}${JSON.stringify(a)}, but found ${JSON.stringify(b)}`)

  if (typeA === 'array' && a.length !== b.length)
    throw new Error(`Expected array length ${a.length}, but found ${b.length}`)

  if (typeof a === 'object')
    // Replace Set (http://es6-features.org/#SetDataStructure) and spread operators (http://es6-features.org/#SpreadOperator)
    new Set([...Object.keys(a), ...Object.keys(b)]).forEach(
      key => deepEquals(a[key], b[key], `${trace}${buildTrace(a, key)}`)
    )
}

const getType = x => {
  if (x === null)
    return 'null'
  if (x instanceof Array)
    return 'array'
  return typeof x
}

const buildTrace = (element, key) => element instanceof Array ? `[${key}]` : `.${key}`


// Replace class definition (http://es6-features.org/#ClassDefinition)
class Test {
  // Replace destructuring assignment (http://es6-features.org/#ObjectMatchingShorthandNotation)
  constructor({expected, actual, description}) {
    this.expected = expected
    this.actual = actual
    this.description = description
  }

  run() {
    assertEquals(this.expected, this.actual, this.description)
  }
}

const tests = [
  {
    expected: {a: 1},
    actual: {a: 1, b: 2},
    description: 'Comparing an object with an additional key',
  },
  {
    expected: {a: 1},
    actual: {},
    description: 'Comparing an object missing a key',
  },
  {
    expected: NaN,
    actual: null,
    description: 'Comparing different types',
  },
  {
    expected: {a: 5},
    actual: {a: 6},
    description: 'Comparing objects with different values',
  },
  {
    expected: [1, 2, 3],
    actual: [1, 2, 3, 4],
    description: 'Comparing arrays of different lengths',
  },
  {
    expected: {a: {b: 5}},
    actual: {a: {b: 6}},
    description: 'Comparing nested objects',
  },
]

tests.map(test => new Test(test))
     .forEach(test => {
       try {
         test.run()
       } catch (error) {
         console.log(error.message)
       }
     })
