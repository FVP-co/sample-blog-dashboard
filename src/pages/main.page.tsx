import { SignupForm } from "@/components/signup-form";
import MainLayout from "@/layouts/main.layout";

export default function MainPage() {
  return <MainLayout>
    <SignupForm />
  </MainLayout>;
}