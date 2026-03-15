import { Suspense } from "react";

import { Loading } from "../../../../components/Loading.jsx";
import { Timeout } from "../../../../components/Timeout.jsx";
import { getDateString, getRandomUUID } from "../../utils.js";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="content">
      <header>
        <h1 className="heading">A server generated page!</h1>
        <h2>
          <Suspense fallback={<Loading />}>
            <Timeout>Streaming!</Timeout>
          </Suspense>
        </h2>
      </header>

      <section className="data-container">
        <article className="card">
          <p>Generated</p>
          <h2>{getDateString()}</h2>
        </article>
        <article className="card">
          <p>UUID</p>
          <h2>{getRandomUUID()}</h2>
        </article>
      </section>
    </main>
  );
}
