import { mergeAll, mapObjIndexed } from "ramda"
import { _app, addEpic } from "@nextdapp/core"
import "normalize.css"
import * as custom from "lib/custom"
import conf from "nd/conf"
import init from "nd/.nextdapp-props"
import * as _epics from "nd/.nextdapp"
const predefined = mapObjIndexed((v, k, o) => addEpic(k, v))(_epics)
const custom_epics = mapObjIndexed((v, k, o) => addEpic(k, v))(custom)

export default _app({
  conf,
  epics: mergeAll([predefined, custom_epics]),
  init
})
