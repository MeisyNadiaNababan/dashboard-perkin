import React, { useRef, useState } from 'react';
import {
  Download,
  Printer,
  Copy,
  CheckCircle2,
  FileText,
  Building2,
  Award,
  ChevronDown
} from 'lucide-react';
import {
  DOKUMEN_PERKIN_KEPALA,
  PROGRAM_ANGGARAN_PERKIN,
  TOTAL_PAGU_ANGGARAN_PERKIN,
  EMPAT_IKS_KEPALA_BP,
  TABEL_TARGET_PNBP_PERKIN,
  STANDAR_IKM_PERMENPAN,
  STANDAR_REFORMASI_BIROKRASI
} from './kepalaBpData';

export const KepalaBpWordDocView: React.FC = () => {
  const docRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Export as HTML .doc that opens directly in Microsoft Word with perfect formatting
  const handleExportWord = () => {
    if (!docRef.current) return;
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Perjanjian Kinerja Tahun 2026 - Kepala BP Batam</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.4; color: #111; margin: 2.5cm; }
          h1 { font-size: 14pt; text-align: center; margin: 0; font-weight: bold; }
          h2 { font-size: 12pt; text-align: center; margin: 5px 0 15px 0; font-weight: bold; }
          h3 { font-size: 11pt; margin: 15px 0 5px 0; font-weight: bold; text-decoration: underline; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { border: 1px solid #333; padding: 6px 8px; font-size: 10pt; vertical-align: top; }
          th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .font-bold { font-weight: bold; }
          .signature-box { margin-top: 30px; float: right; width: 280px; text-align: center; }
        </style>
      </head>
      <body>
        ${docRef.current.innerHTML}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Perjanjian_Kinerja_2026_Kepala_BP_Batam_${DOKUMEN_PERKIN_KEPALA.namaKepala.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    if (!docRef.current) return;
    navigator.clipboard.writeText(docRef.current.innerText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-4">
      {/* ACTION TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 text-white rounded-xl shadow-md border border-slate-800">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-amber-400" />
          <div>
            <h4 className="text-xs sm:text-sm font-bold leading-tight">
              Format Resmi Naskah Dinas Perjanjian Kinerja Tahun 2026
            </h4>
            <span className="text-[11px] text-slate-400">
              Nomor: {DOKUMEN_PERKIN_KEPALA.nomor} — Ditetapkan oleh Kepala BP Batam (Amsakar Achmad)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Salin Teks</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
          >
            <Printer className="w-3.5 h-3.5 text-sky-400" />
            <span>Cetak PDF</span>
          </button>

          <button
            onClick={handleExportWord}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Unduh Word (.doc)</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT PREVIEW CONTAINER */}
      <div className="bg-slate-100 p-4 sm:p-8 rounded-2xl flex justify-center overflow-x-auto border border-slate-300">
        <div
          ref={docRef}
          className="bg-white text-slate-900 shadow-2xl p-8 sm:p-14 max-w-4xl w-full font-serif border border-slate-300 rounded-xs"
          style={{ minHeight: '1100px' }}
        >
          {/* LOGO BP BATAM HEADER */}
          <div className="text-center mb-6 pb-4 border-b-2 border-slate-900">
            <div className="inline-block p-2 rounded-lg mb-2">
              <svg viewBox="0 0 32 32" className="w-12 h-12 mx-auto" fill="none">
                <path
                  d="M16 2L5 6V14C5 21.5 9.8 28.2 16 30C22.2 28.2 27 21.5 27 14V6L16 2Z"
                  fill="#002B49"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                />
                <circle cx="16" cy="14" r="3.5" fill="#38BDF8" />
              </svg>
            </div>
            <div className="text-xs font-bold tracking-widest text-slate-700 uppercase">
              BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-1">
              PERJANJIAN KINERJA TAHUN 2026
            </h1>
            <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
              Nomor : {DOKUMEN_PERKIN_KEPALA.nomor}
            </div>
          </div>

          {/* PERNYATAAN KOMITMEN */}
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed mb-6 space-y-3 font-sans">
            <p>
              Dalam rangka mewujudkan manajemen pemerintahan yang efektif, transparan dan akuntabel serta berorientasi pada hasil, yang bertanda tangan di bawah ini:
            </p>
            <table className="w-full text-xs font-sans mb-4 border-none">
              <tbody>
                <tr>
                  <td className="w-24 font-bold py-1 border-none">Nama</td>
                  <td className="w-4 py-1 border-none">:</td>
                  <td className="font-bold py-1 border-none text-slate-900">{DOKUMEN_PERKIN_KEPALA.namaKepala}</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 border-none">Jabatan</td>
                  <td className="py-1 border-none">:</td>
                  <td className="py-1 border-none">{DOKUMEN_PERKIN_KEPALA.jabatan}</td>
                </tr>
              </tbody>
            </table>
            <p>
              Berjanji akan mewujudkan target kinerja yang seharusnya sesuai lampiran perjanjian ini, dalam rangka mencapai target kinerja jangka menengah seperti yang telah ditetapkan dalam dokumen perencanaan.
            </p>
            <p>
              Keberhasilan dan kegagalan pencapaian target kinerja tersebut menjadi tanggung jawab kami.
            </p>
          </div>

          {/* TABEL LAMPIRAN 4 INDIKATOR KINERJA STRATEGIS (HALAMAN 2 PDF) */}
          <div className="mb-6 font-sans">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide text-center mb-2">
              LAMPIRAN PERJANJIAN KINERJA TAHUN 2026
              <br />
              BADAN PENGUSAHAAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS BATAM
            </h3>

            <table className="w-full text-xs border-collapse border border-slate-900 mt-3">
              <thead>
                <tr className="bg-slate-100 text-slate-900">
                  <th className="border border-slate-900 p-2 text-center w-10">No.</th>
                  <th className="border border-slate-900 p-2 text-left">Sasaran Strategis</th>
                  <th className="border border-slate-900 p-2 text-left">Indikator Kinerja Strategis</th>
                  <th className="border border-slate-900 p-2 text-center w-28">Target</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-900 p-2 text-center font-bold">1.</td>
                  <td className="border border-slate-900 p-2">Meningkatnya Realisasi Investasi di KPBPB Batam</td>
                  <td className="border border-slate-900 p-2 font-semibold">Nilai Realisasi Investasi di KPBPB Batam</td>
                  <td className="border border-slate-900 p-2 text-center font-bold font-mono">Rp.70 T</td>
                </tr>
                <tr>
                  <td className="border border-slate-900 p-2 text-center font-bold" rowSpan={2}>2.</td>
                  <td className="border border-slate-900 p-2" rowSpan={2}>Meningkatnya Kualitas Pengelolaan Kawasan dan Pelayanan Umum BP Batam</td>
                  <td className="border border-slate-900 p-2 font-semibold">Indeks Kepuasan Masyarakat Pengguna Layanan Umum dan Kawasan</td>
                  <td className="border border-slate-900 p-2 text-center font-bold font-mono">88</td>
                </tr>
                <tr>
                  <td className="border border-slate-900 p-2 font-semibold">Nilai Realisasi PNBP BP Batam</td>
                  <td className="border border-slate-900 p-2 text-center font-bold font-mono">2,447 T</td>
                </tr>
                <tr>
                  <td className="border border-slate-900 p-2 text-center font-bold">3.</td>
                  <td className="border border-slate-900 p-2">Terwujudnya Pengelolaan Organisasi BP Batam yang Efektif, Efisien dan Akuntabel</td>
                  <td className="border border-slate-900 p-2 font-semibold">Indeks Reformasi Birokrasi</td>
                  <td className="border border-slate-900 p-2 text-center font-bold font-mono">
                    80<br />
                    <span className="text-[10px] font-normal font-sans">(BB / Sangat Baik)</span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* RINCIAN 2 PROGRAM & ANGGARAN (HALAMAN 2 PDF) */}
            <div className="mt-5">
              <table className="w-full text-xs border-collapse border border-slate-900">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th className="border border-slate-900 p-2 text-left">Program</th>
                    <th className="border border-slate-900 p-2 text-right w-48">Anggaran</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-900 p-2">1. Program Pengembangan Kawasan Strategis</td>
                    <td className="border border-slate-900 p-2 text-right font-mono font-bold">
                      Rp. 1.428.920.480.000,-
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-900 p-2">2. Program Dukungan Manajemen</td>
                    <td className="border border-slate-900 p-2 text-right font-mono font-bold">
                      Rp. 1.099.028.050.000,-
                    </td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="border border-slate-900 p-2 text-right">TOTAL PAGU PERKIN 2026:</td>
                    <td className="border border-slate-900 p-2 text-right font-mono text-blue-900">
                      Rp. 2.527.948.530.000,-
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* TANDA TANGAN KEPALA BP BATAM */}
          <div className="mt-10 flex justify-end font-sans">
            <div className="w-72 text-center">
              <div className="text-xs text-slate-800">
                Batam, 30 Januari 2026
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                Kepala Badan Pengusahaan Kawasan Perdagangan Bebas Dan Pelabuhan Bebas Batam,
              </div>

              {/* Tanda Tangan & Stempel Visual */}
              <div className="h-20 flex items-center justify-center relative my-2">
                <div className="w-20 h-20 rounded-full border-2 border-blue-600/40 text-blue-600 text-[8px] font-mono flex items-center justify-center rotate-[-12deg] absolute opacity-50 uppercase text-center p-1">
                  Badan Pengusahaan Batam • TTD Resmi
                </div>
                <svg viewBox="0 0 150 60" className="w-32 h-16 text-blue-900 stroke-current fill-none">
                  <path d="M 10 40 Q 30 10 50 35 T 90 20 Q 110 5 130 35 T 145 25" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 40 45 L 85 15 M 70 50 L 105 10" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="text-xs font-bold text-slate-900 underline">
                {DOKUMEN_PERKIN_KEPALA.namaKepala}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
