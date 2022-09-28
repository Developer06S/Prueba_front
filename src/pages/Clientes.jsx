//import TableCliente from "../components/clientes/TableCliente"
import { FormCliente } from "../components/clientes/FormCliente"
import TableCliente from "../components/clientes/TableCliente"
import { ToolbarCliente } from "../components/clientes/ToolbarCliente"
import { Layout } from "../components/commons/Layout"
import { Modal } from "../components/commons/Modal"
import { ClienteContext, ClienteContextProvider } from "../contexts/clienteContext"

export const Clientes = () => {
  return (

    <Layout>
      <ClienteContextProvider>
        <div className="panel">
          <div className="panel-heading">Clientes</div>
          <div className="box">
            <ToolbarCliente />
            <TableCliente />
          </div>
        </div>
        <Modal>
          <FormCliente />
        </Modal>
      </ClienteContextProvider>
    </Layout>
  )
}
