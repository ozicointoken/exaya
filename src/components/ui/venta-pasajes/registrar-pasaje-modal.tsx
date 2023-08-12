import React, { useState } from "react";
import { Button, Modal } from "antd";
import style from "./frame.module.css";

export const RegistrarPasajeModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className={style.button} onClick={() => setOpen(true)}>
        Registrar
      </button>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
};
