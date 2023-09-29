import SideBar from "@/components/SideBar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToastProvider from "@/providers/ToastProvider";
import ModalProvider from "@/providers/ModalProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import { Figtree } from "next/font/google";
import { UserProvider } from "@/providers/UserProvider";
import "./globals.css";

const font = Figtree({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <SideBar songs={userSongs}>{children}</SideBar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
