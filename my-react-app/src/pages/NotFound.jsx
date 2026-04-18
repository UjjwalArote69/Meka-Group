import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("notFound.pageTitle")}</title>
      </Helmet>
      <main className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center px-6 text-center selection:bg-[#0ea5a4] selection:text-white">
        <span className="text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-6 block">
          {t("notFound.errorLabel")}
        </span>
        <h1 className="text-[20vw] md:text-[12vw] 2xl:text-[11rem] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mb-6">
          {t("notFound.lost")}<span className="text-black/15">{t("notFound.atSea")}</span>
        </h1>
        <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed max-w-md mb-12">
          {t("notFound.desc")}
        </p>
        <Link
          to="/"
          className="group relative px-10 md:px-12 py-4 bg-[#050505] text-white text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow"
        >
          <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          <span className="relative z-10">{t("notFound.backHome")}</span>
        </Link>
      </main>
    </>
  );
}
