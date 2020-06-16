const sleep = sec =>
  new Promise(res => {
    setTimeout(() => {
      res()
    }, sec * 1000)
  })
export const logConf = [
  ["count"],
  async ({ val, set, conf, props }) => {
    console.log(conf)
  }
]
