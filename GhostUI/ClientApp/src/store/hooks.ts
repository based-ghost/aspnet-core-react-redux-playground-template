import type { RootState, AppDispatch } from '.';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;