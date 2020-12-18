import { useCallback, useState } from 'react';

// 控制管理tab key
const useTabKey = () => {
	const [activeKey, setActiveKey] = useState<string>(''); // 控制折叠面板的开关
	const open = useCallback((key: string) => {
		setActiveKey(key);
		document.body.style.overflowY = 'hidden';
	}, []);
	const close = useCallback(() => {
		setActiveKey('');
		document.body.style.overflowY = 'auto';
	}, []);
	// 监听折叠面板的切换、关闭等操作
	const handleChange = (key: string | string[]) => {
		// 关闭
		if (key === undefined) {
			close();
		}
		// 打开选项卡
		else {
			open(key as string);
		}
	};
	return {
		activeKey,
		open,
		close,
		handleChange,
	};
};
export default useTabKey;
