import React, { useState } from 'react';
import {
  FolderKanban,
  Search,
  FileSpreadsheet,
  Layers,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { PTSP_CATALOG_17_ITEMS, PtspCatalogItem } from '../../data/ptspData';

export const PtspCatalogSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('ALL');
  const [expandedItemId, setExpandedItemId] = useState<number | null>(10); // Default open item #10 (IKM)

  const filteredItems = PTSP_CATALOG_17_ITEMS.filter((item) => {
    if (selectedKategori !== 'ALL' && item.jenisData !== selectedKategori) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.namaData.toLowerCase().includes(q) ||
        item.jenisData.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q) ||
        item.atributData.some((attr) => attr.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div id="ptsp-catalog-section" className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                17 Item Data Resmi Sesuai PDF
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Katalog Arsitektur Metadata PTSP
              </span>
            </div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Katalog Lengkap 17 Dataset &amp; Atribut Perizinan Unit PTSP BP Batam
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Rujukan standar kamus data, tipe atribut, primary key, sistem sumber (OSS, IBIS, SP4N, Simpel), dan frekuensi pembaharuan.
            </p>
          </div>

          {/* Search & Kategori */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dataset atau atribut..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 w-44 sm:w-56"
              />
            </div>

            <select
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">Semua Tipe Data (17 Item)</option>
              <option value="DATA STATISTIK">DATA STATISTIK</option>
              <option value="DATA SPASIAL">DATA SPASIAL</option>
            </select>
          </div>
        </div>

        {/* List of 17 Catalog Items */}
        <div className="divide-y divide-slate-200 mt-2">
          {filteredItems.map((item) => {
            const isExpanded = expandedItemId === item.no;

            return (
              <div key={item.no} className="py-3 transition-colors">
                <div
                  onClick={() => setExpandedItemId(isExpanded ? null : item.no)}
                  className="flex items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 p-2 rounded-lg -mx-2"
                >
                  <div className="flex items-start sm:items-center gap-2.5">
                    <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-slate-900 text-white shrink-0">
                      #{item.no}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 hover:text-sky-700 transition-colors">
                          {item.namaData}
                        </span>
                        {item.no === 10 && (
                          <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            • Dataset Utama (IKM Permenpan RB)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                        <span>Periode: <strong className="text-slate-700">{item.periodeData}</strong></span>
                        <span>•</span>
                        <span>Sifat: <strong className="text-slate-700">{item.sifatData}</strong></span>
                        <span>•</span>
                        <span className="text-sky-700 font-semibold">{item.atributData.length} Atribut Kolom</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {item.jenisData}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Details: Attributes Badges & Primary Key */}
                {isExpanded && (
                  <div className="mt-2.5 ml-2 sm:ml-9 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                    <p className="text-slate-600 text-xs leading-relaxed italic">
                      {item.deskripsi}
                    </p>

                    <div>
                      <div className="font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-sky-600" />
                        <span>Daftar Atribut Data ({item.atributData.length} Kolom):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.atributData.map((attr, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono text-[10.5px]"
                          >
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Unit Pengampu: Direktorat Pelayanan Terpadu Satu Pintu (PTSP)</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Kamus Data Terstandarisasi</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
