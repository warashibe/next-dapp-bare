import { atom } from "recoil"
import { o, mergeLeft, mapObjIndexed } from "ramda"
import init from "nd/.nextdapp-props"
import core from "lib/init"

export default o(
  mapObjIndexed((v, k) =>
    atom({
      key: k,
      default: init[k]
    })
  ),
  mergeLeft(core)
)(init)
