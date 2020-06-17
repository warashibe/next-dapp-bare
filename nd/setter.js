import { is, has, assocPath, isNil } from "ramda"
import { bind_states } from "nd/funcs"
export default _states => {
  const binder = bind_states(_states)
  const set = (val, name) => {
    name = is(Array)(name)
      ? name.length === 1
        ? name[0]
        : name.length === 0
          ? null
          : name
      : name
    if (is(Array)(name)) {
      if (has(name[0])(binder))
        binder[name[0]].set(assocPath(name.slice(1), val)(binder[name[0]].get))
    } else {
      const states = isNil(name) ? val : { [name]: val }
      for (const k in states) {
        if (has(k)(binder)) binder[k].set(states[k])
      }
    }
  }
  return { binder, set }
}
