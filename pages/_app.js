import { RecoilRoot } from "recoil"
import "normalize.css"
import conf from "nd/conf"
export default ({ Component, pageProps }) => (
  <RecoilRoot>
    <Component {...pageProps} conf={conf} />
  </RecoilRoot>
)
