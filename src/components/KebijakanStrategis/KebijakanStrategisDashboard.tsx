import React, { useState } from 'react';
import {
  Calendar,
  Download,
  FileCode2,
} from 'lucide-react';
import { PERKIN_METADATA, IKP_METRICS_LIST } from './kebijakanStrategisData';
import { KebijakanStrategisKpiRow } from './KebijakanStrategisKpiRow';
import { KebijakanStrategisVisualCharts } from './KebijakanStrategisVisualCharts';
import { KebijakanStrategisDeepDiveCenter } from './KebijakanStrategisDeepDiveCenter';
import { KebijakanStrategisFormulaModal } from './KebijakanStrategisFormulaModal';
import { KebijakanStrategisNarasiAi } from './KebijakanStrategisNarasiAi';

interface KebijakanStrategisDashboardProps {
  activeSheet?: string;
  activeSubTab?: string;
  onSelectSheet?: (sheet: string) => void;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onNavigateToFullDashboard?: (unitId: string) => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const KebijakanStrategisDashboard: React.FC<KebijakanStrategisDashboardProps> = ({
  onOpenFormulaModal,
  onOpenExportModal,
  onNavigateToFullDashboard: _onNavigateToFullDashboard,
  onSwitchUnit: _onSwitchUnit,
}) => {
  // Filter State - Persis Model Filter Dashboard Dep A1 & Kepala BP Batam
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedUnit, setSelectedUnit] = useState<string>('pusat-perencanaan-program');

  // Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [modalKpiId, setModalKpiId] = useState<string | null>('ikp-1-perencanaan');

  const handleOpenFormula = (kpiId: string) => {
    if (onOpenFormulaModal) {
      onOpenFormulaModal(kpiId);
    } else {
      setModalKpiId(kpiId);
      setIsFormulaModalOpen(true);
    }
  };

  const handleSelectUnit = (unitId: string) => {
    setSelectedUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('a2-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleExportConsolidatedCsv = () => {
    const headers = ['Kategori', 'Indikator / Program', 'Target / Pagu', 'Realisasi Aktual', 'Capaian (%)', 'Status'];
    const rows: (string | number)[][] = [];

    // Add 4 IKP rows
    IKP_METRICS_LIST.forEach((ikp) => {
      rows.push([
        'IKP Utama DEP-A2',
        `"${ikp.title}"`,
        `"${ikp.target}"`,
        `"${ikp.realisasi}"`,
        ikp.capaianPersen.toFixed(1),
        `"${ikp.predikat}"`,
      ]);
    });

    // Add Operational KPIs
    rows.push(
      ['Monitoring Operasional', '"Keselarasan Renstra thd Prioritas Nasional"', '95,0%', '98,2%', '103.4', 'Optimal'],
      ['Monitoring Operasional', '"Target Rincian Output (RO) Renstra"', '29 RO', '28 RO', '96.5', 'On Track'],
      ['Monitoring Operasional', '"Sinkronisasi Regulasi K/L & PP 41/2021"', '100% Selaras', '42 Perka Diselaraskan', '100.0', 'Tuntas'],
      ['Monitoring Operasional', '"Uji Kewajaran 7 Level Tarif Layanan"', '85,0%', '89,2%', '104.9', 'Valid'],
      ['Monitoring Operasional', '"Penerapan TTE Tersertifikasi BSrE"', '40 Aplikasi', '48 Aplikasi', '120.0', 'Optimal'],
      ['Monitoring Operasional', '"Kecepatan Penerbitan Izin Berusaha (EODB)"', '5 Hari Kerja', '2,1 Hari Kerja', '158.0', 'Sangat Cepat']
    );

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Konsolidasi_Perkin_DEP_A2_${selectedYear}_${new Date().toISOString().split('T')[0]}.csv`
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
      {/* 1. FILTER BAR RINGKAS (PERSIS MODEL FILTER DASHBOARD DEP-A1)         */}
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
                aria-label="Filter Tahun Anggaran DEP-A2"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-[#0A2540] rounded-lg px-3 py-1 text-xs outline-none cursor-pointer pr-8 transition-colors focus:border-[#0A2540]"
              >
                <option value="2026">Tahun Anggaran 2026 (Berjalan)</option>
                <option value="2025">Tahun Anggaran 2025</option>
                <option value="2024">Tahun Anggaran 2024</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-600 italic hidden sm:inline">
              Menampilkan data penetapan Perkin Deputi A2 &amp; capaian multi-indikator
            </span>
          </div>

          {/* Right Side: Manual 4 IKP & Ekspor Data */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenFormula('ikp-1-perencanaan')}
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
      {/* 2. BARIS KPI: 4 IKP UTAMA + 8 KPI OPERASIONAL ULTRA-SLIM              */}
      {/* ==================================================================== */}
      <KebijakanStrategisKpiRow
        onOpenFormulaModal={handleOpenFormula}
        onSelectUnit={handleSelectUnit}
      />

      {/* ==================================================================== */}
      {/* 3. CAPAIAN EVALUASI 4 IKP (RADAR + TAB GRAFIK PERSIS DEP-A1)         */}
      {/* ==================================================================== */}
      <div id="a2-visual-charts-section">
        <KebijakanStrategisVisualCharts
          onOpenFormulaModal={handleOpenFormula}
        />
      </div>

      {/* ==================================================================== */}
      {/* 4. UNIT DEEP-DIVE CENTER: 1 TAMPILAN BANYAK VISUALISASI PER UNIT     */}
      {/* ==================================================================== */}
      <div id="a2-deep-dive-section" className="scroll-mt-6">
        <KebijakanStrategisDeepDiveCenter
          selectedUnitId={selectedUnit}
          onSelectUnit={handleSelectUnit}
          onOpenFormulaModal={handleOpenFormula}
        />
      </div>

      {/* ==================================================================== */}
      {/* 5. NARASI AI STRATEGIS (PERSIS MODEL DI DASHBOARD DEP-A1)             */}
      {/* ==================================================================== */}
      <section className="pt-0.5">
        <KebijakanStrategisNarasiAi />
      </section>

      {/* ==================================================================== */}
      {/* 6. FORMULA & REGULATORY EXPLANATION MODAL                             */}
      {/* ==================================================================== */}
      <KebijakanStrategisFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        kpiId={modalKpiId}
      />
    </div>
  );
};
