
import { http, HttpResponse } from "msw";
import { Person } from "../../app/models/Person";

let persons: Person[] = [
  {
    id: "1",
    rut: "11.111.111-1",
    firstName: "Juan",
    lastName: "Pérez",
    birthDate: "1990-01-01",
    address: { street: "Av. Siempre Viva", comuna: "Santiago", region: "RM" }
  }
];

export const handlers = [
  http.get("http://localhost:3000/api/v1/persons", () => {
    return HttpResponse.json(persons);
  }),

  http.post("http://localhost:3000/api/v1/persons", async ({ request }) => {
    const newPerson = await request.json() as Omit<Person, "id">;
    const id = String(Date.now());
    persons.push({ ...newPerson, id });
    return HttpResponse.json({ ...newPerson, id }, { status: 201 });
  }),

  http.put("http://localhost:3000/api/v1/persons/:id", async ({ request, params }) => {
    const { id } = params;
    const updated = await request.json() as Person;
    persons = persons.map(p => (p.id === id ? updated : p));
    return HttpResponse.json(updated);
  }),

  http.delete("http://localhost:3000/api/v1/persons/:id", ({ params }) => {
    const { id } = params;
    persons = persons.filter(p => p.id !== id);
    return new HttpResponse(null, { status: 204 });
  })
];
