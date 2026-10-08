"use client";

import { useState } from "react";

type Country = {
  id: string;
  name: string;
  region: string;
};

const countries: Country[] = [
  { id: "ECU", name: "Ecuador", region: "South America" },
  { id: "COL", name: "Colombia", region: "South America" },
  { id: "PER", name: "Peru", region: "South America" },
];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const matches = countries.filter((country) =>
    country.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const selected = countries.find((country) => country.id === selectedId);

  return (
    <main className="min-h-screen bg-[#F6F3EB] px-6 py-10 text-[#252B27] sm:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[#DADBD0] pb-6">
          <span className="font-serif text-4xl tracking-tight">proust</span>
        </header>

        <section className="grid gap-10 py-12 md:grid-cols-[1fr_20rem] md:items-end">
          <div>
            <p className="mb-3 text-xs tracking-[0.2em] text-[#72766C] uppercase">
              The living atlas
            </p>
            <h1 className="font-serif text-5xl tracking-tight sm:text-6xl">
              A world <em className="text-[#BF5A3D]">in motion.</em>
            </h1>
            <p className="mt-4 text-[#596158]">
              Discover countries. Follow their progress. Find the connections.
            </p>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm">Find a country</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by country name"
              className="w-full border-b border-[#72766C] bg-transparent px-0 py-3 outline-offset-4"
            />
          </label>
        </section>

        <section
          aria-label="Country explorer"
          className="grid min-h-80 gap-8 rounded-md bg-[#EEF0E7] p-6 md:grid-cols-[1fr_18rem]"
        >
          <div>
            <h2 className="mb-5 text-xs tracking-[0.18em] text-[#596158] uppercase">
              Choose a country
            </h2>

            {matches.length === 0 ? (
              <p role="status">No countries match “{query}”.</p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2">
                {matches.map((country) => (
                  <li key={country.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(country.id)}
                      aria-pressed={country.id === selectedId}
                      className={`w-full rounded border px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        country.id === selectedId
                          ? "border-[#BF5A3D] bg-[#F6F3EB]"
                          : "border-[#DADBD0] hover:bg-[#F6F3EB]"
                      }`}
                    >
                      <span className="block font-medium">{country.name}</span>
                      <span className="text-sm text-[#596158]">
                        {country.region}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside aria-live="polite" className="rounded bg-[#FBF9F3] p-6">
            {selected ? (
              <>
                <p className="text-xs tracking-widest text-[#596158] uppercase">
                  {selected.region} · {selected.id}
                </p>
                <h2 className="mt-3 font-serif text-4xl">{selected.name}</h2>
                <p className="mt-5 text-sm text-[#596158]">
                  Country indicators will appear here after we add verified
                  source data.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-serif text-3xl">Start somewhere.</h2>
                <p className="mt-4 text-sm text-[#596158]">
                  Search or choose a country to begin exploring.
                </p>
              </>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
