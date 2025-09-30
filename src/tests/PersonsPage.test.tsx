import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PersonsPage from "../pages/PersonsPage";
import { worker } from "../app/services/mockServiceWorker";
import { setupServer } from "msw/node";
import { handlers } from "./__mocks__/handlers";

beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());

test("carga y muestra personas", async () => {
  render(<PersonsPage />);
  expect(await screen.findByText(/Juan/)).toBeInTheDocument();
});

test("crea nueva persona", async () => {
  render(<PersonsPage />);
  fireEvent.change(screen.getByPlaceholderText("RUT"), { target: { value: "22.222.222-2" } });
  fireEvent.change(screen.getByPlaceholderText("Nombre"), { target: { value: "Ana" } });
  fireEvent.change(screen.getByPlaceholderText("Apellido"), { target: { value: "Gómez" } });
  fireEvent.change(screen.getByPlaceholderText("Calle"), { target: { value: "Calle Falsa 123" } });
  fireEvent.change(screen.getByPlaceholderText("Comuna"), { target: { value: "Ñuñoa" } });
  fireEvent.change(screen.getByPlaceholderText("Región"), { target: { value: "RM" } });
  fireEvent.click(screen.getByText("Guardar"));

  await waitFor(() => expect(screen.getByText(/Ana Gómez/)).toBeInTheDocument());
});
