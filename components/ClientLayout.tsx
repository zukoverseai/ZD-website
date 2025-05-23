"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
