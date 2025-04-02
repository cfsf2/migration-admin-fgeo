import React from "react";
import { Link, useLocation } from "react-router-dom";

function EsLink(props) {
  const { link, target } = props;
  const linkOrigin = window.location.origin;

  const [linkInterno, setlinkInterno] = React.useState(true);

  const verificarLink = (link) => {
    link.includes(linkOrigin) ? setlinkInterno(true) : setlinkInterno(false);
  };

  const formatearLink = (link, linkOrigin) => {
    const link_correcto = link.split(linkOrigin + "/#")[1];
    return link_correcto;
  };

  React.useEffect(() => {
    verificarLink(link);
  }, [link]);

  return (
    <>
      {linkInterno ? (
        <Link to={formatearLink(link, linkOrigin)} target={target || "_self"}>
          {props.children}
        </Link>
      ) : (
        <a href={link} target={target || "_blank"} rel="noopener noreferrer">
          {props.children}
        </a>
      )}
    </>
  );
}

export default EsLink;
