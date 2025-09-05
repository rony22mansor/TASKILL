import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SkillLoading({ i }) {
  return (
    <Card className="p-0 select-none border-0 shadow-none">
      <CardContent className="px-5 py-3 border-0">
        <Skeleton
          className={` h-6 w-${
            i % 5 === 1 ? "20" : i % 2 === 0 ? "40" : "30"
          } bg-input`}
        />
      </CardContent>
    </Card>
  );
}
