if (typeof xrange === 'function')
  throw "'xrange' function already defined elsewhere -- there can only be one Christopher Lambert!"

function xrange(start, stop, step=1, operator="+") {

  if (arguments.length === 1)
    return xrange(0, start)

  if (isNaN(parseFloat(start)) || isNaN(parseFloat(stop)) || isNaN(parseFloat(step)) || !(new Set(['+', 'log', 'pow']).has(operator))
    throw "'invalid arguments passed to xrange -- format parameters should follow the following format: (start<int>, stop<int>, range<int=1>, operator<one of ['+', 'pow', 'log']>)'"

  if (step === 0 || start === stop || (start > stop && step > 0) || (start < stop && step < 0))
    throw `invalid arguments provided: start - ${start}, stop - ${stop}, step - ${step}`



}

// Array.prototype
