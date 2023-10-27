/*
 * @Date: 2023-10-27 17:44:25
 */
import Const from '@/core/const/index.js';

export function weekNameFilter(val, to = 'text') {
  const MAP = Const.WEEK_MAP
  let ITEM = MAP[val + ''] || { text: '' }
  return ITEM[to] || ''
}