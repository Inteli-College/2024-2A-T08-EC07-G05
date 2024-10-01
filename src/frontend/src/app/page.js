import HealthPage from "@/app/health/page.jsx";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen ">
      <header>
        <nav className="flex flex-start items-center p-4 gap-4">
          <Link href="/">
          <img src="/logo.svg" alt="Logo" className="w-24" />
          </Link>
          <Link 
          href="/history">
            Histórico de registros</Link>
            <Link 
          href="/prediction">
            Predição de falhas</Link>
            <Link 
          href="/analysis">
            Análise de falhas</Link>
            <Link 
          href="/data">
            Dados do Modelo</Link>
            <Link 
          href="/models">
            Treino de Modelos</Link>
          
        </nav>
      </header>
      <div className="flex flex-row items-center p-10">
        <div className=" flex flex-col space-y-4 items-center">
        <img src="/logo.svg" alt="Logo" className="w-120" />
        <p>(adicionar pequena descrição da aplicação)</p> 
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
