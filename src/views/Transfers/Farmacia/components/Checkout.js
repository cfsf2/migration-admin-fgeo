import React from "react";
import ListadoProductos from "./ListadoProductos";
import { SET_PEDIDO } from "../../../../redux/actions/transfersActions";
import { connect } from "react-redux";

import { CardHeader } from "reactstrap";
import Barra from "./Barra";
import { useHistory } from "react-router-dom";

import "./transfer.scss";

export function Checkout(props) {
  const { pedido } = props.tranfersReducer;
  const { nobar } = props;
  const [allproducts, setAllProducts] = React.useState(pedido);
  const history = useHistory();
  return (
    <>
      <CardHeader>
        <h1>Checkout</h1>
      </CardHeader>
      <div>
        <ListadoProductos productos={pedido} allproducts={allproducts} />
      </div>
      {nobar ? null : (
        <Barra
          stage={0}
          setStage={() => history.replace("/ConfirmacionPedido")}
          {...props}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tranfersReducer: state.tranfersReducer,
  };
};
const mapDispatchToProps = {
  SET_PEDIDO,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
