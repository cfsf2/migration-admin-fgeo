import React,{useState} from 'react'
import { Button } from 'reactstrap'

const VerPw = ({pw}) => {
    const [clicked, setclicked] = useState(false)

    if(clicked){
        return (
            <div style={{minHeight:35}}>
                {pw}
            </div>
        )
    }else{
        return <Button onClick={e=>setclicked(true)}>Ver Password</Button>
    }
    
}

export default VerPw
