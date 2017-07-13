const tester = require('./test-helpers.js')
const xrange = require('../xrange.js')

const tests = [
  [[10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]
]
// TODO fix naming conventions so tired atm
tests.forEach(n => tester.t(xrange.xrange, n[0], n[1]))

// tester.t(xrange.xrange, tests[0][0], tests[0][1])
