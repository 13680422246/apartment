type IClassname =
	| string
	| {
			[classname: string]: boolean;
	  };

/**
 * 判断一个对象是否为JSON对象
 * @param obj 对象
 */
function isJson(data: any): boolean {
	// 1.Object类型
	// 2.原型链指向Object
	if (
		typeof data == 'object' &&
		Object.prototype.toString.call(data).toLowerCase() === '[object object]'
	) {
		return true;
	}
	return false;
}

/**
 * 生成react支持的类名形式
 * @param args css类名，支持string,数组,对象三种形式
 * @return {string} classname
 */
function classNames(this: any, ...args: IClassname[] | IClassname[][]): string {
	let res: string[] = [];
	/**
	 * 对参数的处理
	 */
	for (const arg of args) {
		// type is string
		if (typeof arg === 'string') {
			res.push(arg);
		}
		// type is Array
		else if (Array.isArray(arg)) {
			// 递归调用classnames
			const temp = classNames(...arg);
			res.push(temp);
		}
		// type is Object
		else if (isJson(arg)) {
			for (const classname in arg) {
				if (Object.prototype.hasOwnProperty.call(arg, classname)) {
					const isPush = arg[classname];
					if (isPush) {
						res.push(classname);
					}
				}
			}
		}
	}
	/**
	 * 对this的处理
	 */
	if (isJson(this)) {
		const temp: string[] = [];
		for (const clsname of res) {
			temp.push(this[clsname]);
		}
		return temp.join(' ');
	}
	return res.join(' ');
}

export default classNames;
