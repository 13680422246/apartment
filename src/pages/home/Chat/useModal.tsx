import { useCallback, useState } from 'react';

/**
 * 控制按钮，打开聊天，关闭聊天
 */
function useModal() {
	const [visible, setVisible] = useState<boolean>(false); // 是否显示聊天界面

	// 打开聊天界面
	const openModal = useCallback(() => {
		setVisible(true);
	}, []);
	// 取消聊天界面
	const closeModal = useCallback(() => {
		setVisible(false);
	}, []);

	return {
		visible,
		openModal,
		closeModal,
	};
}

export default useModal;
