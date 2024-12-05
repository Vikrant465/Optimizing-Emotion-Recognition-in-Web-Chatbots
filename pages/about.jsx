import { Card, Skeleton } from "@nextui-org/react";
import Nav from "../components/nav";

export default function Home1() {
  return (
    <div>
      <Nav />
      <div className="flex  text-5xl p-10">
        <h>ABOUT</h>
      </div>
      <div className="flex align-middle justify-center">
        <Card className="w-[1000px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      </div>
    </div>
  );
}
