let props = {}
const mergeProps = (name, obj) => {
  for (const k in obj) {
    props[`${k}$${name}`] = obj[k]
  }
}
mergeProps("core", require("@nextdapp/core").init)
export default props