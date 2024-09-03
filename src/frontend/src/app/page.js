import BaseButton from "@/components/baseButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <img src="/logo.svg" alt="Logo" className="w-150" />
      <img src="/T-cross-prata.png" alt="T-cross" className="w-64" />
      <div className="flex space-x-4">
        <Link href="/prediction" className=" text-white p-3 text-lg mx-auto bg-gray-600 shadow-lg rounded-md">Predição</Link>
        <Link href="/history" className=" text-white p-3 text-lg mx-auto bg-gray-600 shadow-lg rounded-md">Histórico</Link>
      </div>
    </main>
  );
}
