import Image from "next/image";
import Link from "next/link"
import Test from "./_components/WorkoutTable";
import WorkoutTable from "./_components/WorkoutTable";

export default function Home() {
  return (
    <main>
      <div>Fitgen</div>
      <WorkoutTable></WorkoutTable>
    </main>
  );
}
