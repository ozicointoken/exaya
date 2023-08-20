import type { ColumnsType } from "antd/lib/table";
import type { Pasajes } from "@/interfaces/interfaces";
import { Table, Tag, Space, Button, Drawer, Avatar, List, Tooltip } from "antd";

import Icon, {
  EyeOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { dataSource } from "@/data/viajes-diarios";

import React, { useState } from "react";
import { Title } from "@mantine/core";
import type { ZodNumberCheck } from "zod";
import { RegistrarPasajeModal } from "./registrar-pasaje-modal";

interface ManifiestoDataType {
  key: React.Key;
  nombres: string;
  asiento: number;
  dni: number extends ZodNumberCheck ? number : string;
}

const manifiestoColumns: ColumnsType<ManifiestoDataType> = [
  {
    title: "Nombres (según DNI o Pasaporte)",
    dataIndex: "nombres",
    key: "nombres",
    responsive: ["lg"],
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Asiento N°",
    dataIndex: "asiento",
    key: "asiento",
    responsive: ["md"],
  },
  {
    title: "DNI",
    dataIndex: "dni",
    key: "dni",
    responsive: ["md"],
  },
];

const data: ManifiestoDataType[] = [
  {
    key: "1",
    nombres: "Hugo Fernandez Saavedra",
    asiento: 32,
    dni: "12345678",
  },
];

export const ManifiestoTable: React.FC = () => (
  <Table columns={manifiestoColumns} dataSource={data} />
);

const ManifiestoDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        title="Ver Manifiesto"
        onClick={showDrawer}
        className="flex items-center justify-center"
        icon={<EyeOutlined />}
      />

      <Drawer
        title={
          <div className="flex items-center justify-between ">
            <Title className="text-left" order={4}>
              Manifiesto del Viaje
            </Title>
            <Button type="primary" color="green">
              Imprimir
            </Button>
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
        size="large"
      >
        <div className="flex flex-col gap-2">
          <Title order={4}>Conductores</Title>

          <List
            dataSource={[
              {
                id: 1,
                name: "Rafael",
              },
              {
                id: 2,
                name: "Lorenzo",
              },
            ]}
            bordered
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <a onClick={showDrawer} key={`a-${item.id}`}>
                    Ver Perfil
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://randomuser.me/api/portraits/men/46.jpg" />
                  }
                  title={<a href="https://ant.design/index-cn">{item.name}</a>}
                  description="Conductor con licencia A3C"
                />
              </List.Item>
            )}
          />
          <Title className="mt-7" order={4}>
            Pasajeros
          </Title>
          <ManifiestoTable />
        </div>
      </Drawer>
    </>
  );
};

const columns: ColumnsType<Pasajes> = [
  {
    title: "Origen",
    dataIndex: "origen",
    key: "origen",
  },
  {
    title: "Destino",
    dataIndex: "destino",
    key: "destino",
  },
  {
    title: "Bus",
    dataIndex: "placaBus",
    key: "placaBus",

    render: (placaBus: string) => (
      <Tooltip key={placaBus} title={placaBus.toUpperCase()}>
        <Icon component={() => <SafetyCertificateOutlined />} />
      </Tooltip>
    ),
  },
  {
    title: "Hora Salida",
    dataIndex: "horaSalida",
    key: "horaSalida",
    render: (horaSalida: string) =>
      parseInt(horaSalida) < 18 ? (
        <Tag color="cyan">{horaSalida} am</Tag>
      ) : (
        <Tag color="black">{horaSalida} pm</Tag>
      ),
  },
  {
    title: "Precios",
    key: "precios",
    dataIndex: "precios",

    render: (_, { precios }) => (
      <>
        {precios.map((precio) => {
          let color;
          precio > 40 ? (color = "green") : (color = "yellow");
          return (
            <Tag color={color} key={precio}>
              {precio}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Acciones",
    key: "acciones",
    width: 200,
    render: () => (
      <div className="flex gap-7">
        <RegistrarPasajeModal />
        <ManifiestoDrawer />
      </div>
    ),
  },
];

const pasajesDiarios: Pasajes[] = dataSource;

export function PasajesTable() {
  return (
    <Table
      pagination={false}
      loading={false}
      className="rounded-md shadow-md"
      columns={columns}
      dataSource={pasajesDiarios}
    />
  );
}
