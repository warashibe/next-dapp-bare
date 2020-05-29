import { connect } from "react-redux"
import { withRouter } from "next/router"
import { bind as _bind, binder as _binder } from "nd-core"

const binder = _binder((states, funcs, Component) =>
  withRouter(connect(states, funcs)(Component))
)

export default binder

export const bind = obj => _bind(binder, obj)
