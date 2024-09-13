import Link from "next/link";
import { Button } from '@chakra-ui/react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center p-10 h-3/6 space-x-6 ">
      <div className=" flex flex-col space-y-4 items-center">
      <img src="/logo.svg" alt="Logo" className="w-120" />
      <p>(adicionar pequena descrição da aplicação)</p> 
      <div className="flex space-x-4">
        <Button variant='outline' colorScheme='blue' >
          <Link href="/history" >Histórico de registros</Link>
        </Button>
        <Button colorScheme='blue'>
          <Link href="/prediction" >Predição de falhas</Link>
        </Button>
              </div>
      </div>
      <div>
      <img src="/T-cross-prata.png" alt="T-cross" className="w-100" />
      </div>
    </main>
  );
}
