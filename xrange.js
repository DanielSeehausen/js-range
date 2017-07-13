// TODO wrap privates in closure -- find out whats best option for that $peed
// TODO make test file

// if (typeof xrange === 'function')
//   throw "'xrange' function already defined elsewhere -- there can only be one Christopher Lambert!"

// Private
// *****************************************************************************
const operators = new Set(['+', 'log', 'pow'])

// function throwError(msg) {
//   throw new Error(msg)
// }

function assertTypes(start, stop, step) {
  for (var arg in arguments) {
    if (isNaN(parseFloat(arguments[arg])))
      throw `invalid arguments passed to xrange -- parameters must match the following: start int=(0 if only start provided), stop int=(start if only start provided), step int=1>\nReceived: ${start}, ${stop}, ${step}`
  }
}

function assertOperator(operator) {
  if (!operators.has(operator))
    throw `invalid operator passed to xrange -- operator should be one of: ['+', '*', '/', 'pow', 'log']\nReceived: ${operator}`
}

function assertValues(start, stop, step) {
  if (step === 0 || start === stop || (start > stop && step > 0) || (start < stop && step < 0))
    throw `unresolveable values passed to xrange -- received: (start<${start}>, stop<${stop}>, step<${step}>)`
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
  let arr = new Array(Math.abs(Math.ceil((start - stop)/step)))
  // TODO better to multiply step by iteration? Probably not. need to benchmark. not high priority
  arr[0] = start
  for (let idx = 1; idx < arr.length; idx++) {
    arr[idx] = dispatch[operator](arr[idx-1], step)
  }
  return arr
}
// *****************************************************************************


function xrange(start, stop=start, step=1, operator="+") {
  // [start, stop)

  // TODO high-priority: the */\//pow/log should really be put into a list initialization function instead of here (because the range really represents the iterations and no longer the integer range...)

  if (arguments.length === 1)
    start = 0

  if (start > stop && step > 0)
    step *= -1

  assertValid(start, stop, step, operator)
  return genRangeArr(start, stop, step, operator)
}

module.exports.xrange = xrange
