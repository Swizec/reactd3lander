const { selectAll } = require('unist-util-select')

module.exports = ({ markdownAST }, pluginOptions) => {
  // Manipulate AST
  const ctaReferences = selectAll(
    'paragraph linkReference:only-child',
    markdownAST
  ).filter(node => {
    return node.identifier === 'cta'
  })

  ctaReferences.forEach(node => {
    node.type = 'html'
    node.children = undefined
    node.value = '<div class="remark-cta" > </div>'
  })

  return markdownAST
}
