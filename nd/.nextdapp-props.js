let props = {}
const mergeProps = (name, obj, core = false, namespace = null) => {
  for (const k in obj) {
    props[`${k}${namespace !== null ? `$${namespace}` : core ? "" : `$${name}`}`] = obj[k]
  }
}
import { init as web3 } from "nd/web3"
mergeProps("web3", web3, true, null)
export default props