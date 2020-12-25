import { useEffect, useRef, useState } from 'react';
/**
 * 连接聊天服务器
 */

function useWebSocket(socketUrl: string, handleMessage: () => void) {
	const [disable, setDisable] = useState(true); // 是否禁用
	const running = useRef<boolean>(true); // 是否正在运行
	const wsRef = useRef<WebSocket>();
	useEffect(() => {
		wsRef.current = new WebSocket(socketUrl);
		wsRef.current.onopen = (e) => {
			if (running.current) {
				setDisable(false);
			}
		};
		wsRef.current.onerror = (e) => {
			if (running.current) {
				setDisable(true);
			}
		};
		wsRef.current.onclose = (e) => {
			if (running.current) {
				setDisable(true);
			}
		};
		wsRef.current.onmessage = handleMessage;
		return () => {
			if (wsRef.current) {
				wsRef.current.close();
			}
			running.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		disable,
		wsRef,
	};
}

export default useWebSocket;
