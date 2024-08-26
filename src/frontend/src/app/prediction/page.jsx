import BaseButton from "@/components/baseButton";
import InputBar from "@/components/inputBar";
import IconHome from "@/../public/icone_home.svg"

export default function PredictionPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-10">
      <div className="h-12 w-full flex justify-evenly">
        <BaseButton icon={IconHome} />
        <InputBar />
        <BaseButton text='Ok'/>
      </div>
      <p>oi tudo bem</p>
    </main>
  );
}
