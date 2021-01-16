import { Modal } from 'antd';
import React, { useCallback, useState } from 'react';

const useModal: () => {
	closeModal: () => void;
	showModal: () => void;
	MyModal: React.ReactNode;
} = () => {
	const [show, setShow] = useState<boolean>(false);
	const showModal = useCallback(() => {
		setShow(true);
	}, []);
	const closeModal = useCallback(() => {
		setShow(false);
	}, []);
	const MyModal = (
		<div
			onClick={() => {
				setShow(false);
			}}>
			<Modal
				visible={show}
				zIndex={100}
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
	return {
		closeModal,
		showModal,
		MyModal,
	};
};

export default useModal;
