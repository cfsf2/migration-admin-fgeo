const errorParser = (error) => {
    if(error.message){
      if(error.message.indexOf("403")){
        return {
          code: 403,
          title: "Error de login",
          message: "Usuario o Contraseña inválido"
        }
      }else{
        return {
          code: 4432,
          title: "Error no manejado",
          message: "Ocurrio un erorr no manejado en la aplicacion, por favor contacte al administrador."
        }
      }
    }
  }

  module.exports = {
      errorParser
  }