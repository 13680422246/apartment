import { useLayoutEffect, useRef } from 'react';
function useTitle(title: string) {
	const prevTitle = useRef<string>('');
	useLayoutEffect(() => {
		prevTitle.current = document.title;
		document.title = title;
		return () => {
			document.title = prevTitle.current;
		};
	});
}

export default useTitle;
