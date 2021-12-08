import React from "react";
import ListadoProductos from "./ListadoProductos";
import { SET_PEDIDO } from "../../../../redux/actions/transfersActions";
import { connect } from "react-redux";

import { CardHeader } from "reactstrap";

export function Checkout(props) {
  const { pedido } = props.tranfersReducer;
  const [allproducts, setAllProducts] = React.useState(pedido);
  return (
    <>
      <CardHeader>
        <h1>Checkout</h1>
      </CardHeader>
      <div>
        <ListadoProductos productos={pedido} allproducts={allproducts} />
      </div>
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
