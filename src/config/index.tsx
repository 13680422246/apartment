// 线上部署 - 应该写到.env文件
// export const baseURL: string = 'http://8.129.2.135:8181/bghouse'; // 基础URL
// export const websocketBaseURL: string = 'ws://8.129.2.135:8090/ws'; // 聊天服务器的基础URL，后面需要带上token
// export const perfix = '/bghouse';

// 线下开发
export const baseURL: string = 'http://localhost:8080'; // 基础URL
export const websocketBaseURL: string = 'ws://localhost:8090/ws'; // 聊天服务器
export const perfix = '';

export const timeout: number = 1000 * 600; // 请求超时事件
export const defaultPageSize: number = 10; // 房间列表的每页显示的个数
