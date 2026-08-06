"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AlertCircle,
  Heart,
  MessageCircleHeart,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabase";

type GuestData = {
  id: string;
  display_name: string;
  slug: string;
  greeting: string | null;
};

type SupabaseError = {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
};

const MAX_MESSAGE_LENGTH = 1000;

function getReadableError(error: SupabaseError) {
  const message = error.message ?? "";
  const details = error.details ?? "";
  const combined = `${message} ${details}`.toLowerCase();

  if (
    combined.includes("invitația nu este validă") ||
    combined.includes("invitatia nu este valida")
  ) {
    return "Invitația nu mai este validă. Vă rugăm să folosiți linkul personal primit.";
  }

  if (
    combined.includes("mesajul este prea scurt") ||
    combined.includes("message is too short")
  ) {
    return "Vă rugăm să scrieți un mesaj puțin mai lung.";
  }

  if (
    combined.includes("mesajul este prea lung") ||
    combined.includes("message is too long")
  ) {
    return `Mesajul poate avea maximum ${MAX_MESSAGE_LENGTH} de caractere.`;
  }

  if (
    combined.includes("failed to fetch") ||
    combined.includes("network")
  ) {
    return "Nu s-a putut realiza conexiunea. Verificați internetul și încercați din nou.";
  }

  return message
    ? `Mesajul nu a putut fi trimis: ${message}`
    : "Mesajul nu a putut fi trimis. Vă rugăm să încercați din nou.";
}

export default function GuestBook() {
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [loadingGuest, setLoadingGuest] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadGuest() {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("inv")?.trim();

      if (!slug) {
        if (active) {
          setLoadingGuest(false);
        }

        return;
      }

      const { data, error: guestError } = await supabase.rpc(
        "get_guest_by_slug",
        {
          guest_slug: slug,
        },
      );

      if (!active) {
        return;
      }

      if (guestError) {
        console.error(
          "Eroare la încărcarea invitatului pentru Guest Book:",
          guestError,
        );
      } else if (data && data.length > 0) {
        setGuest(data[0] as GuestData);
      }

      setLoadingGuest(false);
    }

    loadGuest();

    return () => {
      active = false;
    };
  }, []);

  const charactersLeft = useMemo(
    () => MAX_MESSAGE_LENGTH - message.length,
    [message.length],
  );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading || sent) {
      return;
    }

    const cleanedMessage = message.trim();

    if (!guest?.slug) {
      setError(
        "Invitația personalizată nu a putut fi identificată.",
      );
      return;
    }

    if (cleanedMessage.length < 2) {
      setError(
        "Vă rugăm să scrieți câteva cuvinte pentru Amir.",
      );
      return;
    }

    if (cleanedMessage.length > MAX_MESSAGE_LENGTH) {
      setError(
        `Mesajul poate avea maximum ${MAX_MESSAGE_LENGTH} de caractere.`,
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: submitError } = await supabase.rpc(
        "submit_guestbook_message",
        {
          invitation_slug: guest.slug,
          message_text: cleanedMessage,
        },
      );

      if (submitError) {
        console.error(
          "Eroare trimitere mesaj Guest Book:",
          submitError,
        );
        setError(getReadableError(submitError));
        return;
      }

      setSent(true);
      setMessage("");
    } catch (unexpectedError) {
      console.error(
        "Eroare neașteptată Guest Book:",
        unexpectedError,
      );

      setError(
        "A apărut o problemă neașteptată. Vă rugăm să încercați din nou.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="guestbook"
      className="relative px-5 py-14 sm:px-6 sm:py-24"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 22,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.18,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-2xl"
      >
        <div className="text-center">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.82,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.55,
              delay: 0.08,
            }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/55 text-[#a88d5d] shadow-[0_14px_36px_rgba(38,55,70,0.08)] backdrop-blur-sm"
          >
            <MessageCircleHeart size={27} strokeWidth={1.7} />
          </motion.div>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9b7c45] sm:text-sm">
            Guest Book
          </p>

          <h2 className="mt-4 font-serif text-3xl leading-tight text-[#263746] sm:mt-6 sm:text-5xl">
            Un gând pentru Amir
          </h2>

          <div className="mx-auto mt-5 h-px w-20 bg-[#b99a63] sm:mt-7 sm:w-24" />

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#39434a] sm:mt-7 sm:text-base sm:leading-8">
            Dacă doriți, îi puteți lăsa lui Amir câteva
            cuvinte pe care le va putea citi peste ani.
          </p>

          {!loadingGuest && guest && (
            <p className="mt-4 font-serif text-lg italic text-[#8d6f3e] sm:text-xl">
              Mesaj din partea {guest.display_name}
            </p>
          )}
        </div>

        {sent ? (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-10 max-w-xl rounded-[30px] border border-white/70 bg-white/55 px-6 py-10 text-center shadow-[0_20px_60px_rgba(38,55,70,0.08)] backdrop-blur-[5px] sm:mt-14 sm:px-10 sm:py-12"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: 2,
                ease: "easeInOut",
              }}
              className="mx-auto flex h-14 w-14 items-center justify-center text-[#c9a86a]"
            >
              <Heart size={34} fill="currentColor" />
            </motion.div>

            <h3 className="mt-5 font-serif text-3xl text-[#263746] sm:text-4xl">
              Vă mulțumim!
            </h3>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#39434a] sm:text-base">
              Mesajul dumneavoastră pentru Amir a fost
              înregistrat cu drag.
            </p>

            <p className="mt-3 font-serif text-lg italic text-[#6f542c]">
              Va rămâne o amintire frumoasă peste ani.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-xl sm:mt-14"
          >
            <div className="rounded-[30px] border border-white/70 bg-white/50 p-5 shadow-[0_18px_55px_rgba(38,55,70,0.08)] backdrop-blur-[5px] sm:p-8">
              <label
                htmlFor="guestbook-message"
                className="block text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#6f542c]"
              >
                Mesajul dumneavoastră
              </label>

              <textarea
                required
                id="guestbook-message"
                name="guestbook-message"
                rows={7}
                maxLength={MAX_MESSAGE_LENGTH}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                placeholder="Scrieți aici câteva cuvinte pentru Amir..."
                className="mt-5 block w-full resize-none rounded-[22px] border border-[#c9a86a]/45 bg-white/70 px-5 py-4 text-[16px] leading-7 text-[#263746] outline-none transition placeholder:text-[#56616a]/65 focus:border-[#a88d5d] focus:ring-2 focus:ring-[#c9a86a]/15"
                style={{
                  color: "#263746",
                  WebkitTextFillColor: "#263746",
                }}
              />

              <div className="mt-3 flex items-center justify-between gap-4 text-xs">
                <span className="text-slate-500">
                  Maximum {MAX_MESSAGE_LENGTH} de caractere
                </span>

                <span
                  className={
                    charactersLeft < 100
                      ? "font-semibold text-amber-700"
                      : "text-slate-500"
                  }
                >
                  {charactersLeft} rămase
                </span>
              </div>

              {error && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <p className="leading-6">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  loading ||
                  loadingGuest ||
                  !guest ||
                  message.trim().length < 2
                }
                style={{
                  color: "#263746",
                  WebkitTextFillColor: "#263746",
                }}
                className="mx-auto mt-7 flex w-full appearance-none items-center justify-center gap-2 rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-7 py-3.5 font-semibold text-[#263746] shadow-[0_12px_30px_rgba(201,168,106,0.20)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 sm:max-w-sm sm:px-8 sm:py-4 sm:hover:bg-[#dcc18d]"
              >
                <Send size={17} />

                {loading
                  ? "Se trimite..."
                  : "Trimite mesajul"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
}