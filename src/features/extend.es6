import postcss from 'postcss'

export default postcss.plugin('postcss-salad-css2scss-extend', () => {
  return root => {
    root.walkAtRules('define-extend', rule => {
      rule.type = 'rule'
      rule.selector = '._extend-' + rule.params
    })

    root.walkAtRules('extend', rule => {
      rule.params = '._extend-' + rule.params
    })
  }
})
