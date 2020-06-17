import bind from "core/bind"
import { funcs } from "nd/funcs"
import conf from "nd/conf"
import global from "nd/global"
import { default as atoms } from "./atoms"
import {
  useRecoilState,
  useRecoilCallback,
  selector,
  useRecoilValue,
  atom
} from "recoil"
export default bind({
  funcs,
  atoms,
  conf,
  global,
  selector,
  useRecoilValue,
  useRecoilState,
  useRecoilCallback,
  atom
})
