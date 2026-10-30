import React, { useState } from 'react';
import {
  FileCode2,
  Database,
  Calculator,
  Layers,
  BookOpen,
  CheckCircle2,
  Table,
  Tag,
  Search,
  ExternalLink,
} from 'lucide-react';

interface DatasetItem {
  no: number;
  namaData: string;
  jenisData: string;
  periodeData: string;
  sifatData: string;
  atributData: string[];
  keterangan: string;
}

const KEK_DATASETS_12: DatasetItem[] = [
  {
    no: 1,
    namaData: 'NILAI REALISASI INVESTASI KAWASAN EKONOMI KHUSUS (KEK) DI KAWASAN PERDAGANGAN DAN PELABUHAN BEBAS BATAM (KPBPBB)',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTRIWULAN',
    sifatData: 'TERBUKA',
    atributData: ['TAHUN', 'TRIWULAN', 'NAMA KAWASAN EKONOMI KHUSUS', 'JENIS INVESTASI (PMA/PMDN)', 'TARGET INVESTASI', 'REALISASI INVESTASI'],
    keterangan: 'Memuat data target dan realisasi investasi per triwulan untuk PMA dan PMDN di 3 KEK (Nongsa, Batam Teknik, Pariwisata & Kesehatan).',
  },
  {
    no: 2,
    namaData: 'PROFIL KAWASAN EKONOMI KHUSUS (KEK)',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERBUKA',
    atributData: ['KAWASAN', 'LOKASI', 'NAMA PERUSAHAAN', 'LUAS AREA', 'STATUS OPERASIONAL', 'KEGIATAN', 'NILAI INVESTASI KOMITMEN', 'DASAR HUKUM', 'TARGET PENYERAPAN TENAGA KERJA'],
    keterangan: 'Data profil legalitas, batas delineasi wilayah, luas area (Ha), pengusul/BUPP, komitmen investasi dan target naker.',
  },
  {
    no: 3,
    namaData: 'DAFTAR PERIZINAN BERUSAHA ADMINISTRATOR KAWASAN EKONOMI KHUSUS (KEK)',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA PERIZINAN BERUSAHA', 'TANGGAL PERIZINAN BERUSAHA'],
    keterangan: 'Daftar perizinan berusaha OSS dan UMKU yang diterbitkan Administrator KEK BP Batam untuk pelaku usaha di kawasan.',
  },
  {
    no: 4,
    namaData: 'DAFTAR NON PERIZINAN ADMINISTRATOR KAWASAN EKONOMI KHUSUS (KEK)',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA NON PERIZINAN', 'TANGGAL', 'KETERANGAN'],
    keterangan: 'Layanan rekomendasi insentif fiskal, Tax Holiday, masterlist kepabeanan, dan fasilitas non-perizinan lainnya.',
  },
  {
    no: 5,
    namaData: 'DAFTAR PERENCANAAN/PENGUSULAN KAWASAN EKONOMI KHUSUS (KEK)',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERTUTUP',
    atributData: ['NAMA KEK', 'LOKASI', 'LUAS', 'KEGIATAN', 'PENGUSUL'],
    keterangan: 'Dokumen usulan kawasan baru atau perluasan batas delineasi KEK ke Dewan Nasional KEK.',
  },
  {
    no: 6,
    namaData: 'PETA KAWASAN EKONOMI KHUSUS (KEK)',
    jenisData: 'DATA SPASIAL',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERBUKA',
    atributData: ['SHAPE_Leng', 'SHAPE_Area', 'SRS_ID', 'OBJECTID', 'NAMOBJ', 'NOMOR_PL', 'TANGGAL_PL', 'PEMILIK', 'LUAS_PENGU', 'DSRHKMKEK', 'LUASKEK', 'PENGUSULKE', 'BUPP'],
    keterangan: 'Data spasial poligon batas wilayah, sertifikat hak pengelolaan, dan penetapan lokasi (PL) KEK di Batam.',
  },
  {
    no: 7,
    namaData: 'DAFTAR PERIZINAN LAINNYA ADMINISTRATOR KAWASAN EKONOMI KHUSUS',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERTUTUP',
    atributData: ['NAMAPERIZINAN', 'TANGGALPERIZINAN'],
    keterangan: 'Izin operasional khusus, izin pemasukan bahan berbahaya B3, dispensasi jam kerja lemur, dan izin genset.',
  },
  {
    no: 8,
    namaData: 'DAFTAR KEGIATAN MONITORING DAN EVALUASI KAWASAN EKONOMI KHUSUS',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERTUTUP',
    atributData: ['PERIODEMONITORING', 'NAMAKEK'],
    keterangan: 'Jadwal dan risalah monitoring pelaksanaan komitmen investasi dan pembangunan infrastruktur KEK.',
  },
  {
    no: 9,
    namaData: 'PERBANDINGAN DAYA SAING PENGEMBANGAN KAWASAN PERDAGANGAN BEBAS DAN PELABUHAN BEBAS DAN KAWASAN EKONOMI KHUSUS (KEK)',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PERTAHUN',
    sifatData: 'TERBUKA',
    atributData: ['TAHUN REKAP', 'KATEGORI', 'URAIAN', 'WILAYAH', 'NILAI DAN KETERANGAN'],
    keterangan: 'Matriks benchmark daya saing tarif, insentif fiskal, dan kemudahan berusaha FTZ vs KEK vs Regional ASEAN.',
  },
  {
    no: 10,
    namaData: 'LAPORAN KEBIJAKAN/PROSEDUR (SOP) PENYUSUNAN RENCANA STRATEGIS BISNIS',
    jenisData: 'DATA STATISTIK',
    periodeData: 'JIKA UPDATE',
    sifatData: 'TERBUKA',
    atributData: ['PERATURAN'],
    keterangan: 'Standar operasional prosedur penyusunan Renstra dan arah pengembangan bisnis KEK.',
  },
  {
    no: 11,
    namaData: 'LAPORAN RENCANA STRATEGIS BISNIS PERIODE 5 TAHUN DAN RENCANA BISNIS',
    jenisData: 'DATA STATISTIK',
    periodeData: 'PER 5 TAHUN',
    sifatData: 'TERBUKA',
    atributData: ['LAPORAN'],
    keterangan: 'Dokumen perencanaan jangka menengah pengembangan ekosistem industri digital, aviasi, dan pariwisata KEK.',
  },
  {
    no: 12,
    namaData: 'LAPORAN KAJIAN PENGEMBANGAN, KERJA SAMA DI KAWASAN KPBPBB DAN KEK',
    jenisData: 'DOKUMEN DIGITAL',
    periodeData: 'PERTAHUN',
    sifatData: 'TERTUTUP',
    atributData: ['LAPORAN KAJIAN'],
    keterangan: 'Formula Perkin: Capaian = (Jumlah Analisis yang Ditindaklanjuti / Jumlah Dokumen Analisis) x 100%. Memuat kajian strategis kerja sama dan daya saing.',
  },
];

export const KekKamusRumusView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'formulas' | 'catalog'>('formulas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCatalog = KEK_DATASETS_12.filter((item) => {
    return (
      item.namaData.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.atributData.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden font-sans">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Kamus Rumus &amp; Katalog 12 Dataset Satu Data KEK BP Batam
            </h2>
            <p className="text-xs text-slate-500">
              Referensi Dokumen Atribut Daftar Data Satu Data BP Batam (Halaman 9 - 11) &amp; Perjanjian Kinerja (Perkin)
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-200/80 p-1 rounded-lg flex items-center text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'formulas'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Kamus Rumus &amp; Calculated Fields</span>
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Katalog 12 Dataset Satu Data</span>
          </button>
        </div>
      </div>

      {activeTab === 'formulas' ? (
        /* SECTION 1: KAMUS RUMUS TABLEAU & PERKIN */
        <div className="p-5 space-y-6">
          {/* Formula 1: Realisasi Investasi */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                  KPI #1 • DATASET 1
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  Persentase Capaian Realisasi Investasi KEK (%)
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Target Terlampaui (&gt;100%)
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Menghitung efektivitas penyerapan modal investasi (PMA dan PMDN) terhadap target tahunan yang ditetapkan dalam Perjanjian Kinerja (Perkin) Direktorat Perencanaan dan Pengembangan Investasi.
            </p>

            <div className="p-3 bg-slate-900 text-emerald-300 font-mono text-xs rounded-lg overflow-x-auto shadow-inner">
              <code>
                % Capaian Investasi = (SUM([Realisasi Investasi]) / SUM([Target Investasi])) * 100%
              </code>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-emerald-100">
                <span className="text-slate-500 block text-[11px]">Total Realisasi 2025:</span>
                <span className="font-bold text-slate-900 font-mono text-sm">Rp 9.091.449.868.293</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-emerald-100">
                <span className="text-slate-500 block text-[11px]">Total Target 2025:</span>
                <span className="font-bold text-slate-900 font-mono text-sm">Rp 4.352.000.000.000</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-emerald-100">
                <span className="text-slate-500 block text-[11px]">Hasil Kalkulasi:</span>
                <span className="font-bold text-emerald-700 font-mono text-sm">208,9% Capaian</span>
              </div>
            </div>
          </div>

          {/* Formula 2: Kajian Perkin */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-sm bg-rose-100 text-rose-800 text-[10px] font-bold font-mono">
                  KPI #5 • DATASET 12
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  % Kajian Pengembangan, Kerjasama, Daya Saing &amp; KEK Berkelanjutan (Perkin)
                </h3>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                Target Perkin (≥90%)
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Formula resmi Perkin Direktorat Perencanaan dan Pengembangan Investasi untuk mengukur persentase rekomendasi kebijakan dan telaahan analisis strategis yang diimplementasikan/ditindaklanjuti.
            </p>

            <div className="p-3 bg-slate-900 text-rose-300 font-mono text-xs rounded-lg overflow-x-auto shadow-inner">
              <code>
                Capaian (%) = (COUNT([Jumlah Analisis Ditindaklanjuti]) / COUNT([Jumlah Dokumen Analisis])) * 100%
              </code>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-rose-100">
                <span className="text-slate-500 block text-[11px]">Dokumen Analisis Terbit:</span>
                <span className="font-bold text-slate-900 font-mono text-sm">12 Dokumen</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-rose-100">
                <span className="text-slate-500 block text-[11px]">Telah Ditindaklanjuti:</span>
                <span className="font-bold text-slate-900 font-mono text-sm">11 Dokumen</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-rose-100">
                <span className="text-slate-500 block text-[11px]">Capaian Perkin:</span>
                <span className="font-bold text-rose-700 font-mono text-sm">91,7% Capaian</span>
              </div>
            </div>
          </div>

          {/* Formula 3: Sheet Swap Dimension Parameter */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-sm bg-blue-100 text-blue-800 text-[10px] font-bold font-mono">
                  TABLEAU PARAMETER • SHEET SWAP
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  Logika Calculated Field Sheet Swap Perizinan
                </h3>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                Interactive Parameter
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Parameter string dinamis pada Tableau Desktop untuk mengganti worksheet secara dinamis antara Perizinan Berusaha (Dataset 3), Non-Perizinan (Dataset 4), dan Perizinan Lainnya (Dataset 7).
            </p>

            <div className="p-3 bg-slate-900 text-sky-300 font-mono text-xs rounded-lg overflow-x-auto shadow-inner space-y-1">
              <div className="text-slate-400">// Calculated Field: [p_Sheet_Filter_Perizinan]</div>
              <code>
                CASE [p_Selected_Sheet]<br />
                &nbsp;&nbsp;WHEN 'Perizinan Berusaha' THEN [Dataset_ID] = 'DS_03'<br />
                &nbsp;&nbsp;WHEN 'Non Perizinan' THEN [Dataset_ID] = 'DS_04'<br />
                &nbsp;&nbsp;WHEN 'Perizinan Lainnya' THEN [Dataset_ID] = 'DS_07'<br />
                END
              </code>
            </div>
          </div>
        </div>
      ) : (
        /* SECTION 2: 12 DATASET SATU DATA */
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari atribut, nama dataset, atau periode data..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 font-sans"
              />
            </div>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              Total {filteredCatalog.length} dari 12 Dataset
            </span>
          </div>

          <div className="space-y-3">
            {filteredCatalog.map((item) => (
              <div
                key={item.no}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                      {item.no}
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {item.namaData}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 text-[10.5px]">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {item.jenisData}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {item.periodeData}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold font-mono ${
                        item.sifatData === 'TERBUKA'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.sifatData}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600">{item.keterangan}</p>

                {/* Atribut Data Chips */}
                <div>
                  <span className="text-[10.5px] font-semibold text-slate-400 block mb-1">
                    Atribut Data Satu Data BP Batam:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.atributData.map((attr, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10.5px] font-mono border border-slate-200"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
