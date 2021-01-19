import { useCallback, useState } from 'react';

/**
 * 控制按钮，打开聊天，关闭聊天
 */
function useToggle() {
	const [visible, setVisible] = useState<boolean>(false); // 是否显示聊天界面
	/**
	 * 切换显示
	 */
	const toggle = useCallback(() => {
		setVisible((b) => !b);
	}, []);
	return {
		visible,
		toggle,
	};
}

export default useToggle;
