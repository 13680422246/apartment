import { Modal } from 'antd';
import React, { useCallback, useImperativeHandle, useState } from 'react';
export interface Handle {
	closeModal: () => void;
	showModal: () => void;
}
interface IPros {
	clickModal: () => void;
}
const MyModal = React.forwardRef<Handle, IPros>((props, ref) => {
	const [show, setShow] = useState<boolean>(false);
	const showModal = useCallback(() => {
		setShow(true);
	}, []);
	const closeModal = useCallback(() => {
		setShow(false);
	}, []);
	useImperativeHandle(ref, () => ({
		closeModal,
		showModal,
	}));

	return (
		<div
			onClick={() => {
				closeModal();
				props.clickModal();
			}}>
			<Modal
				visible={show}
				zIndex={show ? 100 : -1}
				style={{
					display: 'none',
				}}
				maskStyle={{
					position: 'absolute',
					top: '120px',
				}}
				bodyStyle={{
					display: 'none',
				}}></Modal>
		</div>
	);
});

export default MyModal;
