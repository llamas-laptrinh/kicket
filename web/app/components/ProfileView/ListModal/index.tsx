'use client';
import React from 'react';

import { Modal } from 'flowbite-react';

type ListModal = {
  onCloseModal: () => void;
  isShow: boolean;
  children?: React.ReactNode;
};

export default function ListModal({
  isShow,
  onCloseModal,

  children,
}: ListModal) {
  return (
    <Modal show={isShow} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
