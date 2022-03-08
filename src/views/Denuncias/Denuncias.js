import React, { Component } from "react";
import {
  //Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  //FormGroup,
  Input,
  //Label,
  //CardFooter,
  //CardImg
} from "reactstrap";

import { connect } from "react-redux";
import { GET_ALL_DENUNCIAS } from "../../redux/actions/denunciasActions";
import MaterialTable from "material-table";

import { forwardRef } from 'react';
import RestoreIcon from '@material-ui/icons/Restore';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Delete2: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Save: forwardRef((props, ref) => <Save {...props} ref={ref} />)
};

class Denuncias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtro: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.props.GET_ALL_DENUNCIAS();
  }

  handleInputChange(event) {
    const target = event.nativeEvent.target;
    const value = target.value.toLowerCase();
    const name = target.name;
    this.setState({ [name]: value });
  }

  render() {
    const { lista_denuncias } = this.props.denunciasReducer;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              {/* <CardHeader>
                <b>Denuncias</b>
              </CardHeader> */}
              <CardBody>
                <Row>
                  {/* <Col md="4" xs="12">
                    <Input
                      type="text"
                      placeholder="buscar denunciado..."
                      name="filtro"
                      onChange={this.handleInputChange}
                      value={this.state.filtro}
                    /> 
                  </Col>*/}
                </Row>

                <hr />
                <MaterialTable
                  title="Denuncias"
                  icons={tableIcons}
                  localization={{
                    header: {

                      actions: "Acciones",
                    },
                    body: {
                      emptyDataSourceMessage: 'No se encontraron datos',
                      addTooltip: 'Agregar',
                      editRow: {
                        saveTooltip: 'Guardar',
                        cancelTooltip: 'Cancelar'
                      },
                    },
                    pagination: {
                      labelDisplayedRows: '{from}-{to} de {count}',
                      labelRowsSelect: 'Filas',
                      labelRowsPerPage: 'Productos x pág',
                      firstAriaLabel: 'Primera',
                      lastAriaLabel: 'Ultima',
                      firstTooltip: 'Primera página',
                      lastTooltip: 'Ultima página',
                      previousAriaLabel: 'Página anterior',
                      previousTooltip: 'Página anterior',
                      nextAriaLabel: 'Próxima pagina',
                      nextTooltip: 'Próxima pagina'
                    },
                    toolbar: {
                      searchTooltip: 'Buscar',
                      searchPlaceholder: 'Buscar'
                    }
                  }}
                  columns={[
                    { title: 'Denunciado', field: 'nombre_denunciado' },
                    { title: 'Motivo', field: 'tipodenuncia' },
                    { title: '¿Quién denuncia?', field: 'username_denunciante' },
                    { title: 'Fecha', field: 'fecha' }
                  ]}
                  data={lista_denuncias.map(d=>{
                    const copiaObj = { ... d}
                    copiaObj.tipodenuncia = d.nombre_denunciado === "farmacia-usuario" ? d.nombre_denunciado : "Farmacia "+d.nombre_denunciado;
                    copiaObj.fecha = d.fecha.substring(0, 10)
                    if(d.nombre_denunciado){
                      return copiaObj
                    }else{
                      copiaObj.nombre_denunciado="test"
                      return copiaObj
                    }
                  })}
                />
                {/* <div className="table-responsive table-striped table-fix">
                  <table className="table ">
                    <thead className="bg-secondary">
                      <tr>
                        <th>Denunciado</th>
                        <th>Motivo</th>
                        <th>¿Quién denuncia?</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lista_denuncias.length === 0
                        ? null
                        : lista_denuncias.map((d, index) => {
                          return d.nombre_denunciado && d.nombre_denunciado
                            .toLowerCase()
                            .includes(this.state.filtro) ? (
                            <tr key={index}>
                              <td>
                                {d.tipodenuncia === "farmacia-usuario"
                                  ? ""
                                  : "Farmacia "}
                                <b>{d.nombre_denunciado}</b>
                              </td>
                              <td>{d.motivo}</td>
                              <td>{d.username_denunciante}</td>
                              <td>{d.fecha.substring(0, 10)}</td>
                            </tr>
                          ) : null;
                        })}
                    </tbody>
                  </table>
                </div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    denunciasReducer: state.denunciasReducer,
  };
};
const mapDispatchToProps = {
  GET_ALL_DENUNCIAS,
};

export default connect(mapStateToProps, mapDispatchToProps)(Denuncias);
