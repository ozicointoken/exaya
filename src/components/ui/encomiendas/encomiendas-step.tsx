import React from "react";
import { Steps } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const description = "This is a description.";
export default function EncomiendasSteps() {
  return (
    <div className="w-[150px]">
      <Steps
        direction="vertical"
        current={1}
        size="small"
        items={[
          {
            title: "Nombres",
            description,
          },
          {
            title: "Telefonos",
            description,
          },
          {
            title: "Precio",
            description,
          },
          {
            title: "Detalles",
            description,
          },
          {
            title: "Mas Detalles",
            description,
          },
          {
            title: "Completado",
            description,
            status: "finish",
            icon: (
              <CheckCircleOutlined className="rounded-full bg-green-500 text-white" />
            ),
          },
        ]}
      />
    </div>
  );
}
