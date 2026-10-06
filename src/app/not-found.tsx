import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="meridians bg-paper">
      <Container className="py-24 sm:py-32">
        <p className="font-mono text-sm text-ink-3">404</p>
        <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none font-bold tracking-[-0.03em]">This route does not settle anywhere.</h1>
        <p className="mt-5 max-w-xl text-[17px] text-ink-2">The page moved or never existed. Try the home page or the app.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-ink h-11 px-5">
            Home
          </Link>
          <Link href="/app" className="btn btn-line h-11 px-5">
            Open the app
          </Link>
        </div>
      </Container>
    </section>
  );
}
