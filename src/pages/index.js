import { useEffect, Fragment } from "react"
import R from "ramdam"
import binder from "../lib/binder"

export default binder(
  props => {
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
            props.set((props.count || 0) + 1, "count")
          }}
        >
          count: {props.count || 0}
        </div>{" "}
        click to add count
      </div>
    )
  },
  ["count"],
  ["set"]
)
