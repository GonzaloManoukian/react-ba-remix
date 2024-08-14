/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { getRandomCatImage } from "~/lib/catApi";

export const meta: MetaFunction = () => {
  return [
    { title: "Random Cats" },
    { name: "description", content: "Random cats from thecatapi.com" },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const image = await getRandomCatImage();
  return json({ image });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  return null;
};

export default function Index() {
  const { image } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading" || !image;

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-[600px] aspect-square flex items-center justify-center">
        {!isLoading ? (
          <img
            src={image}
            alt="Cat"
            className="w-full aspect-square object-contain"
          />
        ) : (
          <div className="inline-block w-8 h-8 border-4 border-t-4 border-t-gray-900 border-gray-200 rounded-full animate-spin"></div>
        )}
      </div>
      <Form method="post">
        <button
          type="submit"
          className="bg-white hover:opacity-80 text-black py-2 px-4 rounded"
        >
          Reroll
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
