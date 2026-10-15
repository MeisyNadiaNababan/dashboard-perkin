import React, { useState } from 'react';
import {
  Calendar,
  Download,
  FileCode2,
} from 'lucide-react';
import { PERKIN_A4_KPIS } from './investasiPengusahaanData';
import { InvestasiPengusahaanKpiRow } from './InvestasiPengusahaanKpiRow';
import { InvestasiPengusahaanVisualCharts } from './InvestasiPengusahaanVisualCharts';
import { InvestasiPengusahaanDeepDiveCenter } from './InvestasiPengusahaanDeepDiveCenter';
import { InvestasiPengusahaanFormulaModal } from './InvestasiPengusahaanFormulaModal';
import { InvestasiPengusahaanNarasiAi } from './InvestasiPengusahaanNarasiAi';

interface InvestasiPengusahaanDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const InvestasiPengusahaanDashboard: React.FC<
  InvestasiPengusahaanDashboardProps
> = ({ onOpenFormulaModal, onOpenExportModal, onSwitchUnit }) => {
  // Filter State - Persis Model Filter Dashboard DEP-A3 & DEP-A2
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('dit-investasi');

  // Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [modalKpiId, setModalKpiId] = useState<string | null>('ikp-1-investasi-kpbpb');

  const handleOpenFormula = (kpiId: string) => {
    if (onOpenFormulaModal) {
      onOpenFormulaModal(kpiId);
    } else {
      setModalKpiId(kpiId);
      setIsFormulaModalOpen(true);
    }
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('investasi-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleExportConsolidatedCsv = () => {
    const headers = ['Kategori', 'Indikator / Program', 'Target / Pagu', 'Realisasi Aktual', 'Capaian (%)', 'Status'];
    const rows: (string | number)[][] = [];

    // Add 4 IKP rows
    PERKIN_A4_KPIS.forEach((ikp) => {
      rows.push([
        'IKP Utama DEP-A4',
        `"${ikp.name}"`,
        `"${ikp.targetDisplay} ${ikp.satuan}"`,
        `"${ikp.realisasiDisplay} ${ikp.satuan}"`,
        ikp.capaianPersen.toFixed(1),
        ikp.capaianPersen >= 100 ? 'Melampaui' : 'Tercapai',
      ]);
    });

    // Add Operational KPIs based on Satu Data BP Batam
    rows.push(
      ['Monitoring Operasional', '"Porsi Realisasi Investasi PMA"', '70,0%', '74,7%', '106.7', 'Rp 47,70 T Masuk'],
      ['Monitoring Operasional', '"Kepatuhan Laporan LKPM Investor"', '90,0%', '96,4%', '107.1', '1.248 Badan Usaha'],
      ['Monitoring Operasional', '"SLA Kecepatan Layanan Administrator KEK"', '3,0 Hari', '2,1 Hari', '142.9', '342 Izin Terbit'],
      ['Monitoring Operasional', '"Kepatuhan PKS Kerja Sama Badan Usaha"', '90,0%', '95,5%', '106.1', '105 Rekomendasi Tuntas'],
      ['Monitoring Operasional', '"Realisasi Investasi Komitmen KEK"', 'Rp 14,0 T', 'Rp 14,80 T', '105.7', '3 KEK Beroperasi'],
      ['Monitoring Operasional', '"Penyerapan Tenaga Kerja 3 KEK"', '12.000 Orang', '11.450 Orang', '95.4', 'Optimalisasi Skill'],
      ['Monitoring Operasional', '"Trafik Portal Invest In Batam"', '100.000 Hits', '142.350 Hits', '142.4', '476 Tiket Konsultasi']
    );

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Konsolidasi_Perkin_DEP_A4_${selectedYear}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="space-y-3.5 font-sans text-slate-800 pb-12 max-w-[1880px] mx-auto origin-top"
      style={{ zoom: '80%' }}
    >
      {/* ==================================================================== */}
      {/* 1. FILTER BAR RINGKAS (PERSIS MODEL FILTER DASHBOARD DEP-A3)         */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs px-3.5 py-2 transition-all">
        <div className="flex items-center justify-between gap-3">
          {/* Left Side: Filter Tahun */}
          <div className="flex items-center gap-2.5 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A2540] text-amber-300 font-bold shrink-0 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span className="tracking-wide">FILTER TAHUN:</span>
            </div>

            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Filter Tahun Anggaran DEP-A4"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-[#0A2540] rounded-lg px-3 py-1 text-xs outline-none cursor-pointer pr-8 transition-colors focus:border-[#0A2540]"
              >
                <option value="2026">Tahun Anggaran 2026 (Berjalan)</option>
                <option value="2025">Tahun Anggaran 2025</option>
                <option value="2024">Tahun Anggaran 2024</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-600 italic hidden sm:inline">
              Menampilkan data penetapan Perkin Deputi A4 &amp; capaian multi-indikator
            </span>
          </div>

          {/* Right Side: Manual 4 IKP & Ekspor Data */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenFormula('ikp-1-investasi-kpbpb')}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              title="Buka Dokumen Manual 4 IKP"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Manual 4 IKP</span>
            </button>

            <button
              onClick={onOpenExportModal || handleExportConsolidatedCsv}
              className="px-3 py-1.5 rounded-lg bg-[#0A2540] text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Ekspor Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. BARIS KPI: 4 IKP UTAMA + 4 KPI OPERASIONAL ULTRA-SLIM              */}
      {/* ==================================================================== */}
      <InvestasiPengusahaanKpiRow
        onOpenFormulaModal={handleOpenFormula}
        onSelectUnit={handleSelectDeepDive}
      />

      {/* ==================================================================== */}
      {/* 3. CAPAIAN EVALUASI 4 IKP (RADAR + TAB GRAFIK PERSIS DEP-A3)         */}
      {/* ==================================================================== */}
      <div id="a4-visual-charts-section">
        <InvestasiPengusahaanVisualCharts
          onOpenFormulaModal={handleOpenFormula}
          onNavigateToUnit={handleSelectDeepDive}
        />
      </div>

      {/* ==================================================================== */}
      {/* 4. UNIT DEEP-DIVE CENTER: INVESTASI, KEK & PENGUSAHAAN               */}
      {/* Tampilan Visual Terintegrasi Sesuai Data Setiap Satker di Satu Data   */}
      {/* ==================================================================== */}
      <div id="investasi-deep-dive-section">
        <InvestasiPengusahaanDeepDiveCenter
          selectedUnitId={selectedDeepDiveUnit}
          onSelectUnit={setSelectedDeepDiveUnit}
          onOpenFormulaModal={handleOpenFormula}
          onNavigateToFullDashboard={onSwitchUnit}
        />
      </div>

      {/* ==================================================================== */}
      {/* 5. NARASI AI STRATEGIS (NAVY DARK MODE EKSEKUTIF PERSIS DEP-A3/A2)    */}
      {/* ==================================================================== */}
      <InvestasiPengusahaanNarasiAi />

      {/* ==================================================================== */}
      {/* 6. FORMULA & DEFINISI MODAL                                          */}
      {/* ==================================================================== */}
      <InvestasiPengusahaanFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        selectedKpiId={modalKpiId}
      />
    </div>
  );
};
