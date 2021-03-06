/**
 * 判断一个字符串是否为整数类型
 * @param str 字符串
 * @returns boolean
 */
function isIntNumber(str: string): boolean {
	const reg = /^\d+$/; // 全部都是数字，且至少包含一个
	return reg.test(str);
}
export default isIntNumber;
