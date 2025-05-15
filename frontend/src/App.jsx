import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from "flowbite-react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

// Modal para confirmar eliminación
function ConfirmDeleteModal({ show, setShow, onDelete }) {
  return (
    show && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 z-50">
          <h2 className="text-xl font-bold text-center mb-4">
            ¿Estás seguro de eliminar este paciente?
          </h2>
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={() => setShow(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={onDelete}>
              Confirmar Eliminar
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

// Modal para editar paciente
function EditPacienteModal({ show, setShow, paciente, onSave }) {
  const [nombre, setNombre] = useState(paciente?.nombre || "");
  const [apellido, setApellido] = useState(paciente?.apellido || "");
  const [telefono, setTelefono] = useState(paciente?.telefono || "");
  const [direccion, setDireccion] = useState(paciente?.direccion || "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    paciente?.fechaNacimiento || ""
  );
  const [fechaIngreso, setFechaIngreso] = useState(
    paciente?.fechaIngreso || ""
  );

  useEffect(() => {
    if (paciente) {
      setNombre(paciente.nombre);
      setApellido(paciente.apellido);
      setTelefono(paciente.telefono);
      setDireccion(paciente.direccion);
      setFechaNacimiento(paciente.fechaNacimiento);
      setFechaIngreso(paciente.fechaIngreso);
    }
  }, [paciente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/editar/${paciente._id}`, {
        nombre,
        apellido,
        telefono,
        direccion,
        fechaNacimiento,
        fechaIngreso,
      });
      onSave(); // Llamar la función pasada como prop
      setShow(false); // Cerrar el modal
    } catch (error) {
      console.error("Error al editar paciente:", error);
    }
  };

  return (
    show && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 z-50">
          <h2 className="text-xl font-bold text-center mb-4">
            Editar Paciente
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Ingreso
                </label>
                <input
                  type="date"
                  value={fechaIngreso}
                  onChange={(e) => setFechaIngreso(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button type="button" onClick={() => setShow(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar Cambios</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

// Modal para agregar paciente
function AddPacienteModal({ show, setShow, onSave }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/registrar", {
        nombre,
        apellido,
        telefono,
        direccion,
        fechaNacimiento,
        fechaIngreso,
      });
      onSave(); // Llamar la función pasada como prop
      setShow(false); // Cerrar el modal
    } catch (error) {
      console.error("Error al agregar paciente:", error);
    }
  };

  return (
    show && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 z-50">
          <h2 className="text-xl font-bold text-center mb-4">
            Agregar Nuevo Paciente
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="number"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha de Ingreso
                </label>
                <input
                  type="date"
                  value={fechaIngreso}
                  onChange={(e) => setFechaIngreso(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button type="button" onClick={() => setShow(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Agregar Paciente</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // Estado para el modal de agregar
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  // Función para obtener los pacientes
  const fetchPacientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/paciente/");
      setPacientes(response.data); // Actualizamos el estado con los pacientes obtenidos
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
    }
  };

  // Llamar a fetchPacientes cuando el componente se monta
  useEffect(() => {
    fetchPacientes();
  }, []);

  // Función para eliminar un paciente
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/eliminar/${pacienteSeleccionado._id}`
      );
      fetchPacientes(); // Volver a obtener los pacientes
      setShowDeleteModal(false); // Cerrar el modal de confirmación
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
    }
  };

  // Función para editar un paciente
  const handleEdit = (paciente) => {
    setPacienteSeleccionado(paciente);
    setShowEditModal(true); // Mostrar el modal de edición
  };

  return (
    <div>
      <div className="mt-10 flex items-center justify-center">
        <h1 className="justify-center font-extrabold text-2xl">
          Lista de Pacientes
        </h1>
      </div>
      <div className="overflow-x-auto m-10">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Nombre</TableHeadCell>
              <TableHeadCell>Apellido</TableHeadCell>
              <TableHeadCell>Teléfono</TableHeadCell>
              <TableHeadCell>Dirección</TableHeadCell>
              <TableHeadCell>Fecha de Nacimiento</TableHeadCell>
              <TableHeadCell>Fecha de Ingreso</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Acciones</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {pacientes.map((paciente) => (
              <TableRow
                key={paciente._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {paciente.nombre}
                </TableCell>
                <TableCell>{paciente.apellido}</TableCell>
                <TableCell>{paciente.telefono}</TableCell>
                <TableCell>{paciente.direccion}</TableCell>
                <TableCell>
                  {new Date(paciente.fechaNacimiento).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(paciente.fechaIngreso).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <button
                    className="text-cyan-600 hover:text-cyan-800"
                    onClick={() => handleEdit(paciente)}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    className="ml-4 text-red-600 hover:text-red-800"
                    onClick={() => {
                      setPacienteSeleccionado(paciente);
                      setShowDeleteModal(true);
                    }}
                  >
                    <RiDeleteBin2Fill size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Botón para agregar nuevo paciente */}
        <div className="flex justify-center mt-6">
          <Button onClick={() => setShowAddModal(true)}>
            Agregar Paciente
          </Button>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onDelete={handleDelete}
      />

      {/* Modal para editar paciente */}
      <EditPacienteModal
        show={showEditModal}
        setShow={setShowEditModal}
        paciente={pacienteSeleccionado}
        onSave={fetchPacientes}
      />

      {/* Modal para agregar paciente */}
      <AddPacienteModal
        show={showAddModal}
        setShow={setShowAddModal}
        onSave={fetchPacientes}
      />
    </div>
  );
}

export default App;
