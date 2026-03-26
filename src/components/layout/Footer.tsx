"use client";

import Link from "next/link";
import { Send, Instagram, Linkedin } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";

const socialLinks = [
  { icon: Send, href: siteConfig.telegram, label: "Telegram" },
  { icon: Instagram, href: siteConfig.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn" },
];

const serviceLinks = [
  { label: "Website yaratish", href: "/xizmatlar/website" },
  { label: "CRM/ERP tizim", href: "/xizmatlar/crm" },
  { label: "SEO xizmati", href: "/xizmatlar/seo" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-[#000000]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="group flex items-center gap-2">
              <Logo size={28} color="#ffffff" />
              <span className="text-lg font-bold text-foreground">
                Darslinker Agency
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Ta&apos;lim bizneslari uchun IT va marketing yechimlari.
              Websitedan CRM gacha — barchasi bir joyda.
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 text-muted transition-all duration-300 hover:border-gold/50 hover:text-gold hover:bg-gold/5"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Sahifalar */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Sahifalar
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Xizmatlar */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Xizmatlar
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Bog&apos;lanish
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Darslinker Agency. Barcha
            huquqlar himoyalangan.
          </p>
          <p className="text-xs text-muted/60">
            O&apos;zbekistonda ishlab chiqilgan
          </p>
        </div>
      </div>
    </footer>
  );
}
