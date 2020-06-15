import { useEffect, Fragment } from "react"
import Conf from "nd/core/Conf"
import bind from "nd/bind"

const Count = bind(
  props => {
    const fn = props.init()
    return (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            margin: "20px",
            cursor: "pointer",
            backgroundColor: "#222",
            color: "white",
            padding: "10px",
            borderRadius: "3px"
          }}
          onClick={() => {
            fn.logConf()
            props.set((props.count || 0) + 1, "count")
          }}
        >
          count: {props.count || 0}
        </div>{" "}
        click to add count [ count * 10 = {props.count10} ]
      </div>
    )
  },
  ["count", "count10", "logConf"]
)

export default bind(
  ({ set, init, router }) => {
    const fn = init()
    useEffect(() => {
      set({ count: 1 })
      fn.logConf()
    }, [])
    return (
      <Fragment>
        <Count />
        <Conf />
      </Fragment>
    )
  },
  [
    "count",
    "logConf",
    {
      count10: {
        get: atoms => ({ get }) => {
          const text = get(atoms.count)
          return text * 10
        }
      }
    }
  ]
)
