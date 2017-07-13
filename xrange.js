// TODO wrap privates in closure -- find out whats best option for that $peed

if (typeof xrange === 'function')
  throw "'xrange' function already defined elsewhere -- there can only be one Christopher Lambert!"

// Private
// *****************************************************************************
const operators = new Set(['+', 'log', 'pow'])

function assertTypes(start, stop, step) {
  for (var arg in arguments) {
    if (isNaN(parseFloat(arguments[arg]))
      throw `'invalid arguments passed to xrange -- parameters must match the following: (start<int>, stop<int>, range<int=1>'\nReceived: (${start}, ${stop}, ${step})`
  }
}

function assertValidOperator(operator) {
  if (!operators.has(operator))
    throw `invalid operator passed to xrange -- operator should be one of: ['+', '*', '/', 'pow', 'log']\nReceived: ${operator}`
}

function assertValues(start, stop, step) {
  if (step === 0 || start === stop || (start > stop && step > 0) || (start < stop && step < 0))
    throw `unresolveable values passed to xrange -- received: (start<${start}>, stop<${stop}>, range<${step}>)`
}

function assertValid(start, stop, step, operator) {
  assertTypes(start, stop, step)
  assertOperator(operator)
  assertValues(start, stop, step)
}

const dispatch = {
    "+" : (op1, op2) =>  {
        return op1 + op2
    },
    "*" : (op1, op2) =>  {
      return op1 * op2
    },
    "/" : (op1, op2) =>  {
        return op1 / op2
    },
    "pow" : (op1, op2) => {
        return Math.pow(op1, op2)
    },
    "log" : (op1) => {
        return Math.log(op1)
    }
}


function genRangeArr(start, stop, step, operator) {
  let arr = new Array(Math.ceil(Math.abs(start - stop))/step)
  // TODO better to multiply step by iteration? Probably not. need to benchmark. not high priority
  arr[0] = start
  for (let idx = 1; idx < arr.length; idx++) {
    arr[idx] = dispatch[operator](arr[idx-1], step)
  }
  return arr
}
// *****************************************************************************


function xrange(start, stop, step=1, operator="+") {
  // [start, stop)

  // TODO high-priority: the */\//pow/log should really be put into a list initialization function instead of here (because the range really represents the iterations and no longer the integer range...)

  if (arguments.length === 1) {
    stop = start
    start = 0
  }

  assertValid(start, stop, step, operator)
  return (start > stop) ? genRangeArr(stop, start, step, operator) : genRangeArr(start, stop, step, operator)
}

console.log(xrange(10))
