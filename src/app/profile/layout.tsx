import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Страница игры",
};

export default function ProfileLayout({
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