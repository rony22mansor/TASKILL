import React from "react";
import { Button } from "./ui/button";

export default function DiscardDialog({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80" />
      <div className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-semibold">Are you absolutely sure?</h2>
          <p className="text-sm text-muted-foreground">
            You have unsaved progress. Leaving this page will discard all your
            changes.
          </p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="outline" onClick={onCancel} className="mt-2 sm:mt-0">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
