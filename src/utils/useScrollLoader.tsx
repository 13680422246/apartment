import { useEffect, useRef } from 'react';

/**
 * 滚动到底部的时候，调用回调回调函数
 * 事件节流: 默认300ms内再次触发会被抛弃
 * @param selector CSS选择器，监听滚动容器的底部(Spin)
 * @param callback 回调函数
 */
function useScrollLoader(selector: string, callback: () => void) {
	const timer = useRef<NodeJS.Timeout>(); // 节流器
	useEffect(() => {
		const node = document.querySelector(selector);
		let observer: IntersectionObserver;
		if (node) {
			observer = new IntersectionObserver(function (entries) {
				// 如果不可见，就返回
				if (entries[0].intersectionRatio <= 0) return;
				// 节流抛弃
				if (timer.current !== undefined) return;
				callback();
				timer.current = setTimeout(() => {
					timer.current = undefined;
				}, 300);
			});
			// 开始观察
			observer.observe(node);
		}
		return () => {
			if (observer) {
				if (node) {
					observer.unobserve(node);
				}
				observer.disconnect();
			}
		};
	}, [callback, selector]);
}
export default useScrollLoader;
