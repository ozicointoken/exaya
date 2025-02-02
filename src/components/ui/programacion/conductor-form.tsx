import { useNotification } from "@/context/NotificationContext";
import type { z } from "zod";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { conductorSchema } from "@/schemas";
import { api } from "@/utils/api";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { default as style, default as styles } from "./frame.module.css";
type Props = {
  activator: string;
};
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 30 },
  },
  wrapperCol: {
    xs: { span: 30 },
    sm: { span: 30 },
  },
};

export function ConductorForm({ activator }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePicList, setProfilePicList] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();
  const { openNotification } = useNotification();
  const { data: informacionConductor, error: errorValidacionDNI } =
    api.clientes.validateDni.useQuery({
      dni: form.getFieldValue("dni") as string,
    });

  const onFinish = (values: z.infer<typeof conductorSchema>) => {
    form.resetFields();
    alert(JSON.stringify(values, null, 2));
    setIsModalOpen(false);
    openNotification({
      message: "Conductor registrado",
      description: "El conductor ha sido registrado exitosamente",
      type: "success",
      placement: "topRight",
    });
  };
  const onFinishFailed = () => {
    console.log("Falló el registro");
  };
  const profilePicFile = (e: { fileList: any }) => {
    if (Array.isArray(e)) {
      return e;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return e && e.fileList;
  };

  // const handleProfilePicFileChange = (newProfilePicFileList) => {
  //   setProfilePicList(newProfilePicFileList);
  // };

  return (
    <>
      <button className={style.basicButton} onClick={showModal}>
        {activator}
        <AiOutlinePlusCircle size={15} />
      </button>
      <Modal
        centered
        title={
          <p className="mb-7">
            <Title level={3}>Agregar Conductor</Title>
            <Typography.Text className=" font-light text-slate-600">
              Formulario con la informacion del conductor
            </Typography.Text>
          </p>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...formItemLayout}
          form={form}
          layout="vertical"
          name="register"
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}
          scrollToFirstError
          className="grid grid-flow-row grid-cols-2 gap-x-3.5 "
        >
          <Form.Item
            name="dni"
            label="DNI"
            tooltip="DNI del conductor, esta información es validada con la RENIEC "
            rules={[
              { required: true },
              { min: 8, message: "El DNI debe tener 8 dígitos" },
              { max: 8, message: "El DNI debe tener 8 dígitos" },
            ]}
            validateStatus={
              errorValidacionDNI
                ? "error"
                : informacionConductor
                ? "success"
                : "validating"
            }
            help={
              <p>
                {informacionConductor?.data?.nombres}{" "}
                {informacionConductor?.data?.apellidoPaterno}{" "}
                {informacionConductor?.data?.apellidoMaterno}
              </p>
            }
          >
            <Input type="text" className="w-full" />
          </Form.Item>

          <Form.Item
            name="telefono"
            label="N° Celular"
            rules={[{ required: true, message: "Verifica este campo" }]}
          >
            <InputNumber
              controls={false}
              type="number"
              placeholder="987654321"
              maxLength={9}
              addonBefore={<BsTelephone title="N° celular" />}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="licencia_conducir"
            label="Numero Licencia"
            rules={[
              {
                required: true,
                message: "Ingresa la licencia del conductor",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="LC15ASF45" />
          </Form.Item>

          <Form.Item
            name="nivel"
            label="Clase Licencia"
            rules={[
              {
                type: "array",
                required: true,
                message: "Selecciona",
              },
            ]}
          >
            <Select placeholder="A II-B">
              <Select.Option value="A II-A">A II-A</Select.Option>
              <Select.Option value="A II-B">A II-B</Select.Option>
              <Select.Option value="A II-C">A II-C</Select.Option>
              <Select.Option value="A II-A">A III-A</Select.Option>
              <Select.Option value="A II-B">A III-B</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Foto Conductor"
            name="foto_perfil"
            getValueFromEvent={profilePicFile}
            valuePropName="fileList"
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              fileList={profilePicList}
              beforeUpload={() => false}
              showUploadList={{
                showRemoveIcon: true,
                showPreviewIcon: false,
              }}
              // onChange={({ fileList: newProfilePicFileList }) =>
              //   handleProfilePicFileChange(newProfilePicFileList)
              // }
            >
              {/* {profilePicList.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-1">
                  <IoCloudUploadOutline size={30} />
                  <span>Subir foto</span>
                </div>
              )} */}
            </Upload>
          </Form.Item>

          <div>
            <Form.Item
              name="estado_documentario"
              label="Estad Documentario"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Seleeciona el estado documentario",
                },
              ]}
            >
              <Select placeholder="Seleccione el estado documentario">
                <Select.Option value="Actualizados">Actualizados</Select.Option>
                <Select.Option value="EnTramite">En Trámite</Select.Option>
                <Select.Option value="Vencidos">Vencidos</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="disponibilidad"
              label="Disponibilidad"
              tooltip="Esta opción permite habilitar o deshabilitar al conductor"
              rules={[
                { required: true, message: "Disponibilidad del conductor" },
              ]}
            >
              <Radio.Group>
                <Radio value={false}>No</Radio>
                <Radio value={true}>Sí</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <Space className="mt-10">
            <button className={styles.basicButton} type="submit">
              Registrar
            </button>

            <Button danger htmlType="reset" onClick={handleCancel}>
              Cancelar
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
}
