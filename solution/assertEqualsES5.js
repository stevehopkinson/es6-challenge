function assertEquals (expected, actual, description) {
  try {
    deepEquals(expected, actual)
  }
  catch (error) {
    throw new Error((description ? description + ': ' : '') + error.message)
  }
}

function deepEquals (a, b, trace) {
  if (trace === undefined)
    trace = ''

  var typeA = getType(a)
  var typeB = getType(b)

  if (typeA === 'undefined' && typeB !== 'undefined')
    throw new Error('Found ' + trace + ', none expected')

  if (typeB === 'undefined' && typeA !== 'undefined')
    throw new Error('Expected ' + trace + ', but was not found')

  if (typeA !== typeB)
    throw new Error('Expected type ' + getType(a) + ', but found type ' + getType(b))

  if (typeof a !== 'object' && a !== b)
    throw new Error('Expected ' + (trace ? trace + ' ' : '') + JSON.stringify(a) + ', but found ' + JSON.stringify(b))

  if (typeA === 'array' && a.length !== b.length)
    throw new Error('Expected array length ' + a.length + ', but found ' + b.length)

  if (typeof a === 'object') {
    var keys = Object.keys(a)
                     .concat(Object.keys(b))
                     .filter(function (value, index, self) { return self.indexOf(value) === index })
    keys.forEach(
      function (key) {
        deepEquals(a[key], b[key], '' + trace + buildTrace(a, key))
      })
  }
}

function getType (x) {
  if (x === null)
    return 'null'
  if (x instanceof Array)
    return 'array'
  return typeof x
}

function buildTrace (element, key) {
  return element instanceof Array ? '[' + key + ']' : '.' + key
}


// Tests

function Test (options) {
  this.expected = options.expected
  this.actual = options.actual
  this.description = options.description
}

Test.prototype.run = function () {
  assertEquals(this.expected, this.actual, this.description)
}

var tests = [
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

tests.map(function (test) { return new Test(test) })
     .forEach(
       function (test) {
         try {
           test.run()
         } catch (error) {
           console.log(error.message)
         }
     })
