import { Person } from "../models/Person";

const API_URL = "/api/v1/persons"; // API REST

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function getPersons(): Promise<Person[]> {
  const res = await fetch(API_URL, {
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error("Error al obtener personas");
  const data = await res.json();
  return data;
}

export async function createPerson(person: Omit<Person, "id">): Promise<Person> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(person),
  });
  if (!res.ok) throw new Error("Error al crear persona");
  return res.json();
}

export async function updatePerson(id: string, person: Person): Promise<Person> {
  console.log("updatePerson");
  console.log(person);
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "http://localhost:5000", 
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Header": "Content-Type, Authorization",
      ...getAuthHeaders() },
    body: JSON.stringify(person),
  });
  if (!res.ok) throw new Error("Error al actualizar persona");
  const data = await res.json();
  return data;
}

export async function deletePerson(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error("Error al eliminar persona");
}
