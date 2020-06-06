import R from "ramdam"
import { _app, addEpic } from "@nextdapp/core"
import "normalize.css"
import * as custom from "lib/custom"
import conf from "nd/conf"
import * as _init from "nd/.nextdapp-props"
import * as _epics from "nd/.nextdapp"
const predefined = R.mapObjIndexed((v, k, o) => addEpic(k, v))(_epics)
const custom_epics = R.mapObjIndexed((v, k, o) => addEpic(k, v))(custom)

export default _app({
  conf,
  epics: R.mergeAll([predefined, custom_epics]),
  init: _init
})
