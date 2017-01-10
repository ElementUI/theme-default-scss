import postcss from 'postcss'
import balanced from 'balanced-match'

const removeCalc = value => {
  var calcIndex = value.indexOf('calc')
  if (calcIndex === -1) return value
  var pre = value.substr(0, calcIndex)
  var next = value.substr(calcIndex)

  var result = balanced('(', ')', next)

  // if (result.post[0] === '%') {
  //   result.post = result.post.substr(1)
  // }

  if (result.post[0] !== ' ') {
    result.body = '(' + result.body
    while (result.post[0] && result.post[0] !== ' ') {
      result.body += result.post[0]
      result.post = result.post.substr(1)
    }
    result.body += ')'
  }

  if (result.body[0] !== '(') {
    result.body = '(' + result.body + ')'
  }

  next = result.body + result.post
  return pre + removeCalc(next)
}


export default postcss.plugin('postcss-salad-css2scss-calc', () => {
  return root => {
    root.walkDecls(decl => {
      decl.value = removeCalc(decl.value)
    })
  }
})
