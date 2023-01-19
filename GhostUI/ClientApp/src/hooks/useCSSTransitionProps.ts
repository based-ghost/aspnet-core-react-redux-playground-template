import { useLocation } from 'react-router-dom';
import { Routes, TRANSITION_DEFAULT, type Transition } from '../config';

export type CSSTransitionProps = Transition & { readonly key: string };

const useCSSTransitionProps = (): CSSTransitionProps => {
  const { pathname } = useLocation();
  const key = pathname.split('/', 2).join('/');
  const route = Routes.find((r) => r.path.startsWith(key));
  const transition = route?.transition ?? TRANSITION_DEFAULT;

  return { key, ...transition };
};

export default useCSSTransitionProps;
