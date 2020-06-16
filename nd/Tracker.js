import { useEffect } from "react"
import atoms from "nd/atoms"
import { useRecoilState, useRecoilValue } from "recoil"
import bind from "nd/bind"
import Tracker from "core/components/Tracker"
export default Tracker({
  useEffect,
  bind,
  atoms,
  useRecoilState,
  useRecoilValue
})
