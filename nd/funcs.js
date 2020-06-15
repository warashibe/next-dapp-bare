import { mergeAll, mapObjIndexed } from "ramda"
import { useRecoilState } from "recoil"
import { default as atoms } from "./atoms"
import _func from "core/func"
import conf from "nd/conf"
const func = _func({ useRecoilState, atoms, conf })
import * as _epics from "nd/.nextdapp"
import * as custom from "lib/custom"

const predefined = mapObjIndexed((v, k, o) => func(v[0], v[1]))(_epics)
const custom_epics = mapObjIndexed((v, k, o) => func(v[0], v[1]))(custom)
export const funcs = mergeAll([predefined, custom_epics])
