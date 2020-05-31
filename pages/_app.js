import { Fragment } from "react"
import { createWrapper } from "next-redux-wrapper"
import { _app, reducer } from "nd-core"
import "normalize.css"
import conf from "nd.config"
import init from "lib/init"
import epics from "lib/epics"
const links = []
const scripts = []

const { initStore, PostScripts, MyHead } = _app({
  conf,
  reducer: reducer({ init, conf }),
  links,
  scripts,
  epics
})

export default createWrapper(initStore).withRedux(
  ({ Component, pageProps }) => {
    return (
      <Fragment>
        <MyHead />
        <Component {...pageProps} conf={conf} />
        <PostScripts />
      </Fragment>
    )
  }
)
