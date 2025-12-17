import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Hotel } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <main className="container flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Hotel className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Hotel Room Management</h1>

        <p className="max-w-[600px] text-lg text-muted-foreground">
          Efficiently manage your hotel rooms with our modern and intuitive management system. Track availability,
          pricing, and room details all in one place.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/rooms">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
