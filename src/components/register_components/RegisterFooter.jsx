import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function RegisterFooter() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="after:border-foreground/30 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t-2">
        <span className="bg-card text-foreground/60 font-semibold relative z-10 px-2">
          Already a member?
        </span>
      </div>

      <div className="pt-4">
        <Button
          onClick={() => navigate("/login")}
          size="default"
          variant="outline"
          id="button"
          type="submit"
          className="w-full cursor-pointer"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
