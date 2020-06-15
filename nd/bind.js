import bind from "core/bind"
import { funcs } from "nd/funcs"
import conf from "nd/conf"
import { default as atoms } from "./atoms"
import { useRecoilState, selector, useRecoilValue, atom } from "recoil"
export default bind({
  funcs,
  atoms,
  conf,
  selector,
  useRecoilValue,
  useRecoilState,
  atom
})
