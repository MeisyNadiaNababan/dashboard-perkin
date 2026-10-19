import React, { useState } from 'react';
import {
  Calendar,
  Download,
  FileCode2,
} from 'lucide-react';
import { PERKIN_A5_KPIS } from './bandaraPelabuhanLlbData';
import { BandaraPelabuhanLlbKpiRow } from './BandaraPelabuhanLlbKpiRow';
import { BandaraPelabuhanLlbVisualCharts } from './BandaraPelabuhanLlbVisualCharts';
import { BandaraPelabuhanLlbDeepDiveCenter } from './BandaraPelabuhanLlbDeepDiveCenter';
import { BandaraPelabuhanLlbFormulaModal } from './BandaraPelabuhanLlbFormulaModal';
import { BandaraPelabuhanLlbNarasiAi } from './BandaraPelabuhanLlbNarasiAi';

interface BandaraPelabuhanLlbDashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const BandaraPelabuhanLlbDashboard: React.FC<
  BandaraPelabuhanLlbDashboardProps
> = ({ activeSubTab, onOpenFormulaModal, onOpenExportModal, onSwitchUnit }) => {
  // Filter State - Persis Model Filter Dashboard DEP-A3
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>('dit-bandara');

  // Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [modalKpiId, setModalKpiId] = useState<string | null>('ikp-1-ikm-gabungan');

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
      const el = document.getElementById('bandara-pelabuhan-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  React.useEffect(() => {
    if (activeSubTab === 'deep_dive') {
      const el = document.getElementById('bandara-pelabuhan-deep-dive-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (activeSubTab === 'kamus_rumus') {
      handleOpenFormula('ikp-1-ikm-gabungan');
    }
  }, [activeSubTab]);

  const handleExportConsolidatedCsv = () => {
    const headers = ['Kategori', 'Indikator / Program', 'Target / Pagu', 'Realisasi Aktual', 'Capaian (%)', 'Status'];
    const rows: (string | number)[][] = [];

    // Add 3 IKP rows
    PERKIN_A5_KPIS.forEach((ikp) => {
      rows.push([
        'IKP Utama DEP-A5',
        `"${ikp.name}"`,
        `"${ikp.programTarget} ${ikp.unit}"`,
        `"${ikp.realization} ${ikp.unit}"`,
        ikp.achievement.toFixed(1),
        ikp.achievement >= 100 ? 'Melampaui' : 'Tercapai',
      ]);
    });

    // Add Total PNBP Konsolidasi
    rows.push([
      'Konsolidasi PNBP DEP-A5',
      '"Total PNBP Gabungan 3 Satker"',
      '"Rp 520,41 Miliar"',
      '"Rp 565,33 Miliar"',
      '108.6',
      'Surplus Rp 44,92 Miliar',
    ]);

    // Add Operational KPIs based on Satu Data BP Batam
    rows.push(
      ['Monitoring Operasional', '"Hub Konektivitas Penumpang (Laut & Udara)"', '11,50 Juta Orang', '12,54 Juta Orang', '109.0', '+8,4% YoY Pertumbuhan'],
      ['Monitoring Operasional', '"Standar Kepatuhan Safety ICAO & IMO"', '98,0%', '98,8%', '100.8', 'Zero Accident'],
      ['Monitoring Operasional', '"Indeks Kepuasan Logistik & Bongkar Muat"', '85,00', '89,20', '104.9', 'Dwelling Time 2,4 Hari'],
      ['Monitoring Operasional', '"SLA Pelayanan Izin Usaha & Dokumen LLB"', '3,0 Hari Kerja', '1,6 Hari Kerja', '187.5', '97,4% On-Time'],
      ['Monitoring Satker Bandara', '"Realisasi PNBP Hang Nadim"', 'Rp 116,32 Miliar', 'Rp 124,50 Miliar', '107.0', 'Surplus Rp 8,18 Miliar'],
      ['Monitoring Satker Bandara', '"Arus Pergerakan Pesawat"', '32.000 Flight', '34.250 Flight', '107.0', '94 Pergerakan/Hari'],
      ['Monitoring Satker Pelabuhan', '"Realisasi PNBP Kepelabuhanan"', 'Rp 233,21 Miliar', 'Rp 250,40 Miliar', '107.4', 'Surplus Rp 17,19 Miliar'],
      ['Monitoring Satker Pelabuhan', '"Throughput Peti Kemas Batu Ampar"', '550.000 TEUs', '628.400 TEUs', '114.2', 'Operasional STS Crane Baru'],
      ['Monitoring Satker LLB', '"Realisasi PNBP Dit. Lalu Lintas Barang"', 'Rp 2,20 Miliar', 'Rp 2,48 Miliar', '112.7', 'Surplus Rp 0,28 Miliar']
    );

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Konsolidasi_Perkin_DEP_A5_${selectedYear}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="space-y-3.5 font-sans text-slate-800 pb-0 max-w-[1880px] mx-auto origin-top"
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
                aria-label="Filter Tahun Anggaran DEP-A5"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-[#0A2540] rounded-lg px-3 py-1 text-xs outline-none cursor-pointer pr-8 transition-colors focus:border-[#0A2540]"
              >
                <option value="2026">Tahun Anggaran 2026 (Berjalan)</option>
                <option value="2025">Tahun Anggaran 2025</option>
                <option value="2024">Tahun Anggaran 2024</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-600 italic hidden sm:inline">
              Menampilkan data penetapan Perkin Deputi A5 &amp; capaian multi-indikator
            </span>
          </div>

          {/* Right Side: Manual 3 IKP & Ekspor Data */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenFormula('ikp-1-ikm-gabungan')}
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
      {/* 2. BARIS KPI: 3 IKP UTAMA + 4 KPI OPERASIONAL TAMBAHAN               */}
      {/* Model Persis DEP-A4: Non-duplikasi terhadap data di Unit Deep Dive   */}
      {/* ==================================================================== */}
      <BandaraPelabuhanLlbKpiRow
        onOpenFormulaModal={handleOpenFormula}
        onSelectUnit={handleSelectDeepDive}
      />

      {/* ==================================================================== */}
      {/* 3. CAPAIAN EVALUASI 3 IKP (RADAR + TAB GRAFIK PERSIS DEP-A4)         */}
      {/* ==================================================================== */}
      <div id="a5-visual-charts-section">
        <BandaraPelabuhanLlbVisualCharts
          onOpenFormulaModal={handleOpenFormula}
          onNavigateToUnit={handleSelectDeepDive}
        />
      </div>

      {/* ==================================================================== */}
      {/* 4. UNIT DEEP-DIVE CENTER: BANDARA, PELABUHAN & LALU LINTAS BARANG    */}
      {/* Semua Informasi Visualisasi Digabungkan Langsung Dalam 1 Tampilan     */}
      {/* ==================================================================== */}
      <div id="bandara-pelabuhan-deep-dive-section">
        <BandaraPelabuhanLlbDeepDiveCenter
          selectedUnitId={selectedDeepDiveUnit}
          onSelectUnit={setSelectedDeepDiveUnit}
          onOpenFormulaModal={handleOpenFormula}
          onNavigateToFullDashboard={onSwitchUnit}
        />
      </div>

      {/* ==================================================================== */}
      {/* 5. NARASI AI STRATEGIS (NAVY DARK MODE EKSEKUTIF PERSIS DEP-A4/A3)    */}
      {/* ==================================================================== */}
      <BandaraPelabuhanLlbNarasiAi />

      {/* ==================================================================== */}
      {/* 6. FORMULA & DEFINISI MODAL                                          */}
      {/* ==================================================================== */}
      <BandaraPelabuhanLlbFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        selectedKpiId={modalKpiId}
      />
    </div>
  );
};
