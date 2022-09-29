//import TableCliente from "../components/clientes/TableCliente"
import { FormCliente } from "../components/clientes/FormCliente"
import TableCliente from "../components/clientes/TableCliente"
import { ToolbarCliente } from "../components/clientes/ToolbarCliente";
import { Layout } from "../components/commons/Layout";
import { Modal } from "../components/commons/Modal"
import { useContext, useState } from "react";
import { ClienteContext, ClienteContextProvider } from "../contexts/clienteContext";
import Axios from 'axios';
import Swal from 'sweetalert2'

export const Clientes = () => {

  const [id, setId] = useState('');
  //  const { obtenerCliente } = useContext(ClienteContext);

  function handleChange(event) {
    console.log({ id });

    setId({
      ...id,
      [event.target.id]: event.target.value
    })
  }

  const consulta = async () => {

    try {
      const baseURL = "http://localhost:9090/api";
      const { data } = await Axios.post(baseURL + `/clientes/${id}`);
      const { apellidos, nombres } = data;
      //console.log(resultado);

      Swal.fire({
        icon: 'info',
        title: "Cliente encontrado",
        text: nombres + " " + apellidos,
        toast: true
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Cliente inexistente',
        toast: true
      });
      console.log(error);
    }
  }

  return (

    <Layout>
      <ClienteContextProvider>
        <div className="panel">
          <div className="panel-heading">Clientes</div>
          <div className="box">
            <div  >
              <div >
                <label>
                  Id:
                  &nbsp;
                  <input value={id} name="id" onChange={e => setId(e.target.value)} />
                </label>
                &nbsp;
                <button type="submit" onClick={consulta}>Buscar</button>
              </div>
            </div>
            <br />
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
