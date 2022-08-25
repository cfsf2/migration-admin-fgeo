import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
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

export default function Virtualize({ cab, data, context, indiceData }) {
  const { superSubmit } = useContext(FuncionesContext);

  const { Dispatch } = useContext(context);

  const [value, setValue] = React.useState();
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
  };
  return (
    <>
      {cab.nombre}:
      <Autocomplete
        id="virtualize-demo"
        sx={{ width: "100%" }}
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={cab.opciones.sort((a, b) =>
          a.label.toUpperCase().localeCompare(b.label.toUpperCase())
        )}
        groupBy={(option) => {
          return option.label[0].toUpperCase();
        }}
        renderInput={(params) => (
          <TextField {...params} label={cab.placeholder} />
        )}
        renderOption={(props, option) => [props, option.label]}
        // TODO: Post React 18 update - validate this conversion, look like a hidden bug
        renderGroup={(params) => params}
        onChange={(event, newValue) => handleChangeValue(newValue)}
      />
    </>
  );
}
