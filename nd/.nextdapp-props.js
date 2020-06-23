let props = {}
const mergeProps = (name, obj, core = false) => {
  for (const k in obj) {
    props[`${k}${core ? "" : `$${name}`}`] = obj[k]
  }
}
export default props
