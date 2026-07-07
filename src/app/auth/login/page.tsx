import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>

      <Image
        className="blur-sm -z-1 h-full absolute object-cover object-center-left"
        alt="background hero image"
        height={1080}
        width={1920}
        loading="eager"
        src={
          "https://eefsvvxawvjdzjdhcbuf.supabase.co/storage/v1/object/public/1manuelcdev-portfolio-media/hero-image.jpg"
        }
      />
    </div>
  );
}
