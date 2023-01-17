import React, { useEffect } from "react";
import styles from "../helper/Style.module.css";

export const withTools = (Componente) => (props) => {
  const { data, cab, indiceData, id_elemento } = props;

  useEffect(() => {
    const g = document.getElementById(id_elemento)?.parentNode;
    if (g) {
      if (cab.tooltip_texto) {
        const id_tooltip = id_elemento + "_tooltip" + indiceData;

        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((e) => {
            const rightLimit = e.rootBounds.right;
            const rightObj = e.boundingClientRect.right;
            const leftLimit = e.rootBounds.left;
            const leftObj = e.boundingClientRect.left;

            if (rightObj > rightLimit) {
              const t = document.getElementById(id_tooltip);
              t.style.left = `-${rightObj - rightLimit - 30}px`
            }
            if (leftObj < leftLimit) {
              const t = document.getElementById(id_tooltip);
              t.style.left = `${leftObj - leftLimit + 30}px`
            }
          });
        });

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

          observer.observe(tooltip);
        });

        g.addEventListener("mouseleave", (e) => {
          e.stopPropagation();
          const t = document.getElementById(id_tooltip);
          observer.unobserve(t);

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
