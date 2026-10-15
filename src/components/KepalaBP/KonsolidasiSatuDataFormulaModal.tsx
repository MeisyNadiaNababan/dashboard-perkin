import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  Calculator,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Info
} from 'lucide-react';
import {
  KAMUS_SATU_DATA_FORMULA_LIST,
  IndikatorSatuDataFormula,
  findKamusSatuDataItem
} from './konsolidasiSatuDataKamus';

interface KonsolidasiSatuDataFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMetricIdOrKeyword?: string | null;
  onNavigateToUnit?: (unitId: string) => void;
}

export const KonsolidasiSatuDataFormulaModal: React.FC<KonsolidasiSatuDataFormulaModalProps> = ({
  isOpen,
  onClose,
  initialMetricIdOrKeyword,
  onNavigateToUnit
}) => {
  const [activeItem, setActiveItem] = useState<IndikatorSatuDataFormula>(() => {
    if (initialMetricIdOrKeyword) {
      return findKamusSatuDataItem(initialMetricIdOrKeyword) || KAMUS_SATU_DATA_FORMULA_LIST[0];
    }
    return KAMUS_SATU_DATA_FORMULA_LIST[0];
  });

  const [searchFilter, setSearchFilter] = useState('');

  // Synchronize whenever initial selection changes
  useEffect(() => {
    if (initialMetricIdOrKeyword) {
      const found = findKamusSatuDataItem(initialMetricIdOrKeyword);
      if (found) {
        setActiveItem(found);
      }
    }
  }, [initialMetricIdOrKeyword]);

  if (!isOpen) return null;

  // Filter list of indicators for quick tab/search selection
  const filteredList = KAMUS_SATU_DATA_FORMULA_LIST.filter((item) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      item.namaIndikator.toLowerCase().includes(q) ||
      item.satkerPengampuUtama.toLowerCase().includes(q) ||
      item.nomorDataset.toLowerCase().includes(q) ||
      item.klasterNama.toLowerCase().includes(q)
    );
  });

  const getJenisBadge = (jenis: IndikatorSatuDataFormula['jenisKarakteristikData']) => {
    switch (jenis) {
      case 'GABUNGAN_MULTI_SATKER':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1 shadow-2xs">
            <Layers className="w-3 h-3 text-purple-700" />
            <span>GABUNGAN 2+ DATASET LINTAS SATKER</span>
          </span>
        );
      case 'FORMULA_RASIO':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 flex items-center gap-1 shadow-2xs">
            <Calculator className="w-3 h-3 text-sky-700" />
            <span>FORMULA RASIO KEUANGAN / OPERASIONAL</span>
          </span>
        );
      case 'FORMULA_PERSENTASE':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1 shadow-2xs">
            <Calculator className="w-3 h-3 text-blue-700" />
            <span>FORMULA PERSENTASE CAPAIAN REALISASI</span>
          </span>
        );
      case 'KOMPOSIT_INDEKS':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-1 shadow-2xs">
            <Sparkles className="w-3 h-3 text-indigo-700" />
            <span>KOMPOSIT INDEKS TATA KELOLA</span>
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 shadow-2xs">
            <Database className="w-3 h-3 text-emerald-700" />
            <span>DATASET TUNGGAL RESMI</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs font-sans animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl bg-white border border-slate-300 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden rounded-2xl">
        {/* MODAL TOP HEADER */}
        <div className="bg-[#002B49] text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-black shadow-xs">
              <Database className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 rounded-full font-mono uppercase">
                  Buku Satu Data BP Batam (Hal. 1 - 53)
                </span>
                <span className="text-xs font-mono text-slate-300">
                  Katalog Spesifikasi Data &amp; Rumus Formula
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white tracking-tight mt-0.5">
                Kamus Sumber Data &amp; Formula Matematis Indikator Konsolidasi
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QUICK SELECTOR TAB STRIP: SWITCH BETWEEN METRICS */}
        <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase shrink-0 pl-1">
            PILIH INDIKATOR:
          </span>
          {KAMUS_SATU_DATA_FORMULA_LIST.map((item) => {
            const isSelected = activeItem.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveItem(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-xs border border-blue-900'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <span className="truncate max-w-[190px] sm:max-w-none">{item.namaSingkat}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </button>
            );
          })}
        </div>

        {/* MODAL BODY CONTENT */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-slate-800">
          {/* 1. INDICATOR TITLE, CLUSTER & SATKER HIGHLIGHT BANNER */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border border-blue-200/80 shadow-2xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 uppercase">
                  {activeItem.klasterNama}
                </span>
                {getJenisBadge(activeItem.jenisKarakteristikData)}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeItem.statusKetercapaian}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-3 pt-1">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  {activeItem.namaIndikator}
                </h2>
                <div className="text-xs text-slate-600 mt-0.5 flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-slate-800">Unit Pengampu Utama:</span>
                  <span className="font-bold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200 font-mono">
                    {activeItem.satkerPengampuUtama} ({activeItem.kodeSatker})
                  </span>
                  {activeItem.satkerTerkaitLain && activeItem.satkerTerkaitLain.length > 0 && (
                    <span className="text-slate-500">
                      terintegrasi bersama{' '}
                      {activeItem.satkerTerkaitLain.map((s) => s.nama).join(', ')}
                    </span>
                  )}
                </div>
              </div>

              {/* REALISASI & TARGET PERKIN */}
              <div className="flex items-baseline gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs shrink-0">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">REALISASI TERKINI</span>
                  <span className="text-base sm:text-lg font-black font-mono text-blue-950">
                    {activeItem.realisasiTerkini}
                  </span>
                </div>
                <div className="border-l border-slate-200 pl-3">
                  <span className="text-[10px] text-slate-400 block font-mono">TARGET RESMI PERKIN</span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-slate-700">
                    {activeItem.targetResmi}
                  </span>
                </div>
                <div className="border-l border-slate-200 pl-3 text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">CAPAIAN (%)</span>
                  <span className="text-xs sm:text-sm font-black font-mono text-emerald-700">
                    {activeItem.tingkatCapaianPersen}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. DOKUMEN SATU DATA & NOMOR DATASET IDENTIFICATION BOX */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Left: Nomor Dataset Buku Satu Data */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Database className="w-4 h-4 text-blue-600" />
                <span>Nomor Dataset &amp; Katalog Resmi Satu Data:</span>
              </div>
              <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-100 font-mono text-xs font-bold text-blue-950">
                {activeItem.nomorDataset}
              </div>
              <div className="text-[11px] text-slate-500 font-sans flex items-center gap-1.5 pt-0.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>Lokasi Rujukan Dokumen:</span>
                <strong className="text-slate-800">{activeItem.halamanBukuSatuData}</strong>
              </div>
            </div>

            {/* Right: Karakteristik Integrasi / Penggabungan Data */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Info className="w-4 h-4 text-purple-600" />
                <span>Karakteristik Asal &amp; Penggabungan Data:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                {activeItem.penjelasanIntegrasi}
              </p>
            </div>
          </div>

          {/* 3. MATHEMATICAL FORMULA / PERHITUNGAN DILUAR ATRIBUT DATA */}
          <div className="p-4 rounded-xl bg-slate-900 text-white shadow-md border border-slate-800 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-300 font-mono font-bold text-xs">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>FORMULA PERHITUNGAN &amp; ALGORITMA MATEMATIS RESMI:</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Standar Penghitungan Kinerja BP Batam 2026
              </span>
            </div>

            {/* Formula Equation Highlight Box */}
            <div className="p-3 rounded-lg bg-slate-950/80 border border-cyan-500/30 text-cyan-200 font-mono text-xs sm:text-sm font-semibold tracking-wide leading-relaxed shadow-inner">
              {activeItem.rumusFormulaMatematis}
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>
                Formula diturunkan dari variabel-variabel agregasi dokumen fisik Satu Data BP Batam.
              </span>
              <span className="text-cyan-400 font-mono font-bold">
                Toleransi Margin Error: 0,00%
              </span>
            </div>
          </div>

          {/* 4. TABEL VARIABEL KOMPONEN RIIL 2026 (SIMULASI PERHITUNGAN) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Tabel Variabel Komponen Pembentuk Data Riil TA 2026:</span>
              </div>
              <span className="text-[10.5px] font-mono text-slate-500">
                {activeItem.komponenVariabel.length} Variabel Pengampu
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-mono text-[10.5px]">
                  <tr>
                    <th className="p-2.5 font-bold">Nama Variabel / Komponen</th>
                    <th className="p-2.5 font-bold">Simbol</th>
                    <th className="p-2.5 font-bold text-right">Nilai Riil</th>
                    <th className="p-2.5 font-bold">Satker Pengampu Data</th>
                    <th className="p-2.5 font-bold">No. Dataset &amp; Hal</th>
                    <th className="p-2.5 font-bold">Atribut Fisik Database</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {activeItem.komponenVariabel.map((v, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-2.5 font-semibold text-slate-800">
                        <div>{v.namaVariabel}</div>
                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                          {v.deskripsi}
                        </div>
                      </td>
                      <td className="p-2.5 font-mono font-bold text-purple-700 whitespace-nowrap">
                        {v.simbol || '-'}
                      </td>
                      <td className="p-2.5 font-mono font-black text-slate-900 text-right whitespace-nowrap bg-blue-50/30">
                        {v.nilaiRiil}
                      </td>
                      <td className="p-2.5 text-slate-700 font-sans font-medium">
                        {v.satkerAsal}
                      </td>
                      <td className="p-2.5 font-mono text-slate-600 text-[11px] whitespace-nowrap">
                        <span className="font-bold text-blue-900">{v.nomorDataset}</span>
                        <div className="text-[10px] text-slate-400">{v.halamanSatuData}</div>
                      </td>
                      <td className="p-2.5 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-bold">
                          {v.atributFisik}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. ATRIBUT FISIK DATABASE RESMI SESUAI BUKU SATU DATA */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
            <div className="text-[11px] font-mono font-bold text-slate-600 uppercase flex items-center justify-between">
              <span>DAFTAR ATRIBUT FISIK RESMI DALAM DOKUMEN SATU DATA (HAL. 1 - 53):</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {activeItem.daftarAtributResmi.length} Atribut Database Terdaftar
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeItem.daftarAtributResmi.map((attr, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-white text-slate-700 border border-slate-200/90 shadow-2xs hover:border-blue-400 transition-colors"
                >
                  {attr}
                </span>
              ))}
            </div>
          </div>

          {/* 6. REGULASI DASAR HUKUM & CATATAN TEKNIS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                <FileText className="w-3.5 h-3.5 text-amber-700" />
                <span>Landasan Regulasi &amp; Dasar Hukum:</span>
              </div>
              <p className="text-amber-950 font-medium text-[11px] leading-relaxed">
                {activeItem.dasarRegulasi}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-200 space-y-1">
              <div className="font-bold text-cyan-900 flex items-center gap-1.5 text-xs">
                <Info className="w-3.5 h-3.5 text-cyan-700" />
                <span>Catatan Teknis Operasional:</span>
              </div>
              <p className="text-cyan-950 font-medium text-[11px] leading-relaxed">
                {activeItem.catatanTeknis}
              </p>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER ACTIONS */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
          <div className="text-xs text-slate-500 font-medium">
            <span>Satu Data Terverifikasi: </span>
            <strong className="text-slate-800 font-mono">
              Buku Katalog Data Hal. 1 - 53 BP Batam
            </strong>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToUnit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToUnit(activeItem.routeIdSatker);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Akses Dashboard {activeItem.kodeSatker}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer border border-slate-200"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
