import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Counter" },
    { name: "description", content: "Counter example" },
  ];
};

let countData = 0;

export const loader = async () => {
  // throw new Error("Not implemented");
  return json({ count: countData });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "decrement") countData--;
  if (intent === "increment") countData++;

  return null;
};

export default function Index() {
  const { count } = useLoaderData<typeof loader>();

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Counter</h1>

      <Form method="post" className="flex justify-center items-center gap-4">
        <button
          type="submit"
          name="intent"
          value="decrement"
          className="bg-white hover:opacity-80 text-black py-2 px-4 rounded"
        >
          -
        </button>
        <div
          className="flex justify-center items-center"
          style={{ width: 100 }}
        >
          <span className="text-3xl">{count}</span>
        </div>
        <button
          type="submit"
          name="intent"
          value="increment"
          className="bg-white hover:opacity-80 text-black py-2 px-4 rounded"
        >
          +
        </button>
      </Form>
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
