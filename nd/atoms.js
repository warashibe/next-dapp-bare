import { atom } from "recoil"
import { o, mergeLeft, mapObjIndexed } from "ramda"
import init from "nd/.nextdapp-props"
import core from "lib/init"

const _init = o(
  mapObjIndexed((v, k) =>
    atom({
      key: k,
      default: v
    })
  ),
  mergeLeft(core)
)(init)
export default _init
