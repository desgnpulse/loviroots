import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Lovi. Order via WhatsApp or send us a message.",
};

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hi Lovi! I have a question about your products."
)}`;

export default function ContactPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-earth mb-3">
              Get in touch
            </h1>
            <p className="text-earth/60 text-base">
              We reply to every message, usually within a few hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact options */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-semibold text-earth mb-4">
                  Fastest way to reach us
                </h2>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-leaf/10 rounded-2xl border border-leaf/20 hover:bg-leaf/20 transition-colors group"
                >
                  <div className="w-12 h-12 bg-leaf rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-earth"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-earth text-sm">Chat on WhatsApp</p>
                    <p className="text-earth/60 text-xs mt-0.5">
                      Order, ask questions, or just say hi
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-earth/30 ml-auto group-hover:text-earth/60 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-xl font-semibold text-earth mb-3">
                  Other channels
                </h2>
                <p className="text-sm text-earth/70">
                  Email:{" "}
                  <a
                    href="mailto:hello@loviroots.com"
                    className="text-earth hover:text-leaf transition-colors font-medium"
                  >
                    hello@loviroots.com
                  </a>
                </p>
                <p className="text-sm text-earth/70">Hours: Mon to Sat, 8am to 8pm EAT</p>
                <p className="text-sm text-earth/70">Location: Nairobi, Kenya</p>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-display text-xl font-semibold text-earth mb-6">
                Send a message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
