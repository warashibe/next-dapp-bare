import { Fragment } from "react"
import { Provider } from "react-redux"
import withRedux from "next-redux-wrapper"
import { _app, reducer } from "nd-core"
import "normalize.css"
import conf from "../conf"
import init from "../lib/init"
import epics from "../lib/epics"

const links = []

const scripts = []
const { initStore, PostScripts, MyHead } = _app({
  conf,
  init,
  reducer: reducer({ init }),
  links,
  scripts,
  epics
})
export default withRedux(initStore)(({ Component, pageProps, store }) => {
  return (
    <Fragment>
      <MyHead />
      <Provider store={store}>
        <Component {...pageProps} _conf={conf} />
      </Provider>
      <PostScripts />
    </Fragment>
  )
})
