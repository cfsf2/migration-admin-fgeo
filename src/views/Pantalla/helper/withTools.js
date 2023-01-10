import React, {
  Children,
  useLayoutEffect,
  useEffect,
  createElement,
} from "react";
import {} from "react";

export const withTools = (Componente) => (props) => {

    const {data, cab, indiceData} = props

  const id_componente =
    JSON.stringify(data) + JSON.stringify(cab) + indiceData;
    
  const id_tooltip =
    JSON.stringify(data) +
    JSON.stringify(cab) +
    "_tooltip" +
    indiceData;

  useEffect(() => {
    const g = document.getElementById(id_componente)?.parentNode;
    if (g) {
      g.style.position = "relative";
      g.addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        const t = document.getElementById(id_tooltip);
        if (t) {
          t.style.display = "block";
        }
      });

      g.addEventListener("mouseleave", (e) => {
        e.stopPropagation();
        const t = document.getElementById(id_tooltip);

        if (t) {
          t.style.display = "none";
        }
      });
    }
  }, [props]);

  const S = createElement(
    "span",
    {
      style: {
        display: "none",
        position: "absolute",
        top: "3rem",
        backgroundColor: "gray",
        color: "white",
        padding: "0.5rem",
        zIndex: "100",
      },
      id: id_tooltip,
    },
   "lalalala" //data[cab.id_a+"_tooltip"]
  );

  return (
    <>
      { 
      //data[cab.id_a+"_tooltip"] 
      true
      ? S : null}
      <Componente {...props} />
    </>
  );
};
