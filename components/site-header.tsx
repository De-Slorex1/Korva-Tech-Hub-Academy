"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Portal", href: "#", dropdown: true },
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
  { label: "Contact Us", href: "/contact" },
]

const portalItems = ["Student", "Instructor", "Admin"]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="w-full border-b border-neutral-800 bg-[#0a0a0f] text-neutral-200">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}

          <a href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={120}
              height={40}
              priority
            />
          </a>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) =>
              link.dropdown ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-base transition hover:text-white">
                    {link.label}
                    <ChevronDown className="h-5 w-5" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="border-neutral-800 bg-[#13131a] text-neutral-200">
                    {portalItems.map((item) => (
                      <DropdownMenuItem
                        key={item}
                        className="cursor-pointer focus:bg-neutral-800 hover:text-white focus:text-white"
                      >
                        <a href="/sign-in" className="text-white hover:text-white">{item}</a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={
                    isActive(link.href)
                      ? "relative text-violet-400 after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:bg-violet-400"
                      : "text-neutral-300 transition hover:text-white"
                  }
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Right Side */}

          <div className="flex items-center gap-4">

            <a
              href="/sign-in"
              className="hidden transition hover:text-white sm:inline"
            >
              Sign In
            </a>

            <button
              onClick={() => router.push("/enrollment")}
              className="rounded-md bg-violet-600 px-5 py-2 text-white transition hover:bg-violet-700"
            >
              Enroll Now
            </button>

            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-7 w-7" />
            </button>

          </div>

        </div>
      </header>

      {/* Backdrop */}

      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Menu */}

      <div
        className={`fixed top-0 right-0 z-50 h-screen w-full bg-[#050816] transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <div className="flex h-16 items-center justify-between border-b border-neutral-800 px-6">

          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={40}
          />

          <button onClick={() => setMobileOpen(false)}>
            <X className="h-8 w-8 text-white" />
          </button>

        </div>

        <nav className="mt-8 flex flex-col gap-3 px-6">

          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                setMobileOpen(false)

                if (link.href !== "#") {
                  router.push(link.href)
                }
              }}
              className={`rounded-xl px-5 py-4 text-left text-lg transition ${
                isActive(link.href)
                  ? "bg-violet-600 text-white"
                  : "text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => {
              setMobileOpen(false)
              router.push("/enrollment")
            }}
            className="mt-8 rounded-xl bg-violet-600 py-4 text-lg font-semibold text-white transition hover:bg-violet-700"
          >
            Enroll Now
          </button>

        </nav>

      </div>
    </>
  )
}