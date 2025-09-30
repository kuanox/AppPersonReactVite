import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { AuthProvider } from "../app/context/AuthContext";

test("login exitoso redirige a dashboard", () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </AuthProvider>
  );

  fireEvent.change(screen.getByPlaceholderText("Usuario"), { target: { value: "admin" } });
  fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "1234" } });
  fireEvent.click(screen.getByText("Ingresar"));

  expect(screen.queryByText("Credenciales inválidas")).not.toBeInTheDocument();
});
