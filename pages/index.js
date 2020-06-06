import { useEffect, Fragment } from "react"
import R from "ramdam"
import bind from "nd/bind"
import Conf from "nd/core/Conf"

const Count = bind(
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
  []
)

export default bind(
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
