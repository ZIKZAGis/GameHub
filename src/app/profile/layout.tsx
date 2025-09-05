import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Профил игрока",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      {children}
    </div>
  );
}