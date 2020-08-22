import {
  o,
  mergeRight,
  mergeLeft,
  pick,
  hasPath,
  is,
  complement,
  isNil,
  concat,
  compose,
  map,
  reduce,
  zip,
  pluck,
  mergeDeepLeft
} from "ramda"

import { xNil } from "nd/util"

import Web3 from "web3"

const abi_erc20 = require("./IERC20.json")

export const ETHEREUM_NETWORKS = {
  "1": "mainnet",
  "3": "ropsten",
  "4": "rinkby",
  "42": "kovan"
}
const web3 = new Web3()
export const isAddress = address => web3.utils.isAddress(address)

export const toWei = amount => web3.utils.toWei(amount)

export const fromWei = amount => web3.utils.fromWei(amount)

export const fromAscii = text => web3.utils.fromAscii(text)

export const randomHex = num => web3.utils.randomHex(num)

export const toAscii = text => web3.utils.toAscii(text)

export async function setETH({
  val: { network, new_address, wallet },
  set,
  conf,
  global,
  get
}) {
  let web3_address = null
  let current_network = null
  let balance = null
  let wallet_in_use = null
  if (global.wallet_in_use !== wallet) {
    return
  }
  let provider = global[`web3_${wallet}`].currentProvider
  if (!isNil(provider)) {
    if (provider.isAuthereum) {
      current_network = conf.web3.network
      const accounts = await global[`web3_${wallet}`].eth.getAccounts()
      if (accounts.length !== 0) {
        web3_address = accounts[0]
        wallet_in_use = wallet
        balance = await global[`web3_${wallet}`].eth.getBalance(web3_address)
      }
    } else {
      current_network = provider.networkVersion || provider._network
      if (current_network === (network || conf.web3.network)) {
        wallet_in_use = wallet
        web3_address =
          new_address || provider.selectedAddress || provider._selectedAddress
        if (!isNil(web3_address)) {
          balance = await global[`web3_${wallet}`].eth.getBalance(web3_address)
        }
      }
    }
  }
  let obj = {
    wallet_in_use: wallet_in_use,
    web3_network: current_network,
    web3_address: web3_address,
    eth_balance: {
      network: current_network,
      str: global[`web3_${wallet}`].utils.fromWei(balance || "0"),
      wei: balance,
      address: web3_address
    }
  }

  if (!isNil(web3_address) && !isNil(window.localStorage)) {
    window.localStorage.setItem(
      "web3_connect",
      JSON.stringify({
        network: current_network,
        wallet
      })
    )
  }
  global.web3_address = web3_address
  global.wallet_in_use = wallet_in_use
  obj.web3_updated = Date.now()
  set(obj, null)
  set(true, "web3_init")
  return obj
}

export async function autoInitWeb3({ conf, fn }) {
  if (!isNil(window.localStorage)) {
    try {
      const json = JSON.parse(window.localStorage.getItem("web3_connect"))
      if (!isNil(json.network)) {
        fn(initWeb3)({ wallet: json.wallet })
      }
    } catch (e) {}
  }
}

export async function disconnectWeb3({ set, global }) {
  if (!isNil(window.localStorage)) {
    window.localStorage.setItem("web3_connect", null)
  }
  if (global.wallet_in_use === "authereum") {
    try {
      global[`web3_${global.wallet_in_use}`].currentProvider.disable()
    } catch (e) {
      console.log(e)
    }
  }
  delete global[`web3_${global.wallet_in_use}`]
  global.wallet_in_use = null
  set({
    web3_init: false,
    web3_address: null,
    web3_network: null,
    wallet_in_use: null,
    eth_balance: null
  })
}

async function listen_changes({
  global,
  fn,
  get,
  set,
  val: { wallet, network, web3 }
}) {
  let init = true
  if (!isNil(web3)) {
    fn(setETH)({ network, wallet })
    if (!isNil(window.ethereum)) {
      if (isNil(global[`web3_listener_${wallet}`])) {
        window.ethereum.on("chainChanged", c => window.location.reload())
        global[`web3_listener_${wallet}`] = window.ethereum.on("message", c => {
          if (init === true || get("web3_init") === true) {
            init = false
            fn(setETH)({ network, wallet })
          }
        })
        window.ethereum.on("accountsChanged", accounts => {
          fn(setETH)({ network, new_address: accounts[0], wallet })
        })
      }
    } else if (!isNil(web3.currentProvider.publicConfigStore)) {
      if (isNil(global[`web3_listener_${wallet}`])) {
        global[
          `web3_listener_${wallet}`
        ] = web3.currentProvider.publicConfigStore.on("update", c => {
          if (init === true || get("web3_init") === true) {
            init = false
            fn(setETH)({ network, wallet })
          }
        })
      }
    }
  } else {
    set(true, "web3_init")
  }
}
export async function initWeb3({
  val: { network, balances, wallet = "metamask" },
  global,
  conf,
  fn,
  set,
  get
}) {
  global.wallet_in_use = wallet
  if (isNil(global[`web3_${wallet}`])) {
    let provider = null
    let web3 = null
    if (wallet === "authereum") {
      const Authereum = require("authereum").Authereum
      const authereum = new Authereum(ETHEREUM_NETWORKS[conf.web3.network])
      provider = authereum.getProvider()
    } else {
      if (window.ethereum) {
        provider = window.ethereum
        provider.request({ method: "eth_requestAccounts" })
      } else if (window.web3) {
        provider = window.web3.currentProvider
      }
    }
    if (isNil(provider)) {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      )
    } else {
      web3 = new Web3(provider)
      if (wallet === "authereum") {
        set(true, "authereum_logging_in")
      }
      try {
        const isConnected = provider.isConnected()
        if (isConnected !== true) {
          await provider.enable()
        }
      } catch (e) {
        console.log("access denied")
      }
      set(false, "authereum_logging_in")
      global[`web3_${wallet}`] = web3
    }
    fn(listen_changes)({ wallet, web3, network })
  } else {
    const web3 = global[`web3_${wallet}`]
    if (
      wallet === "authereum" &&
      !isNil(web3.currentProvider) &&
      web3.currentProvider.isConnected() === false
    ) {
      set(true, "authereum_logging_in")
      await web3.currentProvider.enable()
      set(false, "authereum_logging_in")
    } else if (
      !isNil(web3.currentProvider) &&
      web3.currentProvider.isConnected() === false
    )
      fn(setETH)({ network, wallet })
  }
  return
}

async function listenTransaction({ method, args, eth, from, to, value }) {
  let hashFunc = is(Function)(args[args.length - 1]) ? args.pop() : null
  const obj = is(Object)(args[args.length - 1]) ? args.pop() : {}
  hashFunc = is(Function)(obj.transactionHash) ? obj.transactionHash : hashFunc
  let _sender = { from }
  if (xNil(to)) _sender.to = to
  if (xNil(value)) _sender.value = value
  const sender = o(
    mergeRight(_sender),
    pick(["from", "to", "value", "gas", "gasPrice", "data", "nonce"])
  )(obj)

  let receipt = null
  let err = null
  let hash = null
  try {
    receipt = await (eth ? method(sender) : method(...args).send(sender))
      .on("transactionHash", async hash => {
        hash = hash
        if (is(Function)(hashFunc)) hashFunc(hash)
      })
      .on("confirmation", async (number, receipt) => {
        if (is(Function)(obj.confirmation)) obj.confirmation(number, receipt)
      })
      .on("error", async error => {
        if (is(Function)(obj.error)) obj.error(error)
      })
  } catch (e) {
    err = e
  }
  return [err, receipt]
}

export function contract({ val: { abi, address }, get, global }) {
  const contract = new global[`web3_${global.wallet_in_use}`].eth.Contract(
    abi,
    address
  )
  let methods = {}
  for (let v of abi) {
    if (v.type === "function" && v.constant) {
      methods[v.name] = (...args) => contract.methods[v.name](...args).call()
    } else if (v.type === "function" && v.constant !== true) {
      methods[v.name] = async (...args) => {
        return await listenTransaction({
          method: contract.methods[v.name],
          args,
          from: get("web3_address")
        })
      }
    }
  }
  return methods
}

export function erc20({ val: { token, address }, conf, fn }) {
  const contract_address =
    xNil(token) && hasPath(["web3", "erc20", token])(conf)
      ? conf.web3.erc20[token]
      : address
  return fn(contract)({ abi: abi_erc20, address: contract_address })
}

export function eth({ fn, get, global }) {
  let web3js = {
    balanceOf: address =>
      global[`web3_${global.wallet_in_use}`].eth.getBalance(
        address || get("web3_address")
      ),
    getBalance: address =>
      global[`web3_${global.wallet_in_use}`].eth.getBalance(
        address || get("web3_address")
      )
  }
  web3js.transfer = async (...args) => {
    return await listenTransaction({
      eth: true,
      to: args[0],
      value: args[1],
      method: global[`web3_${global.wallet_in_use}`].eth.sendTransaction,
      args: args.slice(2),
      from: get("web3_address")
    })
  }
  web3js.sendTransaction = async (...args) => {
    return await listenTransaction({
      eth: true,
      method: global[`web3_${global.wallet_in_use}`].eth.sendTransaction,
      args,
      from: get("web3_address")
    })
  }

  return web3js
}
