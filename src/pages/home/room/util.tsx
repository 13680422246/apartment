import { Grid } from 'antd';
const { useBreakpoint } = Grid;

/**
 * 获取图片的宽度
 */
function useImgWidth(): string {
	const screens = useBreakpoint(); // 响应式布局
	let width = '50%';
	if (screens.xs === false) {
		width = '30%';
	}
	if (screens.xl === false) {
		width = '50%';
	}
	if (screens.xs) {
		width = '90%';
	}
	return width;
}

/**
 * 分割标签 - eg. splitTags('配套齐全/精装修/拎包入住');
 * @param tags string 标签集合
 */
function splitTags(tags: string) {
	return tags.split('/');
}
export { useImgWidth, splitTags };
