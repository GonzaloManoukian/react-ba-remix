import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const meta: MetaFunction = () => {
  return [
    { title: "Form with Zod validations" },
    { name: "description", content: "Form example" },
  ];
};

const formSchema = z.object({
  email: z.string().email({ message: "El email no es válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
      message:
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número",
    }),
});
type FormType = z.infer<typeof formSchema>;
const resolver = zodResolver(formSchema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const { receivedValues, errors, data } = await getValidatedFormData<FormType>(
    request,
    resolver
  );
  if (errors) {
    return json({ errors, receivedValues });
  }
  console.log(data);
  return json(data);
};

export default function Index() {
  const actionData = useActionData<typeof action>();

  const { formState, handleSubmit, register } = useRemixForm<FormType>({
    resolver,
  });

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold mb-4">Form with Zod validations</h1>
      {actionData && "email" in actionData && "password" in actionData ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-3xl font-bold">Bienvenido {actionData.email}!</h2>
        </div>
      ) : (
        <Form
          method="post"
          className="flex flex-col justify-center items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <input
              type="text"
              placeholder="Email"
              autoComplete="off"
              className="bg-white hover:opacity-80 text-black py-2 px-4 rounded max-w-[200px]"
              {...register("email")}
            />
            <span className="h-4 text-sm text-red-500">
              {formState.errors.email?.message}
            </span>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <input
              type="text"
              placeholder="Password"
              autoComplete="off"
              className="bg-white hover:opacity-80 text-black py-2 px-4 rounded max-w-[200px]"
              {...register("password")}
            />
            <span className="h-4 text-sm text-red-500">
              {formState.errors.password?.message}
            </span>
          </div>
          <button
            type="submit"
            className="bg-white hover:opacity-80 text-black py-2 px-4 rounded"
          >
            Enviar
          </button>
        </Form>
      )}
      <Link to="/" prefetch="intent">
        <button className="border border-white hover:opacity-80 text-white py-2 px-4 rounded">
          Volver al Inicio
        </button>
      </Link>
    </section>
  );
}

export const ErrorBoundary = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Ups! Something went wrong</h1>
    </div>
  );
};
