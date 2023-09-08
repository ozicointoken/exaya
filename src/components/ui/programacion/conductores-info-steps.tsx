import { conductores } from "@/data";
import type { IConductor } from "@/interfaces";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Title } from "@mantine/core";
import {
  Avatar,
  Button,
  Empty,
  Image,
  List,
  Modal,
  Steps,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";

const { confirm } = Modal;

const data: IConductor[] = [...conductores];

const items = [
  {
    title: "Nivel 1",
    description: "Licencia A2B",
  },
  {
    title: "Nivel 2",
    description: "Licencia A3B",
  },
  {
    title: "Nivel 3",
    description: "Licencia A3C",
  },
];

export function ConductoresInformacion() {
  const [open, setOpen] = useState(false);
  const [conductor, setConductor] = useState<IConductor | null>(null);

  const showDeleteConfirm = () => {
    confirm({
      title: "Estas seguro de eliminar a este conductor ?",
      icon: <ExclamationCircleFilled />,
      content: "Todos los datos serán eliminados",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk() {
        typeof conductor !== "undefined" &&
          data.splice(
            data.findIndex((item) => item.id === conductor?.id),
            1
          );

        setOpen(false);
      },
    });
  };
  const [isEditing, setIsEditing] = useState(false);

  const openModal = (conductor: IConductor) => {
    setConductor(conductor);
    setOpen(true);
  };
  const handleEdit = () => {
    setIsEditing(true);
    alert("Editando");
  };
  const handleSave = () => {
    setOpen(false);
    setIsEditing(false);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        className=" w-max  min-w-[500px] rounded-lg border-1 "
        dataSource={data}
        renderItem={(conductor, index) =>
          data.length > 0 ? (
            <List.Item
              onClick={() => {
                openModal(conductor);
              }}
              key={index}
              className="cursor-pointer  rounded-lg  duration-100 hover:bg-zinc-100 hover:shadow-md"
              style={{
                paddingLeft: 14,
                paddingRight: 14,
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={conductor.foto_perfil} />}
                title={
                  <div>
                    <a
                      href="https://www.sutran.gob.pe/informacion-del-conductor-y-bus-de-tu-viaje/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-2"
                    >
                      {conductor.nombres}
                    </a>
                    {conductor.disponibilidad === true ? (
                      <CheckCircleOutlined className=" rounded-full bg-green-500  text-white" />
                    ) : (
                      <CloseCircleOutlined className=" rounded-full bg-red-500  text-white" />
                    )}
                  </div>
                }
                description={
                  <div className="flex items-center gap-3">
                    <p>{conductor.licencia_conducir}</p>
                  </div>
                }
              />
              <Steps
                style={{ marginTop: 8 }}
                type="inline"
                current={conductor.nivel}
                // status={conductor.status as StepsProps["status"]}
                items={items}
              />
            </List.Item>
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60 }}
              description={<span>No hay conductores</span>}
            />
          )
        }
      />

      <Modal
        title={<Title order={3}>Información del Conductor</Title>}
        centered
        open={
          open && conductor !== null && conductor !== undefined ? true : false
        }
        cancelText="Editar"
        onCancel={() => {
          setOpen(false);
        }}
        okText="Guardar"
        onOk={() => {
          setOpen(false);
        }}
        width={700}
        footer={
          <div>
            {isEditing ? (
              <Button onClick={handleSave}>Guardar</Button>
            ) : (
              <Button onClick={handleEdit}>Editar</Button>
            )}

            <Button danger onClick={showDeleteConfirm}>
              Eliminar
            </Button>
          </div>
        }
      >
        <div className="flex items-center justify-between pb-5">
          <div className="mt-7 space-y-3.5">
            <p>
              <Typography.Text strong>Cod Licencia: </Typography.Text>
              <Tag> {conductor?.licencia_conducir}</Tag>
            </p>

            <p>
              <Typography.Text strong>Nombre: </Typography.Text>
              <Typography.Text>{conductor?.nombres}</Typography.Text>
            </p>
            <p>
              <Typography.Text strong>Apellidos: </Typography.Text>
              <Typography.Text>{conductor?.apellidos}</Typography.Text>
            </p>

            <p>
              <Typography.Text strong>Télefono: </Typography.Text>
              <Typography.Text>{conductor?.telefono}</Typography.Text>
            </p>
            <p>
              <Typography.Text strong>Disponibilidad: </Typography.Text>
              <Tag
                className="rounded-full shadow-md"
                color={
                  conductor?.disponibilidad === true
                    ? "green-inverse"
                    : "red-inverse"
                }
              >
                {conductor?.disponibilidad === true
                  ? "Disponible"
                  : "No Disponible"}
              </Tag>
            </p>
            <p>
              <Typography.Text strong>Télefono: </Typography.Text>
              <Typography.Text>{conductor?.telefono}</Typography.Text>
            </p>
            <p>
              <Typography.Text strong>Estado: </Typography.Text>
              <Typography.Text>
                {conductor?.estado_documentario ===
                "Documentos Actualizados" ? (
                  <Tag color="green">
                    {conductor?.estado_documentario}
                    <CheckCircleOutlined className="ml-2 " />
                  </Tag>
                ) : conductor?.estado_documentario === "En Trámite" ? (
                  <Tag color="yellow">
                    {conductor?.estado_documentario}
                    <ClockCircleOutlined className="ml-2 " />
                  </Tag>
                ) : (
                  <Tag color="red">
                    {conductor?.estado_documentario}
                    <CloseCircleOutlined className="ml-2 " />
                  </Tag>
                )}
              </Typography.Text>
            </p>
          </div>
          <Image
            src={
              conductor?.foto_bus === undefined
                ? "https://img.freepik.com/free-photo/traffic-vehicle-urban-reflections-city_1112-973.jpg?size=626&ext=jpg"
                : conductor?.foto_bus
            }
            width={300}
            height={200}
            className="h-20 w-40 rounded-lg object-cover "
            alt="Bus Preview"
          />
        </div>
      </Modal>
    </>
  );
}
