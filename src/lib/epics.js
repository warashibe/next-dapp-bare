import R from "ramdam"
import { addEpic } from "nd-core"
import * as nd from "../../.nextdapp"
export default R.mapObjIndexed((v, k, o) => addEpic(k, v))(nd)
