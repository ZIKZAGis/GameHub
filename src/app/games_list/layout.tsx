import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Список игр",
};

export default function GamesListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}