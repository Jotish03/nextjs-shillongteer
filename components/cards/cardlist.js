import React from "react";
import CardHolder from "./cardholder";
import Link from "next/link";

const CardList = () => {
  return (
    <main className="flex  flex-col justify-center gap-2 p-2">
      <div className="flex  justify-center gap-1 lg:gap-2 sm:gap-1 md:gap-2">
        <Link href={"/common-number"}>
          <CardHolder url="/images/common-number.jpg" title={"Common Number"} />
        </Link>
        <Link href={"#"}>
          <CardHolder url="/images/deal.jpg" title={"Deal"} />
        </Link>
        <Link href={"/dream-number"}>
          <CardHolder url="/images/dreamnumber.jpg" title={"Dream Number"} />
        </Link>
      </div>
      <div className="flex  justify-center gap-1 lg:gap-2 sm:gap-1 md:gap-2">
        <Link href={"#"}>
          <CardHolder url="/images/analytics.jpg" title={"Analytics"} />
        </Link>
        <Link href={"#"}>
          <CardHolder
            url="/images/predictedcounter.jpg"
            title={"Predicted Counter"}
          />
        </Link>
        <Link href={"/previous-result"}>
          <CardHolder
            url="/images/previousresults.jpg"
            title={"Previous Result"}
          />
        </Link>
      </div>
      <div className="flex  justify-center gap-1 lg:gap-2 sm:gap-1 md:gap-2">
        <Link href={"#"}>
          <CardHolder url="/images/teercalendar.jpg" title={"Teer Calendar"} />
        </Link>
        <Link href={"#"}>
          <CardHolder
            url="/images/reputedcounter.jpg"
            title={"Reputed Counter"}
          />
        </Link>
        <Link href={"#"}>
          <CardHolder url="/images/champions.jpg" title={"Champions"} />
        </Link>
      </div>
    </main>
  );
};

export default CardList;
