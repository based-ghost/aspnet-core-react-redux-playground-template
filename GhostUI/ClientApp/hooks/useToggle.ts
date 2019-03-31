import { useState, useCallback } from 'react';

/**
 * Name: useToggle
 * Use: Manages show/open state flag for toggling functionality
 * Example: const [open, toggle] = useToggle(false);
 *          <Button onClick={toggle}>Search</Button>
 */
export const useToggle = (initial: boolean) => {
    const [open, setOpen] = useState(initial);

    return [open, useCallback(() => setOpen(status => !status), [])];
};