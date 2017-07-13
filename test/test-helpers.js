function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false
    }
    return true
}

function logFail(funcName, args, ans, res) {
  console.error(`${funcName} with args ${args}:\nReturned: ${res}\nExpected: ${ans}`)
}

function tester(func, args, ans) {
  console.log(`\n***TESTING: ${func.name}***`)
  let res = func.apply(this, args)
  if (!arraysEqual(res, ans))
    logFail(func.name, args, ans, res)
  console.log('*****************************')
}

module.exports.t = tester
