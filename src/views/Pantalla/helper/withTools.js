import React, { useEffect } from "react";

export const withTools = (Componente) => (props) => {
  const { data, cab, indiceData, id_elemento } = props;

  useEffect(() => {
    const g = document.getElementById(id_elemento)?.parentNode;
    if (g) {
      if (cab.tooltip_texto) {
        const id_tooltip = id_elemento + "_tooltip" + indiceData;

        const tooltip = document.createElement("span");
        tooltip.id = id_tooltip;
        tooltip.appendChild(
          document.createTextNode(
            `${data[cab.id_a + "_tooltip_texto"] ?? cab.tooltip_texto}`
          )
        );

        tooltip.classList.add("Ftooltip"); // listado.scss
        g.style.position = "relative";

        if (cab.tooltip_class === "okey") {
          tooltip.style.backgroundColor = "limegreen";
          tooltip.style.borderBottomColor = "limegreen";
          tooltip.classList.add("Ftooltip_okey");
        }

        if (cab.tooltip_class === "danger") {
          tooltip.style.backgroundColor = "tomato";
          tooltip.style.borderBottomColor = "tomato";
          tooltip.style.color = "black";
          tooltip.classList.add("Ftooltip_danger");
        }

        g.addEventListener("mouseenter", (e) => {
          e.stopPropagation();
          g.appendChild(tooltip);
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
