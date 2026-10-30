import React from 'react';
import {
  TrendingUp,
  Globe,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  Briefcase,
  Users,
  Compass,
  FileCheck2,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import {
  IKP1_INVESTASI_KOMPONEN_DATA,
  IKP2_PROMOSI_KEGIATAN_DATA,
  IKP3_KAJIAN_PILAR_DATA,
  IKP4_PENGENDALIAN_BU_DATA,
} from './investasiPengusahaanData';

interface InvestasiPengusahaanEvaluasiIkeSectionProps {
  onOpenFormulaModal?: (kpiId: string) => void;
}

export const InvestasiPengusahaanEvaluasiIkeSection: React.FC<
  InvestasiPengusahaanEvaluasiIkeSectionProps
> = ({ onOpenFormulaModal }) => {
  // Totals for IKP 1
  const totalRealisasiInvestasi = IKP1_INVESTASI_KOMPONEN_DATA.reduce(
    (sum, item) => sum + item.realisasiRpTriliun,
    0
  );
  const totalPma = IKP1_INVESTASI_KOMPONEN_DATA.filter((i) => i.kategori === 'PMA').reduce(
    (sum, item) => sum + item.realisasiRpTriliun,
    0
  );
  const totalPmdn = IKP1_INVESTASI_KOMPONEN_DATA.filter((i) => i.kategori === 'PMDN').reduce(
    (sum, item) => sum + item.realisasiRpTriliun,
    0
  );

  // Totals for IKP 2
  const totalPelaksanaanPromosi = IKP2_PROMOSI_KEGIATAN_DATA.reduce(
    (sum, item) => sum + item.jumlahPelaksanaan,
    0
  );
  const totalTamuPromosi = IKP2_PROMOSI_KEGIATAN_DATA.reduce(
    (sum, item) => sum + item.jumlahTamu,
    0
  );
  const totalLeadsPromosi = IKP2_PROMOSI_KEGIATAN_DATA.reduce(
    (sum, item) => sum + item.minatInvestasiLeads,
    0
  );

  // Totals for IKP 3
  const totalDokumenKajian = IKP3_KAJIAN_PILAR_DATA.reduce(
    (sum, item) => sum + item.jumlahDokumen,
    0
  );
  const totalDitindaklanjutiKajian = IKP3_KAJIAN_PILAR_DATA.reduce(
    (sum, item) => sum + item.jumlahDitindaklanjuti,
    0
  );

  // Totals for IKP 4
  const totalRekomendasiDiberikan = IKP4_PENGENDALIAN_BU_DATA.reduce(
    (sum, item) => sum + item.totalRekomendasiDiberikan,
    0
  );
  const totalRekomendasiDitindaklanjuti = IKP4_PENGENDALIAN_BU_DATA.reduce(
    (sum, item) => sum + item.rekomendasiDitindaklanjuti,
    0
  );
  const rataRataTindakLanjutBu =
    (totalRekomendasiDitindaklanjuti / totalRekomendasiDiberikan) * 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs space-y-3.5 font-sans">
      {/* 1. Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-2xs">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-slate-900 flex items-center gap-2">
              <span>Capaian Evaluasi 4 Indikator Kinerja Program (IKP)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                DEP-A4 BP BATAM
              </span>
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Evaluasi kinerja program terpadu mencakup realisasi penanaman modal PMA/PMDN, efektivitas promosi, kajian strategis KEK, serta pengendalian kemitraan badan usaha
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shrink-0 self-start sm:self-auto">
          Tampilan 4 Card Evaluasi Terpadu
        </span>
      </div>

      {/* 2. Grid 4 Card (2x2 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* =================================================================== */}
        {/* CARD 1: IKP-1 MENINGKATNYA KUALITAS PELAYANAN PENANAMAN MODAL       */}
        {/* TABEL: REALISASI INVESTASI & JENIS PMA/PMDN                         */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded text-[10px] border border-blue-200 flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-blue-700" />
              IKP-1 &bull; DIT. INVESTASI
            </span>
            <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
              106.42% Melampaui Target
            </span>
          </div>

          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Meningkatnya Kualitas Pelayanan Penanaman Modal di KPBPB Batam
            </h5>
            <span className="text-[10px] text-slate-500 font-mono block">
              Unit: Direktorat Promosi dan Fasilitasi Investasi (Sumber: KPU Bea Cukai, BPS &amp; Kemeninves/OSS)
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-slate-900">
                  {totalRealisasiInvestasi.toFixed(2)}
                </span>
                <span className="text-[10.5px] font-bold text-slate-500">Triliun Rupiah</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Target: <strong className="text-slate-800">Rp 60,00 T</strong> (+Rp 3,85 T)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div style={{ width: '100%' }} className="bg-blue-600 h-full rounded-full" />
            </div>
          </div>

          {/* Tabel Rincian Realisasi Investasi & Jenis PMA/PMDN */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-slate-700">Rincian Realisasi Investasi Berdasarkan Jenis PMA &amp; PMDN:</span>
              <span className="text-[9px] font-mono text-slate-500">Modal Tetap &amp; Modal Lancar</span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
              <table className="w-full text-left text-[9.5px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                    <th className="py-1 px-2">Komponen Penanaman Modal</th>
                    <th className="py-1 px-1.5 text-center">Jenis</th>
                    <th className="py-1 px-2 text-right">Realisasi (Rp)</th>
                    <th className="py-1 px-2 text-right">Porsi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                  {IKP1_INVESTASI_KOMPONEN_DATA.map((item) => (
                    <tr key={item.no} className="hover:bg-white transition-colors">
                      <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 truncate max-w-[170px]" title={item.komponen}>
                        {item.komponen}
                      </td>
                      <td className="py-1.5 px-1.5 text-center font-mono">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                            item.kategori === 'PMA'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {item.kategori}
                        </span>
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-black text-blue-700">
                        Rp {item.realisasiRpTriliun.toFixed(2)} T
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono text-slate-600">
                        {item.kontribusiPersen.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50/80 font-bold text-slate-900 border-t border-blue-200 text-[9.5px]">
                    <td className="py-1.5 px-2 font-bold text-blue-950">
                      Total Realisasi Investasi KPBPB
                    </td>
                    <td className="py-1.5 px-1.5 text-center font-mono text-blue-900 text-[9px]">
                      PMA: {((totalPma / totalRealisasiInvestasi) * 100).toFixed(1)}%
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-black text-blue-950">
                      Rp {totalRealisasiInvestasi.toFixed(2)} T
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-800">
                      100.0%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500 pt-0.5">
              <span>PMA: <strong>Rp {totalPma.toFixed(2)} T</strong></span>
              <span>PMDN: <strong>Rp {totalPmdn.toFixed(2)} T</strong></span>
              <span className="text-emerald-700 font-bold">Capaian: 106,42%</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenFormulaModal?.('ikp-1-investasi-kpbpb')}
            className="w-full text-center text-[10px] text-blue-700 hover:text-blue-900 font-bold py-1 bg-white hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs mt-1"
          >
            <Calculator className="w-3 h-3 text-blue-600" />
            <span>Lihat Manual &amp; Formula IKP-1 (Pelayanan Penanaman Modal)</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* CARD 2: IKP-2 TERLAKSANANYA KEGIATAN PROMOSI DALAM & LUAR NEGERI    */}
        {/* TABEL MODEL IPPN: JENIS KEGIATAN, JUMLAH TAMU, JUMLAH PELAKSANAAN  */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-cyan-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded text-[10px] border border-cyan-200 flex items-center gap-1">
              <Globe className="w-3 h-3 text-cyan-700" />
              IKP-2 &bull; DIT. INVESTASI
            </span>
            <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
              109.00% Melampaui Target
            </span>
          </div>

          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Terlaksananya Kegiatan Promosi Dalam Maupun Luar Negeri
            </h5>
            <span className="text-[10px] text-slate-500 font-mono block">
              Unit: Direktorat Promosi dan Fasilitasi Investasi (Sumber: Log Promosi &amp; Dokumentasi Leads)
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-slate-900">
                  {totalLeadsPromosi}
                </span>
                <span className="text-[10.5px] font-bold text-slate-500">Minat Investasi (Leads)</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Target: <strong className="text-slate-800">200 Minat</strong> (+18 Leads)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div style={{ width: '100%' }} className="bg-cyan-600 h-full rounded-full" />
            </div>
          </div>

          {/* Visualisasi Infografis Kegiatan Promosi */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-slate-700">Visualisasi Distribusi Kegiatan Promosi &amp; Tamu:</span>
              <span className="text-[9px] font-mono text-cyan-800 font-bold">5.520 Delegasi / Tamu</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {IKP2_PROMOSI_KEGIATAN_DATA.map((item) => (
                <div
                  key={item.no}
                  className="p-1.5 rounded-lg bg-cyan-50/60 border border-cyan-100 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9px] font-bold text-cyan-950 truncate max-w-[120px]" title={item.jenisKegiatan}>
                      {item.jenisKegiatan}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-cyan-700 shrink-0">
                      {item.jumlahPelaksanaan}x
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[8.5px] text-slate-600 font-mono">
                    <span>{item.jumlahTamu.toLocaleString('id-ID')} Tamu</span>
                    <span className="font-bold text-cyan-900">{item.minatInvestasiLeads} Leads</span>
                  </div>
                  <div className="w-full bg-cyan-200/50 h-1 rounded-full overflow-hidden mt-1">
                    <div
                      className="bg-cyan-600 h-full rounded-full"
                      style={{ width: `${(item.jumlahTamu / 3250) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabel Kegiatan Promosi (Format Model IPPN) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-slate-700">Tabel Informasi Kegiatan Promosi (Model IPPN):</span>
              <span className="text-[9px] font-mono text-slate-500">{totalPelaksanaanPromosi} Kali Pelaksanaan</span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
              <table className="w-full text-left text-[9.5px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                    <th className="py-1 px-2">Jenis Kegiatan Promosi</th>
                    <th className="py-1 px-1.5 text-center">Pelaksanaan</th>
                    <th className="py-1 px-2 text-right">Jumlah Tamu</th>
                    <th className="py-1 px-2 text-right">Minat (Leads)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                  {IKP2_PROMOSI_KEGIATAN_DATA.map((item) => (
                    <tr key={item.no} className="hover:bg-white transition-colors">
                      <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 truncate max-w-[170px]" title={item.jenisKegiatan}>
                        {item.jenisKegiatan}
                      </td>
                      <td className="py-1.5 px-1.5 text-center font-mono font-bold text-slate-800">
                        {item.jumlahPelaksanaan}x
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono text-slate-700">
                        {item.jumlahTamu.toLocaleString('id-ID')}
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-black text-cyan-800">
                        {item.minatInvestasiLeads}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-cyan-50/80 font-bold text-slate-900 border-t border-cyan-200 text-[9.5px]">
                    <td className="py-1.5 px-2 font-bold text-cyan-950">
                      Total Hasil Kegiatan Promosi
                    </td>
                    <td className="py-1.5 px-1.5 text-center font-mono text-cyan-950 font-black">
                      {totalPelaksanaanPromosi}x
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-cyan-950 font-black">
                      {totalTamuPromosi.toLocaleString('id-ID')} Tamu
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-black text-cyan-950">
                      {totalLeadsPromosi} Leads
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500 pt-0.5">
              <span>97 Agenda Aktif</span>
              <span>Rata-rata 57 Tamu/Kegiatan</span>
              <span className="text-emerald-700 font-bold">Capaian: 109,00%</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenFormulaModal?.('ikp-2-promosi-investasi')}
            className="w-full text-center text-[10px] text-cyan-700 hover:text-cyan-900 font-bold py-1 bg-white hover:bg-cyan-50 rounded-lg border border-cyan-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs mt-1"
          >
            <Calculator className="w-3 h-3 text-cyan-600" />
            <span>Lihat Manual &amp; Formula IKP-2 (Promosi &amp; Minat Investasi)</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* CARD 3: IKP-3 PERSENTASE KAJIAN PENGEMBANGAN & KEK BERKELANJUTAN     */}
        {/* TABEL MODEL IPPN: SEBARAN DOKUMEN KAJIAN 4 PILAR UTAMA & TINDAK LANJUT */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px] border border-emerald-200 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-emerald-700" />
              IKP-3 &bull; DIT. PENGEMBANGAN KEK
            </span>
            <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
              100.00% Tercapai Penuh
            </span>
          </div>

          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Persentase Kajian Pengembangan, Kerja Sama, Daya Saing &amp; KEK Berkelanjutan
            </h5>
            <span className="text-[10px] text-slate-500 font-mono block">
              Unit: Direktorat Perencanaan dan Pengembangan Investasi (20 Dokumen Kajian)
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-slate-900">100.00</span>
                <span className="text-[10.5px] font-bold text-slate-500">Persen (%)</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Target: <strong className="text-slate-800">100%</strong> (20/20 Ditindaklanjuti)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div style={{ width: '100%' }} className="bg-emerald-600 h-full rounded-full" />
            </div>
          </div>

          {/* Visualisasi Infografis 4 Pilar Kajian */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-slate-700">Visualisasi 4 Pilar Kajian Strategis:</span>
              <span className="text-[9px] font-mono text-emerald-800 font-bold">20/20 Dokumen Ditindaklanjuti</span>
            </div>
            <div className="grid grid-cols-4 gap-1 text-center font-mono">
              {IKP3_KAJIAN_PILAR_DATA.map((p, idx) => (
                <div key={p.no} className="p-1 rounded bg-emerald-50/70 border border-emerald-100">
                  <div className="text-[8.5px] font-bold text-emerald-950 truncate">Pilar {idx + 1}</div>
                  <div className="text-[10px] font-black text-emerald-700">{p.jumlahDokumen} Dok</div>
                  <div className="text-[8px] text-emerald-800 font-bold bg-white rounded mt-0.5 border border-emerald-100">100% Selesai</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabel Sebaran Dokumen Kajian 4 Pilar Utama (Format Model IPPN) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-slate-700">Sebaran Dokumen Kajian Strategis Berdasarkan 4 Pilar Utama:</span>
              <span className="text-[9px] font-mono text-slate-500">4 Pilar Strategis</span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
              <table className="w-full text-left text-[9.5px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                    <th className="py-1 px-2">Pilar Utama Kajian Strategis</th>
                    <th className="py-1 px-1.5 text-center">Dokumen</th>
                    <th className="py-1 px-2 text-right">Ditindaklanjuti</th>
                    <th className="py-1 px-2 text-right">Capaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                  {IKP3_KAJIAN_PILAR_DATA.map((item) => (
                    <tr key={item.no} className="hover:bg-white transition-colors">
                      <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 truncate max-w-[170px]" title={item.pilarUtama}>
                        {item.pilarUtama}
                      </td>
                      <td className="py-1.5 px-1.5 text-center font-mono font-bold text-slate-800">
                        {item.jumlahDokumen} Dok
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700">
                        {item.jumlahDitindaklanjuti} Dok
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-black text-emerald-800">
                        {item.capaianPersen}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-50/80 font-bold text-slate-900 border-t border-emerald-200 text-[9.5px]">
                    <td className="py-1.5 px-2 font-bold text-emerald-950">
                      Total Dokumen Analisis Kajian
                    </td>
                    <td className="py-1.5 px-1.5 text-center font-mono text-emerald-950 font-black">
                      {totalDokumenKajian} Dok
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-emerald-950 font-black">
                      {totalDitindaklanjutiKajian} Dok
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-black text-emerald-950">
                      100.0%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500 pt-0.5">
              <span>Formula: (Ditindaklanjuti / Dokumen) × 100%</span>
              <span className="text-emerald-700 font-bold">100% Ditindaklanjuti</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenFormulaModal?.('ikp-3-kajian-kek')}
            className="w-full text-center text-[10px] text-emerald-700 hover:text-emerald-900 font-bold py-1 bg-white hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs mt-1"
          >
            <Calculator className="w-3 h-3 text-emerald-600" />
            <span>Lihat Manual &amp; Formula IKP-3 (Kajian &amp; Rekomendasi KEK)</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* CARD 4: IKP-4 PERSENTASE PENGENDALIAN PENGUSAHAAN & KERJA SAMA BU    */}
        {/* SESUAI FORMULA SS: REKOMENDASI DITINDAKLANJUTI / DIBERIKAN * 100%    */}
        {/* =================================================================== */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-2xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-mono font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded text-[10px] border border-indigo-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-indigo-700" />
              IKP-4 &bull; DIT. PENGENDALIAN PENGUSAHAAN
            </span>
            <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
              95.45% Kepatuhan Sangat Tinggi
            </span>
          </div>

          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Persentase Pelaksanaan Pengendalian Pengusahaan &amp; Kerja Sama Badan Usaha
            </h5>
            <span className="text-[10px] text-slate-500 font-mono block">
              Unit: Direktorat Pengendalian Pengusahaan (Periode: Akumulasi Juni s.d. Desember)
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-mono text-slate-900">
                  {rataRataTindakLanjutBu.toFixed(2)}
                </span>
                <span className="text-[10.5px] font-bold text-slate-500">Persen (%)</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Target: <strong className="text-slate-800">100%</strong> ({totalRekomendasiDitindaklanjuti}/{totalRekomendasiDiberikan} Rekomendasi)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                style={{ width: `${rataRataTindakLanjutBu}%` }}
                className="bg-indigo-600 h-full rounded-full"
              />
            </div>
          </div>

          {/* Formula & Penjelasan Operasional Box (Sesuai Screenshot User) */}
          <div className="p-2 rounded-lg bg-indigo-50/80 border border-indigo-100 space-y-1 text-[9.5px]">
            <div className="flex items-center justify-between font-mono font-bold text-indigo-950">
              <span>Formula: (Ditindaklanjuti / Diberikan) × 100%</span>
              <span className="text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-indigo-200">
                105 / 110 = 95.45%
              </span>
            </div>
            <p className="text-[9px] text-slate-600 leading-tight">
              <strong>Penjelasan Operasional:</strong> Mengukur persentase rekomendasi hasil pengendalian operasional, evaluasi kepatuhan PKS, dan pembinaan yang diselesaikan oleh mitra badan usaha di BP Batam (Periode: Juni s.d. Desember).
            </p>
          </div>

          {/* Tabel Pengendalian & Kerja Sama BU (Sesuai Formula di Screenshot) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-slate-700">Tabel Tindak Lanjut Rekomendasi Pengendalian &amp; Kerja Sama BU:</span>
              <span className="text-[9px] font-mono text-slate-500">4 Bidang Pengendalian</span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50/60">
              <table className="w-full text-left text-[9.5px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-600 font-bold uppercase text-[8.5px] border-b border-slate-200">
                    <th className="py-1 px-2">Bidang Pengendalian &amp; Kerja Sama BU</th>
                    <th className="py-1 px-1.5 text-center">Diberikan</th>
                    <th className="py-1 px-2 text-right">Ditindaklanjuti</th>
                    <th className="py-1 px-2 text-right">Tindak Lanjut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                  {IKP4_PENGENDALIAN_BU_DATA.map((item) => (
                    <tr key={item.no} className="hover:bg-white transition-colors">
                      <td className="py-1.5 px-2 font-sans font-semibold text-slate-900 truncate max-w-[170px]" title={item.bidangPengendalian}>
                        {item.bidangPengendalian}
                      </td>
                      <td className="py-1.5 px-1.5 text-center font-mono text-slate-600">
                        {item.totalRekomendasiDiberikan} Rek
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-indigo-700">
                        {item.rekomendasiDitindaklanjuti} Rek
                      </td>
                      <td className="py-1.5 px-2 text-right font-mono font-black text-indigo-900">
                        {item.persentaseTindakLanjut.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-indigo-50/80 font-bold text-slate-900 border-t border-indigo-200 text-[9.5px]">
                    <td className="py-1.5 px-2 font-bold text-indigo-950">
                      Total Rekomendasi Terverifikasi
                    </td>
                    <td className="py-1.5 px-1.5 text-center font-mono text-indigo-950 font-black">
                      {totalRekomendasiDiberikan} Rek
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono text-indigo-950 font-black">
                      {totalRekomendasiDitindaklanjuti} Rek
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-black text-indigo-950">
                      {rataRataTindakLanjutBu.toFixed(2)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-500 pt-0.5">
              <span>Formula: (Ditindaklanjuti / Diberikan) × 100%</span>
              <span className="text-emerald-700 font-bold">105/110 Tuntas Terlaksana</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenFormulaModal?.('ikp-4-pengendalian-pengusahaan')}
            className="w-full text-center text-[10px] text-indigo-700 hover:text-indigo-900 font-bold py-1 bg-white hover:bg-indigo-50 rounded-lg border border-indigo-200 transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs mt-1"
          >
            <Calculator className="w-3 h-3 text-indigo-600" />
            <span>Lihat Manual &amp; Formula IKP-4 (Pengendalian Pengusahaan)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
