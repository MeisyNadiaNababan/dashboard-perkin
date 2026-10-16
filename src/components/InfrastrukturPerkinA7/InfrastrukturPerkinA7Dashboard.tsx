import React, { useState } from 'react';
import {
  Calendar,
  Download,
  FileCode2,
} from 'lucide-react';
import {
  PERKIN_A7_METADATA,
  PERKIN_A7_KPIS,
} from './perkinA7Data';
import { InfrastrukturPerkinA7NarasiAi } from './InfrastrukturPerkinA7NarasiAi';
import { InfrastrukturPerkinA7KpiRow } from './InfrastrukturPerkinA7KpiRow';
import { InfrastrukturPerkinA7VisualCharts } from './InfrastrukturPerkinA7VisualCharts';
import { InfrastrukturPerkinA7DeepDiveCenter } from './InfrastrukturPerkinA7DeepDiveCenter';
import { InfrastrukturPerkinA7FormulaModal } from './InfrastrukturPerkinA7FormulaModal';

interface InfrastrukturPerkinA7DashboardProps {
  activeSubTab?: string;
  onOpenFormulaModal?: (kpiId: string) => void;
  onOpenExportModal?: () => void;
  onSwitchUnit?: (unitId: string) => void;
}

export const InfrastrukturPerkinA7Dashboard: React.FC<
  InfrastrukturPerkinA7DashboardProps
> = ({
  activeSubTab = 'ikhtisar',
  onOpenFormulaModal,
  onOpenExportModal,
  onSwitchUnit,
}) => {
  // Filter State - Model Filter Dashboard DEP-A3 (Ultra-Clean & Compact)
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  // Deep-Dive Unit State (Default: dit-pembangunan-infrastruktur)
  const [selectedDeepDiveUnit, setSelectedDeepDiveUnit] = useState<string>(
    'dit-pembangunan-infrastruktur'
  );

  // Formula Modal State
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(activeSubTab === 'kamus_rumus');
  const [selectedKpiId, setSelectedKpiId] = useState<string | null>(
    'ikp-1-pembangunan-infrastruktur'
  );

  React.useEffect(() => {
    if (activeSubTab === 'kamus_rumus') {
      setIsFormulaModalOpen(true);
    }
  }, [activeSubTab]);

  const handleOpenFormula = (kpiId: string) => {
    if (onOpenFormulaModal) {
      onOpenFormulaModal(kpiId);
    } else {
      setSelectedKpiId(kpiId);
      setIsFormulaModalOpen(true);
    }
  };

  const handleSelectDeepDive = (unitId: string) => {
    setSelectedDeepDiveUnit(unitId);
    setTimeout(() => {
      const el = document.getElementById('infrastruktur-deep-dive-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    let csv = 'data:text/csv;charset=utf-8,';
    csv += 'RINGKASAN EKSEKUTIF PERKIN A.7 TAHUN 2025 (INFRASTRUKTUR BP BATAM)\n';
    csv += `Nomor Perkin,${PERKIN_A7_METADATA.nomorPerkin}\n`;
    csv += `Tanggal Penetapan,${PERKIN_A7_METADATA.tanggalPenetapan}\n`;
    csv += `Pihak Pertama,${PERKIN_A7_METADATA.pihakPertama.nama} (${PERKIN_A7_METADATA.pihakPertama.jabatan})\n`;
    csv += `Pihak Kedua,${PERKIN_A7_METADATA.pihakKedua.nama} (${PERKIN_A7_METADATA.pihakKedua.jabatan})\n`;
    csv += `Total Pagu Anggaran,${PERKIN_A7_METADATA.totalAnggaran}\n`;
    csv += `Realisasi Anggaran,${PERKIN_A7_METADATA.realisasiAnggaran} (${PERKIN_A7_METADATA.persenRealisasiAnggaran}%)\n`;
    csv += `Target PNBP,${PERKIN_A7_METADATA.totalPnbpTarget}\n`;
    csv += `Realisasi PNBP,${PERKIN_A7_METADATA.totalPnbpRealisasi} (${PERKIN_A7_METADATA.persenPnbpRealisasi}%)\n\n`;

    csv += 'INDIKATOR KINERJA PROGRAM (IKP)\n';
    csv += 'No,Kode IKP,Nama Indikator,Target,Realisasi,Capaian (%),Unit Pengampu,Status\n';
    PERKIN_A7_KPIS.forEach((k) => {
      csv += `${k.number},${k.code},"${k.name}",${k.programTargetLabel},"${k.realizationLabel}",${k.achievement.toFixed(2)}%,"${k.unitPengampu}","${k.status}"\n`;
    });

    csv += '\nMONITORING INDIKATOR OPERASIONAL TURUNAN\n';
    csv += 'Kategori,Indikator Operasional,Nilai Capaian,Status,Unit Pengampu\n';
    csv += 'Operasional ROW,Kepatuhan SLA Izin ROW (Max 5 Hari),SLA 3.5 Hari (98.5% Patuh),Optimal,Dit. Pembangunan\n';
    csv += 'Efisiensi HPS,Saving Pengadaan 14 Paket Fisik,Rp 48.25 Miliar (5.72%),Efisien,Dit. Pembangunan\n';
    csv += 'Drainase,Keandalan Kapasitas Tampung Bebas Banjir,94.8% (3 Kolam & 42 Km U-Ditch),Prima,Dit. Perencanaan\n';
    csv += 'Obvitnas,Kondusifitas 48 Titik Obvit & 142 Ha Hutan DTA,100% Bebas Okupasi,Kondusif,Dit. Pengamanan Aset\n';

    const encodedUri = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ringkasan_perkin_a7_infrastruktur_bp_batam_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="space-y-3.5 font-sans text-slate-800 pb-12 max-w-[1880px] mx-auto origin-top"
      style={{ zoom: '80%' }}
    >
      {/* ============================================================== */}
      {/* 1. COMPACT FILTER TOOLBAR (MODEL FILTER DASHBOARD DEP-A3)      */}
      {/* ============================================================== */}
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
                aria-label="Filter Tahun Anggaran DEP-A7"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-[#0A2540] rounded-lg px-3 py-1 text-xs outline-none cursor-pointer pr-8 transition-colors focus:border-[#0A2540]"
              >
                <option value="2026">Tahun Anggaran 2026 (Berjalan)</option>
                <option value="2025">Tahun Anggaran 2025</option>
                <option value="2024">Tahun Anggaran 2024</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-600 italic hidden sm:inline">
              Menampilkan data penetapan Perkin Deputi Bidang Infrastruktur &amp; capaian multi-indikator
            </span>
          </div>

          {/* Right Side: Manual 2 IKP & Ekspor Data */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenFormula('ikp-1-pembangunan-infrastruktur')}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              title="Buka Dokumen Manual 2 IKP Perkin A.7"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Manual 2 IKP</span>
            </button>

            <button
              onClick={onOpenExportModal || handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-[#0A2540] text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Ekspor Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. NARASI AI STRATEGIS (MODEL DEP-A4 / DEP-A3)                 */}
      {/* ============================================================== */}
      <InfrastrukturPerkinA7NarasiAi />

      {/* ============================================================== */}
      {/* 3. DUA INDIKATOR KINERJA PROGRAM (IKP) + 4 KPI TURUNAN         */}
      {/* ============================================================== */}
      <InfrastrukturPerkinA7KpiRow
        onOpenFormulaModal={handleOpenFormula}
        onSelectUnit={handleSelectDeepDive}
        selectedKpiId={selectedKpiId}
      />

      {/* ============================================================== */}
      {/* 4. MODEL CAPAIAN 2 INDIKATOR SEPERTI DEP-A4                    */}
      {/* ============================================================== */}
      <InfrastrukturPerkinA7VisualCharts
        onOpenFormulaModal={handleOpenFormula}
        onNavigateToUnit={handleSelectDeepDive}
      />

      {/* ============================================================== */}
      {/* 5. UNIT DEEP-DIVE CENTER • 3 UNIT KERJA PERKIN A.7             */}
      {/* ============================================================== */}
      <InfrastrukturPerkinA7DeepDiveCenter
        selectedUnitId={selectedDeepDiveUnit}
        onSelectUnit={setSelectedDeepDiveUnit}
        onOpenFormulaModal={handleOpenFormula}
        onNavigateToFullDashboard={onSwitchUnit}
      />

      {/* ============================================================== */}
      {/* 6. KAMUS RUMUS & DEFINISI MODAL                                */}
      {/* ============================================================== */}
      <InfrastrukturPerkinA7FormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        selectedKpiId={selectedKpiId}
      />
    </div>
  );
};
