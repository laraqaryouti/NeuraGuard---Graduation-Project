import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const CancelModal = ({ visible, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      onCancel();
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Modal
      title="Cancel Appointment"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <p>{modalText}</p>
    </Modal>
  );
};

export default CancelModal;
