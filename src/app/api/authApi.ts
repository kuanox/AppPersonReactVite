export async function registerUser(firstname: string, lastname: string, email: string, password: string) {
  const res = await fetch("/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, email, password }),
  });
    console.log("res");
    console.log(res);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error en registro");
  }
  const data = await res.json();
    console.log("data");
    console.log(data);
  return data;
}