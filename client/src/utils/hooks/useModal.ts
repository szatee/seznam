import { useCallback, useState } from 'react';

export const useModal = () => {
  const [modal, setModal] = useState(false);
  const openModal = useCallback(() => setModal(true), []);
  const closeModal = useCallback(() => setModal(false), []);

  return [modal, openModal, closeModal] as const;
};
