// Custom plugin that generates social cards
// take from frontmatter.hero by default
// generate custom one otherwise

const path = require("path")
const slugify = require("slugify")
const fsExtra = require("fs-extra")

module.exports = async ({ markdownNode, markdownAST, getNode }) => {
  const frontmatter = markdownNode.frontmatter

  if (
    frontmatter &&
    frontmatter.image &&
    frontmatter.title &&
    !frontmatter.image.includes("defaultHero")
  ) {
    const imagePath = path.posix.join(
      getNode(markdownNode.parent).dir,
      frontmatter.image
    )
    const ext = imagePath.split(".").pop()
    const filename = `${slugify(frontmatter.title)}.${ext}`

    const newPath = path.join(process.cwd(), "public", "social-cards", filename)

    try {
      await fsExtra.ensureDir(
        path.join(process.cwd(), "public", "social-cards")
      )
      await fsExtra.copy(imagePath, newPath)
    } catch (e) {
      console.error(e)
    }
  }

  return markdownAST
}