import React, { useEffect } from "react";

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
