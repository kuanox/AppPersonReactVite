import { makeApi, Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { z } from 'zod'

// Exporta explícitamente el schema
export const loginSchema = z.object({
  user: z.string(),
  password: z.string().min(6)
});

export const authResponseSchema = z.object({
  token: z.string()
});

export const AddressSchema = z.object({
  calle: z.string(),
  comuna: z.string(),
  region: z.string(),
});

export const personSchema = z.object({
  id: z.string(),
  rut: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  fechaNacimiento: z.string(),
  direccion: AddressSchema
});

// Define createUserSchema for user creation
export const createPersonSchema = z.object({
  rut: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  fechaNacimiento: z.string(),
  direccion: AddressSchema
});

// 2. Define los endpoints con tipos explícitos
const endpoints = makeApi([
  {
    method: 'post',
    path: '/auth/login',
    alias: 'login',
    description: 'Login user',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: loginSchema,
      },
    ],
    response: authResponseSchema,
  },
  {
    method: 'get',
    path: '/persons',
    alias: 'getUsers',
    description: 'Get all users',
    response: z.array(personSchema),
  },
  {
    method: 'get',
    path: '/persons/:id',
    alias: 'getUser',
    description: 'Get user by id',
    response: personSchema,
  },
  {
    method: 'post',
    path: '/person',
    alias: 'createPerson',
    description: 'Create new person',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPersonSchema,
      },
    ],
    response: personSchema,
  },
  {
    method: 'delete',
    path: '/users/:id',
    alias: 'deletePerson',
    description: 'Delete person',
    response: z.object({ success: z.boolean() }),
  },
]);

// 3. Crea la instancia de Zodios
export const apiPersons = new Zodios(process.env.NEXT_PUBLIC_API_URL || '/api', endpoints);

// 4. Opcional: Crear hooks react
export const apiHooks = new ZodiosHooks("api", apiPersons);