import { useContext, useEffect, useState } from "react";
import { ClienteContext } from "../../contexts/clienteContext";
import { ModalContext } from "../../contexts/modalContenx";


export const FormCliente = () => {

  const { setShowModal } = useContext(ModalContext);
  const { registrarCliente, actualizarCliente, clienteActual, obtenerCliente } = useContext(ClienteContext);

  const personaDefault = {
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: ''
  }
  const [persona, setPersona] = useState(personaDefault)
  const [mensaje, setMensaje] = useState(null);


  const handleChange = cambio => {
    setPersona({
      ...persona,
      [cambio.target.name]: cambio.target.value
    })
  }

  useEffect(() => {

    if (clienteActual !== null) {
      setPersona({
        ...clienteActual,
        direccion: clienteActual.direccion ? clienteActual.direccion : '',
        telefono: clienteActual.telefono ? clienteActual.telefono : '',
      });
    } else {
      setPersona(personaDefault);
    }
    // eslint-disable-next-line
  }, [clienteActual]);

  const handleOnSubmit = e => {
    console.log("entrando");
    e.preventDefault();

    //validar
    if (persona.nombres.trim() === '' && persona.apellidos.trim() === '' && persona.email.trim() === '') {
      setMensaje('Los nombres, apellidos y el email son obligatorios.');
      return;
    }
    //obtener objeto a enviar
    if (clienteActual !== null) {
      actualizarCliente(obtenerClienteAEnviar());
    } else {
      registrarCliente(obtenerClienteAEnviar());
    }

    //cerrar y limpiar el modal
    cerrarModal();
  }

  const obtenerClienteAEnviar = () => {
    let clienteTemp = { ...persona };
    if (clienteTemp.direccion === " ") delete clienteTemp.direccion;
    if (clienteTemp.telefono === " ") delete clienteTemp.telefono;
    return clienteTemp;
  }

  const limpiarForm = () => {
    setMensaje(null);
    setPersona(personaDefault);
  }

  const cerrarModal = () => {
    limpiarForm();
    setShowModal(false);
    obtenerCliente(null);

  }

  return (
    <form onSubmit={handleOnSubmit} >

      {mensaje ? <div className="notification is-danger">{mensaje}</div> : null}

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Nombre Completo</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded has-icons-left">
              <input
                autoComplete="off"
                className="input"
                type="text"
                placeholder="Nombre"
                name="nombres"
                value={persona.nombres}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control is-expanded">
              <input
                autoComplete="off"
                className="input"
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                value={persona.apellidos}
                onChange={handleChange}
              />
            </p>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Direccion</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded has-icons-left">
              <input
                autoComplete="off"
                className="input"
                type="text"
                placeholder="Ingrese su direccion"
                name="direccion"
                value={persona.direccion}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-map-marked-alt"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Telefono</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded has-icons-left">
              <input
                autoComplete="off"
                className="input"
                type="text"
                placeholder="Telefono"
                name="telefono"
                value={persona.telefono}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-phone"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Email</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded has-icons-left">
              <input
                autoComplete="off"
                className="input"
                type="text"
                placeholder="email"
                name="email"
                value={persona.email}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label">
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary mr-1">Guardar</button>
              <button
                type="button"
                className="button"
                onClick={() => cerrarModal()}
              >Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )

}