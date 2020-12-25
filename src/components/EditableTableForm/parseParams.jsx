/**
 * 解析对象，生成fetch提交的数据
 */
function parseParams(pagination, filters, sorter) {
	if (!Array.isArray(sorter)) {
		sorter = [sorter];
	}
	const sorterArr = [];
	for (const sort of sorter) {
		const temp = {};
		temp['field'] = sort.field;
		temp['order'] = sort.order;
		sorterArr.push(temp);
	}
	const newFilters = {};
	for (const [key, value] of Object.entries(filters)) {
		if (Array.isArray(value)) {
			newFilters[key] = value[0];
		} else {
			newFilters[key] = value;
		}
	}
	return {
		current: pagination.current,
		pageSize: pagination.pageSize,
		filters: newFilters,
		sorterArr,
	};
}
export default parseParams;
