/*
 * @Date: 2023-07-18 11:38:46
 */
import resize from "./resize";
// 注册全局自定义指令
const directive = [resize]

export default (app) => {
  directive.forEach((directive) => {
    app.directive(directive.name, directive)
  })
}
