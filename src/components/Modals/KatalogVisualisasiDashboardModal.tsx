import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Layers,
  MapPin,
  TrendingUp,
  SlidersHorizontal,
  Copy,
  Check,
  Building2,
  HardHat,
  Sparkles,
  Info,
  ChevronRight,
  Database,
  Compass,
} from 'lucide-react';
import { DASHBOARD_VISUAL_CATALOG, VisualInfoItem } from '../../data/dashboardVisualCatalog';

interface KatalogVisualisasiDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUnitId?: string;
  initialFilterUnit?: string;
}

export const KatalogVisualisasiDashboardModal: React.FC<KatalogVisualisasiDashboardModalProps> = ({
  isOpen,
  onClose,
  defaultUnitId,
  initialFilterUnit,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>(initialFilterUnit || defaultUnitId || 'ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'katalog' | 'rekap_tipe' | 'panduan_tableau'>('katalog');

  // List unique unit names
  const unitsList = useMemo(() => {
    const map = new Map<string, string>();
    DASHBOARD_VISUAL_CATALOG.forEach((item) => {
      map.set(item.unitId, item.unitName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  // List unique visual categories
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    DASHBOARD_VISUAL_CATALOG.forEach((item) => set.add(item.kategoriVisual));
    return Array.from(set);
  }, []);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return DASHBOARD_VISUAL_CATALOG.filter((item) => {
      const matchUnit = selectedUnit === 'ALL' || item.unitId === selectedUnit;
      const matchCategory = selectedCategory === 'ALL' || item.kategoriVisual === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        q === '' ||
        item.informasiName.toLowerCase().includes(q) ||
        item.namaVisualisasi.toLowerCase().includes(q) ||
        item.sectionTitle.toLowerCase().includes(q) ||
        item.unitName.toLowerCase().includes(q) ||
        item.datasetOrigin.toLowerCase().includes(q);

      return matchUnit && matchCategory && matchSearch;
    });
  }, [selectedUnit, selectedCategory, searchQuery]);

  // Statistics per Category
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    DASHBOARD_VISUAL_CATALOG.forEach((item) => {
      counts[item.kategoriVisual] = (counts[item.kategoriVisual] || 0) + 1;
    });
    return counts;
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto animate-fadeIn font-sans">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800">
        {/* ========================================================================= */}
        {/* 1. MODAL HEADER */}
        {/* ========================================================================= */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-[#0F1E36] to-sky-950 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-sky-500/30 text-sky-200 border border-sky-400/30 font-mono">
                  STANDAR VISUALISASI BI &amp; TABLEAU
                </span>
                <span className="text-[10px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                  Seluruh Dashboard BP Batam
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight mt-0.5">
                Daftar Nama Visualisasi di Setiap Informasi Dashboard
              </h2>
              <p className="text-xs text-slate-300">
                Katalog resmi nama chart visual (Grafik Batang, Treemap, Donut, Kurva S, dll.) untuk setiap modul data.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. SUB-BAR: TABS & QUICK COUNTS */}
        {/* ========================================================================= */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('katalog')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'katalog'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Daftar Visualisasi ({filteredItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('rekap_tipe')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'rekap_tipe'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>Rangkuman Jenis Visual ({Object.keys(categoryStats).length} Jenis)</span>
            </button>
            <button
              onClick={() => setActiveTab('panduan_tableau')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'panduan_tableau'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Panduan Shelf &amp; Marks Tableau</span>
            </button>
          </div>

          <div className="text-slate-500 text-[11px] font-mono">
            Total {DASHBOARD_VISUAL_CATALOG.length} Informasi Terpetakan
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FILTER BAR */}
        {/* ========================================================================= */}
        {activeTab === 'katalog' && (
          <div className="px-5 py-3 bg-white border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2.5 shrink-0 text-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari informasi, jenis chart (mis: Grafik Batang, Treemap)..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Filter Unit Kerja */}
            <div>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 focus:outline-hidden focus:border-sky-500"
              >
                <option value="ALL">Semua Unit Kerja ({unitsList.length})</option>
                {unitsList.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Jenis Visual */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 focus:outline-hidden focus:border-sky-500"
              >
                <option value="ALL">Semua Jenis Visualisasi ({categoriesList.length})</option>
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat} ({categoryStats[cat] || 0})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. MODAL BODY (SCROLLABLE) */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {activeTab === 'katalog' && (
            <>
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                  <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="font-semibold text-sm">Tidak ditemukan visualisasi yang cocok dengan pencarian.</p>
                  <p className="text-xs text-slate-400 mt-1">Coba kata kunci lain atau reset filter Anda.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedUnit('ALL');
                      setSelectedCategory('ALL');
                    }}
                    className="mt-3 px-3 py-1 bg-sky-600 text-white rounded-md text-xs font-semibold"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  let badgeBg = 'bg-sky-50 text-sky-800 border-sky-200';
                  if (item.kategoriVisual === 'Treemap') {
                    badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                  } else if (item.kategoriVisual === 'Donut Chart') {
                    badgeBg = 'bg-indigo-50 text-indigo-800 border-indigo-200';
                  } else if (item.kategoriVisual === 'Line / Kurva S') {
                    badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
                  } else if (item.kategoriVisual === 'Bullet Graph / Progress Bar') {
                    badgeBg = 'bg-teal-50 text-teal-800 border-teal-200';
                  } else if (item.kategoriVisual === 'Kartu KPI (BANs)') {
                    badgeBg = 'bg-purple-50 text-purple-800 border-purple-200';
                  } else if (item.kategoriVisual === 'Peta Spasial') {
                    badgeBg = 'bg-rose-50 text-rose-800 border-rose-200';
                  } else if (item.kategoriVisual === 'Radar / Spider') {
                    badgeBg = 'bg-pink-50 text-pink-800 border-pink-200';
                  }

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-shadow space-y-2.5"
                    >
                      {/* Baris 1: Unit, Section & Nama Visualisasi */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {item.unitName}
                            </span>
                            <span className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 font-mono">
                              {item.datasetOrigin}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 leading-snug">
                            {item.sectionTitle}
                          </h3>
                        </div>

                        {/* NAMA VISUALISASI UTAMA (HIGH CONTRAST BADGE) */}
                        <div className="shrink-0 self-start sm:self-center">
                          <div className={`px-3 py-1.5 rounded-lg border font-bold text-xs flex items-center gap-1.5 ${badgeBg}`}>
                            <BarChart3 className="w-4 h-4 shrink-0" />
                            <span>{item.namaVisualisasi}</span>
                          </div>
                        </div>
                      </div>

                      {/* Baris 2: Deskripsi & Alasan Pemilihan Visualisasi */}
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                        <strong className="text-slate-800">Rasionalitas &amp; Penggunaan:</strong> {item.deskripsiPenggunaan}
                      </p>

                      {/* Baris 3: Tableau Implementation Blueprint (Rows, Columns, Marks) */}
                      <div className="p-2.5 bg-slate-900 text-slate-200 rounded-lg text-[11px] font-mono space-y-1">
                        <div className="flex items-center justify-between text-sky-400 font-bold text-[10px] pb-1 border-b border-slate-800">
                          <span>TABLEAU SHELF &amp; MARKS BLUEPRINT:</span>
                          <button
                            onClick={() =>
                              handleCopy(
                                item.id,
                                `Rows: ${item.tableauShelves.rows}\nColumns: ${item.tableauShelves.columns}\nMarks: ${item.tableauMarksType}\nColor: ${item.tableauShelves.color}`
                              )
                            }
                            className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            {copiedId === item.id ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Tersalin
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Copy className="w-3 h-3" /> Salin Rumus Shelf
                              </span>
                            )}
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-slate-300">
                          <div>
                            <span className="text-slate-400 font-sans font-semibold">Columns:</span>{' '}
                            <span className="text-amber-300">{item.tableauShelves.columns}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-sans font-semibold">Rows:</span>{' '}
                            <span className="text-amber-300">{item.tableauShelves.rows}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-sans font-semibold">Marks Type:</span>{' '}
                            <span className="text-emerald-300">{item.tableauMarksType}</span>
                          </div>
                        </div>
                        <div className="text-slate-400 text-[10.5px] pt-0.5">
                          <span className="font-sans font-semibold text-slate-400">Color Dimension:</span>{' '}
                          <span className="text-sky-300">{item.tableauShelves.color}</span>
                        </div>
                      </div>

                      {/* Baris 4: Contoh Insight Nyata */}
                      <div className="flex items-start gap-1.5 text-[11.5px] text-emerald-800 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                        <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-600 mt-0.5" />
                        <span>
                          <strong className="text-emerald-950">Insight yang Ditampilkan:</strong> {item.contohInsight}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {activeTab === 'rekap_tipe' && (
            <div className="space-y-4">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 text-xs text-sky-900">
                <h4 className="font-bold mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-sky-600" />
                  Mengapa Pemilihan Jenis Visualisasi Berbeda di Setiap Informasi?
                </h4>
                <p className="leading-relaxed">
                  Dalam visualisasi data berstandar Satu Data &amp; Tableau Best Practice, setiap jenis data memerlukan format visual yang berbeda:
                  <strong> Grafik Batang</strong> untuk perbandingan kategori diskrit, <strong>Treemap</strong> untuk komposisi proporsional anggaran besar, 
                  <strong> Donut Chart</strong> untuk rasio persentase keseluruhan, <strong>Bullet Graph</strong> untuk target vs realisasi, dan 
                  <strong> Kurva S</strong> untuk akumulasi proyek multi-periode.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(categoryStats).map(([catName, count]) => {
                  return (
                    <div
                      key={catName}
                      onClick={() => {
                        setSelectedCategory(catName);
                        setActiveTab('katalog');
                      }}
                      className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-800">{catName}</span>
                        <span className="text-xs font-mono font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                          {count} Modul
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Digunakan pada informasi seperti:{' '}
                        <strong className="text-slate-700">
                          {DASHBOARD_VISUAL_CATALOG.filter((i) => i.kategoriVisual === catName)
                            .slice(0, 2)
                            .map((i) => i.sectionTitle)
                            .join(', ')}
                        </strong>
                      </p>
                      <span className="text-[10.5px] text-sky-600 font-semibold mt-2 inline-flex items-center gap-1 hover:underline">
                        Lihat daftar informasi <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'panduan_tableau' && (
            <div className="space-y-3.5 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  Aturan Baku Penamaan Visualisasi Data di BP Batam
                </h4>
                <div className="space-y-2 text-slate-600 leading-relaxed">
                  <p>
                    <strong>1. Grafik Batang (Bar Chart):</strong> Dipakai pada informasi yang membandingkan besaran nilai antar kategori (misal: <em>Distribusi Infrastruktur Berdasarkan Jenis Pekerjaan</em>, <em>Realisasi PNBP per Satker</em>, atau <em>10 Kasus Penyakit Terbanyak</em>).
                  </p>
                  <p>
                    <strong>2. Treemap (Hierarchical Treemap):</strong> Dipakai saat ingin melihat komposisi anggaran atau alokasi ruang yang sangat luas (misal: <em>Portofolio Pagu Anggaran Rp 2,84 T</em>, <em>Luas Ruang Terbuka Hijau 34,2 Ha</em>, atau <em>Sebaran Lahan Cadangan SWP</em>).
                  </p>
                  <p>
                    <strong>3. Bullet Graph / Dual Progress Bar:</strong> Sangat wajib dipakai untuk laporan progres fisik vs target (misal: <em>Kemajuan Fisik Konstruksi Flyover Sei Ladi</em> atau <em>Serapan Kuota Konsumsi</em>).
                  </p>
                  <p>
                    <strong>4. Donut Chart:</strong> Digunakan untuk menampilkan pembagian status atau rasio total 100% dengan lubang tengah untuk KPI (misal: <em>Status Kemantapan Jalan Mantap 88,2%</em> atau <em>Rasio Litigasi vs Non-Litigasi</em>).
                  </p>
                  <p>
                    <strong>5. Kurva S (Dual-Axis Line &amp; Area):</strong> Khusus dipakai pada pemantauan mingguan proyek konstruksi teknik sipil untuk mendeteksi deviasi kritis.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 5. MODAL FOOTER */}
        {/* ========================================================================= */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500 text-[11.5px]">
            Dokumentasi selaras dengan <strong>Buku Satu Data BP Batam (Hal. 1 s/d 53)</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors cursor-pointer"
          >
            Tutup Katalog
          </button>
        </div>
      </div>
    </div>
  );
};
