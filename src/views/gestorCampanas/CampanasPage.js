import React from 'react';
import SwitchComportamiento from './components/SwitchComportamiento';

export const CampanasPage = (props) => {
  const campanas = props.CampanaReducer.campanas_activas;

  const componentes = campanas.map((campana) => {
    return campana.atributos.map((atributo) => {
      return (
        <SwitchComportamiento codigo={atributo.codigo} campana={campana} />
      );
    });
  });

  return <>{componentes.map((c) => c)}</>;
};