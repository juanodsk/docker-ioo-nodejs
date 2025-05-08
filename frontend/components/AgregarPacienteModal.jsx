// AgregarPacienteModal.jsx
import React, { useState } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import axios from "axios";

function AgregarPacienteModal({ show, setShow, fetchPacientes }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/registrar", {
        nombre,
        apellido,
        telefono,
        direccion,
        fechaNacimiento,
        fechaIngreso,
      });
      console.log("Paciente agregado:", response.data);
      fetchPacientes(); // Volver a obtener los pacientes
      setShow(false); // Cerrar el modal
    } catch (error) {
      console.error("Error al agregar paciente:", error);
    }
  };

  return (
    <Modal show={show} onClose={() => setShow(false)}>
      <Modal.Header>Agregar Paciente</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <TextInput
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              label="Nombre"
              required
            />
            <TextInput
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              label="Apellido"
              required
            />
            <TextInput
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              label="Teléfono"
              required
            />
            <TextInput
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              label="Dirección"
              required
            />
            <TextInput
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              label="Fecha de Nacimiento"
              required
            />
            <TextInput
              type="date"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
              label="Fecha de Ingreso"
              required
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button type="button" onClick={() => setShow(false)}>
              Cancelar
            </Button>
            <Button type="submit">Agregar Paciente</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AgregarPacienteModal; // Asegúrate de usar export default aquí
