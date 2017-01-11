import postcss from 'postcss'

const VAR_USE_REG = /var\(--([^\s\)]*)\)/g

const mixinFunctionTranslate = value => {
  const result = value.split(' ');
  const name = result.shift();
  return `${name}(${result.join(' ')})`
}

export default postcss.plugin('postcss-salad-css2scss-mixin', () => {
  return root => {
    root.walkAtRules('mixin', rule => {
      rule.name = 'include'
      rule.params = rule.params.replace(VAR_USE_REG, '$$$1')
      rule.params = mixinFunctionTranslate(rule.params)
    })

    root.walkAtRules('define-mixin', function(rule) {
      rule.name = 'mixin'
      rule.params = mixinFunctionTranslate(rule.params)
    })
  }
})
