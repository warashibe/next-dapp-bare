import { useEffect, Fragment } from "react"
import R from "ramdam"
import binder, { bind } from "lib/binder"
import { Conf as _conf } from "nd-core"
const [Conf] = bind([_conf])

const Count = binder(
  props => (
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
          props.set((props.count || 0) + 1, "count")
        }}
      >
        count: {props.count || 0}
      </div>{" "}
      click to add count
    </div>
  ),
  ["count"],
  ["set"]
)

export default binder(
  props => {
    useEffect(() => {
      props.test()
    }, [])
    return (
      <Fragment>
        <Count />
        <Conf />
      </Fragment>
    )
  },
  [],
  ["test"]
)
