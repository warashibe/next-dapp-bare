import { mergeAll, mapObjIndexed, o, is } from "ramda"
import { useRecoilCallback, useRecoilState, atom } from "recoil"
import { default as atoms } from "./atoms"
import _func from "core/func"
import conf from "nd/conf"
import * as predefined from "nd/.nextdapp"
import * as custom from "lib/custom"
import global from "nd/global"

const func = _func({
  useRecoilCallback,
  useRecoilState,
  atoms,
  conf,
  atom,
  global
})

export const funcs = o(mapObjIndexed((v, k, o) => func(v)), mergeAll)([
  predefined,
  custom
])
