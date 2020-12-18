import { useEffect } from 'react';

/**
 * 先将src挂载到data-src
 * 监听元素是否进入视口
 * 获取data-src赋值到src
 */
const useImgLazy = (selector: string, root: HTMLElement | null = null) => {
	useEffect(() => {
		const nodes = document.querySelectorAll(selector);
		let observer: IntersectionObserver;
		if (nodes && nodes.length) {
			observer = new IntersectionObserver(
				(changes) => {
					for (const change of changes) {
						if (change.isIntersecting) {
							// 加载图片
							const { target } = change;
							const src = target.getAttribute('data-src');
							if (src !== null) {
								target.setAttribute('src', src);
							}
							// 取消观察
							observer.unobserve(target);
						}
					}
				},
				{
					root: root,
				}
			);
			// 观察所有的节点
			nodes.forEach((node) => {
				observer.observe(node);
			});
		}
		return () => {
			observer.disconnect(); // 关闭观察，防止内存泄漏
		};
	}, [selector, root]);
};
export default useImgLazy;
