import React, {
  useEffect,
} from "react";

export const withTools = (Componente) => (props) => {
  const { data, cab, indiceData } = props;


  const id_componente = cab.id_a+indiceData  //JSON.stringify(data) + JSON.stringify(cab) + indiceData;

  useEffect(() => {
    const g = document.getElementById(id_componente)?.parentNode;
    if (g) {
      if (cab.tooltip_texto) {
       
        const id_tooltip =
          JSON.stringify(data) + JSON.stringify(cab) + "_tooltip" + indiceData;

        const tooltip = document.createElement("span");
        tooltip.id = id_tooltip;
        tooltip.appendChild(
          document.createTextNode(`${data[cab.id_a + "_tooltip_texto"] ?? cab.tooltip_texto}`)
        );
        tooltip.classList.add("Ftooltip") // listado.scss

        g.style.position = "relative";
        g.addEventListener("mouseenter", (e) => {
          e.stopPropagation();
          g.appendChild(tooltip);
          document.getElementById(id_tooltip).cssText =
            'display: "block";position: "absolute";top: "3rem";background-color: "gray";color: "white";padding: "0.5rem";z-index: "100" ';
        });

        g.addEventListener("mouseleave", (e) => {
          e.stopPropagation();
          const t = document.getElementById(id_tooltip);

          if (t) {
            t.remove();
          }
        });
      }
    }
  }, [props]);

  return (
    <>
      <Componente {...props} />
    </>
  );
};
