import { createContext } from 'react';

/**
 * This function is a context for SnackBar.
 */
const SnackBarContext = createContext([false, (obj) => obj]);

export default SnackBarContext;
