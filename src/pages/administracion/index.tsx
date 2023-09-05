import AppLayout from "@/components/layout";
import KpiChart from "@/components/ui/administracion/kpi-chart";
import { StatsSegments } from "@/components/ui/administracion/stats";
import AdministracionSteps from "@/components/ui/administracion/steps";
import { UsuarioForm } from "@/components/ui/administracion/usuario-form";
import UsuariosTable from "@/components/ui/administracion/usuarios-table";
import { RoundedButton } from "@/components/ui/rounded-button";
import { mockData } from "@/data";
import { Title } from "@mantine/core";
import { DatePicker, Select } from "antd";
import type { DatePickerProps } from "antd/es/date-picker";
export default function Administracion() {
  const handleRuta = (value: { value: string; label: React.ReactNode }) => {
    alert(`selected ${value.value}`);
  };
  const onChange = (
    value: DatePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Fecha seleccionada: ", dateString);
  };

  const onOk = (value: DatePickerProps["value"]) => {
    console.log("onOk: ", value);
  };
  const placeHolderDate = new Date(Date.now()).toISOString().slice(0, 10);
  return (
    <AppLayout>
      <div className="mb-14">
        <div className=" mb-3.5 flex justify-between">
          <Title order={5} className="text-slate-800">
            Analíticas por Horarios
          </Title>
          <Title order={5} className=" pr-48 text-slate-800">
            Busqueda Específica
          </Title>
        </div>
        <div className=" flex justify-between">
          <div className="flex items-center gap-2">
            <RoundedButton horaSalida="20:15" />
            <RoundedButton horaSalida="20:30" />
            <RoundedButton horaSalida="21:00" />
          </div>
          <div className="flex gap-3.5">
            <DatePicker
              onChange={onChange}
              onOk={onOk}
              placeholder={placeHolderDate}
            />

            <Select
              placeholder="Ruta"
              style={{ width: 180 }}
              onChange={handleRuta}
              options={[
                {
                  value: "RUTA-HA",
                  label: "Huancayo - Ayacucho",
                },
                {
                  value: "RUTA-AH",
                  label: "Ayacucho - Huancayo",
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="my-7 flex justify-between">
        <Title order={5} className="text-slate-800">
          Tabla de Usuarios
        </Title>
        <UsuarioForm activator="Agregar Usuario" />
      </div>
      <UsuariosTable />
      <div>
        <Title order={5} className="mb-3.5 text-slate-800">
          Graficos de KPI/OKR
        </Title>
        <div className="flex gap-3.5">
          <StatsSegments {...mockData} />
          <KpiChart />
          <AdministracionSteps />
        </div>
      </div>
    </AppLayout>
  );
}
