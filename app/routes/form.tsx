import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Form" }, { name: "description", content: "Form example" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  console.log({ name, company });
  return json({ name, company });
  return null;
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold mb-4">Form simple</h1>
      {actionData ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-3xl font-bold">
            Hola {actionData.name} ({actionData.company})!
          </h2>
        </div>
      ) : (
        <Form
          method="post"
          className="flex flex-col justify-center items-center gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            autoComplete="off"
            className="bg-white hover:opacity-80 text-black py-2 px-4 rounded"
          />
          <input
            type="text"
            name="company"
            placeholder="Empresa"
            autoComplete="off"
            className="bg-white hover:opacity-80 text-black py-2 px-4 rounded"
          />
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
