import { useEffect, useState, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPersons, createPerson, updatePerson, deletePerson } from "../api/personApi";
import { Person } from "../models/Person";
import "../components/PersonForm.css";

export default function PersonsPage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [editing, setEditing] = useState<Person | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null);
  const [form, setForm] = useState<Omit<Person, "id">>({
    rut: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    address: { street: "", comuna: "", region: "" }
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const parseDate = (dateString: string) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '';
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age.toString();
  };

  const loadPersons = async () => {
    try {
      console.log("const loadPersons = async () =>")
      const data = await getPersons();
      console.log("data");
      console.log(data);
      console.log("SALE DEL AWAIT");
      setPersons(data);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  useEffect(() => {
    loadPersons();
  }, []);

  useEffect(() => {
    if (editing) {
      setForm({
        rut: editing.rut,
        firstName: editing.firstName,
        lastName: editing.lastName,
        birthDate: editing.birthDate,
        address: { ...editing.address }
      });
    } else {
      setForm({
        rut: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        address: { street: "", comuna: "", region: "" }
      });
    }
  }, [editing]);

  const handleCreate = async (data: Omit<Person, "id">) => {
    try {
      await createPerson(data);
      loadPersons();
      setEditing(null);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleUpdate = async (data: Omit<Person, "id">) => {
    if (!editing) return;
    try {
      await updatePerson(editing.id, { ...editing, ...data });
      setEditing(null);
      loadPersons();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePerson(id);
      loadPersons();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDeleteClick = (person: Person) => {
    setPersonToDelete(person);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (personToDelete) {
      await handleDelete(personToDelete.id);
    }
    setShowDeleteConfirm(false);
    setPersonToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setPersonToDelete(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "rut") {
      const filteredValue = value.replace(/\D/g, '').slice(0, 9);
      setForm({ ...form, rut: filteredValue });
      if (filteredValue.trim()) {
        setErrorMessage("");
      }
    } else if (["calle", "comuna", "region"].includes(name)) {
      const addressKey = name === "calle" ? "street" : name;
      setForm({ ...form, address: { ...form.address, [addressKey]: value.slice(0, 30) } });
    } else {
      setForm({ ...form, [name]: value.slice(0, 30) });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.rut.trim()) {
      setErrorMessage("El RUT es Obligatorio");
      return;
    }
    setErrorMessage("");
    if (editing) {
      handleUpdate(form);
    } else {
      handleCreate(form);
    }
  };

  const handleClear = () => {
    setForm({
      rut: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      address: { street: "", comuna: "", region: "" }
    });
    setEditing(null);
    setErrorMessage("");
  };

  return (
    <div style={{ backgroundColor: "blue", width: "100%", padding: "1rem", boxSizing: "border-box" }}>
      <div style={{ backgroundColor: "white", borderRadius: "8px", width: "98%", padding: "1rem", textAlign: "right" }}>
        <h1 style={{ color: "blue", margin: 0, textAlign: "center" }}>Personas</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input name="rut" placeholder="RUT" value={form.rut} onChange={handleChange} maxLength={9} />
            <input name="firstName" placeholder="Nombre" value={form.firstName} onChange={handleChange} maxLength={30} />
            <input name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} maxLength={30} />
            <DatePicker
              selected={form.birthDate ? new Date(form.birthDate) : null}
              onChange={(date: Date | null) => setForm({ ...form, birthDate: date ? date.toISOString().split('T')[0] : '' })}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
            />
          </div>
          <div className="form-row">
            <input name="calle" placeholder="Calle" value={form.address.street} onChange={handleChange} maxLength={30} />
            <input name="comuna" placeholder="Comuna" value={form.address.comuna} onChange={handleChange} maxLength={30} />
            <input name="region" placeholder="Región" value={form.address.region} onChange={handleChange} maxLength={30} />
            <button type="submit">Guardar</button>
            {errorMessage && <span style={{color: 'red', fontWeight: 'bold', margin: '0 10px'}}>{errorMessage}</span>}
            <button type="button" onClick={handleClear}>Limpiar</button>
          </div>
        </form>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#e0e0e0" }}>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "center" }}>Nombre</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "center" }}>Apellido</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "center" }}>RUT</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "center" }}>Fecha Nacimiento</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "center" }}>Edad Actual</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "center" }}>Dirección</th>
              <th style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {persons.map(p => (
              <tr key={p.id} style={{ backgroundColor: "#f9f9f9" }}>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "left" }}>{p.firstName}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "left" }}>{p.lastName}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "left" }}>{p.rut}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "left" }}>{formatDate(p.birthDate)}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "center" }}>{calculateAge(p.birthDate)}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "left" }}>{p.address.street}, {p.address.comuna}, {p.address.region}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #ccc", textAlign: "center" }}>
                  <button
                    onClick={() => setEditing(p)}
                    style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", padding: "0.5rem", marginRight: "0.5rem" }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(p)}
                    style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', marginRight: '0.5rem', cursor: 'pointer'}}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3>¿Está seguro de eliminar?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={handleConfirmDelete}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
              <button
                onClick={handleCancelDelete}
                style={{
                  backgroundColor: 'gray',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
