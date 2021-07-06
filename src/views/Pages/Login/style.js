import styled from 'styled-components'

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: transparent;
  margin:7px 10%;
  border: 1px ${props => props.inputColor || "palevioletred"} solid;
  border-radius: 10px;
`;
const Divider = styled.div`
    width:${props => props.inputWidth || "80%"} ;
    background-color:white;
    margin:0 auto;
    height: 1px;
`
const Form2 = styled.form`
    background: linear-gradient(90deg, rgba(32,212,219,0.8) 0%, rgba(30,92,136,0.8) 100%);
`
export { Input, Divider, Form2 }