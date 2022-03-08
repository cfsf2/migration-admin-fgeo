import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import {VER_PEDIDO} from '../../../redux/actions/pedidosActions'

class MyModal extends Component{  
    render(){
        return(
        <Fragment>
            <button type="button" className={this.props.className} data-toggle="modal" data-target=".bd-example-modal-lg">{this.props.titulo}</button>
            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                   
                    </div>
                </div>
            </div>
        </Fragment>            
        );
    }
}

const mapStateToProps = state => {
    return {
        pedidosReducer: state.pedidosReducer
    }
  }
  const mapDispatchToProps = {
    VER_PEDIDO
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(MyModal)