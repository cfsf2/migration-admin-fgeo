import React, { useState } from 'react'
import { Button } from 'reactstrap'

const BlockButton = ({ change, rowData }) => {
    const [clicked, setclicked] = useState(false)

    if (rowData.habilitado) {
        return <Button
            onClick={() => change(rowData, false)}
            className="btn btn-sm btn-danger"
        >
            Bloquear
        </Button>

    } else {
        return <Button
            onClick={() => change(rowData, true)}
            className="btn btn-sm btn-warning"
        >
            Habilitar
        </Button>
    }

}

export default BlockButton
