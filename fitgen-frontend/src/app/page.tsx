import Image from "next/image";
import Link from "next/link"
import Test from "./_components/test";

export default function Home() {
  return (
    <main>
      <div>Fitgen</div>
      <Link href='/api/python'>testing!</Link>
      <Test></Test>
    </main>
  );
}
