import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import NavBar from "@/components/navBar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>

      <div className="flex flex-row items-center p-10">
        <div className=" flex flex-col space-y-4 items-center">
        <img src="/logo.svg" alt="Logo" className="w-120" />
        <p>IT-Cross é um sistema de manutenção preditiva para a Volkswagen Brasil.</p> 
        <div className="flex space-x-4">
            <Link 
            href="/history"
            className={`${buttonVariants({ variant: "outline" })} hover:bg-blue-200`} >
              Histórico de registros</Link>
            <Link 
            href="/prediction" 
            className={`${buttonVariants({ variant: "primary" })} bg-blue-500 hover:bg-blue-600 text-white`}>
              Predição de falhas</Link>
                </div>
        </div>
        <div>
          <img src="/T-cross-prata.png" alt="T-cross" className="w-100" />
        </div>
      </div>
    </main>
  );
}
