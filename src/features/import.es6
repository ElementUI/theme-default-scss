import postcss from 'postcss'

export default postcss.plugin('postcss-salad-css2scss-import', () => {
  return root => {
    root.walkAtRules('import', rule => {
      rule.params = rule.params.replace(/(.css)('|")/g, '$2')
    })
  }
})
