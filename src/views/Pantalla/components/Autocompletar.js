import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import "../components/Pantalla.scss";
import Autocomplete from "@mui/material/Autocomplete";
import FuncionesContext from "../context/FuncionesContext";

import PropTypes from "prop-types";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList } from "react-window";
import Typography from "@mui/material/Typography";

import { matchSorter } from "match-sorter";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  myComponent: {
    "& .MuiIconButton-root": {
      padding: "2px",
      marginRight: "7px",
    },
    "& .css-nnbavb": {
      display: "none",
    },
    "& .MuiAutocomplete-input": {
      fontSize: "0.875rem",
    },
  },
  input: {
    "& .css-1pysi21-MuiFormLabel-root-MuiInputLabel-root": {
      fontSize: "0.875rem",
    },
  },
});

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });

  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

export default function Virtualize({
  cab,
  data,
  context,
  indiceData,
  campokey,
  id_elemento,
}) {
  const { superSubmit } = useContext(FuncionesContext);

  const { Dispatch } = useContext(context);

  const [value, setValue] = useState(data[campokey]);
  const [inputValue, setInputValue] = React.useState("");

  const handleCancelar = () => {};

  const handleChangeValue = async (newValue) => {
    const valor = newValue.value; //newValue { value, label }
    setValue(valor);
    const update_id = data[cab.update_id_alias];
    const { id_a } = cab;

    superSubmit({ valor, id_a, update_id, handleCancelar, cab, data })
      .then((result) => {
        Dispatch({
          type: "SET_DATO_ESPECIFICO",
          payload: {
            key: cab.update_id_alias,
            indiceData: indiceData,
            value: result.data.id,
          },
        });
      })
      .catch((err) => {
        console.log("Cancelado ", err);
      });
    setValue(newValue.label);
  };

  const filterMatch = (option, { inputValue }) =>
    matchSorter(option, inputValue, { keys: ["label", "codref"] });

  const classes = useStyles();

  return (
    <>
      <div className="vista_label">
        {cab.nombre ? (
          <p
            style={{ position: "relative", top: "3.5px", width: "max-content" }}
          >
            {cab.nombre}:
          </p>
        ) : (
          <></>
        )}
      </div>
      <Autocomplete
        value={value}
        id={id_elemento}
        sx={{ width: "100%" }}
        disableListWrap
        disableClearable
        size="small"
        className={classes.myComponent}
        filterOptions={filterMatch}
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={cab.opciones.sort((a, b) =>
          a.label.toUpperCase().localeCompare(b.label.toUpperCase())
        )}
        groupBy={(option) => {
          return option.label[0].toUpperCase();
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={cab.placeholder}
            className={classes.input}
          />
        )}
        renderOption={(props, option) => [props, option.label]}
        // TODO: Post React 18 update - validate this conversion, look like a hidden bug
        renderGroup={(params) => params}
        onChange={(event, newValue) => handleChangeValue(newValue)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
    </>
  );
}
