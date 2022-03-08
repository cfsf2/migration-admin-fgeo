import React, { useState } from 'react'
import { Button } from 'reactstrap'

const ActButton = ({ change, rowData }) => {
    const [clicked, setclicked] = useState(false)

    if (rowData.descubrir) {
        return <Button
        onClick={() => change(rowData, false)}
        className="btn btn-sm btn-warning"
      >
        Desactivar
      </Button>

    } else {
        return <Button
        onClick={() => change(rowData, true)}
        className="btn btn-sm btn-info"
        title="Activar para que se muestre en el home como farmacia a descubrir"
      >
        Activar
      </Button>
    }

}

export default ActButton
