import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Профиль игрока",
};

export default function GameLayout({
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