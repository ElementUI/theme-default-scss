import postcss from 'postcss'

const VAR_DECL_REG = /--([^\s;]*)/g
const VAR_USE_REG = /var\(--([^\s\)]*)\)/g

export default postcss.plugin('postcss-salad-css2scss-var', () => {
  return root => {
    // Decl
    root.walkRules(':root', rule => {
      rule.walkDecls(decl => {
        decl.prop = decl.prop.replace(VAR_DECL_REG, '$$$1')
        decl.value = `${ decl.value } !default`
      })

      root.prepend(rule.nodes)
      rule.remove()
    })

    // Use
    root.replaceValues(VAR_USE_REG, '$$$1');
    root.walkDecls(decl => {
      decl.value = decl.value.replace(VAR_USE_REG, '$$$1')
    })
    root.walkRules(rule => {
      if (rule.params) {
        rule.params = rule.params.replace(VAR_DECL_REG, '$$$1');
      }
    })
  }
})
