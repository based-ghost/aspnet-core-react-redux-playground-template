import { cssTransition } from 'react-toastify';

import type { ToastContainerProps } from 'react-toastify';

const transition = cssTransition({
  enter: 'custom__toast__animate__bounceIn',
  exit: 'custom__toast__animate__bounceOut'
});

const toastifyProps: ToastContainerProps = {
  transition,
  autoClose: 1500,
  draggable: false,
  newestOnTop: true,
  theme: 'colored',
  position: 'top-center'
};

export {
  toastifyProps
};