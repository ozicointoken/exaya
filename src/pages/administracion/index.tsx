import KpiChart from "@/components/ui/administracion/kpi-chart";
import { StatsSegments } from "@/components/ui/administracion/stats";
import Usuarios from "@/components/ui/administracion/usuarios";
import { Title } from "@mantine/core";
import React from "react";
import { mockData } from "@/data";
function Administracion() {
  return (
    <div>
      <Title order={4}>Administracion</Title>
      <Usuarios />
      <StatsSegments {...mockData} />
      <div className="flex">
        <KpiChart />
        <KpiChart />
        <KpiChart />
      </div>
    </div>
  );
}

export default Administracion;
