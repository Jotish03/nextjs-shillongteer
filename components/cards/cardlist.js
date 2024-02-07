import React from "react";
import CardHolder from "./cardholder";
import Link from "next/link";

const CardList = () => {
  return (
    <main className="flex  flex-col flex-wrap justify-center gap-8 p-8">
      <div className="flex flex-wrap justify-center gap-14">
        <Link href={"/common-number"}>
          <CardHolder url="/images/cnumber.png" title={"Common Number"} />
        </Link>
        <Link href={"/dream-number"}>
          <CardHolder url="/images/dnumber.png" title={"Dream Number"} />
        </Link>
        <Link href={"/previous-result"}>
          <CardHolder url="/images/presult.png" title={"Previous Result"} />
        </Link>
      </div>
      {/* <div className="flex flex-wrap justify-center gap-14">
        <CardHolder url="/images/presult.png" title={"Previous Result"} />
        <CardHolder url="/images/presult.png" title={"Previous Result"} />
        <CardHolder url="/images/presult.png" title={"Previous Result"} />
      </div> */}
    </main>
  );
};

export default CardList;
