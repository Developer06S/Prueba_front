import React, { createContext, useReducer } from 'react';
import { ELIMINAR_CLIENTE, MODIFICAR_CLIENTE, OBTENER_CLIENTE, OBTENER_CLIENTES, REGISTRAR_CLIENTE } from '../const/actionTypes';
import clienteReducer from '../components/reducer/clienteReducer';
import Axios from 'axios';
import Swal from 'sweetalert2'

const baseURL = "http://44.203.187.204:9090/api";

export const ClienteContext = createContext();

export const ClienteContextProvider = props => {

  const initialState = {
    clientesList: [],
    clienteActual: null
  }

  const [state, dispatch] = useReducer(clienteReducer, initialState);

  const obtenerClientes = async () => {
    try {
      const resultado = await Axios.get(baseURL + `/clientes`);
      dispatch({
        type: OBTENER_CLIENTES,
        payload: resultado.data
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener los clientes',
        toast: true
      });
      console.log(error);
    }
  }

  const registrarCliente = async cliente => {
    try {
      const resultado = await Axios.post(baseURL + `/clientes`, cliente);
      dispatch({
        type: REGISTRAR_CLIENTE,
        payload: resultado.data
      })
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Cliente registrado correctamente.',
        toast: true
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el cliente',
        toast: true
      });
      console.log(error);
    }
  }

  const obtenerCliente = async cliente => {
    try {
      let clienteEncontrado = null;
      if (cliente !== null) {
        const resultado = await Axios.get(baseURL + `/clientes/${cliente.idCliente}`);
        clienteEncontrado = resultado.data;
      } else {
        clienteEncontrado = cliente;
      }

      dispatch({
        type: OBTENER_CLIENTE,
        payload: clienteEncontrado
      })

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener el cliente',
        toast: true
      });
      console.log(error);
    }
  }

  const actualizarCliente = async cliente => {
    try {
      const resultado = await Axios.put(baseURL + `/clientes`, cliente);

      dispatch({
        type: MODIFICAR_CLIENTE,
        payload: resultado.data,
      })

      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Cliente modificado correctamente.',
        toast: true
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo modificar el cliente',
        toast: true
      });
      console.log(error);
    }
  }

  const eliminarCliente = async idCliente => {
    try {

      Swal.fire({
        title: '¿Desea continuar?',
        text: 'Se eliminará el cliente seleccionado',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar'
      }).then(async (result) => {
        if (result.value) {
          await Axios.delete(baseURL + `/clientes/${idCliente}`);
          dispatch({
            type: ELIMINAR_CLIENTE,
            payload: idCliente
          })

          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Cliente eliminado correctamente.',
            toast: true
          });
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el cliente',
        toast: true
      });
      console.log(error);
    }
  }

  return (
    <ClienteContext.Provider
      value={{
        clientesList: state.clientesList,
        clienteActual: state.clienteActual,

        obtenerClientes,
        registrarCliente,
        obtenerCliente,
        actualizarCliente,
        eliminarCliente,
      }}
    >
      {props.children}
    </ClienteContext.Provider>
  )
}