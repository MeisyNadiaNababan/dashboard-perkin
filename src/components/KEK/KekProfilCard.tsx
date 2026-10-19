import React, { useState } from 'react';
import {
  MapPin,
  Maximize2,
  CheckCircle2,
  Layers,
  LayoutGrid,
  Table as TableIcon,
  BarChart3,
  DollarSign,
  Users,
  Building2,
  FileText,
  Download,
  ExternalLink,
  Coins,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';
import { KEK_PROFIL_DATA, KekProfil } from '../../data/kekData';
import { KekVisualHeader } from './KekVisualHeader';

interface KekProfilCardProps {
  selectedKek: string;
  onSelectKek: (kekName: string) => void;
  onOpenFormulaModal: (formulaId: string) => void;
}

type SheetProfilMode = 'komparasi_lokasi_investasi' | 'kartu_profil' | 'matriks_tabel';

export const KekProfilCard: React.FC<KekProfilCardProps> = ({
  selectedKek,
  onSelectKek,
  onOpenFormulaModal,
}) => {
  const [activeSheet, setActiveSheet] = useState<SheetProfilMode>('komparasi_lokasi_investasi');

  // Kalkulasi agregasi profil KEK
  const totalKomitmenInvestasi = KEK_PROFIL_DATA.reduce((sum, k) => sum + k.nilaiInvestasiKomitmen, 0);
  const totalLuasArea = KEK_PROFIL_DATA.reduce((sum, k) => sum + k.luasArea, 0);
  const totalTargetNaker = KEK_PROFIL_DATA.reduce((sum, k) => sum + k.targetPenyerapanTenagaKerja, 0);

  const maxInvestasi = Math.max(...KEK_PROFIL_DATA.map((k) => k.nilaiInvestasiKomitmen));

  const formatRupiahTriliun = (val: number): string => {
    return `Rp ${(val / 1e12).toLocaleString('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} Triliun`;
  };

  const handleExportCsv = () => {
    const headers = [
      'KAWASAN',
      'LOKASI',
      'NAMA_PERUSAHAAN_BUPP',
      'LUAS_AREA_HA',
      'STATUS_OPERASIONAL',
      'KEGIATAN',
      'NILAI_INVESTASI_KOMITMEN_RUPIAH',
      'DASAR_HUKUM',
      'TARGET_PENYERAPAN_TENAGA_KERJA',
    ];

    const rows = KEK_PROFIL_DATA.map((k) => [
      `"${k.kawasan}"`,
      `"${k.lokasi}"`,
      `"${k.bupp}"`,
      k.luasArea,
      `"${k.statusOperasional}"`,
      `"${k.kegiatan}"`,
      k.nilaiInvestasiKomitmen,
      `"${k.dasarHukum}"`,
      k.targetPenyerapanTenagaKerja,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Profil_Kawasan_Ekonomi_Khusus_BP_Batam_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getVisualMeta = () => {
    switch (activeSheet) {
      case 'komparasi_lokasi_investasi':
        return {
          name: 'Visual Komparasi Nilai Investasi Komitmen & Luas Wilayah per Lokasi Geografis KEK',
          attrs: [
            'KAWASAN',
            'LOKASI',
            'NILAI INVESTASI KOMITMEN',
            'LUAS AREA',
            'STATUS OPERASIONAL',
            'TARGET PENYERAPAN TENAGA KERJA',
          ],
        };
      case 'kartu_profil':
        return {
          name: 'Kartu Eksekutif Profil KEK Berfokus Lokasi, Nilai Investasi, dan Badan Usaha Pembangun',
          attrs: [
            'KAWASAN',
            'LOKASI',
            'NAMA PERUSAHAAN',
            'NILAI INVESTASI KOMITMEN',
            'LUAS AREA',
            'STATUS OPERASIONAL',
            'KEGIATAN',
            'DASAR HUKUM',
          ],
        };
      case 'matriks_tabel':
        return {
          name: 'Matriks Tabel Profil KEK Lengkap (9 Atribut Data Resmi Hal. 10)',
          attrs: [
            'KAWASAN',
            'LOKASI',
            'NAMA PERUSAHAAN',
            'LUAS AREA',
            'STATUS OPERASIONAL',
            'KEGIATAN',
            'NILAI INVESTASI KOMITMEN',
            'DASAR HUKUM',
            'TARGET PENYERAPAN TENAGA KERJA',
          ],
        };
    }
  };

  const visualMeta = getVisualMeta();

  return (
    <div
      id="kek-profil-kawasan-section"
      className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5"
    >
      {/* Official Visual Header (Memenuhi Poin 5) */}
      <KekVisualHeader
        datasetNumber={2}
        pdfPages="Hal. 10"
        title="PROFIL KAWASAN EKONOMI KHUSUS (KEK) BATAM"
        visualName={visualMeta.name}
        visualIcon={<Layers className="w-3.5 h-3.5 text-emerald-600" />}
        attributes={visualMeta.attrs}
        classification="TERBUKA"
        periode="JIKA UPDATE"
        rightControls={
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setActiveSheet('komparasi_lokasi_investasi')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSheet === 'komparasi_lokasi_investasi'
                  ? 'bg-white text-emerald-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sheet 1: Komparasi Lokasi & Nilai Investasi"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Komparasi Lokasi & Investasi</span>
            </button>

            <button
              onClick={() => setActiveSheet('kartu_profil')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSheet === 'kartu_profil'
                  ? 'bg-white text-emerald-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sheet 2: Kartu Profil Eksekutif"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kartu Profil</span>
            </button>

            <button
              onClick={() => setActiveSheet('matriks_tabel')}
              className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSheet === 'matriks_tabel'
                  ? 'bg-white text-emerald-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sheet 3: Tabel 9 Atribut"
            >
              <TableIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tabel 9 Atribut</span>
            </button>
          </div>
        }
        onOpenFormula={() => onOpenFormulaModal('kpi_kek_investasi')}
      />

      {/* SUMMARY BANNER: TOTAL NILAI INVESTASI KOMITMEN & LOKASI STRATEGIS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1">
            <span className="flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-blue-600" />
              Total Nilai Investasi Komitmen
            </span>
            <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
              3 KEK
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
            {formatRupiahTriliun(totalKomitmenInvestasi)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Komitmen kumulatif pengembang dan pelaku usaha KEK Batam
          </div>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-sky-600" />
              Total Luas Delineasi Kawasan
            </span>
            <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
              Delineasi Resmi
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
            {totalLuasArea.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-sm font-semibold font-sans text-slate-600">Ha</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Rata-rata densitas investasi: <strong>Rp {(totalKomitmenInvestasi / totalLuasArea / 1e9).toFixed(1)} Miliar / Ha</strong>
          </div>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-1">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              Target Penyerapan Tenaga Kerja
            </span>
            <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
              Naker Target
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
            {totalTargetNaker.toLocaleString('id-ID')} <span className="text-sm font-semibold font-sans text-slate-600">Orang</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Tenaga kerja terampil bidang digital, aviasi, dan kesehatan
          </div>
        </div>
      </div>

      {/* SHEET 1: VISUAL KOMPARASI NILAI INVESTASI & LOKASI KEK */}
      {activeSheet === 'komparasi_lokasi_investasi' && (
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Visualisasi Komparasi Profil 3 Kawasan Ekonomi Khusus (KEK)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Menampilkan perbandingan Nama Kawasan, Luas Area (Ha) dan Nilai Investasi Komitmen (Rp Triliun)
                </p>
              </div>
              <span className="text-xs text-slate-600 font-medium">
                Klik kartu KEK di bawah untuk memfilter analisis detail
              </span>
            </div>

            {/* Visualisasi Grafis Komparasi Dual-Bar: Nilai Investasi Komitmen vs Luas Area */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                    Grafik Komparasi: Nilai Investasi Komitmen (Rp Triliun) vs Luas Area (Ha)
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  3 KEK BP Batam • Atribut Resmi Hal. 10
                </span>
              </div>

              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={KEK_PROFIL_DATA.map((k) => ({
                      name: k.shortName,
                      fullName: k.kawasan,
                      lokasi: k.lokasi,
                      nilaiKomitmenTriliun: Number((k.nilaiInvestasiKomitmen / 1e12).toFixed(2)),
                      luasAreaHa: k.luasArea,
                      densitasMiliarPerHa: Number((k.nilaiInvestasiKomitmen / k.luasArea / 1e9).toFixed(1)),
                    }))}
                    margin={{ top: 10, right: 15, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 'bold', fill: '#1E293B' }} />
                    <YAxis yAxisId="left" orientation="left" stroke="#059669" tick={{ fontSize: 10, fill: '#059669' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#0284C7" tick={{ fontSize: 10, fill: '#0284C7' }} />
                    <RechartsTooltip
                      formatter={(value: any, name: any, item: any) => [
                        name === 'Nilai Investasi Komitmen (Rp T)'
                          ? `Rp ${value} Triliun`
                          : `${value} Ha (Densitas: Rp ${item.payload.densitasMiliarPerHa} M/Ha)`,
                        name,
                      ]}
                      contentStyle={{
                        backgroundColor: '#0F1E36',
                        border: '1px solid #1E293B',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '11px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} iconType="circle" />
                    <Bar
                      yAxisId="left"
                      dataKey="nilaiKomitmenTriliun"
                      name="Nilai Investasi Komitmen (Rp T)"
                      fill="#059669"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="luasAreaHa"
                      name="Luas Area Kawasan (Ha)"
                      fill="#0284C7"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Rangkuman Komparasi 3 Indikator Utama */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 text-xs font-mono">
                {KEK_PROFIL_DATA.map((k) => (
                  <div key={k.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/90 space-y-1">
                    <span className="font-sans font-bold text-slate-900 block truncate">{k.shortName}</span>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-sans">Nilai Komitmen:</span>
                      <strong className="text-emerald-700">Rp {(k.nilaiInvestasiKomitmen / 1e12).toFixed(2)} T</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-sans">Luas Area:</span>
                      <strong className="text-sky-700">{k.luasArea.toFixed(2)} Ha</strong>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px] text-slate-600 pt-1 border-t border-slate-200">
                      <span className="font-sans text-[10px]">Densitas:</span>
                      <span className="font-bold text-slate-900">Rp {(k.nilaiInvestasiKomitmen / k.luasArea / 1e9).toFixed(1)} M/Ha</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {KEK_PROFIL_DATA.map((item, idx) => {
                const isSelected =
                  selectedKek === item.kawasan ||
                  selectedKek === item.shortName ||
                  (selectedKek.includes('Pariwisata') && item.kawasan.includes('Pariwisata'));
                const investPct = (item.nilaiInvestasiKomitmen / totalKomitmenInvestasi) * 100;
                const barWidth = (item.nilaiInvestasiKomitmen / maxInvestasi) * 100;

                return (
                  <div
                    key={item.id}
                    onClick={() =>
                      onSelectKek(
                        item.shortName === 'KEK Pariwisata & Kesehatan'
                          ? 'KEK Pariwisata dan Kesehatan Internasional Batam'
                          : item.shortName
                      )
                    }
                    className={`rounded-xl border p-4 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden bg-white shadow-2xs hover:shadow-md ${
                      isSelected
                        ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Top Accent Strip */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5"
                      style={{ backgroundColor: item.themeColor }}
                    />

                    <div className="space-y-3">
                      {/* Kawasan Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            KEK #{idx + 1}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-sm mt-1 leading-snug">
                            {item.kawasan}
                          </h4>
                        </div>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                            Aktif
                          </span>
                        )}
                      </div>

                      {/* LOKASI (Prominently Highlighted as requested) */}
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/90 flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Lokasi Kawasan
                          </span>
                          <span className="text-xs font-semibold text-slate-800 leading-snug block">
                            {item.lokasi}
                          </span>
                        </div>
                      </div>

                      {/* NILAI INVESTASI KOMITMEN (Prominently Highlighted as requested) */}
                      <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 flex items-start gap-2">
                        <Coins className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                            Nilai Investasi Komitmen
                          </span>
                          <span className="text-base font-black font-mono text-emerald-950 block leading-tight">
                            {formatRupiahTriliun(item.nilaiInvestasiKomitmen)}
                          </span>
                          <span className="text-[10.5px] text-emerald-700 font-medium">
                            Porsi: <strong>{investPct.toFixed(1)}%</strong> dari total KEK
                          </span>
                        </div>
                      </div>

                      {/* Comparison Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span>Skala Investasi</span>
                          <span className="font-mono font-bold">{investPct.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: item.themeColor,
                            }}
                          />
                        </div>
                      </div>

                      {/* Additional Profil Metrics: Luas & Naker */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 font-medium block">Luas Area:</span>
                          <span className="font-bold text-slate-800 font-mono">
                            {item.luasArea.toFixed(2)} Ha
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-medium block">Target Naker:</span>
                          <span className="font-bold text-slate-800 font-mono">
                            {item.targetPenyerapanTenagaKerja.toLocaleString('id-ID')} Org
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.statusOperasional}
                      </span>
                      <span className="text-blue-600 font-semibold text-[10.5px]">
                        {isSelected ? '✓ Terpilih' : 'Filter KEK →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SHEET 2: KARTU PROFIL EKSEKUTIF LENGKAP */}
      {activeSheet === 'kartu_profil' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {KEK_PROFIL_DATA.map((item, idx) => {
            const isSelected =
              selectedKek === item.kawasan ||
              selectedKek === item.shortName ||
              (selectedKek.includes('Pariwisata') && item.kawasan.includes('Pariwisata'));

            return (
              <div
                key={item.id}
                onClick={() =>
                  onSelectKek(
                    item.shortName === 'KEK Pariwisata & Kesehatan'
                      ? 'KEK Pariwisata dan Kesehatan Internasional Batam'
                      : item.shortName
                  )
                }
                className={`rounded-xl border p-4.5 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group bg-white shadow-2xs hover:shadow-md ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-400/40'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: item.themeColor }}
                />

                <div className="space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        KEK #{idx + 1}
                      </span>
                      <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.statusOperasional}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                      {item.kawasan}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      BUPP: <strong>{item.bupp}</strong>
                    </p>
                  </div>

                  {/* LOKASI */}
                  <div className="flex items-start gap-2 pt-2 border-t border-slate-100">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
                        Lokasi
                      </span>
                      <span className="text-xs text-slate-800 font-semibold leading-snug block">
                        {item.lokasi}
                      </span>
                    </div>
                  </div>

                  {/* NILAI INVESTASI KOMITMEN */}
                  <div className="flex items-start gap-2 pt-2 border-t border-slate-100">
                    <Coins className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
                        Nilai Investasi Komitmen
                      </span>
                      <span className="text-base font-black font-mono text-emerald-900 block">
                        {formatRupiahTriliun(item.nilaiInvestasiKomitmen)}
                      </span>
                    </div>
                  </div>

                  {/* LUAS & TARGET NAKER */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
                        Luas Area
                      </span>
                      <span className="text-sm font-black font-mono text-slate-900">
                        {item.luasArea.toFixed(2)} <span className="text-xs font-normal text-slate-500">Ha</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
                        Target Naker
                      </span>
                      <span className="text-sm font-black font-mono text-slate-900">
                        {item.targetPenyerapanTenagaKerja.toLocaleString('id-ID')}{' '}
                        <span className="text-xs font-normal text-slate-500">Org</span>
                      </span>
                    </div>
                  </div>

                  {/* KEGIATAN & DASAR HUKUM */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Kegiatan Utama:</span>
                      <p className="text-[11px] text-slate-700 leading-snug line-clamp-2">{item.kegiatan}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Dasar Hukum:</span>
                      <p className="text-[10.5px] text-slate-600 font-mono">{item.dasarHukum}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{isSelected ? '✓ Sedang Aktif' : 'Klik untuk filter'}</span>
                  <span style={{ color: item.themeColor }}>{item.shortName}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SHEET 3: MATRIKS TABEL PROFIL KEK 9 ATRIBUT RESMI */}
      {activeSheet === 'matriks_tabel' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <span className="text-slate-600 font-semibold">
              Menampilkan 9 atribut lengkap data profil resmi KEK BP Batam
            </span>
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded border border-slate-300 cursor-pointer shadow-2xs text-xs"
              title="Unduh Data Profil KEK (.CSV)"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#0F1E36] text-white text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3 w-10 text-center">No</th>
                  <th className="py-2.5 px-3">Kawasan</th>
                  <th className="py-2.5 px-3">Lokasi</th>
                  <th className="py-2.5 px-3">Nama Perusahaan (BUPP)</th>
                  <th className="py-2.5 px-3 text-right">Luas Area</th>
                  <th className="py-2.5 px-3 text-right">Nilai Investasi Komitmen</th>
                  <th className="py-2.5 px-3">Status Operasional</th>
                  <th className="py-2.5 px-3">Kegiatan</th>
                  <th className="py-2.5 px-3">Dasar Hukum</th>
                  <th className="py-2.5 px-3 text-right">Target Naker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-sans">
                {KEK_PROFIL_DATA.map((row, idx) => (
                  <tr
                    key={row.id}
                    onClick={() =>
                      onSelectKek(
                        row.shortName === 'KEK Pariwisata & Kesehatan'
                          ? 'KEK Pariwisata dan Kesehatan Internasional Batam'
                          : row.shortName
                      )
                    }
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {row.kawasan}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{row.lokasi}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap font-medium">
                      {row.bupp}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      {row.luasArea.toFixed(2)} Ha
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-800 whitespace-nowrap">
                      {formatRupiahTriliun(row.nilaiInvestasiKomitmen)}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-semibold text-[10.5px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {row.statusOperasional}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate" title={row.kegiatan}>
                      {row.kegiatan}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono text-[10.5px] whitespace-nowrap">
                      {row.dasarHukum}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800 whitespace-nowrap">
                      {row.targetPenyerapanTenagaKerja.toLocaleString('id-ID')} Org
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
