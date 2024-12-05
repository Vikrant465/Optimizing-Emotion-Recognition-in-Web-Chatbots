import {Spacer} from "@nextui-org/react";
import {CustomCard} from "./CustomCard";

export default function Test() {
  return (
    <div className="flex">
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
      <Spacer x={4} />
      <CustomCard />
    </div>
  );
}