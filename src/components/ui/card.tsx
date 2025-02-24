import React from "react";

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b pb-2 mb-2">
    {children}
  </div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
