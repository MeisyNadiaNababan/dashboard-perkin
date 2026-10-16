import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Download,
  FileCode2,
} from 'lucide-react';
import { PERKIN_A6_KPIS } from './pelayananUmumData';
import { PelayananUmumKpiRow } from './PelayananUmumKpiRow';
import { PelayananUmumVisualCharts } from './PelayananUmumVisualCharts';
import { UnitDeepDiveCenter } from './UnitDeepDiveCenter';
import { PelayananUmumFormulaModal } from './PelayananUmumFormulaModal';
import { PelayananUmumNarasiAi } from './PelayananUmumNarasiAi';

interface PelayananUmumDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId?: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const PelayananUmumDashboard: React.FC<PelayananUmumDashboardProps> = ({
  activeSubTab = 'ikhtisar',
  onOpenFormulaModal,
  onOpenExportModal,
  onSwitchUnit,
}) => {
  // Filter State - Persis Model Filter Dashboard DEP-A3
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('bu-rumah-sakit');

  // Formula Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [selectedKpiFormulaId, setSelectedKpiFormulaId] = useState<string>('ikp-1');

  const handleOpenFormula = (kpiId?: string) => {
    setSelectedKpiFormulaId(kpiId || 'ikp-1');
    setIsFormulaModalOpen(true);
    if (onOpenFormulaModal) {
      onOpenFormulaModal(kpiId);
    }
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('unit-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  useEffect(() => {
    if (activeSubTab === 'deep_dive') {
      const el = document.getElementById('unit-deep-dive-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (activeSubTab === 'kamus_rumus') {
      handleOpenFormula('ikp-1');
    }
  }, [activeSubTab]);

  const handleExportConsolidatedCsv = () => {
    const headers = ['Kategori', 'Indikator / Program', 'Target / Pagu', 'Realisasi Aktual', 'Capaian (%)', 'Status'];
    const rows: (string | number)[][] = [];

    // Add 3 IKP rows
    PERKIN_A6_KPIS.forEach((ikp) => {
      rows.push([
        'IKP Utama DEP-A6',
        `"${ikp.indikator}"`,
        `"${ikp.targetDisplay} ${ikp.satuan}"`,
        `"${ikp.realisasiDisplay} ${ikp.satuan}"`,
        ikp.persenCapaian.toFixed(1),
        ikp.persenCapaian >= 100 ? 'Melampaui' : 'Tercapai',
      ]);
    });

    // Add Total PNBP Konsolidasi
    rows.push([
      'Konsolidasi PNBP DEP-A6',
      '"Total PNBP 2 Badan Usaha (RSBP & SPAM)"',
      '"Rp 252,40 Miliar"',
      '"Rp 264,30 Miliar"',
      '104.7',
      'Surplus Rp 11,90 Miliar',
    ]);

    // Add Operational KPIs based on Satu Data BP Batam
    rows.push(
      ['Monitoring Operasional', '"Cost Recovery Ratio (CRR) BU"', '100,0%', '108,4%', '108.4', 'Kemandirian Finansial BLU'],
      ['Monitoring Operasional', '"Response Time Tanggap Darurat & Medis"', '15,0 Menit', '11,8 Menit', '127.1', 'Golden Hour Terjaga'],
      ['Monitoring Operasional', '"Efisiensi Pengendalian Kehilangan Air (NRW)"', '25,0%', '22,4%', '111.6', 'Terkendali pada 23 DMZ'],
      ['Monitoring Operasional', '"Kepatuhan Mutu KARS & Baku Mutu KPLI"', '100,0%', '99,2%', '99.2', 'Standar Lingkungan Terpenuhi'],
      ['Monitoring Satker RSBP', '"Realisasi PNBP BU Rumah Sakit"', 'Rp 116,50 Miliar', 'Rp 121,80 Miliar', '104.5', 'Surplus Rp 5,30 Miliar'],
      ['Monitoring Satker RSBP', '"BOR Efisiensi Rawat Inap"', '70,0%', '76,2%', '108.9', 'Kapasitas Optimal Terlayani'],
      ['Monitoring Satker SPAM', '"Realisasi PNBP BU SPAM Fasling"', 'Rp 139,20 Miliar', 'Rp 142,50 Miliar', '102.4', 'Surplus Rp 3,30 Miliar'],
      ['Monitoring Satker SPAM', '"Produksi Air Bersih WTP"', '3.660 L/s', '3.420 L/s', '93.4', '6 Waduk Air Baku Prima'],
      ['Monitoring Ditpam', '"Response Time Reaksi Cepat Pengamanan"', '15,0 Menit', '11,8 Menit', '127.1', '100% Obvit Kondusif']
    );

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Konsolidasi_Perkin_DEP_A6_${selectedYear}_${new Date().toISOString().split('T')[0]}.csv`
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
                aria-label="Filter Tahun Anggaran DEP-A6"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-[#0A2540] rounded-lg px-3 py-1 text-xs outline-none cursor-pointer pr-8 transition-colors focus:border-[#0A2540]"
              >
                <option value="2026">Tahun Anggaran 2026 (Berjalan)</option>
                <option value="2025">Tahun Anggaran 2025</option>
                <option value="2024">Tahun Anggaran 2024</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-600 italic hidden sm:inline">
              Menampilkan data penetapan Perkin Deputi A6 &amp; capaian multi-indikator
            </span>
          </div>

          {/* Right Side: Manual 3 IKP & Ekspor Data */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenFormula('ikp-1')}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              title="Buka Dokumen Manual 3 IKP"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Manual 3 IKP</span>
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
      {/* 2. BARIS KPI: 3 IKP UTAMA + 4 KPI OPERASIONAL TURUNAN                */}
      {/* Model Persis DEP-A4: Non-duplikasi terhadap data di Unit Deep Dive   */}
      {/* ==================================================================== */}
      <PelayananUmumKpiRow
        onOpenFormulaModal={handleOpenFormula}
        onSelectUnit={handleSelectDeepDive}
      />

      {/* ==================================================================== */}
      {/* 3. CAPAIAN EVALUASI 3 IKP (RADAR + TAB GRAFIK PERSIS DEP-A4)         */}
      {/* ==================================================================== */}
      <div id="a6-visual-charts-section">
        <PelayananUmumVisualCharts
          onOpenFormulaModal={handleOpenFormula}
          onNavigateToUnit={handleSelectDeepDive}
        />
      </div>

      {/* ==================================================================== */}
      {/* 4. UNIT DEEP-DIVE CENTER: RSBP, SPAM FASLING & PENGAMANAN ASET       */}
      {/* Semua Informasi Visualisasi Digabungkan Langsung Dalam 1 Tampilan     */}
      {/* ==================================================================== */}
      <div id="unit-deep-dive-section">
        <UnitDeepDiveCenter
          selectedUnitId={selectedDeepDiveUnit}
          onSelectUnit={setSelectedDeepDiveUnit}
          onOpenFormulaModal={handleOpenFormula}
          onNavigateToFullDashboard={onSwitchUnit}
        />
      </div>

      {/* ==================================================================== */}
      {/* 5. NARASI AI STRATEGIS (NAVY DARK MODE EKSEKUTIF PERSIS DEP-A4/A5)    */}
      {/* ==================================================================== */}
      <PelayananUmumNarasiAi />

      {/* ==================================================================== */}
      {/* 6. FORMULA & DEFINISI MODAL                                          */}
      {/* ==================================================================== */}
      <PelayananUmumFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialKpiId={selectedKpiFormulaId}
      />
    </div>
  );
};
