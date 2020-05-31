import R from "ramdam"
import { addEpic } from "nd-core"
import * as nd from ".nextdapp"
import * as custom from "lib/custom"
const predefined = R.mapObjIndexed((v, k, o) => addEpic(k, v))(nd)
const custom_epics = R.mapObjIndexed((v, k, o) => addEpic(k, v))(custom)

export default R.mergeAll([custom_epics, predefined])
