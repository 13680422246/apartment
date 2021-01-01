import { useCallback, useEffect, useRef, useState } from 'react';
/**
 * 连接聊天服务器
 */

function useWebSocket(socketUrl: string, handleMessage: (data: any) => void) {
	const [disable, setDisable] = useState(true); // 是否禁用
	const running = useRef<boolean>(true); // 是否正在运行
	const wsRef = useRef<WebSocket>();

	/**
	 * 连接聊天服务器
	 */
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
		wsRef.current.onmessage = (e) => {
			const data = JSON.parse(e.data);
			handleMessage(data);
		};
		return () => {
			if (wsRef.current) {
				wsRef.current.close();
			}
			running.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * 发送信息
	 */
	const sendContent = useCallback((userid: number, content: string) => {
		if (wsRef.current) {
			wsRef.current.send(
				JSON.stringify({
					userid,
					content,
				})
			);
		}
	}, []);
	return {
		disable,
		wsRef,
		sendContent,
	};
}

export default useWebSocket;
