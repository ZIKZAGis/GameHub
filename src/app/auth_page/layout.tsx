import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Страница игры",
};

export default function AuthLayout({
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