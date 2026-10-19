import React from 'react';
import {
  Plane,
  Anchor,
  Truck,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Activity,
  DollarSign,
  Package,
  Users,
  Compass,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ComposedChart,
} from 'recharts';

interface BandaraPelabuhanLlbDeepDiveCenterProps {
  selectedUnitId: string;
  onSelectUnit: (unitId: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
}

// =========================================================================
// DATASET 1: DIT. PENGELOLAAN KAWASAN BANDARA (HAL. 11-12 SATU DATA BP BATAM)
// =========================================================================

// Dataset #2: Tren Bulanan Arus Penerbangan & Penumpang Hang Nadim
const BANDARA_MONTHLY_DATA = [
  { bulan: 'Jan', penumpang: 325400, flights: 2780, kargoTon: 3410 },
  { bulan: 'Feb', penumpang: 310200, flights: 2650, kargoTon: 3240 },
  { bulan: 'Mar', penumpang: 348900, flights: 2910, kargoTon: 3620 },
  { bulan: 'Apr', penumpang: 362100, flights: 3020, kargoTon: 3710 },
  { bulan: 'Mei', penumpang: 355000, flights: 2980, kargoTon: 3650 },
  { bulan: 'Jun', penumpang: 378400, flights: 3150, kargoTon: 3820 },
  { bulan: 'Jul', penumpang: 382100, flights: 3180, kargoTon: 3890 },
  { bulan: 'Agu', penumpang: 345000, flights: 2890, kargoTon: 3520 },
  { bulan: 'Sep', penumpang: 338000, flights: 2840, kargoTon: 3460 },
  { bulan: 'Okt', penumpang: 342500, flights: 2860, kargoTon: 3510 },
  { bulan: 'Nov', penumpang: 331000, flights: 2790, kargoTon: 3380 },
  { bulan: 'Des', penumpang: 402000, flights: 3200, kargoTon: 3940 },
];

// Dataset #5: Komposisi Muatan Udara & EMPU (Kargo Tonase per Destinasi Hub)
const KARGO_EMPU_DESTINASI = [
  { tujuan: 'Jakarta (CGK/HLP)', tonase: 16840, share: '40,0%', kargoReguler: 12400, bagasi: 3200, pos: 1240 },
  { tujuan: 'Surabaya (SUB)', tonase: 8950, share: '21,2%', kargoReguler: 6800, bagasi: 1650, pos: 500 },
  { tujuan: 'Medan (KNO)', tonase: 6420, share: '15,2%', kargoReguler: 4900, bagasi: 1180, pos: 340 },
  { tujuan: 'Pekanbaru (PKU)', tonase: 5120, share: '12,1%', kargoReguler: 3950, bagasi: 920, pos: 250 },
  { tujuan: 'Natuna & Kepri (NTX/TNJ)', tonase: 4820, share: '11,5%', kargoReguler: 3150, bagasi: 1500, pos: 170 },
];

// Dataset #10: Sebaran Operator Maskapai Hang Nadim
const OPERATOR_MASKAPAI_SHARE = [
  { maskapai: 'Lion Group (Lion, Batik, Wings)', pergerakan: 16440, paxRibuan: 1980, sharePersen: 48.0 },
  { maskapai: 'Citilink Indonesia', pergerakan: 8220, paxRibuan: 990, sharePersen: 24.0 },
  { maskapai: 'Garuda Indonesia', pergerakan: 4795, paxRibuan: 575, sharePersen: 14.0 },
  { maskapai: 'Super Air Jet', pergerakan: 3425, paxRibuan: 412, sharePersen: 10.0 },
  { maskapai: 'Pelita Air & Lainnya', pergerakan: 1370, paxRibuan: 163, sharePersen: 4.0 },
];

// Dataset #6 & #7: Pemanfaatan Fasilitas & Pendapatan Aset Bandara
const ASET_BANDARA_PENDAPATAN = [
  { fasilitas: 'PJP4U & Aviobridge', targetM: 52.0, realisasiM: 56.4, capaian: 108.5 },
  { fasilitas: 'Pelayanan Jasa Pendaratan & Parkir', targetM: 28.5, realisasiM: 30.2, capaian: 106.0 },
  { fasilitas: 'Sewa Ruang Tenant Komersial F&B', targetM: 18.2, realisasiM: 19.8, capaian: 108.8 },
  { fasilitas: 'Pengelolaan Parkir & Akses Kendaraan', targetM: 11.4, realisasiM: 12.1, capaian: 106.1 },
  { fasilitas: 'Konsesi Kargo & Pergudangan EMPU', targetM: 6.22, realisasiM: 6.0, capaian: 96.5 },
];

// Dataset #9: Log Rute Penerbangan Langsung Unggulan
const LOG_RUTE_PENERBANGAN = [
  { kode: 'BTH-CGK', rute: 'Batam - Soekarno Hatta Jakarta', frekuensi: '18 Flight/Hari', maskapai: 'Garuda, Lion, Batik, Citilink', loadFactor: '88,5%' },
  { kode: 'BTH-KNO', rute: 'Batam - Kualanamu Medan', frekuensi: '6 Flight/Hari', maskapai: 'Lion Air, Citilink, Super Air Jet', loadFactor: '86,2%' },
  { kode: 'BTH-SUB', rute: 'Batam - Juanda Surabaya', frekuensi: '5 Flight/Hari', maskapai: 'Lion Air, Super Air Jet, Citilink', loadFactor: '89,1%' },
  { kode: 'BTH-PKU', rute: 'Batam - Sultan Syarif Kasim II', frekuensi: '4 Flight/Hari', maskapai: 'Citilink, Wings Air, Lion Air', loadFactor: '84,0%' },
  { kode: 'BTH-SZB', rute: 'Batam - Subang Kuala Lumpur', frekuensi: '1 Flight/Hari', maskapai: 'Batik Air Malaysia', loadFactor: '78,4%' },
];

// =========================================================================
// DATASET 2: DIT. PENGELOLAAN KEPELABUHANAN (HAL. 14-17 SATU DATA BP BATAM)
// =========================================================================

// Dataset #5 & #7: Tren Kunjungan Kapal Barang vs Penumpang
const PELABUHAN_MONTHLY_DATA = [
  { bulan: 'Jan', kapalBarang: 820, kapalPenumpang: 680, gtTotalJuta: 3.12 },
  { bulan: 'Feb', kapalBarang: 790, kapalPenumpang: 640, gtTotalJuta: 2.98 },
  { bulan: 'Mar', kapalBarang: 860, kapalPenumpang: 710, gtTotalJuta: 3.25 },
  { bulan: 'Apr', kapalBarang: 890, kapalPenumpang: 740, gtTotalJuta: 3.34 },
  { bulan: 'Mei', kapalBarang: 870, kapalPenumpang: 720, gtTotalJuta: 3.28 },
  { bulan: 'Jun', kapalBarang: 910, kapalPenumpang: 760, gtTotalJuta: 3.42 },
  { bulan: 'Jul', kapalBarang: 920, kapalPenumpang: 780, gtTotalJuta: 3.48 },
  { bulan: 'Agu', kapalBarang: 880, kapalPenumpang: 730, gtTotalJuta: 3.30 },
  { bulan: 'Sep', kapalBarang: 865, kapalPenumpang: 715, gtTotalJuta: 3.24 },
  { bulan: 'Okt', kapalBarang: 885, kapalPenumpang: 735, gtTotalJuta: 3.32 },
  { bulan: 'Nov', kapalBarang: 850, kapalPenumpang: 700, gtTotalJuta: 3.18 },
  { bulan: 'Des', kapalBarang: 940, kapalPenumpang: 810, gtTotalJuta: 3.59 },
];

// Dataset #23: Throughput Peti Kemas Batu Ampar (Bongkar vs Muat TEUs)
const PETI_KEMAS_THROUGHPUT = [
  { triwulan: 'TW I 2025', bongkar: 76200, muat: 72400, totalTeus: 148600 },
  { triwulan: 'TW II 2025', bongkar: 82100, muat: 77800, totalTeus: 159900 },
  { triwulan: 'TW III 2025', bongkar: 84500, muat: 79200, totalTeus: 163700 },
  { triwulan: 'TW IV 2025', bongkar: 80200, muat: 76000, totalTeus: 156200 },
];

// Dataset #25: Arus Penumpang 5 Terminal Feri Utama
const ARUS_PENUMPANG_TERMINAL = [
  { terminal: 'Batam Centre International', domestikJuta: 0.85, internasionalJuta: 1.82, totalJuta: 2.67, share: '31,7%' },
  { terminal: 'Harbour Bay Batu Ampar', domestikJuta: 0.62, internasionalJuta: 1.15, totalJuta: 1.77, share: '21,0%' },
  { terminal: 'Sekupang (Domestik & Internasional)', domestikJuta: 1.65, internasionalJuta: 0.28, totalJuta: 1.93, share: '22,9%' },
  { terminal: 'Telaga Punggur (Antar Pulau)', domestikJuta: 1.82, internasionalJuta: 0.0, totalJuta: 1.82, share: '21,6%' },
  { terminal: 'Nongsapura Ferry Terminal', domestikJuta: 0.18, internasionalJuta: 0.05, totalJuta: 0.23, share: '2,8%' },
];

// Dataset #4: Profil & Utilisasi Dermaga Pelabuhan
const PROFIL_DERMAGA_PELABUHAN = [
  { nama: 'Dermaga Utara Batu Ampar (STS Crane)', panjangM: 650, draftMlws: -14.0, borPersen: 74.2, peruntukan: 'Peti Kemas Kontainer' },
  { nama: 'Dermaga Selatan Batu Ampar', panjangM: 520, draftMlws: -12.0, borPersen: 68.5, peruntukan: 'General Cargo & Curah Kering' },
  { nama: 'Dermaga CPO & Curah Cair Kabil', panjangM: 420, draftMlws: -11.5, borPersen: 65.0, peruntukan: 'Liquid Bulk / Curah Cair' },
  { nama: 'Dermaga Beton Sekupang', panjangM: 380, draftMlws: -9.0, borPersen: 62.4, peruntukan: 'Pelayaran Rakyat & Logistik Lokal' },
  { nama: 'Dermaga Feri Telaga Punggur', panjangM: 260, draftMlws: -7.5, borPersen: 71.8, peruntukan: 'Ro-Ro & Angkutan Penumpang' },
];

// =========================================================================
// DATASET 3: DIT. LALU LINTAS BARANG (HAL. 8-9 SATU DATA BP BATAM)
// =========================================================================

// Dataset #6 & #7: Tren Bulanan Penerbitan Izin Pemasukan vs Pengeluaran Barang
const PERIZINAN_LLB_MONTHLY = [
  { bulan: 'Jan', pemasukan: 680, pengeluaran: 460, slaPersen: 96.2 },
  { bulan: 'Feb', pemasukan: 640, pengeluaran: 430, slaPersen: 96.5 },
  { bulan: 'Mar', pemasukan: 720, pengeluaran: 510, slaPersen: 96.8 },
  { bulan: 'Apr', pemasukan: 750, pengeluaran: 530, slaPersen: 97.1 },
  { bulan: 'Mei', pemasukan: 710, pengeluaran: 490, slaPersen: 96.6 },
  { bulan: 'Jun', pemasukan: 740, pengeluaran: 520, slaPersen: 97.0 },
  { bulan: 'Jul', pemasukan: 760, pengeluaran: 540, slaPersen: 96.9 },
  { bulan: 'Agu', pemasukan: 715, pengeluaran: 495, slaPersen: 96.7 },
  { bulan: 'Sep', pemasukan: 705, pengeluaran: 485, slaPersen: 96.8 },
  { bulan: 'Okt', pemasukan: 730, pengeluaran: 510, slaPersen: 97.2 },
  { bulan: 'Nov', pemasukan: 695, pengeluaran: 475, slaPersen: 96.4 },
  { bulan: 'Des', pemasukan: 775, pengeluaran: 545, slaPersen: 97.5 },
];

// Dataset #2: Realisasi Kuota Induk Barang Konsumsi
const KUOTA_BARANG_KONSUMSI = [
  { komoditas: 'Beras Premium & Khusus', kuotaTon: 45000, realisasiTon: 44250, persen: 98.3, status: 'Tercukupi' },
  { komoditas: 'Gula Pasir Kristal', kuotaTon: 28000, realisasiTon: 27500, persen: 98.2, status: 'Tercukupi' },
  { komoditas: 'Daging Sapi & Unggas Beku', kuotaTon: 18500, realisasiTon: 18120, persen: 97.9, status: 'Tercukupi' },
  { komoditas: 'Bawang Putih & Bombai', kuotaTon: 12000, realisasiTon: 11840, persen: 98.7, status: 'Tercukupi' },
  { komoditas: 'Tepung Terigu & Kedelai', kuotaTon: 22000, realisasiTon: 21650, persen: 98.4, status: 'Tercukupi' },
];

// Dataset #5: Sebaran KBLI Industri & Perdagangan Kawasan Bebas
const SEBARAN_KBLI_INDUSTRI = [
  { sektor: 'Industri Elektronika & Semikonduktor (KBLI 26)', perusahaan: 485, porsi: '34,2%', share: 34.2 },
  { sektor: 'Galangan Kapal & Maritim (KBLI 301)', perusahaan: 312, porsi: '22,0%', share: 22.0 },
  { sektor: 'Kimia Dasar & Plastik (KBLI 20)', perusahaan: 228, porsi: '16,1%', share: 16.1 },
  { sektor: 'Gudang & Logistik Kawasan (KBLI 52)', perusahaan: 245, porsi: '17,2%', share: 17.2 },
  { sektor: 'Makanan, Minuman & Tekstil (KBLI 10/13)', perusahaan: 150, porsi: '10,5%', share: 10.5 },
];

// Dataset #8 & #9: Efektivitas Layanan SLA Dokumen (Jam)
const SLA_LAYANAN_LLB = [
  { layanan: 'Izin Pemasukan Barang Konsumsi', slaTargetJam: 3.0, aktualJam: 1.7, kepatuhan: '97,2%' },
  { layanan: 'Izin Pemasukan Bahan Baku Industri', slaTargetJam: 3.0, aktualJam: 1.5, kepatuhan: '98,0%' },
  { layanan: 'Izin Pengeluaran Barang Antar Kawasan', slaTargetJam: 3.0, aktualJam: 1.9, kepatuhan: '96,4%' },
  { layanan: 'Penerbitan Izin Usaha Kawasan (IUK)', slaTargetJam: 24.0, aktualJam: 14.5, kepatuhan: '95,8%' },
  { layanan: 'Rekomendasi Kuota Barang Induk', slaTargetJam: 24.0, aktualJam: 16.2, kepatuhan: '96,5%' },
];

export const BandaraPelabuhanLlbDeepDiveCenter: React.FC<
  BandaraPelabuhanLlbDeepDiveCenterProps
> = ({
  selectedUnitId,
  onSelectUnit,
  onOpenFormulaModal: _onOpenFormulaModal = () => {},
  onNavigateToFullDashboard,
}) => {
  // Normalize active unit
  const activeUnit =
    selectedUnitId === 'dit-pelabuhan' || selectedUnitId === 'dit-lalu-lintas-barang'
      ? selectedUnitId
      : 'dit-bandara';

  return (
    <div
      id="bandara-pelabuhan-deep-dive-section"
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 space-y-3.5 font-sans"
    >
      {/* ================================================================== */}
      {/* 1. HEADER SECTION & UNIT TABS (PERSIS MODEL DEP-A1)                 */}
      {/* ================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
            Unit Deep-Dive Center: Bandara, Pelabuhan &amp; Lalu Lintas Barang
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Analisis granular 3 unit operasional pengampu Perkin DEP-A5 (Dit. Kawasan Bandara, Dit. Kepelabuhanan, Dit. Lalu Lintas Barang)
          </p>
        </div>

        {/* 3 Unit Selection Tabs - Persis DEP-A1 */}
        <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start sm:self-auto border border-slate-200/80">
          <button
            type="button"
            onClick={() => onSelectUnit('dit-bandara')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'dit-bandara'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Dit. Kawasan Bandara</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-pelabuhan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'dit-pelabuhan'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            <span>Dit. Kepelabuhanan</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectUnit('dit-lalu-lintas-barang')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeUnit === 'dit-lalu-lintas-barang'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Dit. Lalu Lintas Barang</span>
          </button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. TAB CONTENT: DIREKTORAT KAWASAN BANDARA (HAL. 11-12 SATU DATA)  */}
      {/* Setiap visualisasi langsung menampilkan KPI-nya di header          */}
      {/* ================================================================== */}
      {activeUnit === 'dit-bandara' && (
        <div className="space-y-3.5">
          {/* DUAL VISUALISASI UTAMA: Tren Bulanan Arus + Komposisi Kargo EMPU */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Tren Bulanan Arus Penumpang & Flights (Dataset #2) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Plane className="w-4 h-4 text-emerald-600" />
                      <span>Tren Arus Penumpang &amp; Pergerakan Pesawat</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Volume Penumpang (Pax) &amp; Frekuensi Penerbangan Hang Nadim Jan - Des 2025
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">4.120.500 Pax</span>
                    <span className="text-[10px] text-blue-600 font-bold ml-1.5">(34.250 Flight)</span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={BANDARA_MONTHLY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 9.5 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9.5 }} domain={[2000, 3500]} />
                      <Tooltip formatter={(v: any, name: any) => [Number(v).toLocaleString('id-ID'), name]} />
                      <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                      <Bar yAxisId="left" dataKey="penumpang" name="Penumpang (Pax)" fill="#059669" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="flights" name="Pergerakan Pesawat" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Visual 2: Komposisi Muatan Udara & Kargo EMPU per Destinasi (Dataset #5) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-emerald-600" />
                      <span>Ekspedisi Muatan Udara (EMPU)</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Total Kargo Reguler, Bagasi Penumpang, dan Pos Udara
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">42.150 Ton</span>
                    <span className="text-[10px] text-emerald-600 font-bold ml-1.5">(+6,8% YoY)</span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={KARGO_EMPU_DESTINASI} layout="vertical" margin={{ top: 5, right: 15, left: 35, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 9 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k Ton`} />
                      <YAxis type="category" dataKey="tujuan" tick={{ fontSize: 8.5 }} width={110} />
                      <Tooltip formatter={(v: any, name: any) => [`${Number(v).toLocaleString('id-ID')} Ton`, name]} />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="kargoReguler" name="Kargo Reguler" fill="#0284C7" stackId="a" />
                      <Bar dataKey="bagasi" name="Bagasi" fill="#059669" stackId="a" />
                      <Bar dataKey="pos" name="Pos Udara" fill="#D97706" stackId="a" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL VISUALISASI KEDUA: Operator Maskapai & Pemanfaatan Fasilitas Bandara */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 3: Operator Maskapai & Pangsa Pergerakan (Dataset #10) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Pangsa Pasar Operator Maskapai</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Distribusi 34.250 Pergerakan Pesawat dan Kapasitas Penumpang
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">89,4% OTP</span>
                  <span className="text-[10px] text-blue-600 font-bold ml-1.5">(24 Rute)</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {OPERATOR_MASKAPAI_SHARE.map((op, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{op.maskapai}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {op.pergerakan.toLocaleString('id-ID')} Flight &bull; {op.paxRibuan} Ribu Pax
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-black text-slate-900 text-sm">{op.sharePersen}%</span>
                      <div className="w-20 bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${op.sharePersen}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual 4: Pendapatan Pemanfaatan Aset Bandara (Dataset #6 & #7) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Pemanfaatan Aset &amp; Fasilitas Komersial</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Penerimaan PNBP Sisi Udara (Aero) vs Sisi Darat &amp; Komersial
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">Rp 124,50 M</span>
                  <span className="text-[10px] text-emerald-600 font-bold ml-1.5">(107,0% Target)</span>
                </div>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ASET_BANDARA_PENDAPATAN} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="fasilitas" tick={{ fontSize: 8.5 }} interval={0} />
                    <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `Rp ${v}M`} />
                    <Tooltip formatter={(v: any, name: any) => [`Rp ${v} Miliar`, name]} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="targetM" name="Target (M)" fill="#94A3B8" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="realisasiM" name="Realisasi (M)" fill="#059669" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Monitoring Table: Jadwal & Rute Penerbangan Langsung (Dataset #9) */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>Pemantauan Rute Penerbangan Langsung Unggulan</span>
                </h3>
                <p className="text-[10px] text-slate-500">
                  Jadwal, Frekuensi dan Keterisian Kursi (Load Factor) Rute Domestik &amp; Internasional
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">
                  82,4%
                </span>
                <span className="text-[10px] text-emerald-600 font-bold ml-1.5">
                  (Avg Load Factor &bull; 5 Rute)
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-left">
                    <th className="py-1.5 px-2">Kode</th>
                    <th className="py-1.5 px-2">Rute Penerbangan</th>
                    <th className="py-1.5 px-2">Frekuensi</th>
                    <th className="py-1.5 px-2">Operator Maskapai</th>
                    <th className="py-1.5 px-2 text-right">Load Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60">
                  {LOG_RUTE_PENERBANGAN.map((r, i) => (
                    <tr key={i} className="hover:bg-white/80">
                      <td className="py-1.5 px-2 font-mono font-bold text-blue-700">{r.kode}</td>
                      <td className="py-1.5 px-2 font-semibold text-slate-800">{r.rute}</td>
                      <td className="py-1.5 px-2 text-slate-600">{r.frekuensi}</td>
                      <td className="py-1.5 px-2 text-slate-600">{r.maskapai}</td>
                      <td className="py-1.5 px-2 text-right font-mono font-bold text-emerald-700">{r.loadFactor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* 3. TAB CONTENT: DIREKTORAT PENGELOLAAN KEPELABUHANAN (25 DATASET)   */}
      {/* Setiap visualisasi langsung menampilkan KPI-nya di header          */}
      {/* ================================================================== */}
      {activeUnit === 'dit-pelabuhan' && (
        <div className="space-y-3.5">
          {/* DUAL VISUALISASI UTAMA: Tren Kunjungan Kapal + Throughput Peti Kemas Batu Ampar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Tren Bulanan Kunjungan Kapal (Dataset #5 & #7) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Anchor className="w-4 h-4 text-blue-600" />
                      <span>Tren Kunjungan Kapal Barang vs Penumpang</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Call Kapal Barang, Kapal Penumpang &amp; Tonase Gross Tonnage (Juta GT)
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">18.420 Call</span>
                    <span className="text-[10px] text-blue-600 font-bold ml-1.5">(38,4 Juta GT)</span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={PELABUHAN_MONTHLY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 9.5 }} domain={[500, 1100]} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9.5 }} domain={[2.5, 4.0]} tickFormatter={(v) => `${v}M`} />
                      <Tooltip formatter={(v: any, name: any) => [name.includes('Tonase') ? `${v} Juta GT` : `${v} Call`, name]} />
                      <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                      <Bar yAxisId="left" dataKey="kapalBarang" name="Kapal Barang" fill="#2563EB" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="left" dataKey="kapalPenumpang" name="Kapal Penumpang" fill="#0284C7" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="gtTotalJuta" name="Tonase Total (Juta GT)" stroke="#D97706" strokeWidth={2} dot={{ r: 3 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Visual 2: Throughput Peti Kemas Batu Ampar (Dataset #23) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span>Throughput Peti Kemas Batu Ampar</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Volume Bongkar vs Muat Peti Kemas (TEUs) Triwulanan
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">628.400 TEUs</span>
                    <span className="text-[10px] text-emerald-600 font-bold ml-1.5">(STS Crane Aktif)</span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PETI_KEMAS_THROUGHPUT} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="triwulan" tick={{ fontSize: 9.5 }} />
                      <YAxis tick={{ fontSize: 9.5 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(v: any, name: any) => [`${Number(v).toLocaleString('id-ID')} TEUs`, name]} />
                      <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                      <Bar dataKey="bongkar" name="Bongkar (TEUs)" fill="#2563EB" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="muat" name="Muat (TEUs)" fill="#059669" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL VISUALISASI KEDUA: Arus Penumpang Feri & Profil Dermaga Pelabuhan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 3: Arus Penumpang 5 Terminal Feri (Dataset #25) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Arus Penumpang 5 Terminal Feri</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Arus Penumpang Domestik vs Internasional di Seluruh Terminal Feri Batam
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">8,42 Juta Org</span>
                  <span className="text-[10px] text-blue-600 font-bold ml-1.5">(5 Terminal)</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {ARUS_PENUMPANG_TERMINAL.map((t, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{t.terminal}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Domestik {t.domestikJuta}M &bull; Internasional {t.internasionalJuta}M
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-black text-slate-900 text-sm">{t.totalJuta} Juta Pax</span>
                      <span className="block text-[9.5px] text-blue-700 font-semibold">{t.share} Share</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual 4: Profil & Spesifikasi Dermaga (Dataset #4) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Utilisasi &amp; Kapasitas Dermaga</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Spesifikasi Panjang, Draft MLWS, dan Tingkat Okupansi (BOR) Dermaga
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">Rp 250,40 M</span>
                  <span className="text-[10px] text-emerald-600 font-bold ml-1.5">(107,4% Target &bull; 68,5% BOR)</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {PROFIL_DERMAGA_PELABUHAN.map((d, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{d.nama}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Panjang {d.panjangM}m &bull; Draft {d.draftMlws} MLWS &bull; {d.peruntukan}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-emerald-700 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        BOR {d.borPersen}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* 4. TAB CONTENT: DIREKTORAT LALU LINTAS BARANG (9 DATASET)           */}
      {/* Setiap visualisasi langsung menampilkan KPI-nya di header          */}
      {/* ================================================================== */}
      {activeUnit === 'dit-lalu-lintas-barang' && (
        <div className="space-y-3.5">
          {/* DUAL VISUALISASI UTAMA: Tren Bulanan Perizinan + Realisasi Kuota Barang Konsumsi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 1: Tren Bulanan Perizinan Pemasukan vs Pengeluaran (Dataset #6 & #7) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-amber-600" />
                      <span>Tren Perizinan Pemasukan vs Pengeluaran</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Dokumen Layanan Perizinan Masuk/Keluar KPBPB Batam &amp; SLA
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">14.280 Dokumen</span>
                    <span className="text-[10px] text-amber-600 font-bold ml-1.5">(96,8% On-Time)</span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={PERIZINAN_LLB_MONTHLY} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 9.5 }} domain={[300, 900]} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9.5 }} domain={[94, 100]} tickFormatter={(v) => `${v}%`} />
                      <Tooltip formatter={(v: any, name: any) => [name.includes('SLA') ? `${v}%` : `${v} Dokumen`, name]} />
                      <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                      <Bar yAxisId="left" dataKey="pemasukan" name="Izin Pemasukan" fill="#D97706" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="left" dataKey="pengeluaran" name="Izin Pengeluaran" fill="#0284C7" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="slaPersen" name="SLA On-Time (%)" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Visual 2: Realisasi Kuota Induk Barang Konsumsi (Dataset #2) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-amber-600" />
                      <span>Realisasi Kuota Barang Konsumsi</span>
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Alokasi Kuota vs Realisasi Pemasukan Komoditas Pokok Batam
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">98,2% Realisasi</span>
                    <span className="text-[10px] text-emerald-600 font-bold ml-1.5">(Tercukupi)</span>
                  </div>
                </div>

                <div className="h-56 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={KUOTA_BARANG_KONSUMSI} layout="vertical" margin={{ top: 5, right: 15, left: 35, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 9 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <YAxis type="category" dataKey="komoditas" tick={{ fontSize: 8.5 }} width={120} />
                      <Tooltip formatter={(v: any, name: any) => [`${Number(v).toLocaleString('id-ID')} Ton`, name]} />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="kuotaTon" name="Alokasi Kuota" fill="#94A3B8" />
                      <Bar dataKey="realisasiTon" name="Realisasi Masuk" fill="#D97706" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL VISUALISASI KEDUA: Sebaran KBLI Industri & Kecepatan Waktu Layanan SLA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
            {/* Visual 3: Sebaran KBLI Industri & Usaha Kawasan (Dataset #5) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-amber-600" />
                    <span>Sebaran KBLI Perusahaan Kawasan</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    1.420 Perusahaan Penerima Izin Usaha Kawasan Bebas
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">1.420 BU Aktif</span>
                  <span className="text-[10px] text-blue-600 font-bold ml-1.5">(KBLI Industri &amp; Dagang)</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {SEBARAN_KBLI_INDUSTRI.map((k, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{k.sektor}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {k.perusahaan} Perusahaan Beroperasi
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-black text-slate-900 text-sm">{k.porsi}</span>
                      <div className="w-20 bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-amber-600 h-full rounded-full" style={{ width: `${k.share}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual 4: Efektivitas Layanan SLA Perizinan (Dataset #8 & #9) */}
            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Efektivitas Waktu Layanan SLA Perizinan</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Waktu Penyelesaian Aktual vs Standar Regulasi Maksimal
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base sm:text-lg font-black text-slate-900 leading-none font-mono">Rp 2,48 M</span>
                  <span className="text-[10px] text-emerald-600 font-bold ml-1.5">(112,7% Target &bull; 1,8 Jam)</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {SLA_LAYANAN_LLB.map((s, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-slate-800 truncate">{s.layanan}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Standar Maks {s.slaTargetJam} Jam &bull; Aktual: {s.aktualJam} Jam
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-emerald-700 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {s.kepatuhan} On-Time
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
