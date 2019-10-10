/*
 * @Description: BEM Helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b('text', 'disabled') // 'button__text button__text--disabled'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 *
 * @Author: Elvis
 * @Date: 2019-09-03 23:01:39
 * @LastEditors: Elvis
 * @LastEditTime: 2019-10-06 16:06:36
 */

export type Mod = string | { [key: string]: any }
export type Mods = Mod | Mod[]

const ELEMENT = '__';
const MODIFY = '--';

function join(name: string, el?: string, symbol?: string): string {
  return el ? name + symbol + el : name;
}

function prefix(name: string, mods: Mods): Mods {
  if (typeof mods === 'string') {
    return join(name, mods, MODIFY);
  }

  if (Array.isArray(mods)) {
    return mods.map(item => prefix(name, item));
  }

  const ret: Mods = {};
  Object.keys(mods).forEach(item => {
    ret[name + MODIFY + item] = mods[item];
  });
  return ret;
}

export function createBEM(name: string) {
  return function(el?: Mods, mods?: Mods) {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }
    el = join(name, el, ELEMENT);
    return mods ? [el, prefix(el, mods)] : el;
  };
}

export type BEM = ReturnType<typeof createBEM>
