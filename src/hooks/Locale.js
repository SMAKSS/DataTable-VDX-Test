// This is a custom hook to manage localization context fallback

import { useContext } from 'react';

import LocalContext from '../contexts/LocalContext';

function Locale(key = null) {
  const [local] = useContext(LocalContext);
  !key[local.local] && (local.local = 'en');

  return { local };
}

export default Locale;
