import Feed from "components/Feed";
import Story from "components/Story";
import styles from "./page.module.css";
import ModalProvider from "@/context/ModalContext/Provider";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Suspense } from "react";
import SkeletonImage from "components/Skeleton/Image/SkeletonImage";
import SkeletonInput from "components/Skeleton/Input/SkeletonInput";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main className={styles.main}>
      <ModalProvider>
        <Suspense fallback={<SkeletonInput />}>
          <Story />
        </Suspense>
        <Suspense fallback={<SkeletonImage />}>
          <Feed />
        </Suspense>
      </ModalProvider>
    </main>
  );
}
