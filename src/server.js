require("express-async-errors")

const AppError = require("./utils/AppError")
const express = require("express"); //importanto express 

const routes = require("./routes")

const app = express(); //inicializando express
app.use(express.json());//API vai "entender" que vai receber as respostas em json

app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})


const PORT = 3333;//definindo a porta de execução

app.listen(PORT, () => console.log(`Server in running on Port ${PORT}`))