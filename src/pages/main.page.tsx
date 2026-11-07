import MainLayout from "@/layouts/main.layout";
import { Outlet } from "@tanstack/react-router";

export default function MainPage() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
