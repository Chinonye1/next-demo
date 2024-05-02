import styles from "./page.module.css";
import dynamic from "next/dynamic";
const AdminApp = dynamic(() => import("@/components/AdminApp"), { ssr: false });



export default function Home() {
  return (
    <main className={styles.main}>
     <AdminApp />
    </main>
  );
}
