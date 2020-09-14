import { createContext } from 'react';

/**
 * This function is a context for selecting table rows.
 */
const SelectRowContext = createContext([[], (obj) => obj]);

export default SelectRowContext;
