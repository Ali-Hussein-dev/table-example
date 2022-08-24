import type { GetStaticProps, NextPage } from "next";
import * as React from "react";
import { TableFeats } from "../components";
import TableExample from "../components/TableExample";
//----------------------------------------------------------------------

const Home: NextPage<{ data: Record<string, any>[] }> = ({ data }) => {
  return (
    <section className="grid min-h-screen py-2 bg-gray-200 text-stone-800 place-items-center">
      <div className="container flex items-start justify-center h-full py-5 mx-auto">
        <div className="container px-1 space-y-8 max-auto">
          <TableFeats />
          <TableExample data={data} />
        </div>
      </div>
    </section>
  );
};

export default Home;

const getPath = (resource: string) =>
  `https://fakerapi.it/api/v1/${resource}?_quantity=20`;

export const getStaticProps: GetStaticProps = async () => {
  const res = await Promise.all([
    fetch(getPath("persons")),
    // fetch(getPath("books")),
  ])
    .then((results) => Promise.all(results.map((r) => r.json())))
    .catch((e) => console.error(e));

  return {
    props: {
      data: res?.[0].data || [],
    },
  };
};
