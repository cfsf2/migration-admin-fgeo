
const camposObligatorios = ['whatsapp', 'nombre','direccioncompleta', 'lat','log', 'calle', 'cp', 'localidad','matricula', 'telefonofijo', 'email'];
export const ValidarPerfil = (farmacia) => {
    if(farmacia){
        var resultado = camposObligatorios.filter(c=>{ return !validarCampo(farmacia[c])});
        //console.log(resultado)
        if(resultado.length > 0){
            return false
        }else{
            return true
        }
    }else{
        return false
    }
  };
  
const validarCampo = (campo, tipo) => {
    if(campo){
        if(campo.length > 0){ 
            return true 
        } 
        else{ 
            return false 
        }
    }else{
        return false
    }
}
  