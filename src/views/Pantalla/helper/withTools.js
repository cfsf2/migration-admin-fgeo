import React, { useEffect } from "react";
import styles from "../helper/Style.module.css";

export const withTools = (Componente) => (props) => {
  const { data, cab, indiceData, id_elemento } = props;

  useEffect(() => {
    const g = document.getElementById(id_elemento)?.parentNode;
    console.log(g, id_elemento)
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

        tooltip.classList.add("Ftooltip"); // Pantalla.scss
        g.style.position = "relative";

        if (
          data[cab.id_a + "_tooltip_class"] === "verde" ||
          cab.tooltip_class === "verde"
        ) {
          tooltip.classList.add(styles.bg_verde);
          tooltip.classList.add("Ftooltip_verde");
        }

        if (
          data[cab.id_a + "_tooltip_class"] === "rojo" ||
          cab.tooltip_class === "rojo"
        ) {
          //tooltip.style.color = "black";
          tooltip.classList.add(styles.bg_rojo);
          tooltip.classList.add("Ftooltip_rojo");
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
