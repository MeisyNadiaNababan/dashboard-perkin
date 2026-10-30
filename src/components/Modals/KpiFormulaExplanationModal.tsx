import React, { useState } from 'react';
import {
  X,
  Calculator,
  Copy,
  Check,
  BarChart3,
  Database,
  ArrowRight,
  TrendingUp,
  FileCode,
  Layers,
  HelpCircle,
  Lightbulb,
  Target,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export interface KpiFormulaDetail {
  id: string;
  unit: 'biro-keuangan' | 'pdsi' | 'ptsp' | 'dit-pengembangan-kek' | 'dit-investasi' | 'dit-lalu-lintas-barang' | 'dit-pelabuhan' | 'bu-rumah-sakit' | 'biro-hukum';
  title: string;
  codeTag: string;
  category: string;
  currentValue: string;
  targetValue: string;
  statusText: string;
  statusVariant: 'success' | 'warning' | 'info' | 'danger';
  summary: string;
  presentationPitch: string;
  formulaConceptual: string;
  numerator: {
    label: string;
    realValue: string;
    source: string;
  };
  denominator: {
    label: string;
    realValue: string;
    source: string;
  };
  calculationResult: string;
  tableauCalculatedField: string;
  tableauShelvesGuide: {
    showMe: string;
    rows: string;
    columns: string;
    marks: string;
    filters: string;
  };
  databaseSource: {
    catalogItem: string;
    tableName: string;
    attributes: string[];
    updateFrequency: string;
    dataClassification: 'TERBUKA' | 'TERBATAS' | 'TERTUTUP';
  };
  benchmarkThreshold: {
    target: string;
    warning: string;
    critical: string;
    standardOrigin: string;
  };
  executiveAction: string;
}

export const KPI_FORMULA_DETAILS: Record<string, KpiFormulaDetail> = {
  // BIRO KEUANGAN
  pendapatan: {
    id: 'pendapatan',
    unit: 'biro-keuangan',
    title: 'Persentase Capaian Target PNBP BP Batam (IKS-03)',
    codeTag: 'IKS-03',
    category: 'Pendapatan & PNBP',
    currentValue: 'Rp 981,2 M (40,1%)',
    targetValue: 'Target DIPA Perkin: Rp 2.447,46 M',
    statusText: 'On Track (Target Proporsional Q2: 50,0%)',
    statusVariant: 'success',
    summary: 'Rasio akumulasi kas masuk PNBP riil yang disetor ke rekening kas BLU BP Batam terhadap target tahunan pada DIPA/Penetapan Kinerja (Perkin) 2026.',
    presentationPitch: 'Bapak/Ibu Pimpinan, realisasi penerimaan PNBP BP Batam hingga cut-off April TA 2026 telah membukukan Rp 981,2 Miliar atau 40,1% dari target DIPA Perkin Rp 2,45 Triliun. Kontributor utama penerimaan ditopang oleh Pengelolaan Pertanahan (UWT) sebesar Rp 412,0 M dan BU SPAM Fasilitas & Lingkungan sebesar Rp 278,0 M. Laju pertumbuhan kas masuk menunjukkan akselerasi +12,3% (MoM).',
    formulaConceptual: '(Total Realisasi Kas Masuk PNBP Akumulasi YTD ÷ Target DIPA Perkin TA 2026) × 100%',
    numerator: {
      label: 'Pembilang (Realisasi PNBP YTD)',
      realValue: 'Rp 981.240.000.000 (Kas Masuk Rekening BLU)',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    denominator: {
      label: 'Penyebut (Target Perkin 2026)',
      realValue: 'Rp 2.447.464.960.000 (Target DIPA 10 Satker)',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[jumlah])',
    },
    calculationResult: '(981.240.000.000 ÷ 2.447.464.960.000) × 100% = 40,09% ≈ 40,1%',
    tableauCalculatedField: `// Calculated Field: [IKS-03 Capaian PNBP %]
SUM([keu_target_pnbp_rekap].[realisasi]) / SUM([keu_target_pnbp_rekap].[jumlah]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab & BAN Tile) & #6 (Horizontal Bar)',
      rows: '[sumber] (Unit Kerja Penghasil / Badan Usaha)',
      columns: 'SUM([realisasi]), SUM([target]), [IKS-03 Capaian PNBP %]',
      marks: 'Color: % Capaian (Diverging Green-Orange-Red), Label: Realisasi YTD',
      filters: "[tahun] = '2026', [bulan] = 'April'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #8: Rekapitulasi Target Penerimaan Negara Bukan Pajak (PNBP)',
      tableName: 'keu_target_pnbp_rekap',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH'],
      updateFrequency: 'Harian (Cut-Off Settlement Pukul 23:59 WIB)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 50,0% pada akhir Triwulan II (Juni)',
      warning: '35,0% - 49,9% (Monitoring mingguan satker)',
      critical: '< 35,0% (Perlu percepatan penagihan dan rekonsiliasi)',
      standardOrigin: 'Perkin Kepala BP Batam & Rencana Bisnis dan Anggaran (RBA) BLU 2026',
    },
    executiveAction: 'Fokuskan percepatan realisasi pada Dit. Pengelolaan Kawasan Bandara (saat ini 54,4%) dan lakukan monitoring intensif pada unit kepelabuhanan dan air curah menjelang penutupan semester I.',
  },

  belanja: {
    id: 'belanja',
    unit: 'biro-keuangan',
    title: 'Persentase Serapan Pagu Belanja DIPA BLU',
    codeTag: 'SERAPAN-DIPA',
    category: 'Belanja & Anggaran',
    currentValue: 'Rp 945,0 M (28,5%)',
    targetValue: 'Pagu DIPA: Rp 3.318,50 M',
    statusText: 'Sesuai Siklus Belanja Awal Tahun',
    statusVariant: 'info',
    summary: 'Tingkat penyerapan SP2D belanja operasional rutin, pegawai, barang, dan modal infrastruktur terhadap total pagu DIPA yang disahkan Ditjen Perbendaharaan.',
    presentationPitch: 'Serapan belanja hingga April terealisasi Rp 945,0 Miliar (28,5% dari pagu Rp 3,32 Triliun). Pola serapan ini wajar karena kuartal I dan awal kuartal II didominasi belanja operasional dan uang muka kontrak. Belanja modal infrastruktur strategis saat ini sedang dalam proses tender dan penandatanganan kontrak, sehingga kurva serapan akan naik tajam di Q3 dan Q4.',
    formulaConceptual: '(Akumulasi Realisasi Belanja SP2D Terbit YTD ÷ Total Pagu DIPA Anggaran) × 100%',
    numerator: {
      label: 'Pembilang (Realisasi Belanja YTD)',
      realValue: 'Rp 945.020.000.000 (SP2D Terbit & Cair)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    },
    denominator: {
      label: 'Penyebut (Pagu DIPA BLU)',
      realValue: 'Rp 3.318.500.000.000 (Pagu Resmi APBN 2026)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    },
    calculationResult: '(945.020.000.000 ÷ 3.318.500.000.000) × 100% = 28,48% ≈ 28,5%',
    tableauCalculatedField: `// Calculated Field: [Serapan Belanja Pagu %]
SUM([keu_laporan_realisasi_anggaran_blu].[realisasi]) / SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #6 (Horizontal Bar with Reference Line)',
      rows: '[program] / [jenis_belanja]',
      columns: 'SUM([pagu]), SUM([realisasi]), [Serapan Belanja Pagu %]',
      marks: 'Bullet Mark dengan Reference Line Target Q2 (35%)',
      filters: "[tahun] = '2026', [bulan] = 'April'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #3: Laporan Realisasi Anggaran BLU & Item #23: Rekapitulasi Pagu Anggaran',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'TRIWULAN', 'TAHUN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Harian (Berdasarkan Penerbitan SP2D & SP3B BLU)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 35,0% pada akhir Triwulan II',
      warning: '20,0% - 34,9% (Fase lelang dan penetapan PPK)',
      critical: '< 20,0% (Risiko deviasi Halaman III DIPA)',
      standardOrigin: 'Standar Evaluasi IKPA Kemenkeu & Rencana Penarikan Dana (RPD)',
    },
    executiveAction: 'Dorong Pejabat Pembuat Komitmen (PPK) pada satker infrastruktur untuk segera memproses termin uang muka dan pembayaran hasil MC (Monthly Certificate) kontraktor.',
  },

  kas_bank: {
    id: 'kas_bank',
    unit: 'biro-keuangan',
    title: 'Cash Coverage Ratio & Saldo Kas Bank BLU (Item 13)',
    codeTag: 'LIKUIDITAS-CCR',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 1,52 T (3,89 Bulan)',
    targetValue: 'Benchmark Kemenkeu: ≥ 3,00 Bulan',
    statusText: 'Likuiditas Sangat Prima & Solven',
    statusVariant: 'success',
    summary: 'Daya tahan saldo kas likuid di seluruh rekening giro dan deposito operasional perbankan mitra untuk membiayai seluruh pengeluaran bulanan BP Batam tanpa penerimaan kas baru.',
    presentationPitch: 'Likuiditas kas BP Batam berada dalam kondisi sangat sehat dengan total saldo Rp 1,52 Triliun tersebar di 7 bank mitra operasional. Angka ini memberikan Cash Coverage Ratio setara 3,89 bulan cadangan operasional (standar minimal BLU Kemenkeu adalah ≥ 3,0 bulan). Hal ini membuktikan BP Batam memiliki bantalan finansial (financial buffer) yang sangat kuat.',
    formulaConceptual: 'Total Saldo Kas Likuid Akhir Periode ÷ (Total Anggaran Belanja Tahunan ÷ 12 Bulan)',
    numerator: {
      label: 'Pembilang (Saldo Kas Likuid)',
      realValue: 'Rp 1.520.000.000.000 (Giro & Deposito Bank Mitra)',
      source: 'SIMKEU Item #13: SUM([keu_saldo_bank_realtime].[nilai])',
    },
    denominator: {
      label: 'Penyebut (Kebutuhan Kas Operasional Bulanan)',
      realValue: 'Rp 390.720.000.000 / bulan (Rata-rata Kebutuhan Kas Belanja)',
      source: 'SIMKEU Item #3: (SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) / 12)',
    },
    calculationResult: '1.520.000.000.000 ÷ (3.318.500.000.000 ÷ 12) = 1.520 M ÷ 276,5 M = 3,89 Bulan',
    tableauCalculatedField: `// Calculated Field: [Cash Coverage Ratio (Bulan)]
SUM([keu_saldo_bank_realtime].[nilai]) / (SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) / 12)`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #14 (Area / Treemap Kas Bank)',
      rows: '[nama_bank] (Bank Mandiri, BRI, BNI, BTN, Bank Riau Kepri)',
      columns: 'SUM([nilai]), [Cash Coverage Ratio (Bulan)]',
      marks: 'Color: [kategori_rekening] (Penerimaan, Pengeluaran, Operasional, Deposito)',
      filters: "[tanggal_rekap] = MAX([tanggal_rekap])",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #13: Laporan Saldo Bank Real-time & Item #14: Penerimaan Sumber Dana',
      tableName: 'keu_saldo_bank_realtime',
      attributes: ['NAMA BANK', 'UNIT', 'KATEGORI UNIT', 'NOMOR REKENING', 'KEGUNAAN REKENING', 'KATEGORI REKENING', 'TANGGAL REKAP', 'NILAI'],
      updateFrequency: 'Real-Time (Sinkronisasi Host-to-Host API Perbankan)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 3,00 Bulan Pengeluaran Operasional',
      warning: '1,50 - 2,99 Bulan (Perlu pembatasan belanja non-prioritas)',
      critical: '< 1,50 Bulan (Risiko gangguan likuiditas operasional)',
      standardOrigin: 'Peraturan Menteri Keuangan (PMK) Pengelolaan Kas Badan Layanan Umum',
    },
    executiveAction: 'Optimalkan penempatan dana idle cash pada instrumen deposito on call (DOC) bank BUMN untuk mendongkrak pendapatan bunga/jasa giro (treasury yield) tanpa mengurangi fleksibilitas pencairan.',
  },

  piutang: {
    id: 'piutang',
    unit: 'biro-keuangan',
    title: 'Outstanding Piutang PNBP & Tingkat Kolektibilitas',
    codeTag: 'AGING-PIUTANG',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 312,4 M (305 Debitur)',
    targetValue: 'Tingkat Kolektibilitas Lancar: ≥ 70%',
    statusText: 'Perlu Pengawasan Intensif',
    statusVariant: 'warning',
    summary: 'Total saldo piutang faktur PNBP yang belum terbayar oleh wajib bayar/debitur per tanggal cut-off, diklasifikasikan ke dalam 4 bucket umur piutang sesuai ketentuan PMK.',
    presentationPitch: 'Biro Keuangan memantau total saldo piutang PNBP sebesar Rp 312,4 Miliar dari 305 debitur. Dari total tersebut, 73,8% berada dalam kategori lancar hingga kurang lancar (0–60 hari). Sedangkan saldo piutang macet yang berumur di atas 90 hari sebesar Rp 43,6 M (14,0%) saat ini telah diproses pelimpahannya ke KPKNL / Panitia Urusan Piutang Negara (PUPN) untuk penagihan aktif dan penyitaan jaminan.',
    formulaConceptual: 'Saldo Awal Piutang + Penerbitan Faktur Baru - Pembayaran Diterima - Penyesuaian/Koreksi',
    numerator: {
      label: 'Komposisi Kolektibilitas',
      realValue: 'Lancar Rp 168,2 M (53,8%) • Macet Rp 43,6 M (14,0%)',
      source: 'SIMKEU Item #17: SUM([keu_rekap_umur_piutang].[nilai_piutang])',
    },
    denominator: {
      label: 'Basis Debitur Aktif',
      realValue: '305 Debitur Terdaftar (Mitra Usaha & Lahan)',
      source: 'SIMKEU Item #18: COUNTD([keu_mutasi_piutang].[kode_debitur])',
    },
    calculationResult: 'Total = Lancar (168,2 M) + Kurang Lancar (62,5 M) + Diragukan (38,1 M) + Macet (43,6 M) = Rp 312,4 M',
    tableauCalculatedField: `// Calculated Field: [Bucket Aging Piutang Kemenkeu]
IF [keu_mutasi_piutang_faktur].[umur_piutang] <= 30 THEN "0 - 30 Hari (Lancar)"
ELSEIF [keu_mutasi_piutang_faktur].[umur_piutang] <= 60 THEN "31 - 60 Hari (Kurang Lancar)"
ELSEIF [keu_mutasi_piutang_faktur].[umur_piutang] <= 90 THEN "61 - 90 Hari (Diragukan)"
ELSE "> 90 Hari (Macet / Pelimpahan KPKNL)"
END`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #13 (Stacked Bar Aging)',
      rows: '[kategori_piutang] (UWT, Kepelabuhanan, Bandara, SPAM)',
      columns: '[Bucket Aging Piutang Kemenkeu], SUM([nilai_piutang])',
      marks: 'Color: Bucket Aging (Green to Red), Tooltip: Jumlah Debitur',
      filters: "[status_faktur] = 'Outstanding'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #17: Rekapitulasi Umur Piutang, Item #18: Mutasi, Item #20: Piutang Tak Tertagih',
      tableName: 'keu_rekap_umur_piutang & keu_piutang_tak_tertagih',
      attributes: ['NOMOR FAKTUR', 'KODE DEBITUR', 'NAMA DEBITUR', 'TANGGAL TERBIT', 'JATUH TEMPO', 'UMUR PIUTANG', 'NILAI PIUTANG'],
      updateFrequency: 'Harian (Berdasarkan e-Billing dan Rekonsiliasi Bank)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'Rasio Piutang Macet ≤ 10,0% dari total piutang',
      warning: '10,1% - 15,0% (Surat Peringatan I, II, III terbit)',
      critical: '> 15,0% (Wajib pelimpahan berkas ke KPKNL Batam)',
      standardOrigin: 'PMK Pedoman Pengelolaan dan Penghapusan Piutang BLU & KPKNL',
    },
    executiveAction: 'Lakukan penagihan khusus (task force) bersama Direktorat Terkait dan terbitkan Surat Peringatan (SP) untuk 25 debitur terbesar yang jatuh tempo pada bulan berjalan.',
  },

  coverage_ratio: {
    id: 'coverage_ratio',
    unit: 'biro-keuangan',
    title: 'Financial Coverage Ratio (FIN_COVER)',
    codeTag: 'FIN_COVER',
    category: 'Tata Kelola & Evaluasi',
    currentValue: '0,86x (86,0% Mandiri)',
    targetValue: 'Benchmark Solvabilitas: ≥ 0,80x',
    statusText: 'Kemandirian Operasional Prima',
    statusVariant: 'success',
    summary: 'Rasio kemampuan pendapatan riil PNBP dalam menutup seluruh realisasi belanja operasional berjalan, mencerminkan tingkat kemandirian fiskal BLU BP Batam.',
    presentationPitch: 'Coverage ratio kemandirian fiskal berada pada level 0,86x (86,0%), melampaui ambang batas aman 0,80x. Ini membuktikan bahwa setiap Rp 1,00 belanja operasional yang direalisasikan telah ditopang oleh Rp 0,86 kas masuk PNBP riil (PNBP Rp 681,0 M dibanding Belanja Rp 791,8 M).',
    formulaConceptual: 'Total Realisasi Pendapatan PNBP YTD ÷ Total Realisasi Belanja Operasional YTD',
    numerator: {
      label: 'Pembilang (Realisasi PNBP YTD)',
      realValue: 'Rp 681.000.000.000 (Kas Masuk PNBP Layanan BLU)',
      source: 'SIMKEU Item #14: SUM([keu_rekap_penerimaan_sumber_dana].[pnbp])',
    },
    denominator: {
      label: 'Penyebut (Realisasi Belanja Operasional YTD)',
      realValue: 'Rp 791.800.000.000 (Belanja Operasional Berjalan)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[belanja_operasional])',
    },
    calculationResult: '681.000.000.000 ÷ 791.800.000.000 = 0,8600x ≈ 0,86x (86,0%)',
    tableauCalculatedField: `// Calculated Field: [FIN_COVER Coverage Ratio]
SUM([keu_rekap_penerimaan_sumber_dana].[pnbp]) / SUM([keu_laporan_realisasi_anggaran_blu].[belanja_operasional])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (KPI Card BAN) & #3 (Line Chart Tren Rasio)',
      rows: 'Rasio Kemandirian Bulanan',
      columns: '[bulan], [FIN_COVER Coverage Ratio]',
      marks: 'Reference Line: 0.80x (Ambang Batas Minimum Solvabilitas)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #14 (Penerimaan Sumber Dana) & Item #3 (Laporan Realisasi Belanja BLU)',
      tableName: 'keu_rekap_penerimaan_sumber_dana & keu_laporan_realisasi_anggaran_blu',
      attributes: ['REALISASI PENDAPATAN PNBP', 'REALISASI BELANJA OPERASIONAL', 'RASIO KEMANDIRIAN'],
      updateFrequency: 'Bulanan (Cut-Off Laporan Keuangan)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 0,80x (Kemandirian fiskal kuat)',
      warning: '0,70x - 0,79x (Cukup mandiri, pengawasan belanja)',
      critical: '< 0,70x (Defisit operasional perlu pengetatan belanja)',
      standardOrigin: 'Indikator Standar Kemandirian Keuangan BLU Kemenkeu',
    },
    executiveAction: 'Pertahankan disiplin penyerapan belanja operasional dan optimalkan akselerasi penerimaan PNBP layanan unggulan untuk menjaga rasio di atas ambang batas 0,80x.',
  },

  ipa: {
    id: 'ipa',
    unit: 'biro-keuangan',
    title: 'Opini BPK & Indeks Kinerja Pelaksanaan Anggaran (IKPA)',
    codeTag: 'IKPA-KEMENKEU',
    category: 'Tata Kelola & Evaluasi',
    currentValue: 'WTP / 92,4',
    targetValue: 'Target Perkin: WTP & Skor IKPA ≥ 90,0',
    statusText: 'Kategori Sangat Baik & Kepatuhan Penuh',
    statusVariant: 'success',
    summary: 'Nilai komposit evaluasi 8 indikator pelaksanaan anggaran dari Ditjen Perbendaharaan Kemenkeu serta status opini laporan keuangan dari Badan Pemeriksa Keuangan (BPK RI).',
    presentationPitch: 'BP Batam mempertahankan opini Wajar Tanpa Pengecualian (WTP) dari BPK RI dan meraih skor IKPA 92,4 dari Kementerian Keuangan (kategori "Sangat Baik", target nasional ≥ 90,0). Keunggulan utama ada pada indikator ketepatan LPJ Bendahara (100%), penyerapan anggaran (93,2%), dan nihil dispensasi SPM.',
    formulaConceptual: '∑ (Nilai Capaian Indikator ke-i × Bobot Indikator ke-i) untuk 8 Indikator Kemenkeu',
    numerator: {
      label: 'Komponen Utama IKPA',
      realValue: 'Kesesuaian RPD (15%), Penyerapan (20%), Efisiensi (20%), LPJ (10%), dll.',
      source: 'SIMKEU Item #25: SUM([keu_indeks_pelaksanaan_anggaran].[nilai_komponen_terbobot])',
    },
    denominator: {
      label: 'Skala Penilaian Maksimal',
      realValue: '100 Poin Indeks Ditjen Perbendaharaan',
      source: 'Perdirjen Perbendaharaan Standar IKPA Nasional',
    },
    calculationResult: 'Total Komposit = 18,6 + 14,2 + 19,4 + 10,0 + 9,8 + 5,0 + 8,5 + 6,9 = 92,40 Poin',
    tableauCalculatedField: `// Calculated Field: [Nilai Akhir IKPA Kemenkeu]
SUM([keu_indeks_pelaksanaan_anggaran].[nilai_komponen_terbobot])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Scorecard KPI) & #7 (Radial / Bullet Score)',
      rows: '[nama_indikator_ikpa]',
      columns: 'SUM([nilai_capaian]), SUM([bobot]), SUM([nilai_terbobot])',
      marks: 'Color: Kategori (Hijau ≥ 90, Biru 80-89, Merah < 80)',
      filters: "[tahun] = '2026', [triwulan] = 'Q1-Q2'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #25: Indeks Pelaksanaan Anggaran (IKPA)',
      tableName: 'keu_indeks_pelaksanaan_anggaran & Hasil Audit BPK RI',
      attributes: ['INDIKATOR', 'BOBOT', 'NILAI CAPAIAN', 'NILAI TERBOBOT', 'STATUS AUDIT BPK'],
      updateFrequency: 'Triwulanan (Sesuai Rilis Resmi Kemenkeu OMSPAN)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Skor ≥ 90,00 (Kategori: Sangat Baik)',
      warning: '80,00 - 89,99 (Kategori: Baik)',
      critical: '< 80,00 (Kategori: Cukup / Kurang)',
      standardOrigin: 'Peraturan Direktur Jenderal Perbendaharaan Kemenkeu RI',
    },
    executiveAction: 'Jaga akurasi deviasi Halaman III DIPA pada setiap revisi anggaran triwulanan agar skor tidak terdegradasi pada semester kedua.',
  },

  // PDSI KPIS
  total_rak: {
    id: 'total_rak',
    unit: 'pdsi',
    title: 'Total Kapasitas Rak Data Center Tier III',
    codeTag: 'DC-CAP-01',
    category: 'Infrastruktur & DC',
    currentValue: '42 Unit Rak',
    targetValue: 'Kapasitas Terpasang Tier III Ready',
    statusText: 'Kapasitas Fisik Penuh 42U Standar',
    statusVariant: 'info',
    summary: 'Total ketersediaan unit rak server standar 42U di fasilitas Data Center BIDA Batam Centre dan Disaster Recovery Center (DRC) Sekupang.',
    presentationPitch: 'Fasilitas Data Center BP Batam memiliki total 42 rak server bersertifikasi Tier III ready, terdiri atas 28 rak di DC Utama Kantor Pusat Batam Centre dan 14 rak di DRC Sekupang. Infrastruktur ini menjamin ketersediaan ruang komputasi aman dengan redundansi listrik 2N dan pendingin presisi N+1.',
    formulaConceptual: 'SUM([Jumlah Unit Rak Server 42U Terpasang di Seluruh Fasilitas Data Center])',
    numerator: {
      label: 'Lokasi DC Utama Batam Centre',
      realValue: '28 Rak Server 42U (Row A, B, C)',
      source: 'PDSI Data Catalog Item #8: Tabel pdsi_rak_datacenter',
    },
    denominator: {
      label: 'Lokasi DRC Sekupang',
      realValue: '14 Rak Server 42U (Row D, E - Disaster Recovery)',
      source: 'PDSI Data Catalog Item #8: Tabel pdsi_rak_datacenter',
    },
    calculationResult: 'Total Rak = 28 Rak (Batam Centre) + 14 Rak (DRC Sekupang) = 42 Unit Rak',
    tableauCalculatedField: `// Calculated Field: [Total Kapasitas Rak DC]
SUM([pdsi_rak_datacenter].[total_rak])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab & Tile) & #14 (Treemap Kapasitas)',
      rows: '[lokasi_dc], [ruang_server]',
      columns: 'SUM([total_rak]), SUM([rak_terisi]), SUM([rak_kosong])',
      marks: 'Color: Lokasi DC, Label: Total Rak',
      filters: "[status_fasilitas] = 'Aktif Operasional'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #8: Data Rak Data Center',
      tableName: 'pdsi_data_rak_data_center',
      attributes: ['RUANGAN', 'JENIS RAK', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'TOTAL RAK', 'JUMLAH RAK TERISI', 'JUMLAH RAK KOSONG'],
      updateFrequency: 'Harian (Sensor IoT & DCIM Live)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: '42 Unit Rak Operasional 100% Standar TIA-942',
      warning: 'SLA Daya Listrik < 99,98%',
      critical: 'Kegagalan Pendingin / Suhu > 24°C',
      standardOrigin: 'Standar Internasional TIA-942 Rated 3 & Uptime Institute',
    },
    executiveAction: 'Pastikan pemeliharaan berkala UPS dan genset backup di kedua lokasi untuk menjaga ketersediaan listrik 99,98% tanpa downtime.',
  },

  rak_terisi: {
    id: 'rak_terisi',
    unit: 'pdsi',
    title: 'Jumlah Rak Data Terisi & Tingkat Okupansi',
    codeTag: 'DC-OCCUPANCY',
    category: 'Infrastruktur & DC',
    currentValue: '33 Rak (78,6%)',
    targetValue: 'Target Okupansi: 75% - 85%',
    statusText: 'Okupansi Optimal (9 Rak Buffer Cadangan)',
    statusVariant: 'success',
    summary: 'Jumlah unit rak server yang telah terisi perangkat komputasi aktif, storage, dan network switch oleh unit internal maupun penyewa/kolokasi eksternal.',
    presentationPitch: 'Tingkat okupansi rak data center saat ini berada pada 78,6% (33 rak terisi dari 42 rak). Sebanyak 9 rak dialokasikan sebagai buffer ekspansi sistem informasi baru dan tenant komersial. Angka 78,6% merupakan sweet spot efisiensi pendinginan dan beban kelistrikan fasilitas Tier III.',
    formulaConceptual: '(SUM([Rak Terisi]) ÷ SUM([Total Rak])) × 100%',
    numerator: {
      label: 'Pembilang (Rak Terisi Aktif)',
      realValue: '33 Unit Rak (Internal BP Batam: 22 Rak, Kolokasi: 11 Rak)',
      source: 'PDSI Item #8: SUM([pdsi_data_rak_data_center].[jumlah_rak_terisi])',
    },
    denominator: {
      label: 'Penyebut (Total Rak Tersedia)',
      realValue: '42 Unit Rak Server 42U',
      source: 'PDSI Item #8: SUM([pdsi_data_rak_data_center].[total_rak])',
    },
    calculationResult: '(33 ÷ 42) × 100% = 78,57% ≈ 78,6%',
    tableauCalculatedField: `// Calculated Field: [Tingkat Okupansi Rak DC %]
SUM([pdsi_data_rak_data_center].[jumlah_rak_terisi]) / SUM([pdsi_data_rak_data_center].[total_rak]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #2 (Highlight Table) & #23 (Bullet Graph)',
      rows: '[ruangan], [jenis_rak]',
      columns: '[Tingkat Okupansi Rak DC %]',
      marks: 'Color: Okupansi (Hijau 70-85%, Kuning > 85%, Biru < 70%)',
      filters: "[status] = 'Aktif'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #8: Data Rak Data Center',
      tableName: 'pdsi_data_rak_data_center',
      attributes: ['RUANGAN', 'JENIS RAK', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'TOTAL RAK', 'JUMLAH RAK TERISI', 'JUMLAH RAK KOSONG'],
      updateFrequency: 'Mingguan (Asset Verification DCIM)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: '75,0% - 85,0% (Rentang optimal efisiensi PUE)',
      warning: '> 85,0% (Perlu rencana ekspansi modul baru)',
      critical: '> 95,0% (Risiko keterbatasan kapasitas darurat)',
      standardOrigin: 'Best Practice Data Center Facility Management & Standar ISO 27001',
    },
    executiveAction: 'Alokasikan 4 dari 9 rak tersisa untuk rencana sentralisasi server database Pertanahan dan Pelabuhan pada semester depan.',
  },

  indeks_spbe: {
    id: 'indeks_spbe',
    unit: 'pdsi',
    title: 'Indeks Sistem Pemerintahan Berbasis Elektronik (SPBE)',
    codeTag: 'SPBE-KEMENPAN',
    category: 'Tata Kelola SPBE & Data',
    currentValue: '3,68 (Predikat "Sangat Baik")',
    targetValue: 'Target Nasional: ≥ 3,50 (Skala 1,00 - 5,00)',
    statusText: 'Melampaui Target Perkin 2026',
    statusVariant: 'success',
    summary: 'Nilai evaluasi kematangan penerapan SPBE oleh Kementerian PAN-RB yang mencakup 4 domain: Kebijakan Internal, Tata Kelola, Manajemen, dan Layanan Digital.',
    presentationPitch: 'BP Batam meraih Indeks SPBE 3,68 dengan predikat "Sangat Baik" dari KemenPAN-RB (skala 1-5). Skor ini melampaui target tahunan 3,50. Nilai tertinggi diraih pada Domain Layanan SPBE (skor 3,85) berkat integrasi layanan perizinan terpadu IBOSS, e-Office, dan portal data center yang telah terhubung antarsistem.',
    formulaConceptual: '∑ (Nilai Kematangan Tiap Indikator × Bobot Indikator) ÷ Total Bobot (4 Domain & 47 Indikator Evaluasi)',
    numerator: {
      label: '4 Domain Penilaian SPBE',
      realValue: 'Kebijakan (3,55), Tata Kelola (3,60), Manajemen (3,65), Layanan (3,85)',
      source: 'PDSI Item #18: Tabel pdsi_evaluasi_spbe KemenPAN-RB',
    },
    denominator: {
      label: 'Skala Indeks KemenPAN-RB',
      realValue: 'Skala 1,00 (Perintisan) s.d. 5,00 (Optimum)',
      source: 'PermenPAN-RB No. 59 Tahun 2020 tentang Pedoman Evaluasi SPBE',
    },
    calculationResult: 'Indeks Komposit Terbobot = 3,68 (Kategori: Sangat Baik / Predikat Tertinggi Lembaga Non-Kementerian)',
    tableauCalculatedField: `// Calculated Field: [Indeks SPBE Komposit]
SUM([pdsi_evaluasi_spbe].[nilai_kematangan_terbobot])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #16 (Radar / Spider Domain Chart)',
      rows: '[domain_spbe], [aspek_spbe]',
      columns: '[Indeks SPBE Komposit], [Target Nasional]',
      marks: 'Color: Domain Predikat, Label: Nilai Kematangan (1-5)',
      filters: "[tahun_evaluasi] = '2025/2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #18: Dokumen Rencana SPBE BP Batam',
      tableName: 'pdsi_evaluasi_spbe & Portal Tauval SPBE KemenPAN-RB',
      attributes: ['DOMAIN', 'ASPEK', 'INDIKATOR KE-N', 'TINGKAT TINGKAT KEMATANGAN (1-5)', 'BUKTI DUKUNG DOKUMEN'],
      updateFrequency: 'Tahunan (Rilis Resmi Kementerian PAN-RB)',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 3,50 (Predikat Sangat Baik)',
      warning: '2,60 - 3,49 (Predikat Baik)',
      critical: '< 2,60 (Predikat Cukup / Perlu Audit Mendalam)',
      standardOrigin: 'Peraturan Presiden No. 95 Tahun 2018 tentang SPBE',
    },
    executiveAction: 'Tingkatkan Domain Manajemen SPBE (Audit TIK dan Manajemen Risiko Siber) agar pada evaluasi mendatang BP Batam dapat menembus predikat "Memuaskan" (skor ≥ 4,20).',
  },

  total_serangan: {
    id: 'total_serangan',
    unit: 'pdsi',
    title: 'Total Serangan Siber Terdeteksi & Termitigasi CSIRT',
    codeTag: 'SOC-CYBERSEC',
    category: 'Keamanan Siber',
    currentValue: '14.820 (98,7% Termitigasi)',
    targetValue: 'Tingkat Mitigasi Keamanan: ≥ 98,0%',
    statusText: 'Perlindungan SOC 24/7 Terjaga',
    statusVariant: 'success',
    summary: 'Jumlah anomali ancaman siber (DDoS, port scanning, malware, brute force, exploit) yang dideteksi SIEM NOC dan berhasil diblokir sebelum menembus perimeter sistem informasi.',
    presentationPitch: 'Security Operations Center (SOC) dan CSIRT BP Batam mendeteksi 14.820 aktivitas serangan siber sepanjang tahun 2026. Sebanyak 14.627 serangan (98,7%) berhasil dimitigasi dan diblokir secara otomatis oleh Next-Gen Firewall (NGFW) dan Web Application Firewall (WAF) tanpa ada kebocoran data (zero data breach).',
    formulaConceptual: '(Total Serangan Siber Termitigasi ÷ Total Serangan Siber Terdeteksi) × 100%',
    numerator: {
      label: 'Pembilang (Serangan Termitigasi)',
      realValue: '14.627 Insiden Sukses Diblokir (98,7%)',
      source: 'PDSI Item #12: SUM([pdsi_insiden_siber].[termitigasi])',
    },
    denominator: {
      label: 'Penyebut (Total Serangan Terdeteksi)',
      realValue: '14.820 Anomali / Event Ancaman Tervalidasi',
      source: 'PDSI Item #12: SUM([pdsi_insiden_siber].[total_serangan])',
    },
    calculationResult: '(14.627 ÷ 14.820) × 100% = 98,69% ≈ 98,7%',
    tableauCalculatedField: `// Calculated Field: [% Mitigasi Serangan Siber]
SUM([pdsi_insiden_siber].[termitigasi]) / SUM([pdsi_insiden_siber].[total_serangan]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #3 (Line Chart Tren Harian) & #12 (Pie/Donut Distribusi Vektor)',
      rows: '[vektor_serangan] (DDoS, Malware, Brute Force, Web Exploit)',
      columns: '[tanggal], SUM([total_serangan]), [% Mitigasi Serangan Siber]',
      marks: 'Color: Tingkat Keparahan (Critical, High, Medium, Low)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #12: Data Total Serangan Terhadap Keamanan IT',
      tableName: 'pdsi_serangan_keamanan_it',
      attributes: ['PERIODE', 'THREAT ACTIVITY', 'STATUS KEAMANAN', 'JML SERANGAN'],
      updateFrequency: 'Real-Time (Streaming Sensor SOC 24/7)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 98,0% Serangan Termitigasi Seketika',
      warning: '95,0% - 97,9% (Eskalasi ke tim tanggap darurat CSIRT)',
      critical: '< 95,0% / Ada sistem penting mengalami downtime',
      standardOrigin: 'Standar Keamanan Siber BSSN (Badan Siber dan Sandi Negara) & ISO 27001',
    },
    executiveAction: 'Lakukan penetration testing berkala setiap kuartal pada aplikasi perizinan publik dan perbarui rule WAF untuk mengantisipasi zero-day vulnerability.',
  },

  kepuasan_dc: {
    id: 'kepuasan_dc',
    unit: 'pdsi',
    title: 'Indeks Kepuasan Pelanggan Data Center (CSAT)',
    codeTag: 'CSAT-DC',
    category: 'Layanan & Helpdesk',
    currentValue: '94,2% (Indeks 4,71/5)',
    targetValue: 'Target Kepuasan: ≥ 90,0%',
    statusText: 'Kategori "Sangat Puas"',
    statusVariant: 'success',
    summary: 'Rasio kepuasan pengguna layanan fasilitas colocation data center, hosting aplikasi, jaringan interkoneksi, dan dukungan teknis 24/7.',
    presentationPitch: 'Indeks kepuasan pengguna data center mencapai 94,2% (skor rata-rata 4,71 dari 5,00) melampaui target perkin 90,0%. Responden mengapresiasi keandalan uptime kelistrikan tanpa gangguan, kecepatan respon helpdesk (SLA rata-rata 12 menit), dan keamanan fisik fasilitas biometrik.',
    formulaConceptual: '(Total Skor Responden ÷ (Jumlah Responden × Skor Maksimal 5)) × 100%',
    numerator: {
      label: 'Pembilang (Total Akumulasi Skor Survei)',
      realValue: '1.413 Poin (Dari 300 Responden Internal & Tenant)',
      source: 'PDSI Item #11: SUM([pdsi_kepuasan_pelanggan_dc].[persentase])',
    },
    denominator: {
      label: 'Penyebut (Skor Ideal Maksimum)',
      realValue: '1.500 Poin (300 Responden × Skor 5)',
      source: 'PDSI Item #11: (COUNT([pdsi_kepuasan_pelanggan_dc].[kategori]) * 5)',
    },
    calculationResult: '(1.413 ÷ 1.500) × 100% = 94,20%',
    tableauCalculatedField: `// Calculated Field: [CSAT Data Center %]
SUM([pdsi_kepuasan_pelanggan_dc].[persentase]) / (COUNT([pdsi_kepuasan_pelanggan_dc].[kategori]) * 5) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #6 (Horizontal Bar Kepuasan per Aspek)',
      rows: '[kategori], [tingkat_kepuasan]',
      columns: '[CSAT Data Center %]',
      marks: 'Color: Kategori (Hijau ≥ 90%, Kuning 80-89%, Merah < 80%)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #11: Tingkat Kepuasan Pelanggan Data Center',
      tableName: 'pdsi_kepuasan_pelanggan_dc',
      attributes: ['TAHUN', 'KATEGORI', 'TINGKAT KEPUASAN', 'PERSENTASE'],
      updateFrequency: 'Semesteran & Event-Based Survei',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 90,0% Kepuasan Pelanggan',
      warning: '80,0% - 89,9% (Evaluasi catatan perbaikan)',
      critical: '< 80,0% (Audit operasional tim helpdesk dan SLA)',
      standardOrigin: 'Standar Pelayanan Minimal (SPM) Kementerian PAN-RB & ISO 9001',
    },
    executiveAction: 'Tingkatkan otomasi ticketing helpdesk berbasis AI chatbot untuk mempertahankan respon time di bawah 10 menit.',
  },

  panjang_jalur_fo: {
    id: 'panjang_jalur_fo',
    unit: 'pdsi',
    title: 'Panjang Jalur Backbone Fiber Optik (FO)',
    codeTag: 'NET-FO-PANJANG',
    category: 'Infrastruktur & DC',
    currentValue: '284,5 KM',
    targetValue: '5 Koridor Utama Ring Pulau Batam',
    statusText: '100% Backbone Terhubung',
    statusVariant: 'info',
    summary: 'Total panjang rute fisik kabel serat optik bawah tanah dan udara yang membentang menghubungkan seluruh simpul strategis BP Batam.',
    presentationPitch: 'BP Batam mengoperasikan jalur kabel serat optik sepanjang 284,5 kilometer yang menjangkau seluruh aset vital di Pulau Batam, memastikan interkoneksi data center, gedung perkantoran satker, bandara, pelabuhan, dan rumah sakit beroperasi tanpa jeda.',
    formulaConceptual: 'SUM([PANJANG (KM)])',
    numerator: {
      label: 'Pembilang (Total Panjang Kabel Terpasang)',
      realValue: '284,5 KM (Akumulasi 5 Ruas Koridor)',
      source: 'PDSI Item #2: SUM([pdsi_jaringan_fiber_optik].[panjang])',
    },
    denominator: {
      label: 'Basis Pengukuran',
      realValue: 'Total Jarak Rute Fisik dalam Kilometer (KM)',
      source: 'PDSI Item #2: Jaringan Fiber Optik BP Batam (GIS Shapefile)',
    },
    calculationResult: 'Total Panjang = SUM(PANJANG) = 284,5 KM',
    tableauCalculatedField: `// Calculated Field: [Total Panjang Jalur FO (KM)]
SUM([pdsi_jaringan_fiber_optik].[panjang])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #10 (Geographic Maps) & #1 (Crosstab Segmen)',
      rows: '[ruas], [jalur]',
      columns: 'SUM([panjang])',
      marks: 'Map Line Path: Koordinat Rute, Color: Status Utilitas',
      filters: "[klasifikasi] = 'Backbone'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #2: Jaringan Fiber Optik BP Batam',
      tableName: 'pdsi_jaringan_fiber_optik',
      attributes: ['METADATA', 'REMARK', 'SHAPE_Leng', 'NAMOBJ', 'SRS_ID', 'FCODE', 'OBJECTID', 'JALUR', 'JLN', 'JMLHCORE', 'PANJANG', 'BRANDFO', 'STARTPOINT', 'ENDPOINT', 'RUAS', 'KLASIFIKASI'],
      updateFrequency: 'Bulanan (Hasil Patroli Jalur Kabel FO)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'Ketersediaan Jaringan (Network Uptime) ≥ 99,90%',
      warning: 'Waktu Perbaikan Putus Kabel > 4 Jam',
      critical: 'Putus Jalur Ring Utama (Penyebab blackout data)',
      standardOrigin: 'Service Level Agreement (SLA) Jaringan Telekomunikasi Nasional',
    },
    executiveAction: 'Lakukan koordinasi dengan Dinas Bina Marga dan kontraktor utilitas jalan untuk pencegahan insiden kabel putus akibat galian proyek pelebaran jalan.',
  },

  kapasitas_core_fo: {
    id: 'kapasitas_core_fo',
    unit: 'pdsi',
    title: 'Kapasitas Core Fiber Optik (Core FO)',
    codeTag: 'NET-CORE-FO',
    category: 'Infrastruktur & DC',
    currentValue: '288 Core',
    targetValue: '240 Core Aktif (83,3% Utilisasi)',
    statusText: 'Kapasitas Core Andal & Tersedia Cadangan',
    statusVariant: 'success',
    summary: 'Total jumlah core helaian serat optik (kapasitas kanal transmisi) yang tersedia di sepanjang ruas kabel backbone untuk transmisi multi-gigabit.',
    presentationPitch: 'Kapasitas serat optik BP Batam memiliki total 288 core yang terbagi dalam variasi kabel 96-core, 48-core, dan 24-core. Saat ini 240 core telah aktif mentransmisikan data sistem perizinan, CCTV analitik, dan VoIP, sementara 48 core (16,7%) disiapkan sebagai cadangan strategis (spare core).',
    formulaConceptual: 'SUM([JMLHCORE])',
    numerator: {
      label: 'Pembilang (Total Core Terpasang)',
      realValue: '288 Core (Akumulasi Jumlah Core per Ruas Jalur FO)',
      source: 'PDSI Item #2: SUM([pdsi_jaringan_fiber_optik].[jmlhcore])',
    },
    denominator: {
      label: 'Alokasi Penggunaan',
      realValue: '240 Core Aktif (83,3%) + 48 Core Spare/Cadangan (16,7%)',
      source: 'PDSI Item #2: Dokumentasi Core Assignment PDSI',
    },
    calculationResult: 'Total Core = SUM(JMLHCORE) = 288 Core',
    tableauCalculatedField: `// Calculated Field: [Total Kapasitas Core FO]
SUM([pdsi_jaringan_fiber_optik].[jmlhcore])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #23 (Bullet Graph)',
      rows: '[ruas], [brandfo]',
      columns: 'SUM([jmlhcore]), SUM([core_aktif])',
      marks: 'Color: Rasio Utilisasi Core, Label: Jml Core',
      filters: "[status] = 'Aktif'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #2: Jaringan Fiber Optik BP Batam',
      tableName: 'pdsi_jaringan_fiber_optik',
      attributes: ['METADATA', 'REMARK', 'SHAPE_Leng', 'NAMOBJ', 'SRS_ID', 'FCODE', 'OBJECTID', 'JALUR', 'JLN', 'JMLHCORE', 'PANJANG', 'BRANDFO', 'STARTPOINT', 'ENDPOINT', 'RUAS', 'KLASIFIKASI'],
      updateFrequency: 'Bulanan (Audit Core Splicing OTDR)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'Utilisasi Core 70% - 85% (Optimal dengan buffer spare)',
      warning: 'Utilisasi Core > 90% (Perlu penarikan kabel penambahan core)',
      critical: 'Kekurangan Core Cadangan (< 5% spare)',
      standardOrigin: 'Standar Infrastruktur Telekomunikasi ITU-T G.652 & TIA/EIA-568',
    },
    executiveAction: 'Pertahankan minimal 10% core kosong pada setiap ruas untuk jalur redundancy darurat jika terjadi pembelahan jalur (fiber cut).',
  },

  jaringan_fiber: {
    id: 'jaringan_fiber',
    unit: 'pdsi',
    title: 'Infrastruktur Jaringan Fiber Optik (FO) Backbone',
    codeTag: 'NET-FO-KM',
    category: 'Infrastruktur & DC',
    currentValue: '284,5 KM',
    targetValue: 'Menghubungkan 8 Wilayah Vital BP Batam',
    statusText: 'Backbone Aktif (Utilitas Core 81,4%)',
    statusVariant: 'info',
    summary: 'Total panjang jalur kabel serat optik bawah tanah yang menghubungkan kantor pusat BP Batam, bandara Hang Nadim, pelabuhan, rumah sakit, dan pos komando se-Pulau Batam.',
    presentationPitch: 'BP Batam mengoperasikan jaringan serat optik (Fiber Optic) sepanjang 284,5 kilometer yang menjangkau seluruh aset vital. Utilisasi core rata-rata berada pada 81,4% dengan ketersediaan koneksi 99,95%, memastikan pertukaran data CCTV, perizinan, dan sistem ERP berjalan tanpa latensi.',
    formulaConceptual: 'SUM([Panjang Kabel Fiber Optik per Ruas Segmen Jaringan (KM)])',
    numerator: {
      label: 'Segmen Utama Backbone',
      realValue: '198,2 KM (Jalur Ring Pusat Kota, Pelabuhan & Bandara)',
      source: 'PDSI Item #2: SUM([pdsi_jaringan_fiber_optik].[panjang])',
    },
    denominator: {
      label: 'Segmen Distribusi & Akses Gedung',
      realValue: '86,3 KM (Koneksi Gedung Satker & Pos Lapangan)',
      source: 'PDSI Item #2: SUM([pdsi_jaringan_fiber_optik].[panjang])',
    },
    calculationResult: 'Total FO = 198,2 KM + 86,3 KM = 284,5 KM',
    tableauCalculatedField: `// Calculated Field: [Total Panjang Jaringan FO (KM)]
SUM([pdsi_jaringan_fiber_optik].[panjang])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #10 (Geographic Maps) & #1 (Crosstab Segmen)',
      rows: '[ruas], [jalur]',
      columns: 'SUM([panjang]), AVG([jmlhcore])',
      marks: 'Map Line Path: Koordinat Rute, Color: Status Utilitas',
      filters: "[klasifikasi] = 'Backbone'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #2: Jaringan Fiber Optik BP Batam',
      tableName: 'pdsi_jaringan_fiber_optik',
      attributes: ['METADATA', 'REMARK', 'SHAPE_Leng', 'NAMOBJ', 'SRS_ID', 'FCODE', 'OBJECTID', 'JALUR', 'JLN', 'JMLHCORE', 'PANJANG', 'BRANDFO', 'STARTPOINT', 'ENDPOINT', 'RUAS', 'KLASIFIKASI'],
      updateFrequency: 'Bulanan (Hasil Patroli Jalur Kabel FO)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'Ketersediaan Jaringan (Network Uptime) ≥ 99,90%',
      warning: 'Waktu Perbaikan Putus Kabel > 4 Jam',
      critical: 'Putus Jalur Ring Utama (Penyebab blackout data)',
      standardOrigin: 'Service Level Agreement (SLA) Jaringan Telekomunikasi Nasional',
    },
    executiveAction: 'Lakukan koordinasi dengan Dinas Bina Marga dan kontraktor utilitas jalan untuk pencegahan insiden kabel putus akibat galian proyek pelebaran jalan.',
  },

  jumlah_server: {
    id: 'jumlah_server',
    unit: 'pdsi',
    title: 'Inventaris Server Fisik & Node Hyperconverged (HCI)',
    codeTag: 'INFRA-SRV',
    category: 'Infrastruktur & DC',
    currentValue: '58 Server',
    targetValue: '48 Server Aktif • 10 Node Standby/DRC',
    statusText: 'Infrastruktur Komputasi Andal',
    statusVariant: 'info',
    summary: 'Total mesin server fisik (rackmount & blade) serta klaster node Hyperconverged Infrastructure (HCI) yang menjalankan virtual machine private cloud BP Batam.',
    presentationPitch: 'Infrastruktur komputasi data center diperkuat oleh 58 server fisik dan node HCI, terdiri atas 48 unit beroperasi aktif melayani beban aplikasi 24 jam dan 10 unit node siaga di DRC Sekupang untuk failover otomatis saat terjadi kendala darurat.',
    formulaConceptual: 'COUNT([Daftar Seluruh Node Server Fisik dan Klaster Komputasi Aktif])',
    numerator: {
      label: 'Server Aktif Produksi',
      realValue: '48 Unit (HCI Nutanix/VMware Klaster Produksi)',
      source: "PDSI Item #13: SUM([pdsi_infrastruktur_server_storage].[jumlah])",
    },
    denominator: {
      label: 'Node Standby & DRC Sekupang',
      realValue: '10 Unit (Node Failover & Backup)',
      source: "PDSI Item #13: SUM([pdsi_infrastruktur_server_storage].[jumlah])",
    },
    calculationResult: 'Total Server = 48 (Produksi) + 10 (DRC) = 58 Server Fisik',
    tableauCalculatedField: `// Calculated Field: [Total Inventaris Server]
SUM([pdsi_infrastruktur_server_storage].[jumlah])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #14 (Treemap Pemanfaatan CPU/RAM)',
      rows: '[tipe], [brand]',
      columns: 'SUM([jumlah]), [status_garansi]',
      marks: 'Color: Status Garansi (Aktif, Extended, EOS)',
      filters: "[status_garansi] IN ('Aktif', 'Extended')",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #13: Jumlah Server BP Batam',
      tableName: 'pdsi_infrastruktur_server_storage',
      attributes: ['TANGGAL REKAP', 'NAMA SERVER', 'JUMLAH', 'TIPE', 'BRAND', 'TGL GARANSI', 'STATUS GARANSI', 'EOS'],
      updateFrequency: 'Harian (Integrasi SNMP Monitoring)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'Utilisasi CPU Rata-rata 40% - 70% (Beban Seimbang)',
      warning: 'Utilisasi CPU > 85% Berkelanjutan',
      critical: 'Kegagalan Node Klaster (High Availability Trigger)',
      standardOrigin: 'Enterprise Architecture & Cloud Computing Standards',
    },
    executiveAction: 'Lakukan peremajaan bertahap pada 6 server generasi lama yang telah mencapai usia pakai 5 tahun untuk efisiensi konsumsi daya listrik.',
  },

  jumlah_aplikasi: {
    id: 'jumlah_aplikasi',
    unit: 'pdsi',
    title: 'Portfolio Aplikasi Layanan Publik & Sistem Internal',
    codeTag: 'APP-PORTFOLIO',
    category: 'Tata Kelola SPBE & Data',
    currentValue: '114 Aplikasi',
    targetValue: '84 Aplikasi Aktif • 30 Tahap Konsolidasi',
    statusText: 'Rasionalisasi & Integrasi Single Sign-On',
    statusVariant: 'success',
    summary: 'Total sistem informasi berbasis web dan mobile yang terdaftar dalam katalog arsitektur aplikasi BP Batam untuk pelayanan perizinan investor maupun manajemen internal.',
    presentationPitch: 'PDSI mengelola portfolio 114 sistem informasi, di mana 84 aplikasi merupakan sistem inti layanan publik (IBOSS, e-Billing, SIMKEU, SIPRO, Pelabuhan) dan 30 aplikasi lainnya sedang dalam roadmap simplifikasi dan integrasi menuju portal tunggal terpadu BP Batam sesuai mandat SPBE nasional.',
    formulaConceptual: 'COUNTD([Kode Aplikasi Terdaftar dalam Katalog Sistem Informasi])',
    numerator: {
      label: 'Aplikasi Pelayanan Publik',
      realValue: '52 Aplikasi (Perizinan Usaha, UWT, Bandara, Pelabuhan, SPAM)',
      source: 'PDSI Item #14: COUNTD([pdsi_data_aplikasi].[nama_aplikasi])',
    },
    denominator: {
      label: 'Aplikasi Administrasi Internal',
      realValue: '62 Aplikasi (SIMKEU, e-Office, SDM, Aset, Kepegawaian)',
      source: 'PDSI Item #14: COUNTD([pdsi_data_aplikasi].[nama_aplikasi])',
    },
    calculationResult: 'Total Aplikasi = 52 (Publik) + 62 (Internal) = 114 Aplikasi Terdaftar',
    tableauCalculatedField: `// Calculated Field: [Jumlah Aplikasi Terkatalog]
COUNTD([pdsi_data_aplikasi].[nama_aplikasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Matrix) & #12 (Donut Chart Kategori Layanan)',
      rows: '[kategori_aplikasi], [unit_operasional]',
      columns: 'COUNTD([nama_aplikasi])',
      marks: 'Color: [status] (Aktif, Migrasi, Pembaruan)',
      filters: "[status] = 'Aktif'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #14: Jumlah Aplikasi BP Batam',
      tableName: 'pdsi_data_aplikasi',
      attributes: ['NAMA APLIKASI', 'URAIAN APLIKASI', 'BASIS APLIKASI', 'TIPE LISENSI APLIKASI', 'BAHASA PEMOGRAMAN', 'KERANGKA PENGEMBANG', 'UNIT PENGEMBANG', 'UNIT OPERASIONAL', 'INSTANSI', 'KATEGORI APLIKASI', 'TANDA TANGAN ELEKTRONIK', 'KLASIFIKASI APLIKASI', 'DOMAIN', 'STATUS', 'DEV YEAR'],
      updateFrequency: 'Bulanan (Review Komite Tata Kelola TIK)',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '100% Aplikasi Inti Terhubung API Gateway & Single Sign-On',
      warning: 'Aplikasi standalone tanpa integrasi pertukaran data',
      critical: 'Aplikasi tanpa pembaruan keamanan (end-of-life framework)',
      standardOrigin: 'Arsitektur SPBE Nasional & Perpres Satu Data Indonesia',
    },
    executiveAction: 'Lanjutkan penggabungan aplikasi terfragmentasi ke dalam SuperApp Eksekutif BP Batam untuk mempermudah akses pimpinan dalam pengambilan keputusan berbasis data.',
  },

  // ==========================================
  // TABLE-LEVEL KPIS (BIRO KEUANGAN & PDSI)
  // ==========================================
  saldo_bank_realtime: {
    id: 'saldo_bank_realtime',
    unit: 'biro-keuangan',
    title: 'Laporan Saldo Bank Real Time & Ketahanan Kas Operasional (Item 13)',
    codeTag: 'KEU-ITEM-13',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 1.524,0 M (3,89 Bulan CCR)',
    targetValue: 'Standar PMK BLU: ≥ 3,00 Bulan Operasional',
    statusText: 'Likuiditas Sangat Prima',
    statusVariant: 'success',
    summary: 'Konsolidasi saldo kas harian dan real time dari seluruh rekening bank mitra BLU BP Batam (Giro Penerimaan, Pengeluaran, Operasional, dan Deposito Berjangka).',
    presentationPitch: 'Total likuiditas kas operasional BP Batam saat ini tercatat sebesar Rp 1,52 Triliun pada 7 bank mitra pemerintah. Nilai ini setara dengan 3,89 bulan ketahanan pengeluaran operasional (di atas benchmark aman Kemenkeu 3 bulan), memastikan seluruh agenda pembayaran proyek infrastruktur dan operasional rutin berjalan lancar tanpa kendala kas.',
    formulaConceptual: 'Total Saldo Kas Bank Riil ÷ (Rata-rata Realisasi Belanja Bulanan)',
    numerator: {
      label: 'Pembilang (Saldo Riil Bank Mitra)',
      realValue: 'Rp 1.524.000.000.000 (Konsolidasi 7 Bank)',
      source: 'SIMKEU Item #13: SUM([keu_saldo_bank_realtime].[nilai])',
    },
    denominator: {
      label: 'Penyebut (Belanja Bulanan Rata-rata)',
      realValue: 'Rp 390.720.000.000 / bulan',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) / 12',
    },
    calculationResult: '1.524,0 M ÷ 390,72 M = 3,89 Bulan (Rasio Sangat Sehat)',
    tableauCalculatedField: `// Calculated Field: [Ketahanan Kas Operasional (Bulan)]
SUM([keu_saldo_bank_realtime].[nilai]) / (SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) / 12)`,
    tableauShelvesGuide: {
      showMe: 'Show Me #6 (Horizontal Bar) & #1 (Crosstab Detail)',
      rows: '[nama_bank], [nomor_rekening]',
      columns: 'SUM([nilai]), [kategori_rekening]',
      marks: 'Color: [kategori_rekening], Label: SUM([nilai]) dalam Rp Miliar',
      filters: "[tanggal_rekap] = MAX([tanggal_rekap])",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #13: Laporan Saldo Bank Real-time',
      tableName: 'keu_saldo_bank_realtime',
      attributes: ['NAMA BANK', 'UNIT', 'KATEGORI UNIT', 'NOMOR REKENING', 'KEGUNAAN REKENING', 'KATEGORI REKENING', 'TANGGAL REKAP', 'NILAI'],
      updateFrequency: 'Perbulan & H2H Bank Real Time',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 3,00 Bulan Kebutuhan Operasional',
      warning: '1,50 - 2,99 Bulan (Monitoring harian arus kas)',
      critical: '< 1,50 Bulan (Intervensi pengetatan kas)',
      standardOrigin: 'Pedoman Pengelolaan Kas Badan Layanan Umum Kemenkeu RI',
    },
    executiveAction: 'Optimalkan penempatan dana idle pada instrumen Deposito On Call (DOC) bank mitra dengan suku bunga kompetitif guna memacu pendapatan jasa giro/bunga BLU.',
  },

  keseimbangan_surplus: {
    id: 'keseimbangan_surplus',
    unit: 'biro-keuangan',
    title: 'Keseimbangan Surplus & Defisit Operasional per Satuan Kerja',
    codeTag: 'KEU-SURPLUS-NET',
    category: 'Pendapatan & PNBP',
    currentValue: '+Rp 196,0 M (Surplus Bersih)',
    targetValue: 'Realisasi PNBP > Realisasi Belanja',
    statusText: 'Surplus Fiskal Solid',
    statusVariant: 'success',
    summary: 'Selisih bersih antara total pendapatan kas PNBP fungsional dengan realisasi belanja operasional dan modal per unit kerja pengampu di lingkungan BP Batam.',
    presentationPitch: 'Secara konsolidasian, BP Batam membukukan surplus operasional bersih sebesar +Rp 196,0 Miliar. Unit komersial strategis seperti Direktorat Pengelolaan Pertanahan (+Rp 367 M), Kantor Bandara Hang Nadim (+Rp 173 M), dan Direktorat Kepelabuhanan (+Rp 67,2 M) menjadi motor utama pencetak surplus yang menopang subsidi silang bagi satker pembangunan infrastruktur publik.',
    formulaConceptual: 'SUM([keu_target_pnbp_rekap].[realisasi]) - SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    numerator: {
      label: 'Total Realisasi Kas Masuk PNBP',
      realValue: 'Rp 981.240.000.000 (YTD 2026)',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    denominator: {
      label: 'Total Realisasi Belanja SP2D',
      realValue: 'Rp 785.240.000.000 (Unit Terkait)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    },
    calculationResult: '981,24 M - 785,24 M = +196,00 M (Net Surplus Fiskal Operasional)',
    tableauCalculatedField: `// Calculated Field: [Surplus Defisit Bersih]
ZN(SUM([keu_target_pnbp_rekap].[realisasi])) - ZN(SUM([keu_laporan_realisasi_anggaran_blu].[realisasi]))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #6 (Diverging Horizontal Bar) & #1 (Text Table)',
      rows: '[nama_unit]',
      columns: '[Surplus Defisit Bersih]',
      marks: 'Color: Diverging Palette (Hijau > 0, Merah < 0)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #8 (Target PNBP) & Item #3 (Laporan Realisasi Belanja BLU)',
      tableName: 'keu_target_pnbp_rekap & keu_laporan_realisasi_anggaran_blu',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Bulanan (Rekonsiliasi Akuntansi)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Surplus Kas Positif (> Rp 0)',
      warning: 'Break-even (Rp -10 M s.d. Rp 0)',
      critical: 'Defisit Melampaui Cadangan Silang',
      standardOrigin: 'Indikator Kinerja Kemandirian BLU Ditjen Anggaran Kemenkeu',
    },
    executiveAction: 'Akselerasikan penagihan piutang UWT dan tarif kepelabuhanan semester berjalan untuk menjaga surplus kas di atas Rp 200 Miliar.',
  },

  arus_kas: {
    id: 'arus_kas',
    unit: 'biro-keuangan',
    title: 'Laporan Penerimaan Sumber Dana & Arus Kas BLU (Item 14)',
    codeTag: 'KEU-ITEM-14',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 265,1 M / Bulan (Rata-rata Inflow)',
    targetValue: 'Net Cash Inflow Bulanan Positif',
    statusText: 'Cash Inflow Stabil',
    statusVariant: 'success',
    summary: 'Penerimaan kas masuk dari sumber pendanaan PNBP fungsional, Rupiah Murni APBN, dan hibah ke rekening kas BLU BP Batam per periode cut-off.',
    presentationPitch: 'Rata-rata penerimaan kas masuk (cash inflow) mencapai Rp 265,1 Miliar per bulan dengan tren positif. Puncak penerimaan terjadi pada kuartal II seiring siklus perpanjangan izin alokasi lahan industri dan volume bongkar muat kargo pelabuhan, memberikan jaminan kelancaran likuiditas belanja.',
    formulaConceptual: 'SUM([keu_penerimaan_sumber_dana].[nilai]) ÷ Jumlah Bulan Periode',
    numerator: {
      label: 'Akumulasi Kas Masuk Sumber Dana',
      realValue: 'Rp 1.060.400.000.000 (Januari - April)',
      source: 'SIMKEU Item #14: SUM([keu_penerimaan_sumber_dana].[nilai])',
    },
    denominator: {
      label: 'Periode Waktu Berjalan',
      realValue: '4 Bulan Berjalan (TA 2026)',
      source: 'Kalender Anggaran',
    },
    calculationResult: '1.060,4 M ÷ 4 = Rp 265,1 Miliar / bulan',
    tableauCalculatedField: `// Calculated Field: [Rata-rata Inflow Bulanan]
SUM([keu_penerimaan_sumber_dana].[nilai]) / COUNTD([keu_penerimaan_sumber_dana].[tanggal_rekap_akhir])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #3 (Line Chart Tren Kas Masuk) & #1 (Crosstab)',
      rows: '[sumber_dana], [unit_kerja]',
      columns: '[tanggal_rekap_akhir], SUM([nilai])',
      marks: 'Line with Data Markers, Color: Sumber Dana',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #14: Laporan Penerimaan Sumber Dana',
      tableName: 'keu_penerimaan_sumber_dana',
      attributes: ['SUMBER DANA', 'UNIT KERJA', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NILAI'],
      updateFrequency: 'Perbulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Inflow Bulanan ≥ Rp 200,0 M',
      warning: 'Inflow Bulanan Rp 150,0 M - Rp 199,9 M',
      critical: 'Inflow Bulanan < Rp 150,0 M',
      standardOrigin: 'Manajemen Likuiditas Kas Korporasi BLU BP Batam',
    },
    executiveAction: 'Monitor integrasi e-billing pada loket penerimaan pelabuhan dan rumah sakit untuk mencegah keterlambatan penyetoran kas.',
  },

  rev_target: {
    id: 'rev_target',
    unit: 'biro-keuangan',
    title: 'Target PNBP Penetapan Kinerja (Perkin) 2026 (Item 8)',
    codeTag: 'KEU-TARGET-PNBP',
    category: 'Pendapatan & PNBP',
    currentValue: 'Rp 2.447,5 M',
    targetValue: 'Plafon Target Resmi DIPA 2026',
    statusText: 'Target Resmi Disahkan',
    statusVariant: 'info',
    summary: 'Plafon target PNBP yang ditetapkan dalam dokumen Perkin dan DIPA bagi 10 Satker Penghasil di lingkungan BP Batam.',
    presentationPitch: 'Target penerimaan PNBP tahun 2026 ditetapkan sebesar Rp 2,45 Triliun. Target ini ditopang oleh kontribusi UWT Pertanahan (38%), Pelabuhan (26%), Bandara Hang Nadim (18%), dan layanan utilitas kawasan lainnya yang telah disesuaikan dengan proyeksi pertumbuhan investasi Batam.',
    formulaConceptual: 'SUM([keu_target_pnbp_rekap].[jumlah])',
    numerator: {
      label: 'Target Kumulatif 10 Satker',
      realValue: 'Rp 2.447.464.960.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[jumlah])',
    },
    denominator: {
      label: 'Satker Pengampu',
      realValue: '10 Unit Kerja Penghasil Penerimaan',
      source: 'SIMKEU Item #8: COUNTD([keu_target_pnbp_rekap].[nama_unit])',
    },
    calculationResult: 'Total Target = Rp 2.447,46 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Target PNBP]
SUM([keu_target_pnbp_rekap].[jumlah])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #6 (Bar Target per Satker)',
      rows: '[nama_unit]',
      columns: 'SUM([jumlah])',
      marks: 'Bar Chart with Total Reference Line',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #8: Rekapitulasi Target PNBP',
      tableName: 'keu_target_pnbp_rekap',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH'],
      updateFrequency: 'Pertahun (Revisi DIPA jika ada)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '100% Target Perkin Disahkan Kemenkeu',
      warning: 'Deviasi Target > 10% saat Revisi',
      critical: 'Target Belum Terakomodir DIPA',
      standardOrigin: 'DIPA Penetapan Kinerja (Perkin) 2026 BP Batam',
    },
    executiveAction: 'Pastikan seluruh satker penghasil menyusun roadmap pemenuhan target bulanan berbasis potensi kontrak eksisting.',
  },

  rev_real: {
    id: 'rev_real',
    unit: 'biro-keuangan',
    title: 'Realisasi PNBP Year-to-Date (YTD) (Item 8)',
    codeTag: 'KEU-REAL-PNBP',
    category: 'Pendapatan & PNBP',
    currentValue: 'Rp 981,2 M',
    targetValue: 'Target Proporsional April: 33,3% - 40,0%',
    statusText: 'Kas Masuk Bersih Terkonfirmasi',
    statusVariant: 'success',
    summary: 'Kas masuk PNBP riil yang telah disetor oleh wajib bayar dan tervalidasi masuk rekening kas BLU BP Batam.',
    presentationPitch: 'Realisasi kas masuk PNBP YTD telah menembus Rp 981,2 Miliar (40,1% dari target). Tren penerimaan berada dalam lintasan sangat positif, tumbuh +12,3% dibandingkan periode yang sama tahun lalu.',
    formulaConceptual: 'SUM([keu_target_pnbp_rekap].[realisasi])',
    numerator: {
      label: 'Total Realisasi Kas Masuk',
      realValue: 'Rp 981.240.000.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    denominator: {
      label: 'Jumlah Transaksi Setoran',
      realValue: '18.420 Dokumen Billing Terbayar',
      source: 'SIMKEU e-Billing Host-to-Host',
    },
    calculationResult: 'Total Realisasi = Rp 981,24 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Realisasi PNBP]
SUM([keu_target_pnbp_rekap].[realisasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #3 (Line Trend Harian)',
      rows: '[nama_unit]',
      columns: 'SUM([realisasi])',
      marks: 'Bar with Green Palette',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #8: Rekapitulasi Target PNBP',
      tableName: 'keu_target_pnbp_rekap',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH'],
      updateFrequency: 'Harian (Cut-Off 23:59 WIB)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 40,0% pada April 2026',
      warning: '30,0% - 39,9%',
      critical: '< 30,0%',
      standardOrigin: 'Kurva S Penerimaan Perkin BLU BP Batam',
    },
    executiveAction: 'Pertahankan sistem insentif percepatan pembayaran billing UWT sebelum tanggal jatuh tempo.',
  },

  rev_capaian: {
    id: 'rev_capaian',
    unit: 'biro-keuangan',
    title: 'Persentase Capaian Target PNBP BP Batam',
    codeTag: 'KEU-PCT-CAPAIAN',
    category: 'Pendapatan & PNBP',
    currentValue: '40,1% (On Track)',
    targetValue: 'Target Proporsional Q2: 50,0%',
    statusText: 'Kinerja Prima',
    statusVariant: 'success',
    summary: 'Rasio persentase antara realisasi penerimaan kas riil terhadap target DIPA Perkin pada periode berjalan.',
    presentationPitch: 'Capaian 40,1% pada bulan keempat membuktikan efektivitas penagihan dan keandalan pendapatan berbasis kontrak jangka panjang BP Batam.',
    formulaConceptual: '(SUM([keu_target_pnbp_rekap].[realisasi]) ÷ SUM([keu_target_pnbp_rekap].[jumlah])) × 100%',
    numerator: {
      label: 'Realisasi PNBP',
      realValue: 'Rp 981.240.000.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    denominator: {
      label: 'Target DIPA',
      realValue: 'Rp 2.447.464.960.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[jumlah])',
    },
    calculationResult: '(981,24 ÷ 2.447,46) × 100% = 40,09% ≈ 40,1%',
    tableauCalculatedField: `// Calculated Field: [% Capaian PNBP]
SUM([keu_target_pnbp_rekap].[realisasi]) / SUM([keu_target_pnbp_rekap].[jumlah]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #7 (Bullet Graph with Reference Line)',
      rows: '[nama_unit]',
      columns: '[% Capaian PNBP]',
      marks: 'Bullet with Reference Line at 50%',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #8: Rekapitulasi Target PNBP',
      tableName: 'keu_target_pnbp_rekap',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH'],
      updateFrequency: 'Harian',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 40,0% di April',
      warning: '30,0% - 39,9%',
      critical: '< 30,0%',
      standardOrigin: 'Standar Monitoring Perkin BP Batam',
    },
    executiveAction: 'Jaga akselerasi satker di bawah 30% capaian dengan asistensi billing penagihan.',
  },

  rev_sisa: {
    id: 'rev_sisa',
    unit: 'biro-keuangan',
    title: 'Sisa Target Perkin PNBP TA 2026',
    codeTag: 'KEU-SISA-TARGET',
    category: 'Pendapatan & PNBP',
    currentValue: 'Rp 1.466,2 M',
    targetValue: 'Target Sisa Menuju 100%',
    statusText: 'Sisa Target Terkendali',
    statusVariant: 'info',
    summary: 'Sisa nominal penerimaan PNBP yang harus dihimpun hingga akhir tahun anggaran untuk mencapai 100% Perkin.',
    presentationPitch: 'Sisa target yang harus dipenuhi hingga akhir tahun adalah Rp 1,47 Triliun. Berdasarkan potensi piutang lancar dan tagihan rutin semester II, target ini sangat realistis tercapai bahkan berpotensi melampaui 105%.',
    formulaConceptual: 'SUM([keu_target_pnbp_rekap].[jumlah]) - SUM([keu_target_pnbp_rekap].[realisasi])',
    numerator: {
      label: 'Target DIPA',
      realValue: 'Rp 2.447.464.960.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[jumlah])',
    },
    denominator: {
      label: 'Realisasi Terkumpul',
      realValue: 'Rp 981.240.000.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    calculationResult: '2.447,46 M - 981,24 M = Rp 1.466,22 Miliar',
    tableauCalculatedField: `// Calculated Field: [Sisa Target PNBP]
SUM([keu_target_pnbp_rekap].[jumlah]) - SUM([keu_target_pnbp_rekap].[realisasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Text Table) & #13 (Stacked Bar Gap)',
      rows: '[nama_unit]',
      columns: '[Sisa Target PNBP]',
      marks: 'Color: Amber Palette',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #8: Rekapitulasi Target PNBP',
      tableName: 'keu_target_pnbp_rekap',
      attributes: ['KODE KEGIATAN', 'NAMA UNIT', 'NAMA LAYANAN', 'JUMLAH'],
      updateFrequency: 'Harian',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Sisa < 60% di April',
      warning: '60% - 70%',
      critical: '> 70%',
      standardOrigin: 'Monitoring Progres DIPA BP Batam',
    },
    executiveAction: 'Susun rencana penagihan intensif pada satker pengelola pelabuhan dan pertanahan pada Q3.',
  },

  exp_pagu: {
    id: 'exp_pagu',
    unit: 'biro-keuangan',
    title: 'Pagu DIPA Alokasi Belanja BLU TA 2026 (Item 3)',
    codeTag: 'KEU-PAGU-DIPA',
    category: 'Belanja & Anggaran',
    currentValue: 'Rp 3.318,5 M',
    targetValue: 'Plafon Belanja Resmi DIPA',
    statusText: 'Alokasi Pagu APBN',
    statusVariant: 'info',
    summary: 'Plafon alokasi belanja operasional, belanja pegawai, barang/jasa, dan belanja modal yang disahkan Ditjen Perbendaharaan.',
    presentationPitch: 'Pagu DIPA Belanja 2026 tercatat sebesar Rp 3,32 Triliun. Alokasi terbesar diarahkan untuk belanja modal infrastruktur konektivitas Batam (56%) guna memperkuat daya saing kawasan perdagangan bebas.',
    formulaConceptual: 'SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    numerator: {
      label: 'Pagu Total DIPA',
      realValue: 'Rp 3.318.500.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    },
    denominator: {
      label: 'Komposisi Belanja',
      realValue: 'Belanja Pegawai, Barang, Modal, dan Operasional',
      source: 'SIMKEU Item #3: [kategori]',
    },
    calculationResult: 'Total Pagu = Rp 3.318,50 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Pagu Belanja]
SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #12 (Treemap Komposisi Belanja)',
      rows: '[kategori]',
      columns: 'SUM([anggaran])',
      marks: 'Color: [jenis_anggaran]',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #3: Laporan Realisasi Anggaran BLU',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'TRIWULAN', 'TAHUN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Pertriwulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'DIPA 100% Sinkron OMSPAN',
      warning: 'Revisi Halaman III DIPA',
      critical: 'Pagu Terblokir (Automatic Rollback)',
      standardOrigin: 'DIPA APBN BP Batam 2026',
    },
    executiveAction: 'Pastikan kelengkapan dokumen pendukung lelang agar tidak ada alokasi pagu belanja modal yang terblokir.',
  },

  exp_real: {
    id: 'exp_real',
    unit: 'biro-keuangan',
    title: 'Realisasi Belanja Riil BLU BP Batam (Item 3)',
    codeTag: 'KEU-REAL-BELANJA',
    category: 'Belanja & Anggaran',
    currentValue: 'Rp 945,0 M',
    targetValue: 'Penyerapan Sehat Sesuai RPD',
    statusText: 'SP2D Terbit & Cair',
    statusVariant: 'success',
    summary: 'Akumulasi pencairan dana belanja negara melalui penerbitan SP2D yang telah disahkan bendahara perbendaharaan.',
    presentationPitch: 'Realisasi belanja mencapai Rp 945,0 Miliar hingga April, berjalan tertib sesuai rencana penarikan dana tanpa dispensasi SPM dari Kemenkeu.',
    formulaConceptual: 'SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    numerator: {
      label: 'Realisasi Belanja SP2D',
      realValue: 'Rp 945.020.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    },
    denominator: {
      label: 'Pagu Anggaran',
      realValue: 'Rp 3.318.500.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    },
    calculationResult: 'Total Realisasi = Rp 945,02 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Realisasi Belanja]
SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #6 (Bar Realisasi per Kategori)',
      rows: '[kategori]',
      columns: 'SUM([realisasi])',
      marks: 'Color: Blue Palette',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #3: Laporan Realisasi Anggaran BLU',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'TRIWULAN', 'TAHUN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Pertriwulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 25,0% di April',
      warning: '18,0% - 24,9%',
      critical: '< 18,0%',
      standardOrigin: 'Indikator Kinerja Pelaksanaan Anggaran (IKPA)',
    },
    executiveAction: 'Dorong penagihan termin uang muka pekerjaan konstruksi oleh PPK.',
  },

  exp_serapan: {
    id: 'exp_serapan',
    unit: 'biro-keuangan',
    title: 'Tingkat Serapan Belanja Pagu DIPA BLU',
    codeTag: 'KEU-PCT-SERAPAN',
    category: 'Belanja & Anggaran',
    currentValue: '28,5% (On Track)',
    targetValue: 'Target Q2: ≥ 35,0%',
    statusText: 'Serapan Anggaran Sesuai Kurva',
    statusVariant: 'success',
    summary: 'Persentase rasio serapan belanja terhadap total pagu anggaran DIPA.',
    presentationPitch: 'Tingkat serapan belanja 28,5% berada dalam kurva normal pelaksanaan anggaran kuartal kedua, didominasi belanja rutin dan uang muka proyek strategis.',
    formulaConceptual: '(SUM([keu_laporan_realisasi_anggaran_blu].[realisasi]) ÷ SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])) × 100%',
    numerator: {
      label: 'Realisasi Belanja',
      realValue: 'Rp 945.020.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    },
    denominator: {
      label: 'Pagu Anggaran',
      realValue: 'Rp 3.318.500.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    },
    calculationResult: '(945,02 ÷ 3.318,50) × 100% = 28,48% ≈ 28,5%',
    tableauCalculatedField: `// Calculated Field: [% Serapan Belanja]
SUM([keu_laporan_realisasi_anggaran_blu].[realisasi]) / SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #7 (Bullet Graph with Reference Line)',
      rows: '[kategori]',
      columns: '[% Serapan Belanja]',
      marks: 'Bullet with Reference Line at 35%',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #3: Laporan Realisasi Anggaran BLU',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'TRIWULAN', 'TAHUN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Pertriwulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 35,0% pada akhir Q2',
      warning: '25,0% - 34,9%',
      critical: '< 25,0%',
      standardOrigin: 'Standar Evaluasi IKPA Ditjen Perbendaharaan',
    },
    executiveAction: 'Akselerasi lelang proyek fisik dan penyelesaian administrasi SPM.',
  },

  exp_sisa: {
    id: 'exp_sisa',
    unit: 'biro-keuangan',
    title: 'Sisa Pagu Belanja DIPA BLU TA 2026',
    codeTag: 'KEU-SISA-PAGU',
    category: 'Belanja & Anggaran',
    currentValue: 'Rp 2.373,5 M',
    targetValue: 'Terserap Optimal 95% - 98%',
    statusText: 'Pagu Tersedia Cukup',
    statusVariant: 'info',
    summary: 'Sisa pagu anggaran belanja yang belum diterbitkan SP2D-nya dan siap dieksekusi pada kuartal II, III, dan IV.',
    presentationPitch: 'Sisa pagu belanja sebesar Rp 2,37 Triliun telah dialokasikan secara terjadwal untuk termin pembayaran kontrak konstruksi multi-years dan belanja barang layanan operasional.',
    formulaConceptual: 'SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) - SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    numerator: {
      label: 'Pagu Total',
      realValue: 'Rp 3.318.500.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[anggaran])',
    },
    denominator: {
      label: 'Realisasi SP2D',
      realValue: 'Rp 945.020.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])',
    },
    calculationResult: '3.318,50 M - 945,02 M = Rp 2.373,48 Miliar',
    tableauCalculatedField: `// Calculated Field: [Sisa Pagu Belanja]
SUM([keu_laporan_realisasi_anggaran_blu].[anggaran]) - SUM([keu_laporan_realisasi_anggaran_blu].[realisasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Detail) & #13 (Stacked Bar)',
      rows: '[kategori]',
      columns: '[Sisa Pagu Belanja]',
      marks: 'Color: Slate/Gray Palette',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #3: Laporan Realisasi Anggaran BLU',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'TRIWULAN', 'TAHUN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Pertriwulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Sisa Pagu Terencana 100%',
      warning: 'Potensi Sisa Anggaran Lebih (SILPA) Berlebih',
      critical: 'Gagal Lelang Konstruksi',
      standardOrigin: 'Monitoring Pelaksanaan Anggaran BP Batam',
    },
    executiveAction: 'Rapatkan koordinasi dengan satker infrastruktur untuk memastikan jadwal penyerapan sesuai rencana.',
  },

  rincian_pnbp_total: {
    id: 'rincian_pnbp_total',
    unit: 'biro-keuangan',
    title: 'Rincian Target Penerimaan Negara Bukan Pajak (PNBP) (Item 7)',
    codeTag: 'KEU-ITEM-07',
    category: 'Pendapatan & PNBP',
    currentValue: 'Rp 2.447,5 M (Detail Tarif)',
    targetValue: 'Kepatuhan PP Tarif Layanan',
    statusText: 'Rincian Akun Lengkap',
    statusVariant: 'info',
    summary: 'Struktur rincian penerimaan PNBP berdasarkan satuan, volume layanan, besaran tarif PP, dan mata uang transaksi per kode akun.',
    presentationPitch: 'Rincian target PNBP memetakan seluruh pos layanan komersial BP Batam sesuai PP Tarif, memastikan setiap penerimaan memiliki dasar hukum dan formula perhitungan volume x tarif yang transparan.',
    formulaConceptual: 'SUM([keu_target_pnbp_rincian].[volume] * [keu_target_pnbp_rincian].[tarif])',
    numerator: {
      label: 'Volume Satuan Layanan',
      realValue: 'Volume m2 lahan, GT kapal, pax penumpang, m3 air',
      source: 'SIMKEU Item #7: [volume]',
    },
    denominator: {
      label: 'Tarif Resmi PP',
      realValue: 'Besaran tarif PP Tarif Layanan BP Batam',
      source: 'SIMKEU Item #7: [tarif]',
    },
    calculationResult: 'Total Rincian = Rp 2.447,46 Miliar',
    tableauCalculatedField: `// Calculated Field: [Target PNBP Rincian]
SUM([keu_target_pnbp_rincian].[volume] * [keu_target_pnbp_rincian].[tarif])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Detail)',
      rows: '[kode], [pengguna], [mata_uang]',
      columns: 'SUM([volume]), AVG([tarif]), SUM([jumlah])',
      marks: 'Text Table with Grand Totals',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #7: Rincian Target Penerimaan Negara Bukan Pajak (PNBP)',
      tableName: 'keu_target_pnbp_rincian',
      attributes: ['KODE', 'PENGGUNA', 'MATA UANG', 'SATUAN', 'TARIF', 'VOLUME', 'JUMLAH', 'TAHUN'],
      updateFrequency: 'Pertahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '100% Sesuai PP Tarif Resmi',
      warning: 'Selisih Pembulatan Kurs Valas',
      critical: 'Tarif Tidak Memiliki Dasar PP',
      standardOrigin: 'Peraturan Pemerintah tentang Jenis dan Tarif PNBP BP Batam',
    },
    executiveAction: 'Sosialisasikan pembaruan tarif penyesuaian kepada asosiasi pengguna jasa pelabuhan dan bandara.',
  },

  realisasi_blu_total: {
    id: 'realisasi_blu_total',
    unit: 'biro-keuangan',
    title: 'Laporan Realisasi Anggaran (LRA) BLU & Kinerja Dua Sisi (Item 3 SIMKEU)',
    codeTag: 'LRA-BLU-03',
    category: 'Pertanggungjawaban BLU',
    currentValue: 'Surplus +Rp 305,2 M (Serapan Belanja 27,7% vs Capaian Pendapatan 40,1%)',
    targetValue: 'Keseimbangan Anggaran Kas BLU (Surplus Operasional Layanan)',
    statusText: 'Surplus Kas Operasional Layanan',
    statusVariant: 'success',
    summary: 'Format resmi akuntansi Badan Layanan Umum (BLU) sesuai standar PMK/Ditjen Perbendaharaan Kementerian Keuangan RI yang menyandingkan seluruh realisasi belanja operasional dan belanja modal terhadap realisasi pendapatan layanan BLU untuk mengukur kinerja keuangan konsolidasi.',
    presentationPitch: 'Bapak/Ibu Pimpinan, Laporan Realisasi Anggaran BLU (Item 3 SIMKEU) menunjukkan kinerja kas yang sangat prima. Hingga cut-off April, total realisasi belanja tercatat Rp 676,0 Miliar (27,7% dari pagu Rp 2.440,5 Miliar), sedangkan realisasi pendapatan layanan BLU mencapai Rp 981,2 Miliar (40,1% dari target Rp 2.447,5 Miliar). Hasilnya, BP Batam membukukan Surplus Operasional Kas sebesar +Rp 305,2 Miliar. Ini membuktikan operasional layanan publik dan komersial BP Batam mampu membiayai dirinya sendiri secara mandiri tanpa defisit.',
    formulaConceptual: 'Surplus / (Defisit) BLU = Total Realisasi Pendapatan Layanan BLU - Total Realisasi Belanja BLU (Pegawai + Barang + Modal)',
    numerator: {
      label: 'Realisasi Pendapatan Layanan BLU YTD',
      realValue: 'Rp 981.240.000.000 (Target: Rp 2.447,5 M - Capaian 40,1%)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi] WHERE [jenis_anggaran]=\'PENDAPATAN\')',
    },
    denominator: {
      label: 'Realisasi Belanja BLU YTD (Pegawai, Barang, Modal)',
      realValue: 'Rp 676.000.000.000 (Pagu: Rp 2.440,5 M - Serapan 27,7%)',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran_blu].[realisasi] WHERE [jenis_anggaran]=\'BELANJA\')',
    },
    calculationResult: 'Surplus Operasional = Rp 981.240.000.000 - Rp 676.000.000.000 = +Rp 305.240.000.000 (+Rp 305,2 Miliar)',
    tableauCalculatedField: `// Calculated Field: [Surplus Defisit Operasional BLU]
SUM(IF [jenis_anggaran] = 'PENDAPATAN' THEN [realisasi] ELSE 0 END) -
SUM(IF [jenis_anggaran] = 'BELANJA' THEN [realisasi] ELSE 0 END)`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab LRA BLU) & #23 (Bullet Graph Dua Sisi)',
      rows: '[jenis_anggaran], [kategori], [uraian]',
      columns: 'SUM([anggaran]), SUM([realisasi]), [% Serapan/Capaian]',
      marks: 'Color by Jenis Anggaran (Pendapatan: Hijau, Belanja: Biru Navy)',
      filters: "[tahun] = '2026', [periode] = 'Cut-off April'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #3: Laporan Realisasi Anggaran BLU (LRA)',
      tableName: 'keu_laporan_realisasi_anggaran_blu',
      attributes: ['JENIS ANGGARAN', 'KATEGORI', 'URAIAN', 'ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Bulanan (Rekonsiliasi SAKTI Kemenkeu)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Surplus Kas Operasional (Pendapatan > Belanja)',
      warning: 'Impas / Surplus tipis < 5% dari pendapatan',
      critical: 'Defisit Kas Operasional (Belanja > Pendapatan)',
      standardOrigin: 'Standar Akuntansi Pemerintah (SAP) & PMK Pengelolaan Keuangan BLU',
    },
    executiveAction: 'Pertahankan surplus operasional untuk memperkuat alokasi belanja modal infrastruktur strategis pada semester kedua tanpa mengorbankan likuiditas darurat.',
  },

  piutang_lancar: {
    id: 'piutang_lancar',
    unit: 'biro-keuangan',
    title: 'Rekapitulasi Piutang Lancar 0 - 30 Hari (Item 17)',
    codeTag: 'KEU-PIUTANG-LANCAR',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 168,2 M (53,8%)',
    targetValue: 'Porsi Lancar ≥ 60%',
    statusText: 'Kolektibilitas Sangat Baik',
    statusVariant: 'success',
    summary: 'Saldo tagihan faktur PNBP berumur 0 s.d. 30 hari kalender dengan tingkat kepatuhan pelunasan tertinggi.',
    presentationPitch: 'Sebanyak 53,8% (Rp 168,2 Miliar) piutang PNBP BP Batam berada dalam kelompok lancar di bawah 30 hari. Faktur ini dalam masa tenggang wajar korporasi dan memiliki kepastian bayar di atas 95%.',
    formulaConceptual: 'SUM(IIF([keu_rekap_umur_piutang].[umur_piutang] <= 30, [keu_rekap_umur_piutang].[jumlah_piutang_tertagih], 0))',
    numerator: {
      label: 'Saldo Piutang 0-30 Hari',
      realValue: 'Rp 168.200.000.000',
      source: 'SIMKEU Item #17: [jumlah_piutang_tertagih]',
    },
    denominator: {
      label: 'Total Piutang Berjalan',
      realValue: 'Rp 312.400.000.000',
      source: 'SIMKEU Item #17: SUM([jumlah_piutang_tertagih])',
    },
    calculationResult: '(168,2 M ÷ 312,4 M) × 100% = 53,8%',
    tableauCalculatedField: `// Calculated Field: [Piutang Lancar 0-30 Hari]
SUM(IIF([keu_rekap_umur_piutang].[umur_piutang] <= 30, [keu_rekap_umur_piutang].[jumlah_piutang_tertagih], 0))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Aging)',
      rows: '[nama_pelanggan]',
      columns: '[umur_piutang], SUM([jumlah_piutang_tertagih])',
      marks: 'Color: Green for 0-30 Days',
      filters: "[umur_piutang] <= 30",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #17: Rekapitulasi Umur Piutang',
      tableName: 'keu_rekap_umur_piutang',
      attributes: ['NAMA PELANGGAN', 'JUMLAH PIUTANG TERTAGIH', 'UMUR PIUTANG'],
      updateFrequency: 'Pertahun / Bulanan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Porsi Lancar ≥ 60%',
      warning: '45% - 59%',
      critical: '< 45%',
      standardOrigin: 'PMK Pengelolaan Piutang Instansi Pemerintah dan BLU',
    },
    executiveAction: 'Kirim notifikasi otomatis reminder tagihan H-7 sebelum jatuh tempo faktur.',
  },

  otonomi_fiskal: {
    id: 'otonomi_fiskal',
    unit: 'biro-keuangan',
    title: 'Rasio Kemandirian Fiskal BLU BP Batam',
    codeTag: 'KEMANDIRIAN-FISKAL',
    category: 'Kemandirian & Otonomi Fiskal',
    currentValue: '0,86 (86,0%)',
    targetValue: 'Standar Kemenkeu: ≥ 0,80',
    statusText: 'Mandiri Fiskal (Tercapai)',
    statusVariant: 'success',
    summary: 'Rasio kemampuan realisasi pendapatan PNBP operasional berjalan dalam menutup seluruh beban belanja operasional rutin tanpa ketergantungan utang.',
    presentationPitch: 'Bapak/Ibu Pimpinan, rasio kemandirian fiskal BLU BP Batam saat ini mencapai 0,86 (86,0%), melampaui standar ambang batas Kementerian Keuangan yaitu 0,80. Artinya, 86% beban operasional rutin dibiayai mandiri oleh penerimaan PNBP, membuktikan ketahanan kas dan otonomi fiskal BLU yang sangat sehat.',
    formulaConceptual: 'Total Realisasi Kas Masuk PNBP Berjalan ÷ Total Belanja Operasional Rutin',
    numerator: {
      label: 'Pembilang (Realisasi PNBP Berjalan)',
      realValue: 'Rp 681.000.000.000',
      source: 'SIMKEU Item #8: SUM([keu_target_pnbp_rekap].[realisasi])',
    },
    denominator: {
      label: 'Penyebut (Belanja Operasional Rutin)',
      realValue: 'Rp 791.800.000.000',
      source: 'SIMKEU Item #3: SUM([keu_laporan_realisasi_anggaran].[belanja_operasional])',
    },
    calculationResult: 'Rp 681,0 M ÷ Rp 791,8 M = 0,8601 ≈ 0,86 (86,0%)',
    tableauCalculatedField: `// Calculated Field: [Rasio Kemandirian Fiskal]
SUM([keu_target_pnbp_rekap].[realisasi]) / SUM([keu_belanja_rekap].[realisasi])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #23 (Bullet Graph) & Donut Chart',
      rows: 'None',
      columns: 'AGG([Rasio Kemandirian Fiskal])',
      marks: 'Bar Mark + Reference Line (0.80)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #8 (Target & Realisasi PNBP) & Item #3 (Laporan Realisasi BLU)',
      tableName: 'keu_target_pnbp_rekap & keu_realisasi_blu',
      attributes: ['NAMA UNIT', 'JUMLAH TARGET', 'REALISASI', 'BELANJA OPERASIONAL'],
      updateFrequency: 'Harian (Cut-Off Settlement 23:59 WIB)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 0,80 (Otonomi Finansial Sangat Kuat)',
      warning: '0,60 - 0,79 (Moderat, butuh pengawasan saldo kas)',
      critical: '< 0,60 (Rentan defisit likuiditas operasional)',
      standardOrigin: 'Standar Kinerja Keuangan Satker BLU Kementerian Keuangan RI',
    },
    executiveAction: 'Pertahankan disiplin belanja operasional rutin dan optimalkan penerimaan dari unit usaha pelabuhan & pemanfaatan aset lahan untuk menjaga rasio di atas 0,85 hingga akhir tahun anggaran.',
  },

  sumber_pendanaan: {
    id: 'sumber_pendanaan',
    unit: 'biro-keuangan',
    title: 'Struktur Komposisi Sumber Pendanaan Kas Masuk BLU',
    codeTag: 'SUMBER-DANA',
    category: 'Treasury & Likuiditas',
    currentValue: 'Rp 1.062,2 M (Total)',
    targetValue: 'PNBP Dominan ≥ 60,0%',
    statusText: 'PNBP Utama (64,1%)',
    statusVariant: 'success',
    summary: 'Proporsi komposisi kas masuk per kategori sumber pendanaan: PNBP Layanan BLU (64,1%), APBN Rupiah Murni (21,1%), dan Hibah/BLU Lain/Bunga (14,8%).',
    presentationPitch: 'Bapak/Ibu Pimpinan, total penerimaan kas masuk eksekutif tercatat Rp 1.062,2 Miliar, dengan dominasi kuat dari PNBP Layanan BLU sebesar Rp 681,0 M (64,1%), didukung alokasi APBN Rp 224,0 M (21,1%) untuk belanja modal/proyek strategis, serta Rp 157,2 M (14,8%) dari hibah dan optimalisasi kas perbankan.',
    formulaConceptual: '(Kas Masuk per Kategori Sumber Dana ÷ Total Kas Masuk Seluruh Kategori) × 100%',
    numerator: {
      label: 'Pembilang (Kas Masuk PNBP BLU)',
      realValue: 'Rp 681.000.000.000 (64,1% dari Total Kas)',
      source: 'SIMKEU Item #14: SUM([keu_penerimaan_sumber_dana].[realisasi]) WHERE [sumber] = PNBP',
    },
    denominator: {
      label: 'Penyebut (Total Penerimaan Seluruh Sumber)',
      realValue: 'Rp 1.062.200.000.000 (Akumulasi Kas Masuk)',
      source: 'SIMKEU Item #14: SUM([keu_penerimaan_sumber_dana].[realisasi])',
    },
    calculationResult: '(681,0 M ÷ 1.062,2 M) × 100% = 64,11% ≈ 64,1%',
    tableauCalculatedField: `// Calculated Field: [% of Total Kas Masuk]
SUM([realisasi]) / TOTAL(SUM([realisasi])) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #13 (Stacked Bar 100%) & Donut Chart',
      rows: 'None',
      columns: '[sumber_dana], SUM([realisasi])',
      marks: 'Pie/Donut & Stacked Bar by [sumber_dana]',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #14: Penerimaan Sumber Dana BP Batam',
      tableName: 'keu_penerimaan_sumber_dana',
      attributes: ['SUMBER DANA', 'DESKRIPSI', 'PAGU ANGGARAN', 'REALISASI', 'PERSENTASE'],
      updateFrequency: 'Mingguan',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'PNBP ≥ 60,0% (Kemandirian Satker BLU)',
      warning: 'PNBP 45,0% - 59,9% (Ketergantungan APBN sedang)',
      critical: 'PNBP < 45,0% (Risiko ketergantungan APBN tinggi)',
      standardOrigin: 'Pedoman Penganggaran BLU Kemenkeu RI',
    },
    executiveAction: 'Akselerasi penyerapan dana proyek APBN Rupiah Murni agar progres fisik infrastruktur selaras dengan target serapan triwulanan.',
  },

  kpi_dc_pue: {
    id: 'kpi_dc_pue',
    unit: 'pdsi',
    title: 'Power Usage Effectiveness (PUE) Data Center Tier III',
    codeTag: 'DC-PUE',
    category: 'Efisiensi Infrastruktur Data Center',
    currentValue: '1,48 PUE',
    targetValue: 'Standar Tier III Green: ≤ 1,50',
    statusText: 'Efisien (Tier III Green Standard)',
    statusVariant: 'success',
    summary: 'Rasio total daya listrik fasilitas data center (termasuk pendingin PAC dan UPS) berbanding total daya listrik yang dikonsumsi langsung oleh perangkat server IT.',
    presentationPitch: 'Bapak/Ibu Pimpinan, nilai efisiensi energi listrik (PUE) Data Center BP Batam berada di 1,48, lebih baik dari batas standar Tier III Green (1,50). Hal ini dicapai berkat optimalisasi sistem pendingin Precision Air Conditioning (PAC) inverter dan manajemen lorong dingin (cold aisle containment).',
    formulaConceptual: 'Total Konsumsi Daya Listrik Fasilitas DC (kW) ÷ Total Konsumsi Daya Perangkat IT Server (kW)',
    numerator: {
      label: 'Pembilang (Total Daya Listrik Fasilitas DC)',
      realValue: '185,0 kW (PLN + UPS + PAC Chiller)',
      source: 'Sensor BMS Data Center Tier III BP Batam',
    },
    denominator: {
      label: 'Penyebut (Total Daya Perangkat IT)',
      realValue: '125,0 kW (Server, Storage SAN, Core Switch)',
      source: 'Meteran PDU Rak Server Data Center',
    },
    calculationResult: '185,0 kW ÷ 125,0 kW = 1,48 PUE (Kategori Sangat Efisien)',
    tableauCalculatedField: `// Calculated Field: [PUE Data Center]
SUM([daya_total_fasilitas_kw]) / SUM([daya_perangkat_it_kw])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #4 (Continuous Line / Area Chart)',
      rows: 'AVG([PUE Data Center])',
      columns: '[timestamp_jam]',
      marks: 'Line Chart dengan Target Reference Line: 1.50',
      filters: "[ruang_dc] = 'Data Center Utama Gedung PDSI'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #2: Monitoring Daya & Lingkungan Data Center',
      tableName: 'pdsi_dc_environmental_telemetry',
      attributes: ['SENSOR ID', 'RACK ID', 'POWER KW', 'PUE VALUE', 'TEMPERATURE C', 'HUMIDITY'],
      updateFrequency: 'Real-Time (Setiap 5 Menit via IoT BMS)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: 'PUE ≤ 1,50 (Efisiensi Sangat Baik Tier III)',
      warning: 'PUE 1,51 - 1,80 (Perlu rekonfigurasi AC chiller)',
      critical: 'PUE > 1,80 (Pemborosan energi listrik signifikan)',
      standardOrigin: 'The Uptime Institute Tier III Standard & Green Grid Consortia',
    },
    executiveAction: 'Pertahankan suhu lorong dingin di 22°C - 24°C untuk menjaga kestabilan PUE di bawah 1,50.',
  },

  kpi_helpdesk_sla: {
    id: 'kpi_helpdesk_sla',
    unit: 'pdsi',
    title: 'Kepatuhan SLA Penyelesaian Tiket Layanan IT Helpdesk',
    codeTag: 'SLA-HELPDESK',
    category: 'Dukungan Pengguna & Service Desk',
    currentValue: '97,0% (1.210 Tiket)',
    targetValue: 'Target SLA Perjanjian: ≥ 95,0%',
    statusText: 'Memenuhi Standar Layanan',
    statusVariant: 'success',
    summary: 'Persentase tiket insiden, gangguan jaringan, email dinas, dan perbaikan perangkat yang diselesaikan tim helpdesk sesuai batas waktu (SLA 4 Jam).',
    presentationPitch: 'Bapak/Ibu Pimpinan, kinerja layanan IT Helpdesk PDSI mencatat kepatuhan SLA sebesar 97,0% dari 1.248 tiket layanan yang masuk bulan ini. Rata-rata waktu tanggap pertama (First Response) tercatat 18 menit, dan waktu resolusi rata-rata 2,4 jam.',
    formulaConceptual: '(Jumlah Tiket Diselesaikan Sesuai SLA Waktu ÷ Total Tiket Layanan Masuk) × 100%',
    numerator: {
      label: 'Pembilang (Tiket Selesai On-SLA)',
      realValue: '1.210 Tiket Berhasil Diselesaikan',
      source: 'PDSI Item #3: SUM([pdsi_tiket_helpdesk].[tiket_sla_terpenuhi])',
    },
    denominator: {
      label: 'Penyebut (Total Tiket Permintaan Masuk)',
      realValue: '1.248 Tiket Total Masuk',
      source: 'PDSI Item #3: COUNT([pdsi_tiket_helpdesk].[id_tiket])',
    },
    calculationResult: '(1.210 ÷ 1.248) × 100% = 96,95% ≈ 97,0%',
    tableauCalculatedField: `// Calculated Field: [% Kepatuhan SLA Helpdesk]
SUM([tiket_sla_terpenuhi]) / COUNT([id_tiket]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #6 (Horizontal Bar per Kategori)',
      rows: '[kategori_masalah]',
      columns: '[% Kepatuhan SLA Helpdesk]',
      marks: 'Color by Status SLA',
      filters: "[bulan] = 'April', [tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data PDSI Item #3: Log Tiket IT Helpdesk & Service Desk',
      tableName: 'pdsi_tiket_helpdesk',
      attributes: ['ID TIKET', 'PEMOHON', 'UNIT KERJA', 'KATEGORI', 'WAKTU MASUK', 'WAKTU SELESAI', 'STATUS SLA'],
      updateFrequency: 'Real-Time (Event Driven Ticket Closure)',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: '≥ 95,0% (Kualitas Layanan Prima)',
      warning: '90,0% - 94,9% (Eskalasi tiket menumpuk di jam sibuk)',
      critical: '< 90,0% (Kekurangan personel teknisi lapangan)',
      standardOrigin: 'Standar Operasional Prosedur (SOP) Layanan TIK PDSI BP Batam',
    },
    executiveAction: 'Optimalkan sistem self-service reset password dan panduan mandiri untuk menurunkan 20% beban tiket berulang.',
  },

  piutang_macet: {
    id: 'piutang_macet',
    unit: 'biro-keuangan',
    title: 'Rekapitulasi Piutang Tak Tertagih PUPN / KPKNL (Item 20)',
    codeTag: 'KEU-PIUTANG-MACET',
    category: 'Likuiditas & Piutang',
    currentValue: 'Rp 43,6 M (14,0%)',
    targetValue: 'Rasio Macet ≤ 10,0%',
    statusText: 'Pelimpahan Panitia Piutang Negara',
    statusVariant: 'warning',
    summary: 'Saldo piutang macet > 90 hari yang telah melewati masa teguran SP-1, SP-2, SP-3 dan dilimpahkan pengurusannya ke Panitia Urusan Piutang Negara (PUPN) / KPKNL Batam.',
    presentationPitch: 'Piutang macet yang berumur di atas 90 hari tercatat sebesar Rp 43,6 Miliar dari 42 debitur. Seluruh berkas telah dilimpahkan ke PUPN/KPKNL untuk tindakan penagihan paksa, pemblokiran aset, dan lelang jaminan sesuai ketentuan perundang-undangan.',
    formulaConceptual: 'SUM([keu_piutang_tak_tertagih].[saldo_piutang_tak_tertagih])',
    numerator: {
      label: 'Saldo Piutang Tak Tertagih',
      realValue: 'Rp 43.600.000.000',
      source: 'SIMKEU Item #20: SUM([keu_piutang_tak_tertagih].[saldo_piutang_tak_tertagih])',
    },
    denominator: {
      label: 'Total Piutang PNBP',
      realValue: 'Rp 312.400.000.000',
      source: 'SIMKEU Item #17: SUM([jumlah_piutang_tertagih])',
    },
    calculationResult: 'Rasio Piutang Macet = 13,95% ≈ 14,0% dari Total Piutang',
    tableauCalculatedField: `// Calculated Field: [Saldo Piutang Macet KPKNL]
SUM([keu_piutang_tak_tertagih].[saldo_piutang_tak_tertagih])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Debitur)',
      rows: '[nama_pelanggan], [nomor_faktur]',
      columns: '[tanggal_jatuh_tempo], SUM([saldo_piutang_tak_tertagih])',
      marks: 'Color: Red for PUPN Stage',
      filters: "[saldo_piutang_tak_tertagih] > 0",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #20: Rekapitulasi Piutang Tak Tertagih',
      tableName: 'keu_piutang_tak_tertagih',
      attributes: ['NOMOR FAKTUR', 'TANGGAL TERBIT FAKTUR', 'NAMA PELANGGAN', 'TANGGAL JATUH TEMPO', 'JUMLAH PIUTANG KOREKSI KPKNL', 'PERHITUNGAN DENDA', 'BAYAR FAKTUR', 'SALDO PIUTANG TAK TERTAGIH'],
      updateFrequency: 'Pertahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Rasio Macet ≤ 10,0%',
      warning: '10,1% - 15,0%',
      critical: '> 15,0%',
      standardOrigin: 'Pedoman PUPN & PMK No. 163/PMK.06/2020 tentang Pengelolaan Piutang Negara',
    },
    executiveAction: 'Koordinasi aktif dengan juru sita KPKNL Batam untuk percepatan penelusuran aset dan pemblokiran sertifikat lahan debitur.',
  },

  cash_inflow_total: {
    id: 'cash_inflow_total',
    unit: 'biro-keuangan',
    title: 'Total Kas Masuk Riil (Arus Kas Masuk - Item 9 SIMKEU)',
    codeTag: 'CASH-INFLOW',
    category: 'Arus Kas & Likuiditas',
    currentValue: 'Rp 981,24 M (Akumulasi YTD)',
    targetValue: 'Proyeksi Rencana Arus Kas (RAK): Rp 950,00 M',
    statusText: 'Kas Masuk Melampaui Proyeksi RAK (+3,3%)',
    statusVariant: 'success',
    summary: 'Akumulasi seluruh penerimaan kas riil yang telah tervalidasi dan masuk ke rekening giro bank operasional BLU BP Batam dari seluruh kanal pembayaran resmi (UWT Lahan, Pelabuhan, Bandara, SPAM, RSBP).',
    presentationPitch: 'Total kas masuk riil hingga bulan April membukukan Rp 981,24 Miliar, melampaui proyeksi Rencana Arus Kas (RAK) sebesar Rp 950,0 Miliar (+3,3%). Arus kas masuk didominasi oleh setoran UWT lahan investasi, tarif kepelabuhanan internasional, serta penerimaan pas bandara dan layanan air minum yang likuid.',
    formulaConceptual: 'SUM([keu_arus_kas].[arus_kas_masuk]) dari Januari hingga Bulan Berjalan',
    numerator: {
      label: 'Penerimaan Kas Operasional & Jasa',
      realValue: 'Rp 981.240.000.000 (Kas Riil Bank)',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_masuk])',
    },
    denominator: {
      label: 'Periode Akumulasi',
      realValue: '4 Bulan (Januari - April 2026)',
      source: 'Rekening Koran Konsolidasi Bank Mandiri, BNI, BRI, Bank Riau Kepri',
    },
    calculationResult: 'Total Kas Masuk = Rp 210,5 M (Jan) + Rp 245,2 M (Feb) + Rp 262,4 M (Mar) + Rp 263,1 M (Apr) = Rp 981,24 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Kas Masuk YTD]
RUNNING_SUM(SUM([keu_arus_kas].[arus_kas_masuk]))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #3 (Line Chart Tren Arus Kas)',
      rows: 'Measure Values ([arus_kas_masuk])',
      columns: '[bulan]',
      marks: 'Line Chart dengan Area Shading Hijau Toska',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #9: Informasi Tren Arus Kas',
      tableName: 'keu_arus_kas',
      attributes: ['BULAN', 'ARUS KAS MASUK', 'ARUS KAS KELUAR', 'NET ARUS KAS', 'SALDO AKHIR'],
      updateFrequency: 'Harian (EOD Bank Settlement & CMS)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 100% dari Rencana Penarikan/Penerimaan Kas (RAK)',
      warning: '85% - 99% dari target RAK bulanan',
      critical: '< 85% (Risiko terganggunya jadwal pembayaran kontrak)',
      standardOrigin: 'Rencana Bisnis dan Anggaran (RBA) BLU BP Batam',
    },
    executiveAction: 'Percepat integrasi payment gateway digital QRIS dan virtual account host-to-host untuk mempersingkat collection period piutang.',
  },

  cash_outflow_total: {
    id: 'cash_outflow_total',
    unit: 'biro-keuangan',
    title: 'Total Kas Keluar Riil (Pengeluaran Kas SP2D - Item 9 SIMKEU)',
    codeTag: 'CASH-OUTFLOW',
    category: 'Arus Kas & Likuiditas',
    currentValue: 'Rp 735,40 M (Akumulasi YTD)',
    targetValue: 'Batas Pagu Kas Belanja (RAK): Rp 820,00 M',
    statusText: 'Pengeluaran Terkendali dan Efisien (-10,3% vs Pagu)',
    statusVariant: 'info',
    summary: 'Total dana kas yang keluar dari rekening kas BLU untuk membayar SP2D belanja pegawai, operasional kantor, belanja pemeliharaan sarana, serta pembayaran termin proyek modal strategis.',
    presentationPitch: 'Arus kas keluar riil hingga bulan April tercatat sebesar Rp 735,40 Miliar, berada di bawah batas pagu kas belanja yang dialokasikan (Rp 820 Miliar). Efisiensi ini terjadi berkat verifikasi berlapis pada pengajuan SP2D dan penjadwalan termin pembayaran proyek yang tertib.',
    formulaConceptual: 'SUM([keu_arus_kas].[arus_kas_keluar]) dari Januari hingga Bulan Berjalan',
    numerator: {
      label: 'Pengeluaran Kas Operasional & Modal',
      realValue: 'Rp 735.400.000.000 (SP2D Terbayar)',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_keluar])',
    },
    denominator: {
      label: 'Periode Akumulasi',
      realValue: '4 Bulan (Januari - April 2026)',
      source: 'Modul Pembayaran SAKTI & CMS Perbankan',
    },
    calculationResult: 'Total Kas Keluar = Rp 165,2 M (Jan) + Rp 182,1 M (Feb) + Rp 193,6 M (Mar) + Rp 194,5 M (Apr) = Rp 735,40 Miliar',
    tableauCalculatedField: `// Calculated Field: [Total Kas Keluar YTD]
RUNNING_SUM(SUM([keu_arus_kas].[arus_kas_keluar]))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #3 (Line Chart Tren Arus Kas)',
      rows: 'Measure Values ([arus_kas_keluar])',
      columns: '[bulan]',
      marks: 'Line Chart dengan Garis Merah/Orange',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #9: Informasi Tren Arus Kas',
      tableName: 'keu_arus_kas',
      attributes: ['BULAN', 'ARUS KAS MASUK', 'ARUS KAS KELUAR', 'NET ARUS KAS', 'SALDO AKHIR'],
      updateFrequency: 'Harian (Buku Kas Umum Bendahara Pengeluaran)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≤ 100% dari alokasi kas bulanan',
      warning: '101% - 110% (Pencairan akseleratif perlu dipantau)',
      critical: '> 110% (Risiko defisit kas bulanan)',
      standardOrigin: 'Peraturan Pengelolaan Kas BLU Kemenkeu',
    },
    executiveAction: 'Pertahankan jadwal verifikasi SPM berkala agar tidak terjadi lonjakan tagihan tak terencana di akhir bulan.',
  },

  net_surplus: {
    id: 'net_surplus',
    unit: 'biro-keuangan',
    title: 'Net Surplus Arus Kas (Net Operating Cash Flow - Item 9 SIMKEU)',
    codeTag: 'NET-CASH-SURPLUS',
    category: 'Arus Kas & Likuiditas',
    currentValue: '+Rp 245,84 M (Surplus Bersih YTD)',
    targetValue: 'Target Solvabilitas: Kas Masuk > Kas Keluar (> Rp 0)',
    statusText: 'Likuiditas Mandiri & Sangat Sehat',
    statusVariant: 'success',
    summary: 'Selisih bersih antara total penerimaan kas masuk riil dengan total pengeluaran kas keluar riil selama periode berjalan, mencerminkan likuiditas organik yang dihasilkan organisasi.',
    presentationPitch: 'Net surplus arus kas akumulasi YTD berada pada posisi surplus bersih sebesar +Rp 245,84 Miliar. Ini membuktikan arus kas masuk melampaui seluruh kebutuhan kas keluar belanja operasional dan modal. Surplus kas ini dialokasikan pada instrumen deposito on-call bank BUMN untuk memaksimalkan pendapatan bunga BLU secara aman.',
    formulaConceptual: 'Total Kas Masuk YTD - Total Kas Keluar YTD',
    numerator: {
      label: 'Total Kas Masuk YTD',
      realValue: 'Rp 981.240.000.000',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_masuk])',
    },
    denominator: {
      label: 'Total Kas Keluar YTD',
      realValue: 'Rp 735.400.000.000',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_keluar])',
    },
    calculationResult: 'Rp 981.240.000.000 - Rp 735.400.000.000 = +Rp 245.840.000.000 (+Rp 245,84 Miliar)',
    tableauCalculatedField: `// Calculated Field: [Net Surplus Kas YTD]
SUM([keu_arus_kas].[arus_kas_masuk]) - SUM([keu_arus_kas].[arus_kas_keluar])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #6 (Bar Chart Net Surplus)',
      rows: '[Net Surplus Kas YTD]',
      columns: '[bulan]',
      marks: 'Color: Hijau jika > 0, Merah jika < 0',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #9: Informasi Tren Arus Kas',
      tableName: 'keu_arus_kas',
      attributes: ['BULAN', 'ARUS KAS MASUK', 'ARUS KAS KELUAR', 'NET ARUS KAS', 'SALDO AKHIR'],
      updateFrequency: 'Bulanan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '> Rp 0 (Surplus Kas Operasional Mandiri)',
      warning: 'Rp 0 s.d. Rp 20 Miliar (Bantalan kas menipis)',
      critical: '< Rp 0 (Defisit Kas Operasional)',
      standardOrigin: 'Pedoman Manajemen Likuiditas BLU Kemenkeu',
    },
    executiveAction: 'Optimalisasi penempatan kelebihan kas (idle cash) pada deposito jangka pendek suku bunga bersaing sesuai persetujuan Menteri Keuangan.',
  },

  avg_monthly_cash_inflow: {
    id: 'avg_monthly_cash_inflow',
    unit: 'biro-keuangan',
    title: 'Rata-rata Penerimaan Kas Bulanan (Monthly Cash Inflow Run-Rate)',
    codeTag: 'AVG-CASH-INFLOW',
    category: 'Arus Kas & Likuiditas',
    currentValue: 'Rp 245,31 M / Bulan',
    targetValue: 'Target Rata-rata Bulanan: Rp 203,95 M / Bulan',
    statusText: 'Melampaui Target Rata-rata Bulanan (+20,3%)',
    statusVariant: 'success',
    summary: 'Rata-rata laju penerimaan kas bersih per bulan yang dihitung dari total kas masuk dibagi jumlah bulan berjalan. Metrik ini mengukur kapasitas pengumpulan kas rutin BP Batam.',
    presentationPitch: 'Rata-rata penerimaan kas bulanan BP Batam mencapai Rp 245,31 Miliar per bulan, jauh di atas ambang target rata-rata bulanan yang dibutuhkan (Rp 203,95 M/bulan). Tingkat keteraturan arus kas masuk ini menjamin stabilitas likuiditas harian dan kepastian ketersediaan dana kas untuk belanja operasional.',
    formulaConceptual: 'Total Kas Masuk Akumulasi YTD ÷ Jumlah Bulan Berjalan (n Bulan)',
    numerator: {
      label: 'Total Kas Masuk YTD',
      realValue: 'Rp 981.240.000.000',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_masuk])',
    },
    denominator: {
      label: 'Jumlah Bulan Periode Berjalan',
      realValue: '4 Bulan (Januari - April)',
      source: 'COUNTD([keu_arus_kas].[bulan])',
    },
    calculationResult: 'Rp 981.240.000.000 ÷ 4 Bulan = Rp 245.310.000.000 / Bulan (Rp 245,31 M)',
    tableauCalculatedField: `// Calculated Field: [Rata-rata Kas Masuk Bulanan]
SUM([keu_arus_kas].[arus_kas_masuk]) / COUNTD([keu_arus_kas].[bulan])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Card) & #3 (Line Chart dengan Garis Referensi Rata-rata)',
      rows: '[Rata-rata Kas Masuk Bulanan]',
      columns: '[bulan]',
      marks: 'Reference Line Average Inflow (Rp 245,31 M)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #9: Informasi Tren Arus Kas',
      tableName: 'keu_arus_kas',
      attributes: ['BULAN', 'ARUS KAS MASUK', 'ARUS KAS KELUAR', 'NET ARUS KAS', 'SALDO AKHIR'],
      updateFrequency: 'Bulanan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ Rp 203,95 M/Bulan (1/12 Target Perkin Rp 2,45 T)',
      warning: 'Rp 175 M - Rp 203 M/Bulan',
      critical: '< Rp 175 M/Bulan (Kinerja kas melambat)',
      standardOrigin: 'Rencana Bisnis dan Anggaran (RBA) BLU BP Batam',
    },
    executiveAction: 'Pertahankan stabilitas penerimaan dari sektor kepelabuhanan dan air minum yang bersifat recurring (berulang setiap bulan).',
  },

  liquidity_runway: {
    id: 'liquidity_runway',
    unit: 'biro-keuangan',
    title: 'Standar Ketahanan Likuiditas Kas Operasional (Liquidity Runway 5,2 Bulan)',
    codeTag: 'LIQUIDITY-RUNWAY',
    category: 'Arus Kas & Likuiditas',
    currentValue: '5,2 Bulan Operasional Rutin',
    targetValue: 'Ambang Batas Aman Kemenkeu: ≥ 3,0 Bulan',
    statusText: 'Sangat Aman & Berdaya Tahan Tinggi',
    statusVariant: 'success',
    summary: 'Indikator ketahanan keuangan yang mengukur berapa lama kas riil yang tersimpan di bank sanggup terus membiayai seluruh kebutuhan operasional rutin BP Batam jika sewaktu-waktu terjadi kondisi krisis darurat dan penerimaan kas baru terhenti total.',
    presentationPitch: 'Bapak/Ibu Pimpinan, posisi kas BP Batam saat ini memiliki daya tahan 5,2 bulan operasional rutin, melampaui batas aman Kementerian Keuangan (≥ 3,0 bulan). Penjelasan bagi orang awam: jika besok pagi terjadi keadaan darurat luar biasa dan seluruh penerimaan kas terhenti total, saldo kas riil di bank sebesar Rp 956,4 Miliar sanggup menjamin pembayaran gaji pegawai, listrik, air, pemeliharaan pelabuhan, bandara, dan operasional rumah sakit selama 5 bulan 6 hari ke depan tanpa perlu meminjam uang sepeserpun.',
    formulaConceptual: 'Total Saldo Kas Riil di Bank (Giro & Deposito) ÷ Rata-rata Kas Keluar Belanja Rutin Bulanan',
    numerator: {
      label: 'Total Saldo Kas Riil di Bank',
      realValue: 'Rp 956.400.000.000 (Saldo Giro Operasional & Deposito Kas BLU)',
      source: 'SIMKEU Item #7: SUM([keu_saldo_bank_realtime].[saldo_akhir])',
    },
    denominator: {
      label: 'Rata-rata Kas Keluar Rutin per Bulan',
      realValue: 'Rp 183.850.000.000 / Bulan (Rata-rata Belanja Rutin Bulanan)',
      source: 'SIMKEU Item #9: SUM([keu_arus_kas].[arus_kas_keluar]) ÷ 4 Bulan',
    },
    calculationResult: 'Rp 956.400.000.000 ÷ Rp 183.850.000.000 = 5,20 Bulan Operasional Rutin',
    tableauCalculatedField: `// Calculated Field: [Ketahanan Likuiditas Kas (Bulan)]
SUM([keu_saldo_bank_realtime].[saldo_akhir]) / (SUM([keu_arus_kas].[arus_kas_keluar]) / COUNTD([keu_arus_kas].[bulan]))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (BAN Tile Ketahanan Likuiditas) & #7 (Gauge Chart)',
      rows: 'Kategori Bank Operasional',
      columns: '[Ketahanan Likuiditas Kas (Bulan)]',
      marks: 'Reference Line pada 3,0 Bulan (Batas Minimal Standar Kemenkeu)',
      filters: "[status_rekening] = 'Aktif Operasional'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Biro Keuangan Item #7 (Saldo Bank) & Item #9 (Tren Arus Kas)',
      tableName: 'keu_saldo_bank_realtime & keu_arus_kas',
      attributes: ['NAMA BANK', 'JENIS REKENING', 'SALDO AKHIR', 'ARUS KAS KELUAR BULANAN'],
      updateFrequency: 'Harian (Integrasi CMS API Bank & EOD)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 3,0 Bulan (Sangat Aman / Green Zone Kemenkeu)',
      warning: '2,0 - 2,9 Bulan (Zona Waspada / Perlu percepatan penagihan)',
      critical: '< 2,0 Bulan (Zona Kritis / Risiko gagal bayar gaji/operasional)',
      standardOrigin: 'Pedoman Pengelolaan Kas dan Investasi Jangka Pendek BLU PMK Kemenkeu',
    },
    executiveAction: 'Pertahankan cadangan likuiditas 5,2 bulan ini dan alokasikan kelebihan kas di atas batas 3 bulan ke instrumen deposito bergulir (on-call) untuk meningkatkan yield PNBP jasa giro secara legal dan aman.',
  },

  // ==========================================
  // PUSAT PELAYANAN TERPADU SATU PINTU (PTSP)
  // Berdasarkan Buku Katalog Data Atribut Hal 21-28 (17 Item)
  // ==========================================
  ikss_ikm: {
    id: 'ikss_ikm',
    unit: 'ptsp',
    title: 'Indeks Kepuasan Masyarakat (IKM) PTSP & MPP BP Batam',
    codeTag: 'IKSS_IKM',
    category: 'Kualitas Pelayanan Publik (Permenpan RB 14/2017)',
    currentValue: '89,24 (Mutu A • Sangat Baik)',
    targetValue: 'Target Renstra: ≥ 88,00',
    statusText: 'Melampaui Target (Capaian 101,4%)',
    statusVariant: 'success',
    summary: 'Pengukuran tingkat kepuasan penerima layanan atas 9 unsur standar pelayanan perizinan berusaha dan tatap muka MPP di lingkungan PTSP BP Batam.',
    presentationPitch: 'Bapak/Ibu Pimpinan, Indeks Kepuasan Masyarakat (IKM) PTSP BP Batam pada TA 2026 membukukan skor 89,24 (Mutu A: Sangat Baik). Nilai 89,24 ini dihasilkan dari pengisian kuesioner elektronik mandiri oleh 1.480 responden di Mal Pelayanan Publik (MPP). Setiap unsur (U1 s.d U9) dinilai rata-rata 3,57 (skala 4), dikalikan bobot tertimbang 0,111, lalu dikali faktor konversi 25 menghasilkan skor 89,24.',
    formulaConceptual: '∑ [Nilai Rata-rata per Unsur (U1 s.d U9) × 0,111] × 25',
    numerator: {
      label: 'Nilai Rata-rata Tertimbang (NRR Tertimbang 9 Unsur)',
      realValue: '3,5696 (Skala 1 - 4)',
      source: 'Dataset Item #5 [DATA IMPLEMENTASI TRANSFORMASI DIGITAL MPP]: SUM([NILAI PER UNSUR] * 0,111)',
    },
    denominator: {
      label: 'Faktor Pengali Konversi Standar Permenpan RB',
      realValue: 'Konversi Skala 100 (Nilai Pengali 25)',
      source: 'Permenpan RB No. 14 Tahun 2017',
    },
    calculationResult: 'Bagaimana Dihasilkan: 3,5696 × 25 = 89,24 (Kategori Mutu A: Sangat Baik)',
    tableauCalculatedField: `// Calculated Field: [IKM PTSP Skala 100]
// Sumber: Permenpan RB 14/2017 & Dataset Item #5 MPP
SUM([Nilai Rata-rata per Unsur] * 0.1111) * 25.0`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab) & #6 (Horizontal Bar per Unsur)',
      rows: '[UNSUR PELAYANAN U1-U9]',
      columns: '[NILAI PER UNSUR], [NILAI TERTIMBANG]',
      marks: 'Color: Kategori Mutu (Hijau untuk A, Biru untuk B)',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Dataset Item #5: DATA IMPLEMENTASI KEBIJAKAN TRANSFORMASI DIGITAL MAL PELAYANAN PUBLIK (MPP) (Hal 24)',
      tableName: 'ptsp_ikm_mpp_survei',
      attributes: ['SEMESTER', 'TAHUN', '9 UNSUR PELAYANAN', 'JUMLAH RESPONDEN', 'NILAI PER UNSUR', 'NILAI IKM TOTAL', 'KATEGORI MUTU'],
      updateFrequency: 'Semesteran / Triwulanan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 88,00 (Kategori A - Sangat Baik)',
      warning: '76,61 - 88,00 (Kategori B - Baik)',
      critical: '< 76,61 (Kategori C/D - Kurang/Tidak Baik)',
      standardOrigin: 'Permenpan RB No. 14 Tahun 2017 & Indikator Sasaran Strategis BP Batam',
    },
    executiveAction: 'Pertahankan mutu A dengan memperluas fitur self-service tracking izin via WhatsApp Bot dan optimalisasi anjungan antrean mandiri di lobi MPP.',
  },

  lic_sla: {
    id: 'lic_sla',
    unit: 'ptsp',
    title: 'Kepatuhan SLA Perizinan Tepat Waktu',
    codeTag: 'LIC_SLA',
    category: 'Kecepatan & Kepatuhan Layanan',
    currentValue: '94,6% (12.480 Berkas On-Time)',
    targetValue: 'Target Kepatuhan SLA: ≥ 90,0%',
    statusText: 'Kepatuhan Sangat Tinggi (+4,6% di Atas Target)',
    statusVariant: 'success',
    summary: 'Persentase permohonan perizinan berusaha dan operasional yang diselesaikan tepat waktu sesuai standar Service Level Agreement (SLA).',
    presentationPitch: 'Bapak/Ibu Pimpinan, kepatuhan SLA perizinan PTSP BP Batam mencatatkan 94,6% dengan 12.480 berkas tuntas tepat waktu dari total 13.192 izin berstatus selesai. Angka 94,6% ini dihasilkan dari Dataset Item #17 [DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU] dengan memfilter berkas terbit yang durasi harinya ([TANGGAL REKAP AKHIR] - [TANGGAL REKAP AWAL]) <= target SLA dibagi total berkas selesai.',
    formulaConceptual: '( ∑ [PERMOHONAN STATUS SELESAI (Durasi ≤ SLA)] ÷ ∑ [PERMOHONAN STATUS SELESAI] ) × 100%',
    numerator: {
      label: 'Berkas Selesai Tepat Waktu (Durasi ≤ SLA)',
      realValue: '12.480 Berkas',
      source: 'Dataset Item #17: SUM(IF DATEDIFF("day", [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]) <= [SLA] THEN [PERMOHONAN STATUS SELESAI] END)',
    },
    denominator: {
      label: 'Total Berkas Berstatus Selesai',
      realValue: '13.192 Berkas',
      source: 'Dataset Item #17: SUM([PERMOHONAN STATUS SELESAI])',
    },
    calculationResult: 'Bagaimana Dihasilkan: (12.480 ÷ 13.192) × 100% = 94,603% ≈ 94,6%',
    tableauCalculatedField: `// Calculated Field: [Kepatuhan SLA Perizinan %]
// Sumber: Dataset Item #17 DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU
(SUM(IF DATEDIFF('day', [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]) <= [SERVICE LEVEL AGREEMENT (SLA)] 
 THEN [PERMOHONAN STATUS SELESAI] ELSE 0 END) 
 / SUM([PERMOHONAN STATUS SELESAI])) * 100.0`,
    tableauShelvesGuide: {
      showMe: 'Show Me #7 (Bullet Graph with 90% Reference Line)',
      rows: '[JENIS PERIZINAN]',
      columns: '[Kepatuhan SLA Perizinan %]',
      marks: 'Color: Status SLA (Hijau >= 90%, Oranye < 90%)',
      filters: "[BULAN] = 'April', [TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Dataset Item #17: DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (Hal 28)',
      tableName: 'ptsp_penyelesaian_izin_tepat_waktu',
      attributes: ['BULAN', 'TANGGAL IZIN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'JENIS PERIZINAN', 'NAMA PERIZINAN BERUSAHA', 'PERMOHONAN STATUS SELESAI', 'SERVICE LEVEL AGREEMENT (SLA)'],
      updateFrequency: 'Bulanan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 90,0% SLA Compliance',
      warning: '80,0% - 89,9% SLA Compliance',
      critical: '< 80,0% (Eskalasi ke Direktur PTSP)',
      standardOrigin: 'Standar Pelayanan Minimum (SPM) BP Batam & PP No. 5/2021',
    },
    executiveAction: 'Lanjutkan penguatan notifikasi peringatan dini (early warning alert) H-1 sebelum batas waktu SLA terlampaui kepada verifikator teknis.',
  },

  lic_vol: {
    id: 'lic_vol',
    unit: 'ptsp',
    title: 'Total Volume Permohonan Izin Masuk',
    codeTag: 'LIC_VOL',
    category: 'Volume & Beban Kerja',
    currentValue: '13.820 Permohonan',
    targetValue: 'Ekspektasi Demand: ~13.000 Berkas YTD',
    statusText: 'Permintaan Tinggi (+9,0% YoY)',
    statusVariant: 'info',
    summary: 'Jumlah seluruh berkas perizinan berusaha OSS RBA, perizinan maritim kepelabuhanan (SKKBM/Jadwal Kapal), dan rekomendasi teknis non-perizinan yang masuk ke sistem PTSP BP Batam.',
    presentationPitch: 'Bapak/Ibu Pimpinan, total permohonan masuk yang tercatat di dashboard berjumlah 13.820 berkas. Angka ini secara presisi dihasilkan dari Dataset Item #14 [JENIS LAYANAN BP BATAM] pada kolom [JUMLAH LAYANAN MASUK] periode Jan-Apr 2026 (Jan: 3.320 + Feb: 3.250 + Mar: 3.610 + Apr: 3.640 = 13.820). Rinciannya terdiri dari Perizinan Berusaha OSS [Item #9]: 8.568 berkas, Maritim [Item #1-#4, #10-#12]: 3.480 berkas, dan Non-Perizinan [Item #16]: 1.772 berkas.',
    formulaConceptual: 'SUM([JUMLAH LAYANAN MASUK])  atau  COUNTD([NOMOR PERMOHONAN])',
    numerator: {
      label: 'Total Permohonan Masuk Seluruh Layanan',
      realValue: '13.820 Berkas (Jan: 3.320, Feb: 3.250, Mar: 3.610, Apr: 3.640)',
      source: 'Dataset Item #14 [JENIS LAYANAN BP BATAM]: SUM([JUMLAH LAYANAN MASUK]) & Item #9: COUNTD([NOMOR PERMOHONAN])',
    },
    denominator: {
      label: 'Periode Waktu Rekapitulasi',
      realValue: 'Januari - April 2026 (YTD Caturwulan I)',
      source: 'Dataset Item #14 Kolom [BULAN] & [TAHUN]',
    },
    calculationResult: 'Bagaimana Dihasilkan: 3.320 + 3.250 + 3.610 + 3.640 = 13.820 Berkas Masuk (Klaster: OSS 8.568 + Maritim 3.480 + Non-Izin 1.772)',
    tableauCalculatedField: `// Calculated Field: [Total Permohonan Masuk]
// Sumber: Dataset Item #14 JENIS LAYANAN BP BATAM & Dataset Item #9
SUM([JUMLAH LAYANAN MASUK])

// Alternatif pada tabel detail permohonan OSS:
COUNTD([NOMOR PERMOHONAN])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #14 (Area / Line Chart Trend)',
      rows: 'SUM([JUMLAH LAYANAN MASUK])',
      columns: '[BULAN]',
      marks: 'Line with Data Points, Color: Deep Blue',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Dataset Item #14: JENIS LAYANAN BP BATAM (Hal 27) & Item #9: DATA PERMOHONAN PERIZINAN BERUSAHA (Hal 25)',
      tableName: 'ptsp_jenis_layanan_master & ptsp_permohonan_oss',
      attributes: ['BULAN', 'TAHUN', 'JENIS LAYANAN', 'JUMLAH LAYANAN MASUK', 'NOMOR PERMOHONAN', 'TANGGAL PERMOHONAN', 'SEKTOR'],
      updateFrequency: 'Jika Ada Update / Bulanan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: 'Kapasitas Pelayanan 50.000 Dok/Tahun',
      warning: 'Lonjakan > 15.000 Dok/Caturwulan',
      critical: 'Beban Antrean Melampaui Kapasitas',
      standardOrigin: 'Desain Arsitektur Layanan PTSP BP Batam',
    },
    executiveAction: 'Alokasikan beban verifikator secara proporsional sesuai klaster sektor usaha dengan beban permohonan tertinggi.',
  },

  lic_issued: {
    id: 'lic_issued',
    unit: 'ptsp',
    title: 'Izin Berhasil Terbit & Disahkan',
    codeTag: 'LIC_ISSUED',
    category: 'Output & Produktivitas Layanan',
    currentValue: '13.192 Izin Terbit (95,4%)',
    targetValue: 'Target Rasio Terbit: ≥ 95,0%',
    statusText: 'Produktivitas Optimal (Melampaui Target)',
    statusVariant: 'success',
    summary: 'Jumlah berkas izin yang telah tervalidasi lengkap, disetujui, dan diterbitkan dengan Tanda Tangan Elektronik (TTE) tersertifikasi BSrE.',
    presentationPitch: 'Sebanyak 13.192 berkas perizinan berhasil disahkan dan diterbitkan, mencerminkan rasio efektivitas penyelesaian 95,4% dari total permohonan masuk. Angka 13.192 ini dihasilkan dari Dataset Item #14 [JENIS LAYANAN BP BATAM] kolom [JUMLAH LAYANAN TERSELESAIKAN] dan dikonfirmasi pada Dataset Item #17 kolom [PERMOHONAN STATUS SELESAI].',
    formulaConceptual: '( ∑ [JUMLAH LAYANAN TERSELESAIKAN] ÷ ∑ [JUMLAH LAYANAN MASUK] ) × 100%',
    numerator: {
      label: 'Izin Berhasil Terbit (Status Selesai)',
      realValue: '13.192 Berkas (Jan: 3.150, Feb: 3.090, Mar: 3.460, Apr: 3.492)',
      source: 'Dataset Item #14: SUM([JUMLAH LAYANAN TERSELESAIKAN]) & Item #17: SUM([PERMOHONAN STATUS SELESAI])',
    },
    denominator: {
      label: 'Total Permohonan Masuk',
      realValue: '13.820 Berkas',
      source: 'Dataset Item #14: SUM([JUMLAH LAYANAN MASUK])',
    },
    calculationResult: 'Bagaimana Dihasilkan: (13.192 ÷ 13.820) × 100% = 95,456% ≈ 95,4%',
    tableauCalculatedField: `// Calculated Field: [Total Izin Terbit]
SUM([JUMLAH LAYANAN TERSELESAIKAN])

// Calculated Field: [Rasio Izin Terbit %]
SUM([JUMLAH LAYANAN TERSELESAIKAN]) / SUM([JUMLAH LAYANAN MASUK]) * 100.0`,
    tableauShelvesGuide: {
      showMe: 'Show Me #6 (Horizontal Bar)',
      rows: '[JENIS LAYANAN]',
      columns: '[Rasio Izin Terbit %]',
      marks: 'Color: Emerald Gradient',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Dataset Item #14: JENIS LAYANAN BP BATAM (Hal 27) & Item #17: DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (Hal 28)',
      tableName: 'ptsp_layanan_selesai_rekap',
      attributes: ['BULAN', 'TAHUN', 'JUMLAH LAYANAN TERSELESAIKAN', 'PERMOHONAN STATUS SELESAI', 'TANGGAL IZIN', 'NO IZIN'],
      updateFrequency: 'Bulanan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 95,0% Terbit',
      warning: '90,0% - 94,9%',
      critical: '< 90,0% (Timbunan Berkas Tertunda)',
      standardOrigin: 'Target Perkin Direktur PTSP BP Batam',
    },
    executiveAction: 'Terus pertahankan otomasi TTE BSrE agar pemohon dapat mencetak dokumen secara mandiri tanpa harus datang fisik ke MPP.',
  },

  lic_backlog: {
    id: 'lic_backlog',
    unit: 'ptsp',
    title: 'Backlog / Open Pending Cases (Berkas dalam Proses)',
    codeTag: 'LIC_BACKLOG',
    category: 'Beban Proses & Antrean',
    currentValue: '628 Berkas (4,5%)',
    targetValue: 'Batas Toleransi: ≤ 750 Berkas',
    statusText: 'Antrean Terkendali & Sehat',
    statusVariant: 'success',
    summary: 'Jumlah berkas permohonan yang sedang berjalan pada tahapan verifikasi berkas, validasi teknis antar unit, atau perbaikan kelengkapan oleh pemohon.',
    presentationPitch: 'Jumlah berkas dalam proses aktif saat ini adalah 628 berkas (4,5% dari total permohonan masuk). Angka ini dihasilkan dari Dataset Item #16 [JUMLAH NON PERIZINAN] kolom [JUMLAH STATUS PROSES] (92 berkas) ditambah Dataset Item #17 [DATA PENYELESAIAN PERIZINAN] kolom [PERMOHONAN STATUS PROSES] (536 berkas) = 628 berkas, yang juga identik dengan Total Masuk (13.820) dikurangi Izin Terbit (13.192).',
    formulaConceptual: '∑ [PERMOHONAN STATUS PROSES] + ∑ [JUMLAH STATUS PROSES] = Total Masuk - Total Terbit',
    numerator: {
      label: 'Berkas Aktif dalam Antrean Proses',
      realValue: '628 Berkas (536 Perizinan Berusaha + 92 Non-Perizinan)',
      source: 'Dataset Item #17: SUM([PERMOHONAN STATUS PROSES]) & Item #16: SUM([JUMLAH STATUS PROSES])',
    },
    denominator: {
      label: 'Ambang Batas Toleransi Beban Kerja',
      realValue: 'Maksimal 750 Berkas (Target Toleransi)',
      source: 'Kapasitas Operasional Verifikator SOP PTSP',
    },
    calculationResult: 'Bagaimana Dihasilkan: 13.820 (Masuk) - 13.192 (Terbit) = 628 Berkas Open (Rasio: 4,54% dari Total Permohonan)',
    tableauCalculatedField: `// Calculated Field: [Backlog Berkas Aktif]
// Sumber: Dataset Item #16 & Item #17
SUM([PERMOHONAN STATUS PROSES])

// Calculated Field: [Backlog Ratio %]
SUM([PERMOHONAN STATUS PROSES]) / SUM([PERMOHONAN STATUS MASUK]) * 100.0`,
    tableauShelvesGuide: {
      showMe: 'Show Me #13 (Stacked Bar)',
      rows: '[JENIS PERIZINAN]',
      columns: '[Backlog Berkas Aktif]',
      marks: 'Color: Amber / Orange',
      filters: "[PERMOHONAN STATUS PROSES] > 0",
    },
    databaseSource: {
      catalogItem: 'Dataset Item #16: JUMLAH NON PERIZINAN (Hal 27-28) & Item #17: DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (Hal 28)',
      tableName: 'ptsp_backlog_tracking',
      attributes: ['BULAN', 'TAHUN', 'PERMOHONAN STATUS PROSES', 'JUMLAH STATUS PROSES', 'STATUS PERMOHONAN', 'TANGGAL REKAP AWAL'],
      updateFrequency: 'Harian / Bulanan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≤ 750 Berkas Terbuka',
      warning: '751 - 1.000 Berkas (Waspada Antrean)',
      critical: '> 1.000 Berkas (Eskalasi Taskforce)',
      standardOrigin: 'SOP Manajemen Beban Antrean PTSP BP Batam',
    },
    executiveAction: 'Prioritaskan penyelesaian berkas yang mendekati masa SLA batas waktu dengan fitur dispatch otomatis ke verifikator cadangan.',
  },

  lic_mlt: {
    id: 'lic_mlt',
    unit: 'ptsp',
    title: 'Median Lead Time (Kecepatan Waktu Layanan)',
    codeTag: 'LIC_MLT',
    category: 'Kecepatan & Efisiensi Waktu',
    currentValue: '1,8 Hari Kerja',
    targetValue: 'Standar Maksimal SLA: ≤ 3,0 Hari Kerja',
    statusText: '40% Lebih Cepat dari Standar Maksimal',
    statusVariant: 'success',
    summary: 'Nilai median hari kerja yang dibutuhkan sejak berkas permohonan disubmit oleh pemohon hingga diterbitkannya izin resmi.',
    presentationPitch: 'Median waktu layanan (lead time) perizinan di BP Batam mencapai 1,8 hari kerja, 40% lebih cepat dibanding standar SLA regulasi (3,0 hari kerja). Angka ini dihasilkan dari Dataset Item #17 [DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU] dengan menghitung nilai tengah (median) dari selisih hari kerja antara [TANGGAL REKAP AKHIR] dan [TANGGAL REKAP AWAL] untuk seluruh 13.192 berkas selesai.',
    formulaConceptual: 'MEDIAN ( [TANGGAL REKAP AKHIR] - [TANGGAL REKAP AWAL] ) dalam Hari Kerja',
    numerator: {
      label: 'Median Durasi Siklus Layanan Terbit',
      realValue: '1,8 Hari Kerja (Nilai Tengah Persentil 50)',
      source: 'Dataset Item #17: MEDIAN(DATEDIFF("day", [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]))',
    },
    denominator: {
      label: 'Standar Regulasi Maksimal',
      realValue: '3,0 Hari Kerja (Standar SLA)',
      source: 'Dataset Item #17 Kolom [SERVICE LEVEL AGREEMENT (SLA)] & PP 5/2021',
    },
    calculationResult: 'Bagaimana Dihasilkan: Median dari 13.192 data selisih tanggal rekap = 1,8 Hari Kerja (Lebih cepat 1,2 hari dari SLA 3 hari)',
    tableauCalculatedField: `// Calculated Field: [Median Lead Time Hari]
// Sumber: Dataset Item #17 DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU
MEDIAN(DATEDIFF('day', [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #7 (Bullet Graph with 3.0 Days Reference Line)',
      rows: '[JENIS PERIZINAN]',
      columns: '[Median Lead Time Hari]',
      marks: 'Bullet with Reference Line at 3.0 Days',
      filters: "[PERMOHONAN STATUS SELESAI] > 0",
    },
    databaseSource: {
      catalogItem: 'Dataset Item #17: DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (Hal 28) & Item #9 (Hal 25)',
      tableName: 'ptsp_leadtime_audit_trail',
      attributes: ['TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'TANGGAL IZIN', 'SERVICE LEVEL AGREEMENT (SLA)', 'JENIS PERIZINAN'],
      updateFrequency: 'Bulanan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≤ 3,0 Hari Kerja',
      warning: '3,1 - 4,5 Hari Kerja',
      critical: '> 4,5 Hari Kerja (Keterlambatan Sistemik)',
      standardOrigin: 'Standar Waktu Layanan PTSP BP Batam',
    },
    executiveAction: 'Lakukan debottlenecking pada tahap evaluasi teknis sektor konstruksi/lingkungan agar lead time dapat ditekan mendekati 1,5 hari kerja.',
  },

  lic_bottleneck: {
    id: 'lic_bottleneck',
    unit: 'ptsp',
    title: 'Bottleneck Rate (Kasus Keterlambatan / Overdue)',
    codeTag: 'LIC_BOTTLENECK',
    category: 'Pengendalian Risiko Operasional',
    currentValue: '3,2% (20 Kasus dari 628 Open)',
    targetValue: 'Batas Toleransi Maksimal: ≤ 5,0%',
    statusText: 'Sangat Terkendali di Bawah Ambang Kritis',
    statusVariant: 'success',
    summary: 'Persentase berkas perizinan aktif yang masa pemrosesannya telah melampaui batas hari kerja SOP yang ditentukan.',
    presentationPitch: 'Tingkat keterlambatan berkas tercatat sangat rendah yaitu 3,2% (hanya 20 kasus dari 628 berkas aktif). Angka ini dihasilkan dari Dataset Item #17 [DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU] dengan mengidentifikasi berkas dalam kolom [PERMOHONAN STATUS PROSES] yang selisih hari pengerjaannya melebihi kolom [SERVICE LEVEL AGREEMENT (SLA)] dibagi total 628 berkas dalam proses.',
    formulaConceptual: '( ∑ [PERMOHONAN STATUS PROSES (Durasi > SLA)] ÷ ∑ [PERMOHONAN STATUS PROSES] ) × 100%',
    numerator: {
      label: 'Berkas Status Proses Melewati Batas SLA',
      realValue: '20 Berkas (Overdue SLA)',
      source: 'Dataset Item #17: SUM(IF [DURASI BERJALAN] > [SLA] THEN [PERMOHONAN STATUS PROSES] END)',
    },
    denominator: {
      label: 'Total Berkas Berstatus Dalam Proses',
      realValue: '628 Berkas',
      source: 'Dataset Item #17: SUM([PERMOHONAN STATUS PROSES])',
    },
    calculationResult: 'Bagaimana Dihasilkan: (20 berkas overdue ÷ 628 berkas proses) × 100% = 3,184% ≈ 3,2%',
    tableauCalculatedField: `// Calculated Field: [Bottleneck Rate %]
// Sumber: Dataset Item #17 DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU
(SUM(IF DATEDIFF('day', [TANGGAL REKAP AWAL], TODAY()) > [SERVICE LEVEL AGREEMENT (SLA)] 
 THEN [PERMOHONAN STATUS PROSES] ELSE 0 END) 
 / SUM([PERMOHONAN STATUS PROSES])) * 100.0`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Crosstab Detail Overdue)',
      rows: '[NAMA PERIZINAN BERUSAHA]',
      columns: '[Bottleneck Rate %]',
      marks: 'Color: Merah jika > 5%',
      filters: "[PERMOHONAN STATUS PROSES] > 0",
    },
    databaseSource: {
      catalogItem: 'Dataset Item #17: DATA PENYELESAIAN PERIZINAN YANG TEPAT WAKTU (Hal 28)',
      tableName: 'ptsp_bottleneck_tracking',
      attributes: ['PERMOHONAN STATUS PROSES', 'TANGGAL REKAP AWAL', 'SERVICE LEVEL AGREEMENT (SLA)', 'NAMA PERIZINAN BERUSAHA'],
      updateFrequency: 'Harian / Bulanan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≤ 5,0% Overdue Rate',
      warning: '5,1% - 8,0%',
      critical: '> 8,0% (Perlu Audit Layanan Khusus)',
      standardOrigin: 'Indikator Pengendalian Internal BP Batam',
    },
    executiveAction: 'Terbitkan surat pemberitahuan otomatis kepada pemohon via SMS/Email untuk segera melengkapi perbaikan berkas dalam 3 hari kalender.',
  },

  sat_ccr: {
    id: 'sat_ccr',
    unit: 'ptsp',
    title: 'Tingkat Penyelesaian Aduan SP4N-LAPOR! & MPP (CCR)',
    codeTag: 'SAT_CCR',
    category: 'Aspirasi & Penanganan Pengaduan',
    currentValue: '98,4% (185 dari 188 Aduan Selesai)',
    targetValue: 'Target Penyelesaian Aduan: ≥ 90,0%',
    statusText: 'Respon Cepat & Tuntas (Kepatuhan Sangat Baik)',
    statusVariant: 'success',
    summary: 'Rasio penyelesaian aduan, saran, dan aspirasi masyarakat yang masuk melalui kanal SP4N-LAPOR!, email, telepon, dan meja tatap muka MPP.',
    presentationPitch: 'Dari 188 tiket aduan yang masuk di PTSP sepanjang 2026, sebanyak 185 tiket (98,4%) berhasil diselesaikan tuntas. Angka ini dihasilkan dari Dataset Item #6 [DATA MONITORING DAN EVALUASI PENGELOLAAN PENGADUAN MASYARAKAT] dengan membagi kolom [PENYELESAIAN PENGADUAN] (185 aduan berstatus selesai) dengan kolom [JUMLAH PENGADUAN] (188 aduan masuk).',
    formulaConceptual: '( ∑ [PENYELESAIAN PENGADUAN] ÷ ∑ [JUMLAH PENGADUAN] ) × 100%',
    numerator: {
      label: 'Tiket Aduan Tuntas Diselesaikan',
      realValue: '185 Tiket Aduan',
      source: 'Dataset Item #6: SUM([PENYELESAIAN PENGADUAN])',
    },
    denominator: {
      label: 'Total Tiket Aduan Masuk',
      realValue: '188 Tiket Aduan',
      source: 'Dataset Item #6: SUM([JUMLAH PENGADUAN])',
    },
    calculationResult: 'Bagaimana Dihasilkan: (185 ÷ 188) × 100% = 98,404% ≈ 98,4% (Sisa 3 tiket dalam investigasi)',
    tableauCalculatedField: `// Calculated Field: [Complaint Close Rate %]
// Sumber: Dataset Item #6 DATA PENGELOLAAN PENGADUAN MASYARAKAT
(SUM([PENYELESAIAN PENGADUAN]) / SUM([JUMLAH PENGADUAN])) * 100.0`,
    tableauShelvesGuide: {
      showMe: 'Show Me #13 (Stacked Bar)',
      rows: '[SALURAN PENGADUAN]',
      columns: '[Complaint Close Rate %]',
      marks: 'Color: Hijau untuk Selesai, Oranye untuk Proses',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Dataset Item #6: DATA MONITORING DAN EVALUASI PENGELOLAAN PENGADUAN MASYARAKAT (Hal 24) & Item #7 (Hal 24)',
      tableName: 'ptsp_pengaduan_masyarakat_rekap',
      attributes: ['BULAN', 'TAHUN', 'SALURAN PENGADUAN', 'JENIS PENGADUAN', 'JUMLAH PENGADUAN', 'PENYELESAIAN PENGADUAN', 'STATUS SELESAI'],
      updateFrequency: 'Semesteran / Triwulanan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 90,0% Resolution Rate',
      warning: '80,0% - 89,9%',
      critical: '< 80,0% (Tunggakan Respon Aduan)',
      standardOrigin: 'Standar Nasional Pengelolaan SP4N-LAPOR! MenPAN-RB',
    },
    executiveAction: 'Terus pertahankan waktu respon tanggapan awal di bawah 24 jam untuk menjaga kepuasan publik dan reputasi tata kelola PTSP BP Batam.',
  },

  kpi_ptsp_maritim: {
    id: 'kpi_ptsp_maritim',
    unit: 'ptsp',
    title: 'Kinerja Layanan Perizinan Maritim & Logistik Pelabuhan',
    codeTag: 'PTSP_MARITIME',
    category: 'Logistik & Layanan Kepelabuhanan',
    currentValue: '3.480 Berkas (96,2% On-Time)',
    targetValue: 'Target Kepatuhan SLA: ≥ 90,0%',
    statusText: 'Layanan Lancar Tanpa Hambatan Operasional Pelabuhan',
    statusVariant: 'success',
    summary: 'Pengukuran kinerja penerbitan izin Surat Keterangan Kerja Bongkar Muat (SKKBM), Angkut Barang (SKKAB), Alat (SKKAA), jadwal kapal, dan persetujuan TUKS.',
    presentationPitch: 'Layanan perizinan kepelabuhanan PTSP BP Batam telah melayani 3.480 dokumen dengan tingkat ketepatan waktu 96,2%. Angka ini dihasilkan dari konsolidasi Dataset Item #1 (SKKBM: 1.620 berkas), Item #2 (SKKAB: 980 berkas), Item #3 (SKKAA: 340 berkas), dan Item #12 (Jadwal Kapal: 540 berkas). Sebanyak 3.348 berkas terbit dengan lead time <= 1 hari kerja (3.348 ÷ 3.480 × 100% = 96,2%).',
    formulaConceptual: '( COUNTD(IF [LEAD TIME] <= 1 THEN [NO IZIN] END) ÷ COUNTD([NO IZIN]) ) × 100%',
    numerator: {
      label: 'Izin Maritim Tepat Waktu (Lead Time ≤ 1 Hari)',
      realValue: '3.348 Berkas',
      source: 'Dataset Item #1, #2, #3, #12: COUNTD(IF [ESTIMATE LAMA HARI KERJA] <= 1 THEN [NO IZIN] END)',
    },
    denominator: {
      label: 'Total Berkas Maritim Terbit',
      realValue: '3.480 Berkas (SKKBM 1.620 + SKKAB 980 + SKKAA 340 + Jadwal Kapal 540)',
      source: 'Dataset Item #1, #2, #3, #12: COUNTD([NO IZIN])',
    },
    calculationResult: 'Bagaimana Dihasilkan: (3.348 tepat waktu ÷ 3.480 total maritim) × 100% = 96,20%',
    tableauCalculatedField: `// Calculated Field: [Kepatuhan SLA Maritim %]
// Sumber: Dataset Item #1, #2, #3, #12 Perizinan Maritim BP Batam
(COUNTD(IF DATEDIFF('day', [TANGGAL REKAP AWAL], [TANGGAL REKAP AKHIR]) <= 1 THEN [NO IZIN] END) 
 / COUNTD([NO IZIN])) * 100.0`,
    tableauShelvesGuide: {
      showMe: 'Show Me #6 (Horizontal Bar)',
      rows: '[NAMA LAYANAN MARITIM]',
      columns: '[Kepatuhan SLA Maritim %]',
      marks: 'Color: Blue Palette',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Dataset Item #1, #2, #3, #4, #10, #11, #12: DATA PERIZINAN MARITIM BP BATAM (Hal 21-26)',
      tableName: 'ptsp_maritim_izin_master',
      attributes: ['NAMA LAYANAN', 'NO PENDAFTARAN', 'NO IZIN', 'TANGGAL IZIN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'PELABUHAN BONGKAR MUAT', 'ESTIMATE LAMA HARI KERJA'],
      updateFrequency: 'Bulanan / Harian',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 90,0% SLA Maritim (≤ 1 Hari Kerja)',
      warning: '80,0% - 89,9%',
      critical: '< 80,0%',
      standardOrigin: 'Standar Waktu Layanan Kepelabuhanan BP Batam',
    },
    executiveAction: 'Pertahankan sistem verifikasi online 24/7 untuk dokumen jadwal kapal demi kelancaran arus logistik ekspor-impor di Batam.',
  },

  ptsp_sektor_kbli: {
    id: 'ptsp_sektor_kbli',
    unit: 'ptsp',
    title: 'Sebaran Perizinan Berusaha Berdasarkan Sektor KBLI',
    codeTag: 'PTSP_SEKTOR_KBLI',
    category: 'Sebaran Sektor & OSS RBA',
    currentValue: '13.820 Permohonan (13.192 Terbit - 95,5%)',
    targetValue: 'Tingkat Penyelesaian Sektor: ≥ 90,0%',
    statusText: 'Rasio Penerbitan Sangat Efektif (95,5%)',
    statusVariant: 'success',
    summary: 'Pemetaan volume permohonan dan penerbitan izin berusaha berdasarkan Klasifikasi Baku Lapangan Usaha Indonesia (KBLI) dari sistem OSS RBA BP Batam.',
    presentationPitch: 'Distribusi perizinan berusaha menurut sektor KBLI menunjukkan sektor Industri Pengolahan dan Perdagangan Besar/Eceran mendominasi volume pengajuan izin dengan konversi penerbitan rata-rata 95,5%. Sektor industri manufaktur menyumbang 4.210 permohonan dengan 4.050 izin terbit.',
    formulaConceptual: '(SUM([JUMLAH TERBIT]) ÷ SUM([JUMLAH PERMOHONAN])) × 100%',
    numerator: {
      label: 'Total Izin Terbit per Sektor',
      realValue: '13.192 Berkas Terbit',
      source: 'Dataset No. 9: SUM([JUMLAH TERBIT])',
    },
    denominator: {
      label: 'Total Permohonan Masuk per Sektor',
      realValue: '13.820 Berkas Masuk',
      source: 'Dataset No. 9: SUM([JUMLAH PERMOHONAN])',
    },
    calculationResult: 'Bagaimana Dihasilkan: (13.192 terbit ÷ 13.820 masuk) × 100% = 95,46%',
    tableauCalculatedField: `// Calculated Field: [Rasio Izin Terbit Sektor %]
// Rumus Tableau:
SUM([JUMLAH TERBIT]) / SUM([JUMLAH PERMOHONAN])`,
    tableauShelvesGuide: {
      showMe: 'Horizontal Clustered Bar Chart / Pivot Crosstab (Sheet Swap)',
      rows: '[SEKTOR USAHA (KBLI)]',
      columns: 'Measure Values: SUM([JUMLAH PERMOHONAN]), SUM([JUMLAH TERBIT])',
      marks: 'Bar (Color: Measure Names)',
      filters: '[TAHUN] = 2026, [STATUS VALIDASI] = "Valid"',
    },
    databaseSource: {
      catalogItem: 'Dataset Item #9: DATA PERMOHONAN PERIZINAN BERUSAHA (Hal 25)',
      tableName: 'ptsp_perizinan_berusaha_kbli',
      attributes: ['SEKTOR USAHA', 'KODE KBLI', 'JUMLAH PERMOHONAN', 'JUMLAH TERBIT', 'TINGKAT RISIKO', 'TAHUN'],
      updateFrequency: 'Bulanan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 90,0% Rasio Terbit per Sektor',
      warning: '80,0% - 89,9%',
      critical: '< 80,0%',
      standardOrigin: 'Standar Pelayanan OSS RBA & Kemeninves/BKPM',
    },
    executiveAction: 'Prioritaskan asistensi teknis pada sektor padat karya dan teknologi tinggi untuk menjamin kelancaran realisasi investasi.',
  },

  // DIREKTORAT PERENCANAAN DAN PENGEMBANGAN INVESTASI
  kpi_kek_investasi: {
    id: 'kpi_kek_investasi',
    unit: 'dit-pengembangan-kek',
    title: 'Persentase Capaian Realisasi Investasi KEK (%)',
    codeTag: 'KPI-KEK-01',
    category: 'Investasi & Penanaman Modal',
    currentValue: 'Rp 9.091,45 M (208,9%)',
    targetValue: 'Target Investasi TA 2025: Rp 4.352,00 M',
    statusText: 'Target Sangat Terlampaui (+108,9% di atas target)',
    statusVariant: 'success',
    summary: 'Rasio akumulasi realisasi penanaman modal investasi (PMA dan PMDN) di Kawasan Ekonomi Khusus (KEK Nongsa, Batam Teknik, dan Pariwisata & Kesehatan Internasional Batam) terhadap target investasi tahunan.',
    presentationPitch: 'Bapak/Ibu Pimpinan, realisasi investasi di KEK KPBPBB Batam pada TA 2025 telah mencapai angka impresif Rp 9,09 Triliun atau 208,9% dari target Perkin Rp 4,35 Triliun. Kontributor terbesar didorong oleh penanaman modal asing (PMA) sebesar Rp 8,86 Triliun (97,4%) pada sektor Hyperscale Data Center di KEK Nongsa Digital Park.',
    formulaConceptual: '(Total Realisasi Investasi PMA & PMDN ÷ Total Target Investasi KEK) × 100%',
    numerator: {
      label: 'Pembilang (Total Realisasi Investasi KEK)',
      realValue: 'Rp 9.091.449.868.293 (Dataset No. 1: 16 Baris Data)',
      source: 'SUM([nilairealisasiinvestasi-kek-dp].[REALISASI INVESTASI])',
    },
    denominator: {
      label: 'Penyebut (Total Target Investasi KEK)',
      realValue: 'Rp 4.352.000.000.000 (Target Tahunan 3 KEK)',
      source: 'SUM([nilairealisasiinvestasi-kek-dp].[TARGET INVESTASI])',
    },
    calculationResult: '(9.091.449.868.293 ÷ 4.352.000.000.000) × 100% = 208,90% ≈ 208,9%',
    tableauCalculatedField: `// Calculated Field: [% Capaian Investasi KEK]
SUM([REALISASI INVESTASI]) / SUM([TARGET INVESTASI]) * 100`,
    tableauShelvesGuide: {
      showMe: 'BAN Metric Tile & Stacked Bar PMA/PMDN',
      rows: '[NAMA KAWASAN EKONOMI KHUSUS], [JENIS INVESTASI (PMA/PMDN)]',
      columns: 'SUM([REALISASI INVESTASI]), [% Capaian Investasi KEK]',
      marks: 'Color by [JENIS INVESTASI], Tooltip with [TRIWULAN]',
      filters: '[TAHUN] = 2025, [TRIWULAN] = All',
    },
    databaseSource: {
      catalogItem: 'Dataset No. 1: Nilai Realisasi Investasi KEK di KPBPBB Batam',
      tableName: 'nilairealisasiinvestasi_kek_dp',
      attributes: ['TAHUN', 'TRIWULAN', 'NAMA KAWASAN EKONOMI KHUSUS', 'JENIS INVESTASI', 'TARGET INVESTASI', 'REALISASI INVESTASI'],
      updateFrequency: 'Pertriwulan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 100,0%',
      warning: '85,0% - 99,9%',
      critical: '< 85,0%',
      standardOrigin: 'Perjanjian Kinerja (Perkin) Direktorat Perencanaan dan Pengembangan Investasi',
    },
    executiveAction: 'Akselerasi fasilitasi perizinan BUPP dan kepabeanan untuk menjamin penyelesaian konstruksi Data Center dan fasilitas MRO pesawat on-schedule.',
  },

  kpi_kek_izin_berusaha: {
    id: 'kpi_kek_izin_berusaha',
    unit: 'dit-pengembangan-kek',
    title: 'Jumlah Daftar Perizinan Berusaha Administrator KEK',
    codeTag: 'KPI-KEK-02',
    category: 'Layanan Perizinan Berusaha',
    currentValue: '22 Perizinan Berusaha',
    targetValue: 'Target: 100% Pemohon Terlayani Sesuai NSPK',
    statusText: 'Optimal (Semua Permohonan Berstatus Terbit)',
    statusVariant: 'success',
    summary: 'Total volume perizinan berusaha berbasis risiko (OSS RBA) dan izin komersial/operasional yang diproses dan diterbitkan oleh Administrator KEK di KPBPBB Batam.',
    presentationPitch: 'Pelayanan Perizinan Berusaha Administrator KEK telah berhasil menerbitkan 22 izin berusaha bagi pelaku usaha di KEK Nongsa, Batam Teknik, dan KEK Pariwisata & Kesehatan Internasional tanpa adanya backlog permohonan.',
    formulaConceptual: 'COUNT([NAMA PERIZINAN BERUSAHA]) dari Dataset Administrator KEK',
    numerator: {
      label: 'Volume Perizinan Berusaha Terbit',
      realValue: '22 Dokumen Izin Usaha Terbit',
      source: 'Dataset No. 3: COUNT([NAMA PERIZINAN BERUSAHA])',
    },
    denominator: {
      label: 'Total Permohonan Masuk',
      realValue: '22 Permohonan (Zero Backlog)',
      source: 'Sistem Administrator KEK Online',
    },
    calculationResult: 'Total 22 Perizinan Berusaha Terbit (100% Tingkat Penyelesaian)',
    tableauCalculatedField: `// Calculated Field: [Total Perizinan Berusaha]
COUNT([NAMA PERIZINAN BERUSAHA])`,
    tableauShelvesGuide: {
      showMe: 'Tableau Sheet Swap Table (Worksheet 1)',
      rows: '[NAMA PERIZINAN BERUSAHA], [TANGGAL PERIZINAN BERUSAHA]',
      columns: 'Measure Names / Status',
      marks: 'Text Marks',
      filters: '[p_Sheet_Filter_Perizinan] = "Perizinan Berusaha"',
    },
    databaseSource: {
      catalogItem: 'Dataset No. 3: Daftar Perizinan Berusaha Administrator KEK',
      tableName: 'kek_perizinan_berusaha',
      attributes: ['NAMA PERIZINAN BERUSAHA', 'TANGGAL PERIZINAN BERUSAHA'],
      updateFrequency: 'Jika Update',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '100% SLA',
      warning: '90% - 99%',
      critical: '< 90%',
      standardOrigin: 'NSPK Administrator Kawasan Ekonomi Khusus',
    },
    executiveAction: 'Terus integrasikan sistem perizinan administrator KEK dengan sistem SIAGA BP Batam dan OSS RBA Kementerian Investasi/BKPM.',
  },

  kpi_kek_non_perizinan: {
    id: 'kpi_kek_non_perizinan',
    unit: 'dit-pengembangan-kek',
    title: 'Jumlah Daftar Non Perizinan Administrator KEK',
    codeTag: 'KPI-KEK-03',
    category: 'Fasilitas & Rekomendasi Non-Izin',
    currentValue: '12 Layanan Non Perizinan',
    targetValue: 'Target: Seluruh Fasilitas Fiskal Terfasilitasi',
    statusText: 'Aktif & Terfasilitasi',
    statusVariant: 'info',
    summary: 'Total dokumen rekomendasi fiskal, pembebasan bea masuk, masterlist, dan fasilitas ketenagakerjaan yang diterbitkan oleh Administrator KEK.',
    presentationPitch: 'Sebanyak 12 fasilitas dan layanan non-perizinan telah difasilitasi oleh Administrator KEK, mencakup rekomendasi Tax Holiday, pembebasan PPN/PPnBM, fasilitas masterlist peralatan modal, dan rekomendasi RPTKA tenaga ahli asing.',
    formulaConceptual: 'COUNT([NAMA NON PERIZINAN]) dari Dataset Administrator KEK',
    numerator: {
      label: 'Volume Layanan Non Perizinan',
      realValue: '12 Dokumen Rekomendasi/Fasilitas',
      source: 'Dataset No. 4: COUNT([NAMA NON PERIZINAN])',
    },
    denominator: {
      label: 'Kategori Fasilitas',
      realValue: 'Fiskal, Kepabeanan & Ketenagakerjaan',
      source: 'Buku Pedoman Fasilitas KEK',
    },
    calculationResult: 'Total 12 Layanan Non Perizinan Terbit',
    tableauCalculatedField: `// Calculated Field: [Total Non Perizinan KEK]
COUNT([NAMA NON PERIZINAN])`,
    tableauShelvesGuide: {
      showMe: 'Tableau Sheet Swap Table (Worksheet 2)',
      rows: '[NAMA NON PERIZINAN], [TANGGAL], [KETERANGAN]',
      columns: 'COUNT([NAMA NON PERIZINAN])',
      marks: 'Text Marks',
      filters: '[p_Sheet_Filter_Perizinan] = "Non Perizinan"',
    },
    databaseSource: {
      catalogItem: 'Dataset No. 4: Daftar Non Perizinan Administrator KEK',
      tableName: 'kek_non_perizinan',
      attributes: ['NAMA NON PERIZINAN', 'TANGGAL', 'KETERANGAN'],
      updateFrequency: 'Jika Update',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '100% Tuntas',
      warning: '85% - 99%',
      critical: '< 85%',
      standardOrigin: 'Standar Pelayanan Non-Perizinan Administrator KEK',
    },
    executiveAction: 'Tingkatkan pendampingan teknis kepada pelaku usaha untuk pemanfaatan insentif super tax deduction dan fasilitas masterlist importasi.',
  },

  kpi_kek_perizinan_lainnya: {
    id: 'kpi_kek_perizinan_lainnya',
    unit: 'dit-pengembangan-kek',
    title: 'Jumlah Daftar Perizinan Lainnya Administrator KEK',
    codeTag: 'KPI-KEK-04',
    category: 'Perizinan Khusus & Lingkungan',
    currentValue: '10 Perizinan Lainnya',
    targetValue: 'Target: Kepatuhan Operasional 100%',
    statusText: 'Terbit & Memenuhi Syarat',
    statusVariant: 'info',
    summary: 'Jumlah perizinan khusus yang diterbitkan Administrator KEK meliputi izin pemanfaatan limbah B3, izin operasi pembangkit tenaga listrik, izin dispensasi jam kerja lembur, dan izin keselamatan teknis.',
    presentationPitch: 'Administrator KEK telah menerbitkan 10 perizinan lainnya yang bersifat teknis operasional, memastikan kegiatan industri di KEK mematuhi standar keselamatan kerja dan ramah lingkungan.',
    formulaConceptual: 'COUNT([NAMAPERIZINAN]) dari Dataset No. 7 Administrator KEK',
    numerator: {
      label: 'Volume Perizinan Lainnya Terbit',
      realValue: '10 Dokumen Perizinan Khusus',
      source: 'Dataset No. 7: COUNT([NAMAPERIZINAN])',
    },
    denominator: {
      label: 'Sektor Khusus',
      realValue: 'Lingkungan, Ketenagalistrikan & K3',
      source: 'Regulasi Teknis KEK',
    },
    calculationResult: 'Total 10 Perizinan Khusus/Lainnya Terbit',
    tableauCalculatedField: `// Calculated Field: [Total Perizinan Lainnya KEK]
COUNT([NAMAPERIZINAN])`,
    tableauShelvesGuide: {
      showMe: 'Tableau Sheet Swap Table (Worksheet 3)',
      rows: '[NAMAPERIZINAN], [TANGGALPERIZINAN]',
      columns: 'COUNT([NAMAPERIZINAN])',
      marks: 'Text Marks',
      filters: '[p_Sheet_Filter_Perizinan] = "Perizinan Lainnya"',
    },
    databaseSource: {
      catalogItem: 'Dataset No. 7: Daftar Perizinan Lainnya Administrator KEK',
      tableName: 'kek_perizinan_lainnya',
      attributes: ['NAMAPERIZINAN', 'TANGGALPERIZINAN'],
      updateFrequency: 'Jika Update',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '100% Kepatuhan',
      warning: '85% - 99%',
      critical: '< 85%',
      standardOrigin: 'Standar Teknis dan Lingkungan Kawasan Khusus',
    },
    executiveAction: 'Lakukan inspeksi periodik terhadap izin genset dan pengelolaan limbah untuk menjaga komitmen keberlanjutan (green KEK).',
  },

  kpi_kek_kajian_perkin: {
    id: 'kpi_kek_kajian_perkin',
    unit: 'dit-pengembangan-kek',
    title: '% Kajian Pengembangan, Kerjasama, Daya Saing & KEK Berkelanjutan',
    codeTag: 'KPI-KEK-05',
    category: 'Perjanjian Kinerja (Perkin)',
    currentValue: '91,7% Capaian Perkin',
    targetValue: 'Target Perkin: ≥ 90,0%',
    statusText: 'Target Perkin Tercapai (11 dari 12 Analisis Ditindaklanjuti)',
    statusVariant: 'success',
    summary: 'Formula Perkin: Capaian (%) = (Jumlah Analisis yang Ditindaklanjuti ÷ Jumlah Dokumen Analisis) × 100%. Mengukur persentase rekomendasi kebijakan dan telaahan analisis strategis yang diimplementasikan.',
    presentationPitch: 'Berdasarkan formula Perjanjian Kinerja (Perkin), capaian indikator kajian pengembangan dan kerjasama strategis KEK mencapai 91,7%, melampaui target tahunan 90,0%. Dari 12 dokumen analisis yang diterbitkan, 11 telaahan telah berhasil ditindaklanjuti menjadi kebijakan operasional atau perjanjian kerja sama.',
    formulaConceptual: '(Jumlah Analisis yang Ditindaklanjuti ÷ Jumlah Dokumen Analisis) × 100%',
    numerator: {
      label: 'Pembilang (Jumlah Analisis Ditindaklanjuti)',
      realValue: '11 Dokumen Analisis Ditindaklanjuti',
      source: 'Dataset No. 12: COUNT(IF [Status] = "Ditindaklanjuti")',
    },
    denominator: {
      label: 'Penyebut (Jumlah Dokumen Analisis Diterbitkan)',
      realValue: '12 Dokumen Analisis Diterbitkan',
      source: 'Dataset No. 12: COUNT([LAPORAN KAJIAN])',
    },
    calculationResult: '(11 ÷ 12) × 100% = 91,67% ≈ 91,7% Capaian Perkin',
    tableauCalculatedField: `// Calculated Field: [% Capaian Perkin Kajian KEK]
(COUNT(IF [Status] = 'Ditindaklanjuti' THEN [ID] END) / COUNT([ID])) * 100`,
    tableauShelvesGuide: {
      showMe: 'Gauge / Donut Chart & Detail List',
      rows: '[Judul Analisis], [Status Tindak Lanjut]',
      columns: '[% Capaian Perkin Kajian KEK]',
      marks: 'Color by Status, Tooltip with Rekomendasi Kebijakan',
      filters: '[Tahun] = 2025',
    },
    databaseSource: {
      catalogItem: 'Dataset No. 12: Laporan Kajian Pengembangan, Kerja Sama di KPBPBB dan KEK',
      tableName: 'kek_kajian_perkin',
      attributes: ['LAPORAN KAJIAN', 'TAHUN', 'STATUS TINDAK LANJUT'],
      updateFrequency: 'Pertahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 90,0%',
      warning: '80,0% - 89,9%',
      critical: '< 80,0%',
      standardOrigin: 'Perjanjian Kinerja (Perkin) Pejabat Pimpinan Tinggi Pratama BP Batam',
    },
    executiveAction: 'Dorong penyelesaian telaahan ke-12 terkait insentif green data center agar capaian mencapai 100% sempurna sebelum akhir tahun anggaran.',
  },

  // DIREKTORAT PROMOSI DAN FASILITASI INVESTASI
  kpi_investasi_realisasi: {
    id: 'kpi_investasi_realisasi',
    unit: 'dit-investasi',
    title: 'Persentase Capaian Realisasi Investasi PMA & PMDN (Dataset No. 13)',
    codeTag: 'INV-01',
    category: 'Realisasi Investasi',
    currentValue: 'Rp 21,38 T (114,3%)',
    targetValue: 'Target Investasi: Rp 18,70 T',
    statusText: 'Melampaui Target (114,3% Capaian)',
    statusVariant: 'success',
    summary: 'Realisasi investasi PMA dan PMDN di Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam mencapai Rp 21,38 Triliun dari target Rp 18,70 Triliun, setara 114,3% capaian.',
    presentationPitch: 'Bapak/Ibu Pimpinan, realisasi investasi di BP Batam melampaui target tahunan sebesar 114,3% dengan total capaian Rp 21,38 Triliun dari target Rp 18,70 Triliun didorong oleh ekspansi industri manufaktur semikonduktor, data center KEK Nongsa, dan energi terbarukan.',
    formulaConceptual: '% Capaian Realisasi Investasi = (Total Realisasi Investasi / Target Investasi) × 100%',
    numerator: {
      label: 'Total Realisasi Investasi (PMA + PMDN)',
      realValue: 'Rp 21.380.000.000.000 (Rp 21,38 T)',
      source: 'Dataset No. 13: Laporan Realisasi Investasi KPBPBB (LKPM & OSS)',
    },
    denominator: {
      label: 'Target Investasi Tahunan BP Batam',
      realValue: 'Rp 18.700.000.000.000 (Rp 18,70 T)',
      source: 'Target Perjanjian Kinerja (Perkin) Direktorat Promosi dan Fasilitasi Investasi',
    },
    calculationResult: '(Rp 21,38 T / Rp 18,70 T) × 100% = 114,33%',
    tableauCalculatedField: '// [1. % Capaian Realisasi Investasi]\n(SUM([Realisasi Investasi]) / SUM([Target Investasi])) * 100',
    tableauShelvesGuide: {
      showMe: 'Bullet Graphs / KPI Card BAN',
      rows: 'Measure Values (Realisasi & Target)',
      columns: 'Tahun, Triwulan',
      marks: 'Bar (Realisasi) dengan Reference Line (Target)',
      filters: '[Tahun] = 2025, [Jenis] = ALL',
    },
    databaseSource: {
      catalogItem: 'Dataset No. 13: Laporan Realisasi Investasi di Kawasan Perdagangan Bebas dan Pelabuhan Bebas',
      tableName: 'investasi_realisasi_lkpm',
      attributes: ['TRIWULAN', 'TAHUN', 'SEKTOR', 'NEGARA ASAL', 'JENIS (PMA/PMDN)', 'TARGET INVESTASI', 'REALISASI INVESTASI', 'JUMLAH PROYEK', 'TENAGA KERJA'],
      updateFrequency: 'Pertriwulan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 100,0%',
      warning: '85,0% - 99,9%',
      critical: '< 85,0%',
      standardOrigin: 'Target Renstra & Perjanjian Kinerja (Perkin) Direktorat Promosi dan Fasilitasi Investasi BP Batam',
    },
    executiveAction: 'Akselerasi debottlenecking perizinan dan penyediaan infrastruktur pendukung untuk mempertahankan momentum realisasi di atas target.',
  },

  kpi_investasi_website: {
    id: 'kpi_investasi_website',
    unit: 'dit-investasi',
    title: 'Jumlah Kunjungan Website Invest In-Batam (Dataset No. 10)',
    codeTag: 'INV-02',
    category: 'Promosi & Digital Portal',
    currentValue: '236.950 Kunjungan (Hits)',
    targetValue: 'Target: 200.000 Kunjungan/Tahun',
    statusText: 'Tinggi (+24,6% YoY Growth)',
    statusVariant: 'success',
    summary: 'Total kunjungan investor global ke portal resmi promosi investasi investinbatam.bpbatam.go.id mencapai 236.950 sesi dengan 158.400 pengguna unik.',
    presentationPitch: 'Minat informasi investor terhadap Batam terbukti sangat tinggi melalui portal digital Invest In-Batam dengan 236.950 kunjungan sepanjang tahun berjalan, dengan asal pengunjung dominan dari Singapura, Jepang, Tiongkok, dan Amerika Serikat.',
    formulaConceptual: 'Total Kunjungan Web = ∑ Kunjungan Bulanan (Sessions/Hits)',
    numerator: {
      label: 'Akumulasi Kunjungan / Sessions Web Portal',
      realValue: '236.950 Kunjungan (Sessions)',
      source: 'Dataset No. 10: Google Analytics / Web Server Logs investinbatam.bpbatam.go.id',
    },
    denominator: {
      label: 'Periode Analisis',
      realValue: '12 Bulan (Januari - Desember)',
      source: 'Laporan Berkala Traffic Web Satu Data BP Batam',
    },
    calculationResult: '236.950 Sesi Kunjungan (Rata-rata 19.746 sesi/bulan)',
    tableauCalculatedField: '// [2. Total Traffic Portal Investasi]\nSUM([Traffic Kunjungan])',
    tableauShelvesGuide: {
      showMe: 'Area Chart / Line Chart Tren Bulanan',
      rows: 'SUM([Traffic Kunjungan])',
      columns: 'Bulan / Triwulan',
      marks: 'Area dengan gradient fill biru',
      filters: '[Tahun] = 2025',
    },
    databaseSource: {
      catalogItem: 'Dataset No. 10: Jumlah Kunjungan Website Invest In-Batam',
      tableName: 'investasi_website_traffic',
      attributes: ['TRIWULAN', 'TAHUN', 'BULAN', 'TRAFFIC KUNJUNGAN', 'PENGUNJUNG UNIK', 'PAGEVIEWS', 'ASAL NEGARA PENGUNJUNG'],
      updateFrequency: 'Bulanan / Pertriwulan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 200.000 Kunjungan',
      warning: '150.000 - 199.999 Kunjungan',
      critical: '< 150.000 Kunjungan',
      standardOrigin: 'Standar Layanan Informasi & Promosi Digital BP Batam',
    },
    executiveAction: 'Tingkatkan materi promosi multibahasa (Mandarin, Jepang) dan optimasi SEO landing page panduan insentif KEK Batam.',
  },

  kpi_investasi_minat: {
    id: 'kpi_investasi_minat',
    unit: 'dit-investasi',
    title: 'Minat Investasi Hasil Kunjungan dan Pameran Dalam dan Luar Negeri (Dataset No. 14)',
    codeTag: 'INV-03',
    category: 'Peminat & Pameran',
    currentValue: '16 Calon Investor (Rp 28,67 T)',
    targetValue: 'Target: 12 Investor (LoI)',
    statusText: 'Sangat Baik (133% Target LoI)',
    statusVariant: 'success',
    summary: 'Sebanyak 16 perusahaan calon investor menandatangani Letter of Intent (LoI) / pernyataan minat investasi dengan total estimasi nilai Rp 28,67 Triliun dari expo dalam dan luar negeri.',
    presentationPitch: 'Hasil aktifitas pameran dan kunjungan kerja diplomatik luar negeri berhasil mengamankan 16 komitmen minat investasi (LoI) dengan potensi nilai Rp 28,67 Triliun, didominasi sektor data center, semikonduktor, dan logistik maritim.',
    formulaConceptual: 'Jumlah Minat Investasi = ∑ Investor Menandatangani LoI / Inkuiri Resmi dari Pameran & Kunjungan',
    numerator: {
      label: 'Jumlah Perusahaan Pemohon / Penandatangan LoI',
      realValue: '16 Perusahaan (11 PMA, 5 PMDN)',
      source: 'Dataset No. 14: Pencatatan Hasil Expo & Kunjungan Kerja Promosi',
    },
    denominator: {
      label: 'Target Komitmen LoI Perkin',
      realValue: '12 Perusahaan Calon Investor',
      source: 'Indikator Kinerja Program Promosi Direktorat Promosi dan Fasilitasi Investasi',
    },
    calculationResult: '16 Calon Investor (Nilai Potensi Rp 28.670 Miliar)',
    tableauCalculatedField: '// [3. Jumlah Minat Investasi]\nCOUNTD([Nama Perusahaan])',
    tableauShelvesGuide: {
      showMe: 'Horizontal Bar Chart Berdasarkan Sektor',
      rows: '[Sektor]',
      columns: 'COUNTD([Nama Perusahaan]), SUM([Nilai Minat])',
      marks: 'Bar bertingkat (Color by [Kategori Luar/Dalam Negeri])',
      filters: '[Status Minat] = ALL',
    },
    databaseSource: {
      catalogItem: 'Dataset No. 14: Data Minat Investasi dari Kunjungan dan Pameran Dalam dan Luar Negeri',
      tableName: 'investasi_minat_pameran',
      attributes: ['SEMESTER', 'TAHUN', 'NAMA PERUSAHAAN', 'SEKTOR', 'MINAT INVESTASI (NILAI RP)', 'NEGARA ASAL', 'KATEGORI (DALAM/LUAR NEGERI)', 'STATUS MINAT'],
      updateFrequency: 'Per Kegiatan / Semester',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 12 Perusahaan LoI',
      warning: '8 - 11 Perusahaan LoI',
      critical: '< 8 Perusahaan LoI',
      standardOrigin: 'Standar Efektivitas Promosi & Expo Investasi BP Batam',
    },
    executiveAction: 'Lakukan tindak lanjut (one-on-one facilitation) intensif bersama Tim Fasilitasi Investasi untuk mengonversi LoI menjadi izin OSS dan realisasi fisik.',
  },

  kpi_investasi_infrastruktur: {
    id: 'kpi_investasi_infrastruktur',
    unit: 'dit-investasi',
    title: 'Informasi Infrastruktur yang Akan Dibangun di Batam (Dataset No. 6)',
    codeTag: 'INV-04',
    category: 'Pipeline Infrastruktur',
    currentValue: 'Rp 31,27 T (11 Proyek, 845,4 Ha)',
    targetValue: 'Multi-Tahun (2024 - 2027)',
    statusText: 'Pipeline Strategis Berjalan',
    statusVariant: 'info',
    summary: 'Daftar proyek infrastruktur strategis publik dan skema KPBU di Batam dengan komparasi nilai investasi dan luas lahan per tahun pelaksanaan.',
    presentationPitch: 'Pipeline infrastruktur penopang investasi di Batam mencakup 11 proyek strategis dengan total nilai Rp 31,27 Triliun dan alokasi lahan 845,4 Hektar yang terjadwal dari tahun 2024 hingga 2027.',
    formulaConceptual: '∑ Nilai Investasi per Tahun & ∑ Luas Lahan (Ha) per Proyek',
    numerator: {
      label: 'Total Nilai Investasi Pipeline Multi-Tahun',
      realValue: 'Rp 31.270.000.000.000 (Rp 31,27 T)',
      source: 'Dataset No. 6: Informasi Infrastruktur yang Akan Dibangun di Batam',
    },
    denominator: {
      label: 'Total Luas Area Lahan Proyek',
      realValue: '845,4 Hektar (11 Proyek Strategis)',
      source: 'Master Plan Pengembangan Infrastruktur Batam BP Batam',
    },
    calculationResult: '2024: Rp 1,42 T (45,8 Ha) | 2025: Rp 4,96 T (183,6 Ha) | 2026: Rp 10,19 T (196,0 Ha) | 2027: Rp 14,70 T (420,0 Ha)',
    tableauCalculatedField: '// [4. Nilai Investasi Infrastruktur per Tahun]\nSUM([Nilai Investasi])',
    tableauShelvesGuide: {
      showMe: 'Dual-Axis Bar and Line Chart',
      rows: 'SUM([Nilai Investasi]), SUM([Luas Area Ha])',
      columns: '[Tahun Pelaksanaan]',
      marks: 'Bar (Nilai Rp) & Line (Luas Ha)',
      filters: '[Tahun] = 2024 - 2027',
    },
    databaseSource: {
      catalogItem: 'Dataset No. 6: Informasi Infrastruktur yang Akan di Bangun di Batam',
      tableName: 'investasi_infrastruktur_pipeline',
      attributes: ['TAHUN', 'NAMA PROJECT', 'LOKASI', 'LUAS', 'STATUS PROJECT', 'PEMILIK PROJECT', 'AKTIFITAS UTAMA', 'SKEMA BISNIS', 'NILAI INVESTASI', 'JADWAL PROJECT', 'KAPASITAS PROJECT'],
      updateFrequency: 'Pertahun',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: 'On Schedule Proyek Perencanaan',
      warning: '1 - 2 Proyek Tertunda Pembebasan Lahan',
      critical: '> 2 Proyek Terhambat Pendanaan',
      standardOrigin: 'Dokumen Rencana Pembangunan Jangka Menengah & Master Plan BP Batam',
    },
    executiveAction: 'Pastikan kesiapan penlok dan percepatan lelang KPBU untuk proyek flyover, pelebaran jalan arteri pelabuhan, dan jetty terminal kargo.',
  },

  kpi_investasi_promosi: {
    id: 'kpi_investasi_promosi',
    unit: 'dit-investasi',
    title: 'Tentatif Kegiatan Promosi Investasi (Dataset No. 11)',
    codeTag: 'INV-05',
    category: 'Agenda Promosi & Tamu',
    currentValue: '16 Agenda • 10.600 Tamu / Delegasi',
    targetValue: 'Target Pelaksanaan: 16 Kegiatan',
    statusText: 'Berjalan Sesuai Kalender',
    statusVariant: 'success',
    summary: 'Penyelenggaraan kegiatan promosi investasi menurut kategori: Pameran Luar Negeri, Pameran Dalam Negeri, Business Forum, Misi Diplomatik, dan Inbound Delegasi.',
    presentationPitch: 'Kalender tentatif promosi investasi mencakup 16 pelaksanaan kegiatan di dalam dan luar negeri dengan estimasi jangkauan 10.600 tamu investor dan pelaku usaha global.',
    formulaConceptual: 'Matriks Promosi: ∑ Jumlah Tamu per Kategori & ∑ Jumlah Pelaksanaan Kegiatan',
    numerator: {
      label: 'Total Estimasi Tamu / Delegasi Investor',
      realValue: '10.600 Orang Tamu / Peserta',
      source: 'Dataset No. 11: Tentatif Kegiatan Promosi Investasi BP Batam',
    },
    denominator: {
      label: 'Total Sesi / Pelaksanaan Kegiatan',
      realValue: '16 Agenda / Sesi Pelaksanaan',
      source: 'Kalender Kerja Promosi Investasi Terpadu',
    },
    calculationResult: 'Rata-rata 662 Tamu per Pelaksanaan Kegiatan Promosi',
    tableauCalculatedField: '// [5. Tamu Promosi per Kategori]\nSUM([Jumlah Tamu]) / SUM([Jumlah Pelaksanaan])',
    tableauShelvesGuide: {
      showMe: 'Comparative Dual Bar / Side-by-Side Bar',
      rows: '[Kategori Kegiatan]',
      columns: 'SUM([Jumlah Tamu]), SUM([Jumlah Pelaksanaan])',
      marks: 'Color by [Status]',
      filters: '[Tahun] = 2025',
    },
    databaseSource: {
      catalogItem: 'Dataset No. 11: Tentatif Kegiatan Promosi',
      tableName: 'investasi_tentatif_promosi',
      attributes: ['TAHUN', 'KATEGORI KEGIATAN', 'NAMA KEGIATAN', 'NAMA PENYELENGGARA', 'TANGGAL PELAKSANAAN', 'JUMLAH TAMU/JUMLAH PELAKSANAAN KEGIATAN'],
      updateFrequency: 'Per Semester / Tahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 85% Agenda Terlaksana Sesuai Jadwal',
      warning: '70% - 84% Agenda Terlaksana',
      critical: '< 70% Agenda Terlaksana',
      standardOrigin: 'Kalender Kegiatan Promosi Investasi BP Batam',
    },
    executiveAction: 'Matangkan persiapan delegasi paviliun BP Batam pada expo mancanegara dan kurasi calon buyer/investor potensial.',
  },

  // -------------------------------------------------------------
  // DIREKTORAT LALU LINTAS BARANG
  // -------------------------------------------------------------
  llb_pnbp: {
    id: 'llb_pnbp',
    unit: 'dit-lalu-lintas-barang',
    title: 'Realisasi PNBP Pelayanan Lalu Lintas Barang',
    codeTag: 'DLLB-01',
    category: 'Penerimaan Negara Bukan Pajak',
    currentValue: 'Rp 36,12 Miliar (85,0%)',
    targetValue: 'Target DIPA 2026: Rp 42,50 Miliar',
    statusText: 'Kinerja Sangat Baik (+14.2% YoY)',
    statusVariant: 'success',
    summary: 'Penerimaan PNBP atas jasa perizinan lalu lintas barang: pemasukan bahan baku (Rp 18,40 M), pengeluaran produk olahan (Rp 9,80 M), izin usaha kawasan (Rp 5,22 M), dan kuota perdagangan konsumsi (Rp 2,70 M).',
    presentationPitch: 'Realisasi PNBP DLLB telah mencapai Rp 36,12 Miliar atau 85,0% dari target tahunan Rp 42,50 Miliar, didorong oleh akselerasi arus barang industri manufaktur di KPBPBB Batam.',
    formulaConceptual: 'Persentase Capaian PNBP = (Total Realisasi PNBP Pelayanan / Target PNBP Tahunan) × 100%',
    numerator: {
      label: 'Total Realisasi Penerimaan PNBP Jasa Layanan YTD',
      realValue: 'Rp 36.125.000.000,-',
      source: 'Sistem Informasi Keuangan (SIMKEU) & Modul Pembayaran PNBP Perizinan',
    },
    denominator: {
      label: 'Target Penerimaan PNBP Tahunan DIPA 2026',
      realValue: 'Rp 42.500.000.000,-',
      source: 'DIPA BP Batam TA 2026 Satker Direktorat Lalu Lintas Barang',
    },
    calculationResult: '85,0% Terlampaui (Sisa Target: Rp 6,375 Miliar)',
    tableauCalculatedField: '// [1. Capaian PNBP DLLB (%)]\n(SUM([Realisasi PNBP]) / SUM([Target PNBP])) * 100',
    tableauShelvesGuide: {
      showMe: 'Show Me #10 (Dual Axis: Bar & Line)',
      rows: '[Kategori Layanan Perizinan]',
      columns: 'SUM([Realisasi PNBP]), SUM([Target PNBP])',
      marks: 'Color by [Status Capaian]',
      filters: '[Tahun]=2026, [Kode Satker]=\'DLLB\'',
    },
    databaseSource: {
      catalogItem: 'Dataset Item #3, #4, #6, #7 Konsolidasi Keuangan & Perizinan',
      tableName: 'pnbp_lalu_lintas_barang',
      attributes: ['TAHUN', 'KATEGORI', 'TARGET_RP', 'REALISASI_RP', 'PERSENTASE', 'PERTUMBUHAN_YOY'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: '≥ 80% Capaian pada Semester I',
      warning: '65% - 79% Capaian',
      critical: '< 65% Capaian',
      standardOrigin: 'Target Kinerja Renstra & Perjanjian Kinerja BP Batam 2026',
    },
    executiveAction: 'Pertahankan simplifikasi verifikasi dokumen impor/ekspor untuk mendukung target PNBP Rp 42,50 Miliar tercapai sebelum Q4 2026.',
  },

  llb_total_izin: {
    id: 'llb_total_izin',
    unit: 'dit-lalu-lintas-barang',
    title: 'Total Seluruh Penerbitan Izin Layanan LLB',
    codeTag: 'DLLB-02',
    category: 'Pelayanan Perizinan Terbit',
    currentValue: '1.842 Dokumen Surat/SK',
    targetValue: 'Target Proyeksi 2026: 5.500 Dokumen',
    statusText: 'Pertumbuhan Bulanan +8.4% MoM',
    statusVariant: 'success',
    summary: 'Akumulasi seluruh perizinan yang diterbitkan Direktorat Lalu Lintas Barang: 845 SK Pemasukan, 520 SK Pengeluaran, 265 SK Izin Usaha Kawasan, dan 212 SK Perdagangan/Kuota Konsumsi.',
    presentationPitch: 'Sebanyak 1.842 SK perizinan telah diterbitkan secara resmi melalui sistem digital terintegrasi BP Batam dengan tingkat kepatuhan persetujuan 98,2%.',
    formulaConceptual: 'Total Izin Terbit = ∑(Izin Pemasukan) + ∑(Izin Pengeluaran) + ∑(Izin Usaha Kawasan) + ∑(Izin Perdagangan)',
    numerator: {
      label: 'Jumlah Dokumen Izin dengan Status "Disetujui / Terbit"',
      realValue: '1.842 Surat Keputusan (SK)',
      source: 'Dataset No. 3, 4, 6, 7 Satu Data BP Batam (Halaman 8-9)',
    },
    denominator: {
      label: 'Konstanta Total Keseluruhan',
      realValue: '1.842 Dokumen',
      source: 'Basis Data Terpadu IBOSS & INSW',
    },
    calculationResult: '1.842 Dokumen (Rata-rata 460 Dokumen/Bulan)',
    tableauCalculatedField: '// [2. Total Perizinan DLLB]\nCOUNTD(IF [Status] = \'Disetujui\' THEN [No Izin] END)',
    tableauShelvesGuide: {
      showMe: 'Show Me #8 (Pie/Donut) & Show Me #3 (Stacked Bar)',
      rows: '[Bulan Penerbitan]',
      columns: 'COUNTD([No Izin])',
      marks: 'Color by [Kategori Layanan]',
      filters: '[Status]=\'Disetujui\', [Tahun]=2026',
    },
    databaseSource: {
      catalogItem: 'Dataset Item #3, #4, #6, #7 Satu Data BP Batam',
      tableName: 'perizinan_lalu_lintas_barang',
      attributes: ['NAMA PERUSAHAAN', 'NIB', 'NO PENDAFTARAN', 'NO IJIN', 'STATUS', 'TANGGAL DAFTAR'],
      updateFrequency: 'Per Bulan & Real-Time',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 400 SK / Bulan',
      warning: '300 - 399 SK / Bulan',
      critical: '< 300 SK / Bulan',
      standardOrigin: 'Standar Pelayanan Minimum (SPM) BP Batam',
    },
    executiveAction: 'Tingkatkan kapasitas server sistem IBOSS untuk mengakomodasi lonjakan permohonan izin impor akhir tahun.',
  },

  llb_izin_industri: {
    id: 'llb_izin_industri',
    unit: 'dit-lalu-lintas-barang',
    title: 'Penerbitan Izin Sektor Industri (Pemasukan & Pengeluaran)',
    codeTag: 'DLLB-03',
    category: 'Perizinan Industri KPBPBB',
    currentValue: '1.365 SK (74,1% Total Izin)',
    targetValue: 'Porsi Dominan Sektor Industri (≥ 70%)',
    statusText: 'Kontributor Utama Arus Barang',
    statusVariant: 'info',
    summary: 'Rincian izin lalu lintas barang khusus manufaktur: 845 izin pemasukan bahan baku industri dan 520 izin pengeluaran produk olahan kawasan bebas Batam.',
    presentationPitch: 'Sektor industri manufaktur mendominasi volume perizinan dengan total 1.365 SK (74,1%), mencerminkan utilisasi tinggi pabrik-pabrik di Batam.',
    formulaConceptual: 'Izin Industri = ∑(Izin Pemasukan Industri) + ∑(Izin Pengeluaran Industri)',
    numerator: {
      label: 'Volume Dokumen Izin Pemasukan & Pengeluaran Industri',
      realValue: '1.365 SK (845 Pemasukan + 520 Pengeluaran)',
      source: 'Dataset No. 6 & No. 7 Satu Data BP Batam (Halaman 9)',
    },
    denominator: {
      label: 'Total Seluruh Izin Diterbitkan',
      realValue: '1.842 SK',
      source: 'Rekapitulasi Konsolidasi Perizinan DLLB',
    },
    calculationResult: '74,1% Pangsa Sektor Industri terhadap Total Izin',
    tableauCalculatedField: '// [3. Pangsa Izin Industri (%)]\n(SUM(IF [Kategori] IN (\'Pemasukan\', \'Pengeluaran\') THEN [Volume] END) / SUM([Volume])) * 100',
    tableauShelvesGuide: {
      showMe: 'Side-by-side Bar / Dual Column Bar',
      rows: '[Sektor], [Jenis Izin]',
      columns: 'SUM([Volume])',
      marks: 'Color by [Jenis Izin]',
      filters: '[Sektor]=\'Industri\'',
    },
    databaseSource: {
      catalogItem: 'Dataset Item #6 (Izin Pemasukan) & #7 (Izin Pengeluaran)',
      tableName: 'izin_industri_llb',
      attributes: ['URAIAN IZIN', 'JUMLAH PENERBITAN', 'NAMA PERUSAHAAN', 'NIB', 'NO PENDAFTARAN', 'STATUS'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 70% Pangsa Industri',
      warning: '60% - 69%',
      critical: '< 60%',
      standardOrigin: 'Rencana Induk Kawasan Industri Batam',
    },
    executiveAction: 'Optimalkan jalur hijau perizinan (green lane) bagi perusahaan industri bersertifikat AEO.',
  },

  llb_izin_perdagangan: {
    id: 'llb_izin_perdagangan',
    unit: 'dit-lalu-lintas-barang',
    title: 'Perizinan Perdagangan & Alokasi Kuota Konsumsi',
    codeTag: 'DLLB-04',
    category: 'Stabilisasi Pasokan Pangan',
    currentValue: '212 SK • 84.060 Ton/KL (77,8%)',
    targetValue: 'Total Kuota Alokasi: 108.000 Ton/KL',
    statusText: 'Stok Sembako KPBPBB Aman',
    statusVariant: 'success',
    summary: 'Pengendalian alokasi kuota induk komoditas konsumsi: Beras (24.800 Ton), Gula Pasir (18.600 Ton), Daging Sapi (7.450 Ton), Tepung Terigu (12.200 Ton), Minyak Goreng (9.800 KL), Bawang & Cabai (4.650 Ton), Susu Olahan (6.560 Ton). Total nilai devisa Rp 1,82 Triliun.',
    presentationPitch: 'Serapan kuota impor barang konsumsi mencapai 84.060 Ton/KL (77,8%) dengan estimasi nilai ekonomi Rp 1,82 Triliun guna menjamin stabilitas harga pangan di Batam.',
    formulaConceptual: 'Persentase Serapan Kuota = (Total Realisasi Impor / Total Alokasi Kuota SK) × 100%',
    numerator: {
      label: 'Volume Realisasi Impor Terverifikasi',
      realValue: '84.060 Ton/KL',
      source: 'Dataset No. 2: Realisasi Kuota Induk Barang Konsumsi (Halaman 8)',
    },
    denominator: {
      label: 'Total Kuota Alokasi Berdasarkan SK Kepala BP Batam',
      realValue: '108.000 Ton/KL',
      source: 'SK Kuota Induk Barang Konsumsi BP Batam',
    },
    calculationResult: '77,8% Terserap (Sisa Kuota: 23.940 Ton/KL)',
    tableauCalculatedField: '// [4. Serapan Kuota Konsumsi (%)]\n(SUM([Realisasi]) / SUM([Kuota])) * 100',
    tableauShelvesGuide: {
      showMe: 'Show Me #2 (Horizontal Bullet Bar)',
      rows: '[Kode HS], [Komoditas]',
      columns: 'SUM([Realisasi]), SUM([Kuota])',
      marks: 'Color by [Status Kecukupan]',
      filters: '[Tahun]=2026',
    },
    databaseSource: {
      catalogItem: 'Dataset Item #2 (Realisasi Kuota) & #3 (Rekap Izin Perdagangan)',
      tableName: 'kuota_barang_konsumsi',
      attributes: ['KODE HS', 'KUOTA', 'SATUAN', 'NILAI', 'NO SK', 'TANGGAL SK', 'STATUS'],
      updateFrequency: 'Jika Update',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '75% - 90% Serapan Terkendali',
      warning: '90% - 98% Mendekati Habis',
      critical: '> 98% Kuota Habis',
      standardOrigin: 'Ketahanan Pangan Kota Batam & BP Batam',
    },
    executiveAction: 'Lakukan evaluasi stok penyangga bersama Satgas Pangan menjelang perayaan hari besar keagamaan.',
  },

  llb_izin_kawasan: {
    id: 'llb_izin_kawasan',
    unit: 'dit-lalu-lintas-barang',
    title: 'Penerbitan Izin Usaha Kawasan (IUK) Industri',
    codeTag: 'DLLB-05',
    category: 'Legalitas Kawasan Industri',
    currentValue: '265 SK • 34 Kawasan Aktif',
    targetValue: 'Target Pelayanan IUK: 300 SK',
    statusText: '1.420 Hektar Lahan Terkelola',
    statusVariant: 'success',
    summary: 'Penerbitan dokumen legalitas operasional kawasan industri, meliputi Batamindo Industrial Park, Kabil Integrated Industrial Estate, Panbil Industrial Estate, Cammo Industrial Park, dan 30 kawasan lainnya.',
    presentationPitch: 'Telah diterbitkan 265 SK Izin Usaha Kawasan yang menaungi 34 kawasan industri aktif dengan luas lahan terkelola mencapai 1.420 hektar.',
    formulaConceptual: 'Total IUK Terbit = ∑(SK Izin Usaha Kawasan Baru + Perpanjangan)',
    numerator: {
      label: 'Jumlah SK Izin Usaha Kawasan Diterbitkan',
      realValue: '265 SK',
      source: 'Dataset No. 4 & No. 5 Satu Data BP Batam (Halaman 9)',
    },
    denominator: {
      label: 'Total Luas Lahan Terkelola Kawasan Industri',
      realValue: '1.420 Hektar',
      source: 'Master Data KBLI Kawasan Industri DLLB',
    },
    calculationResult: '88,3% dari Target Tahunan (300 SK)',
    tableauCalculatedField: '// [5. Kerapatan Kawasan Industri]\nCOUNTD([No Izin Usaha Kawasan])',
    tableauShelvesGuide: {
      showMe: 'Show Me #1 (Matrix Table & Treemap)',
      rows: '[Nama Perusahaan Kawasan], [KBLI]',
      columns: 'SUM([Luas Lahan M2]), COUNTD([No IUK])',
      marks: 'Detail by [Alamat]',
      filters: '[Status]=\'Aktif Beroperasi\'',
    },
    databaseSource: {
      catalogItem: 'Dataset Item #4 & #5 Satu Data BP Batam',
      tableName: 'izin_usaha_kawasan_kbli',
      attributes: ['NO', 'NAMA PERUSAHAAN', 'NO IZIN USAHA KAWASAN', 'ALAMAT', 'KBLI', 'STATUS'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERBATAS',
    },
    benchmarkThreshold: {
      target: '≥ 80% Kepatuhan Perpanjangan IUK',
      warning: '70% - 79%',
      critical: '< 70%',
      standardOrigin: 'Peraturan Kepala BP Batam tentang Kawasan Industri',
    },
    executiveAction: 'Percepat integrasi perizinan AMDAL dan tata ruang industri pada portal perizinan digital.',
  },

  llb_sla: {
    id: 'llb_sla',
    unit: 'dit-lalu-lintas-barang',
    title: 'Kepatuhan SLA & Rata-Rata Waktu Layanan',
    codeTag: 'DLLB-06',
    category: 'Kinerja Layanan & Kecepatan',
    currentValue: '96,8% Tepat Waktu • 3,5 Jam',
    targetValue: 'Target SLA ≥ 95,0% • Batas Maks: 6,0 Jam',
    statusText: 'Target Standar Pelayanan Terlampaui',
    statusVariant: 'success',
    summary: 'Evaluasi kecepatan penyelesaian permohonan izin dari pendaftaran hingga penerbitan SK. Sektor industri mencatat 97,4% tepat waktu (2,9 jam), dan sektor perdagangan 95,7% (4,7 jam).',
    presentationPitch: 'Tingkat kepatuhan SLA mencapai 96,8% dengan rata-rata waktu penyelesaian 3,5 jam per dokumen, 2,5 jam lebih cepat dari batas toleransi maksimal 6,0 jam.',
    formulaConceptual: 'Persentase Kepatuhan SLA = (Jumlah Dokumen Selesai Sesuai Standar / Total Dokumen Terlayani) × 100%',
    numerator: {
      label: 'Jumlah Dokumen Terlayani Tepat Waktu (≤ Batas SLA)',
      realValue: '1.783 Dokumen',
      source: 'Dataset No. 8 & No. 9 Satu Data BP Batam (Halaman 9)',
    },
    denominator: {
      label: 'Total Dokumen Permohonan Selesai',
      realValue: '1.842 Dokumen',
      source: 'Sistem Tracking Dokumen IBOSS BP Batam',
    },
    calculationResult: '96,8% Kepatuhan (Standar Target: ≥ 95,0%)',
    tableauCalculatedField: '// [6. Kepatuhan SLA Tepat Waktu (%)]\n(SUM([Dokumen Tepat Waktu]) / SUM([Total Dokumen])) * 100',
    tableauShelvesGuide: {
      showMe: 'Comparative Bullet Bar & Gantt Chart Duration',
      rows: '[Sektor], [Uraian Izin]',
      columns: 'AVG([Rata-Rata Waktu Jam]), AVG([Standar SLA Jam])',
      marks: 'Color by [Persentase Tepat Waktu]',
      filters: '[Tahun]=2026',
    },
    databaseSource: {
      catalogItem: 'Dataset Item #8 (SLA Perdagangan) & #9 (SLA Industri)',
      tableName: 'sla_layanan_llb',
      attributes: ['NO', 'URAIAN IZIN', 'PERSENTASE TEPAT WAKTU', 'RATA-RATA WAKTU (JAM)', 'STANDAR SLA (JAM)'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 95,0% Tepat Waktu',
      warning: '90,0% - 94,9%',
      critical: '< 90,0%',
      standardOrigin: 'Standar Operasional Prosedur (SOP) Dit. Lalu Lintas Barang',
    },
    executiveAction: 'Terapkan otomasi validasi dokumen berulang untuk memangkas waktu verifikasi di bawah 2 jam.',
  },

  // =========================================================================
  // DIREKTORAT PENGELOLAAN KEPELABUHANAN (DPKPL)
  // Berdasarkan "Atribut Daftar Data Satu Data.pdf" (Halaman 14 - 17)
  // =========================================================================
  pelabuhan_pnbp: {
    id: 'pelabuhan_pnbp',
    unit: 'dit-pelabuhan',
    title: 'Realisasi PNBP Kepelabuhanan',
    codeTag: 'DPKPL-01',
    category: 'Keuangan & Pendapatan Maritim',
    currentValue: 'Rp 428,50 Miliar (89,3%)',
    targetValue: 'Target DIPA 2026: Rp 480,00 Miliar',
    statusText: 'Kinerja Sangat Baik (+12,4% YoY)',
    statusVariant: 'success',
    summary: 'Total penerimaan bukan pajak jasa labuh kapal, tambat, dermaga, pandu/tunda, pass penumpang terminal feri internasional, dan penumpukan peti kemas di seluruh gugus pelabuhan BP Batam.',
    presentationPitch: 'Realisasi PNBP Direktorat Pengelolaan Kepelabuhanan mencapai Rp 428,50 Miliar atau 89,3% dari target tahunan Rp 480 Miliar (+12,4% pertumbuhan tahunan). Pelabuhan Batu Ampar menyumbang porsi terbesar yaitu Rp 218,50 Miliar (51,0%) berkat percepatan bongkar muat kontainer dan modernisasi STS Crane.',
    formulaConceptual: 'Capaian PNBP Kepelabuhanan = (Total Realisasi Penerimaan Kas PNBP / Target PNBP Tahunan) × 100%',
    numerator: {
      label: 'Pembilang (Akumulasi Realisasi PNBP Kepelabuhanan)',
      realValue: 'Rp 428.500.000.000 (Kas Masuk Kasda & Bank Mitra)',
      source: 'Satu Data Item #3: SUM([pnbp_kepelabuhanan].[jumlah])',
    },
    denominator: {
      label: 'Penyebut (Target Penetapan DIPA PNBP 2026)',
      realValue: 'Rp 480.000.000.000 (Rencana Bisnis Anggaran BLU)',
      source: 'RBA DIPA BP Batam TA 2026',
    },
    calculationResult: '(428.500.000.000 ÷ 480.000.000.000) × 100% = 89,27% ≈ 89,3%',
    tableauCalculatedField: `// Calculated Field: [% Capaian PNBP Kepelabuhanan]
SUM([pnbp_kepelabuhanan].[jumlah]) / SUM([target_pnbp_kepelabuhanan]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #3 Dual-Axis Bar & Line',
      rows: 'SUM([jumlah]), [% Capaian PNBP Kepelabuhanan]',
      columns: '[bulan], [terminal_satker]',
      marks: 'Bar Mark (Realisasi) + Line Reference (Target DIPA)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #3: Realisasi Penerimaan Negara Bukan Pajak (PNBP) Kepelabuhanan (Hal. 15)',
      tableName: 'pnbp_kepelabuhanan',
      attributes: ['MATA UANG', 'JUMLAH', 'BULAN', 'TANGGAL', 'COA / JENIS LAYANAN', 'PERUSAHAAN', 'TERMINAL/SATKER'],
      updateFrequency: 'Per Tahun (Sinkronisasi Bulanan)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 85,0% pada Triwulan III',
      warning: '70,0% - 84,9%',
      critical: '< 70,0%',
      standardOrigin: 'Perjanjian Kinerja (Perkin) Direktur Pengelolaan Kepelabuhanan',
    },
    executiveAction: 'Percepat integrasi penagihan otomatis Batam Maritime System (BMS) untuk jasa labuh tambat kapal tanker di Kabil guna memaksimalkan penerimaan kuartal berikutnya.',
  },

  pelabuhan_belanja: {
    id: 'pelabuhan_belanja',
    unit: 'dit-pelabuhan',
    title: 'Realisasi Belanja Direktorat Kepelabuhanan',
    codeTag: 'DPKPL-02',
    category: 'Belanja & Investasi Maritim',
    currentValue: 'Rp 184,25 Miliar (85,7%)',
    targetValue: 'Pagu DIPA: Rp 215,00 Miliar',
    statusText: 'Penyerapan Anggaran Optimal',
    statusVariant: 'success',
    summary: 'Tingkat penyerapan alokasi anggaran belanja modal infrastruktur dermaga, pemeliharaan alur pelayaran, pengadaan suku cadang crane, dan operasional layanan kepelabuhanan.',
    presentationPitch: 'Realisasi belanja kepelabuhanan terealisasi Rp 184,25 Miliar atau 85,7% dari total pagu Rp 215,00 Miliar. Alokasi terbesar terserap pada pemeliharaan dermaga dan modernisasi alat bongkar muat STS Batu Ampar. Dengan pendapatan Rp 428,50 M, direktorat membukukan surplus operasional bersih +Rp 244,25 Miliar (Cost-to-Income 43,0%).',
    formulaConceptual: 'Persentase Serapan Belanja = (Total Realisasi Belanja SP2D / Total Pagu Anggaran Kepelabuhanan) × 100%',
    numerator: {
      label: 'Pembilang (Akumulasi Realisasi Belanja Terbit)',
      realValue: 'Rp 184.250.000.000 (SP2D Terbayar)',
      source: 'Satu Data Item #2: SUM([belanja_kepelabuhanan].[nilai])',
    },
    denominator: {
      label: 'Penyebut (Total Pagu Anggaran DIPA DPKPL)',
      realValue: 'Rp 215.000.000.000 (Pagu DIPA 2026)',
      source: 'DIPA BP Batam Unit Kepelabuhanan',
    },
    calculationResult: '(184.250.000.000 ÷ 215.000.000.000) × 100% = 85,70% ≈ 85,7%',
    tableauCalculatedField: `// Calculated Field: [% Serapan Belanja Kepelabuhanan]
SUM([belanja_kepelabuhanan].[nilai]) / SUM([pagu_belanja_kepelabuhanan]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #6 Horizontal Bar with Reference Line',
      rows: '[mata_anggaran], [keterangan]',
      columns: 'SUM([nilai]), [% Serapan Belanja]',
      marks: 'Color by [% Serapan Belanja]',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #2: Data Realisasi Belanja Direktorat Pengelolaan Kepelabuhanan (Hal. 14 - 15)',
      tableName: 'belanja_kepelabuhanan',
      attributes: ['TANGGAL', 'BULAN', 'COA (CHART OF ACCOUNT)', 'MATA ANGGARAN', 'KETERANGAN', 'NILAI'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 80,0% s/d Triwulan III',
      warning: '65,0% - 79,9%',
      critical: '< 65,0%',
      standardOrigin: 'Target Indikator Kinerja Pelaksanaan Anggaran (IKPA) Kemenkeu',
    },
    executiveAction: 'Pertahankan efisiensi belanja operasional dan pastikan termin pembayaran kontrak pemeliharaan alur pelayaran dermaga diselesaikan tepat jadwal.',
  },

  pelabuhan_ikm: {
    id: 'pelabuhan_ikm',
    unit: 'dit-pelabuhan',
    title: 'Indeks Kepuasan Masyarakat (IKM) Layanan Kepelabuhanan',
    codeTag: 'DPKPL-03',
    category: 'Mutu Layanan Publik',
    currentValue: '88,40 (Predikat: Sangat Baik)',
    targetValue: 'Target Standar Perkin: ≥ 85,00',
    statusText: 'Kategori Mutu A (Terlampaui)',
    statusVariant: 'success',
    summary: 'Pengukuran tingkat kepuasan asosiasi pelayaran, pengguna jasa feri internasional, agen kapal, dan eksportir terhadap 9 unsur pelayanan kepelabuhanan sesuai PermenPAN-RB.',
    presentationPitch: 'Indeks Kepuasan Masyarakat layanan kepelabuhanan mencapai skor 88,40 dengan predikat Mutu A (Sangat Baik), melampaui target perjanjian kinerja 85,00. Seluruh 9 unsur pelayanan mencatatkan skor di atas 86, dengan apresiasi tertinggi pada kompetensi petugas kepanduan (90,1) dan kesesuaian produk layanan dermaga (89,6).',
    formulaConceptual: 'Skor IKM Tertimbang = (∑ Nilai Rata-rata 9 Unsur Pelayanan / 9) × 25',
    numerator: {
      label: 'Pembilang (Total Akumulasi Rata-rata 9 Unsur)',
      realValue: '31,82 (dari 9 Unsur Skala 4,00)',
      source: 'Satu Data Item #21: Survei Kepuasan Pengguna Jasa Kepelabuhanan',
    },
    denominator: {
      label: 'Penyebut (Konversi Standar PermenPAN-RB)',
      realValue: '9 Unsur Pelayanan (Faktor Pengali 25)',
      source: 'PermenPAN-RB No. 14 Tahun 2017',
    },
    calculationResult: '(31,82 ÷ 9) × 25 = 88,40 (Kategori A - Sangat Baik)',
    tableauCalculatedField: `// Calculated Field: [Nilai IKM Pelabuhan Konversi 100]
(AVG([skor_unsur_1_sd_9]) / 4) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #23 Bullet Graph & Radar Chart',
      rows: '[nama_unsur_pelayanan]',
      columns: 'AVG([nilai_skor])',
      marks: 'Bar with Target Line (85.00)',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #21: Indeks Kepuasan Masyarakat Layanan Kepelabuhanan (Hal. 17)',
      tableName: 'ikm_layanan_kepelabuhanan',
      attributes: ['TAHUN', 'NILAI INDEKS KEPUASAN MASYARAKAT', '9 UNSUR PERMENPAN-RB'],
      updateFrequency: 'Per Tahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 85,00 (Kategori Mutu A - Sangat Baik)',
      warning: '76,61 - 84,99 (Kategori Mutu B - Baik)',
      critical: '< 76,61 (Kategori Mutu C - Kurang Baik)',
      standardOrigin: 'PermenPAN-RB No. 14 Tahun 2017 tentang Pedoman Penyusunan SKM',
    },
    executiveAction: 'Tingkatkan kebersihan ruang tunggu terminal penyeberangan domestik Sekupang & Telaga Punggur untuk mengerek unsur sarana prasarana menuju 90+.',
  },

  pelabuhan_penumpang: {
    id: 'pelabuhan_penumpang',
    unit: 'dit-pelabuhan',
    title: 'Jumlah Penumpang Pelabuhan Domestik & Internasional',
    codeTag: 'DPKPL-04',
    category: 'Mobilitas & Trafik Penumpang',
    currentValue: '7,43 Juta Pax',
    targetValue: 'Target Tahunan: 9,50 Juta Pax',
    statusText: 'Trafik Tinggi (78,2% Target)',
    statusVariant: 'success',
    summary: 'Total arus penumpang kapal feri cepat dan kapal roro yang dilayani di seluruh terminal penumpang Batam, mencakup rute internasional (Singapura & Malaysia) dan rute domestik.',
    presentationPitch: 'Trafik penumpang di 5 terminal pelabuhan Batam menembus 7,43 Juta Pax (3,68 Juta kedatangan dan 3,75 Juta keberangkatan). Terminal Batam Centre mendominasi dengan 2,87 Juta Pax (38,7%), disusul Harbour Bay 1,71 Juta Pax (23,0%) dan Sekupang 1,60 Juta Pax (21,5%). Proporsi internasional mencapai 34,7% yang menjadi motor devisa pariwisata Batam.',
    formulaConceptual: 'Total Penumpang = ∑ Jumlah Kedatangan (Arrival) + ∑ Jumlah Keberangkatan (Departure)',
    numerator: {
      label: 'Pembilang (Total Pergerakan Penumpang Terdaftar)',
      realValue: '7.425.800 Pax (Datang: 3.680.200, Berangkat: 3.745.600)',
      source: 'Satu Data Item #25: SUM([penumpang_pelabuhan].[kedatangan]) + SUM([penumpang_pelabuhan].[keberangkatan])',
    },
    denominator: {
      label: 'Penyebut (Target Prognosa Penumpang 2026)',
      realValue: '9.500.000 Pax (Target Kapasitas Terminal)',
      source: 'Master Plan Transportasi Laut BP Batam',
    },
    calculationResult: '7.425.800 Pax (78,2% dari Target 9,50 Juta Pax)',
    tableauCalculatedField: `// Calculated Field: [Total Arus Penumpang]
SUM([penumpang_pelabuhan].[jumlah_kedatangan]) + SUM([penumpang_pelabuhan].[jumlah_keberangkatan])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #12 Stacked Bar Chart & Area',
      rows: '[nama_terminal], [kategori_domestik_internasional]',
      columns: 'SUM([jumlah_kedatangan]), SUM([jumlah_keberangkatan])',
      marks: 'Color by [kategori_domestik_internasional]',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #25: Jumlah Penumpang Pelabuhan Domestik dan Internasional (Hal. 17)',
      tableName: 'penumpang_pelabuhan_dom_int',
      attributes: ['NAMA TERMINAL', 'JENIS PENUMPANG', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'PENUMPANG DOMESTIK/INTERNASIONAL', 'JUMLAH KEDATANGAN', 'JUMLAH KEBERANGKATAN', 'KEWARGANEGARAAN PENUMPANG', 'TAHUN'],
      updateFrequency: 'Per Tahun (Update Bulanan)',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 9,0 Juta Pax / Tahun',
      warning: '7,5 - 8,9 Juta Pax',
      critical: '< 7,5 Juta Pax',
      standardOrigin: 'Kapasitas Terpasang Fasilitas Terminal Penumpang BP Batam',
    },
    executiveAction: 'Perluas implementasi pintu autogate paspor elektronik di Batam Centre dan Harbour Bay guna mengantisipasi antrean pada saat puncak libur akhir pekan (weekend peak).',
  },

  pelabuhan_dermaga: {
    id: 'pelabuhan_dermaga',
    unit: 'dit-pelabuhan',
    title: 'Jumlah Dermaga & Tingkat Okupansi (BOR)',
    codeTag: 'DPKPL-05',
    category: 'Infrastruktur & Kapasitas Sandar',
    currentValue: '24 Dermaga • BOR 64,8%',
    targetValue: 'Standar Optimal UNCTAD: 60,0% - 70,0%',
    statusText: 'Utilitas Ideal & Bebas Kongesti',
    statusVariant: 'success',
    summary: 'Jumlah fasilitas dermaga aktif yang dikelola BP Batam dengan total panjang 3.840 meter dan kedalaman hingga -14 MLWS, serta indikator pemanfaatan dermaga (Berth Occupancy Ratio / BOR).',
    presentationPitch: 'BP Batam mengelola 24 fasilitas dermaga aktif di 6 gugus pelabuhan dengan total panjang 3.840 meter dan kedalaman sandar mencapai -14 MLWS. Rata-rata tingkat pemakaian dermaga (BOR) berada di angka 64,8%, sangat ideal menurut standar internasional UNCTAD (60-70%), menjamin kelancaran sandar tanpa terjadi antrean kapal di alur laut.',
    formulaConceptual: 'Berth Occupancy Ratio (BOR %) = (Total Jam Sandar Kapal / (Jumlah Dermaga × 24 Jam × Jumlah Hari)) × 100%',
    numerator: {
      label: 'Pembilang (Total Waktu Tambat Kapal di Dermaga)',
      realValue: '67.240 Jam Waktu Sandar Akumulasi',
      source: 'Satu Data Item #4: Rekapitulasi Waktu Tambat Dermaga',
    },
    denominator: {
      label: 'Penyebut (Kapasitas Maksimum Jam Sandar Tersedia)',
      realValue: '103.680 Jam (Kapasitas 24 Dermaga × 24 Jam × Hari Operasi)',
      source: 'Spesifikasi Teknis 24 Dermaga BP Batam',
    },
    calculationResult: '(67.240 ÷ 103.680) × 100% = 64,85% ≈ 64,8%',
    tableauCalculatedField: `// Calculated Field: [Berth Occupancy Ratio BOR %]
(SUM([waktu_tambat_jam]) / (COUNTD([dermaga]) * 24 * [jumlah_hari])) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 Matrix & Gauge Indicator',
      rows: '[pelabuhan], [dermaga]',
      columns: 'AVG([kedalaman_mlws]), SUM([panjang_m]), [Berth Occupancy Ratio BOR %]',
      marks: 'Color by [Status Operasional]',
      filters: "[status] = 'Aktif Beroperasi'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #4: Daftar Dermaga yang Dikelola BP Batam (Hal. 15)',
      tableName: 'dermaga_bp_batam',
      attributes: ['PELABUHAN', 'LETAK LINTANG UTARA', 'LETAK BUJUR TIMUR', 'DERMAGA', 'KEDALAMAN (MLWS)', 'PANJANG (M)', 'LEBAR (M2)', 'PERUNTUKAN', 'KAPASITAS (TOP M2)'],
      updateFrequency: 'Jika Update',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '60,0% - 70,0% (Standar UNCTAD Paling Produktif)',
      warning: '70,1% - 80,0% (Mulai padat, risiko waktu tunggu)',
      critical: '> 80,0% (Kongesti sandar) atau < 40,0% (Underutilized)',
      standardOrigin: 'United Nations Conference on Trade and Development (UNCTAD) Port Manual',
    },
    executiveAction: 'Lanjutkan pengerukan alur di Dermaga Utara Batu Ampar hingga -14 MLWS agar kapal peti kemas generasi Panamax dapat sandar 24 jam tanpa tergantung pasang surut.',
  },

  pelabuhan_kunjungan: {
    id: 'pelabuhan_kunjungan',
    unit: 'dit-pelabuhan',
    title: 'Kunjungan Kapal Barang & Penumpang (Call & GT)',
    codeTag: 'DPKPL-06',
    category: 'Trafik Kapal & Alur Pelayaran',
    currentValue: '48.650 Call • 61,4 Jt GT',
    targetValue: 'Target Tahunan: 60.000 Call',
    statusText: 'Volume Trafik Sangat Tinggi (81,1%)',
    statusVariant: 'success',
    summary: 'Agregasi jumlah panggilan kapal (call) dan tonase kotor kapal (Gross Tonnage) yang masuk dan sandar di perairan Batam, diklasifikasikan atas Kapal Barang (DS-5) dan Kapal Penumpang (DS-7).',
    presentationPitch: 'Trafik kunjungan kapal di perairan Batam mencapai 48.650 Call dengan total bobot 61,4 Juta GT. Kapal barang menyumbang 16.240 Call namun menguasai 69,7% total bobot tonase (42,8 Juta GT), sedangkan kapal feri penumpang mencatatkan 32.410 Call (18,6 Juta GT) yang mencerminkan frekuensi pelayaran antarpulau dan internasional yang sangat padat.',
    formulaConceptual: 'Total Kunjungan Kapal = ∑ Call Kapal Barang (DS-5) + ∑ Call Kapal Penumpang (DS-7)',
    numerator: {
      label: 'Pembilang (Total Panggilan Kapal Masuk Labuh/Tambat)',
      realValue: '48.650 Call (Barang: 16.240 Call | Penumpang: 32.410 Call)',
      source: 'Satu Data Item #5 (Barang) & Item #7 (Penumpang)',
    },
    denominator: {
      label: 'Penyebut (Target Prognosa Panggilan Kapal 2026)',
      realValue: '60.000 Call (Target RBA Kepelabuhanan)',
      source: 'RBA DIPA BP Batam TA 2026',
    },
    calculationResult: '48.650 Call (81,1% dari Target 60.000 Call)',
    tableauCalculatedField: `// Calculated Field: [Total Call Kapal Pelabuhan]
SUM([kunjungan_kapal_barang].[call_kapal]) + SUM([kunjungan_kapal_penumpang].[call_kapal])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #14 Side-by-Side Bars',
      rows: '[tipe_kapal], [pelabuhan]',
      columns: 'SUM([call_kapal]), SUM([gt_kapal]), [call_dalam], [call_luar]',
      marks: 'Color by [tipe_kapal]',
      filters: "[tahun] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #5 (Kapal Barang) & Item #7 (Kapal Penumpang) Hal. 15 Satu Data BP Batam',
      tableName: 'kunjungan_kapal_barang & kunjungan_kapal_penumpang',
      attributes: ['PELABUHAN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'CALL KAPAL', 'GT KAPAL', 'TIPE KAPAL', 'CALL DALAM', 'CALL LUAR', 'GT DALAM', 'GT LUAR', 'TON DALAM', 'TON LUAR'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 55.000 Call / Tahun',
      warning: '45.000 - 54.999 Call',
      critical: '< 45.000 Call',
      standardOrigin: 'Standar Kapasitas Alur Pelayaran & Pemanduan BP Batam',
    },
    executiveAction: 'Optimalkan sistem pemanduan kapal dan stasiun VTS (Vessel Traffic Service) untuk mempertahankan kecepatan response time pemanduan di bawah 30 menit.',
  },

  // ==========================================
  // BADAN USAHA RUMAH SAKIT (RSBP BATAM)
  // KATALOG SATU DATA HALAMAN 19 - 21
  // ==========================================
  rsbp_pnbp: {
    id: 'rsbp_pnbp',
    unit: 'bu-rumah-sakit',
    title: 'Capaian Realisasi PNBP Rumah Sakit (Dataset No. 2)',
    codeTag: 'BURS-02',
    category: 'Keuangan & Pendapatan BLU RS',
    currentValue: 'Rp 121,80 M (84,0%)',
    targetValue: 'Target RBA: Rp 145,00 M',
    statusText: 'Realisasi Sangat Baik (84,0%)',
    statusVariant: 'success',
    summary: 'Pengukuran penerimaan fungsional jasa layanan kesehatan BLU RSBP Batam terhadap target yang ditetapkan dalam Rencana Bisnis dan Anggaran (RBA) DIPA.',
    presentationPitch: 'Realisasi PNBP RSBP Batam mencapai Rp 121,80 Miliar atau 84,0% dari target Rp 145,00 Miliar. Kontributor terbesar berasal dari Instalasi Rawat Inap (Rp 38,6 M) dan Poliklinik Rawat Jalan (Rp 27,4 M), didorong oleh pemulihan volume pasien pasca ekspansi layanan unggulan.',
    formulaConceptual: 'Persentase Realisasi PNBP RSBP = (Total Realisasi PNBP ÷ Total Target PNBP) × 100%',
    numerator: {
      label: 'Pembilang (Total Realisasi Penerimaan PNBP RSBP)',
      realValue: 'Rp 121.800.000.000 (Akumulasi Realisasi Kas Masuk Fungsional)',
      source: 'Satu Data Item #2 (Hal. 19-20): Realisasi Penerimaan PNBP BU RS',
    },
    denominator: {
      label: 'Penyebut (Target Penetapan PNBP RBA DIPA)',
      realValue: 'Rp 145.000.000.000 (Target Penerimaan Penetapan DIPA 2026)',
      source: 'Satu Data Item #2: Atribut TOTAL TARGET PNBP',
    },
    calculationResult: '(121.800.000.000 ÷ 145.000.000.000) × 100% = 84,00%',
    tableauCalculatedField: `// Calculated Field: [% Realisasi PNBP RSBP]
(SUM([TOTAL REALISASI PNBP]) / SUM([TOTAL TARGET PNBP])) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #2 Horizontal Bars / Bullet Graph',
      rows: '[pos_layanan_rs]',
      columns: 'SUM([TOTAL REALISASI PNBP]), SUM([TOTAL TARGET PNBP])',
      marks: 'Color by [% Realisasi PNBP RSBP]',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #2: Realisasi Penerimaan PNBP Badan Usaha Rumah Sakit (Hal. 19-20)',
      tableName: 'pnbp_bu_rumah_sakit',
      attributes: ['TAHUN', 'TOTAL TARGET PNBP', 'TOTAL REALISASI PNBP'],
      updateFrequency: 'Per Tahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 85,0% (Prognosa Triwulan Berjalan)',
      warning: '70,0% - 84,9%',
      critical: '< 70,0%',
      standardOrigin: 'Target Kinerja RBA BLU Rumah Sakit Kemenkeu & BP Batam',
    },
    executiveAction: 'Akselerasi penagihan klaim pending BPJS Kesehatan (unclaimed dispute) dan maksimalkan paket pemeriksaan MCU korporasi di Kawasan Industri KEK Batam.',
  },

  rsbp_belanja: {
    id: 'rsbp_belanja',
    unit: 'bu-rumah-sakit',
    title: 'Penyerapan Pagu Belanja Rumah Sakit (Dataset No. 12)',
    codeTag: 'BURS-12',
    category: 'Akuntabilitas Anggaran RS',
    currentValue: 'Rp 109,35 M (81,0%)',
    targetValue: 'Pagu DIPA: Rp 135,00 M',
    statusText: 'Penyerapan Optimal (81,0%)',
    statusVariant: 'success',
    summary: 'Realisasi penyerapan anggaran belanja operasional, obat/BMHP medis, jasa pelayanan nakes, dan belanja modal pemeliharaan alkes RSBP Batam terhadap total pagu.',
    presentationPitch: 'Serapan belanja RSBP telah mencapai Rp 109,35 Miliar atau 81,0% dari pagu Rp 135,00 Miliar dengan sisa pagu Rp 25,65 Miliar. Belanja terbesar dialokasikan untuk obat, reagen lab, dan BMHP medis (Rp 43,8 M) untuk menjamin ketersediaan stok farmasi prima.',
    formulaConceptual: 'Persentase Realisasi Belanja = (Total Nilai Realisasi ÷ Total Nilai Pagu) × 100%',
    numerator: {
      label: 'Pembilang (Total Realisasi Pengeluaran Belanja RSBP)',
      realValue: 'Rp 109.350.000.000 (Kas Keluar SP2D & Pengesahan BLU)',
      source: 'Satu Data Item #12 (Hal. 20-21): Atribut TOTAL NILAI REALISASI',
    },
    denominator: {
      label: 'Penyebut (Total Alokasi Pagu Anggaran Belanja)',
      realValue: 'Rp 135.000.000.000 (Alokasi Pagu DIPA RSBP 2026)',
      source: 'Satu Data Item #12: Atribut TOTAL NILAI PAGU',
    },
    calculationResult: '(109.350.000.000 ÷ 135.000.000.000) × 100% = 81,00%',
    tableauCalculatedField: `// Calculated Field: [% Penyerapan Belanja RSBP]
(SUM([TOTAL NILAI REALISASI]) / SUM([TOTAL NILAI PAGU])) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #5 Treemap / Stacked Bars',
      rows: '[kategori_belanja]',
      columns: 'SUM([TOTAL NILAI REALISASI]), SUM([TOTAL NILAI SISA PAGU])',
      marks: 'Detail by [PERSENTASE NILAI REALISASI BELANJA]',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #12: Nilai Realisasi Belanja dan Penerimaan BP Batam (Hal. 20-21)',
      tableName: 'belanja_bu_rumah_sakit',
      attributes: ['TAHUN', 'TOTAL NILAI PAGU', 'TOTAL NILAI REALISASI', 'TOTAL NILAI SISA PAGU', 'PERSENTASE NILAI REALISASI BELANJA'],
      updateFrequency: 'Per Tahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '80,0% - 95,0% (Serapan Efisien & Proporsional)',
      warning: '65,0% - 79,9%',
      critical: '< 65,0% atau > 98,0% (Defisit Fiskal)',
      standardOrigin: 'Indikator Kinerja Pelaksanaan Anggaran (IKPA) Kemenkeu',
    },
    executiveAction: 'Jaga efisiensi belanja obat non-formularium dan optimalkan negosiasi e-katalog LKPP untuk pembelian reagen dan alat kesehatan.',
  },

  rsbp_ikm: {
    id: 'rsbp_ikm',
    unit: 'bu-rumah-sakit',
    title: 'Indeks Kepuasan Masyarakat (IKM) Layanan RSBP (Dataset No. 1)',
    codeTag: 'BURS-01',
    category: 'Mutu Layanan Klinis & Pasien',
    currentValue: '86,95 (Mutu A)',
    targetValue: 'Target IKU: ≥ 85,00',
    statusText: 'Predikat Sangat Baik (Mutu A)',
    statusVariant: 'success',
    summary: 'Indeks persepsi kepuasan pasien terhadap 9 unsur pelayanan rawat jalan, rawat inap, IGD, dan farmasi di RSBP Batam sesuai standar PermenPAN-RB No. 14 Tahun 2017.',
    presentationPitch: 'Indeks Kepuasan Masyarakat RSBP Batam mencatatkan skor 86,95 dengan predikat Mutu A (Sangat Baik). Skor tertinggi diraih oleh unsur Kompetensi Dokter (91,5) dan Kepastian Biaya/Klaim (89,1), menegaskan kepercayaan tinggi publik terhadap kualitas klinis RSBP.',
    formulaConceptual: 'IKM RSBP = (∑ (Rata-rata Skor per Unsur × 0,111)) × 25',
    numerator: {
      label: 'Pembilang (Total Nilai Tertimbang 9 Unsur Pelayanan)',
      realValue: '3,478 dari skala 4,00 (Hasil survei 1.200 responden pasien)',
      source: 'Satu Data Item #1 (Hal. 19): Indeks Kepuasan Masyarakat RSBP',
    },
    denominator: {
      label: 'Penyebut (Skala Konversi Maksimum PermenPAN-RB)',
      realValue: 'Konversi Skala 100 (Skor Tertimbang × 25)',
      source: 'PermenPAN-RB Nomor 14 Tahun 2017',
    },
    calculationResult: '3,478 × 25 = 86,95 (Mutu Pelayanan A / Sangat Baik)',
    tableauCalculatedField: `// Calculated Field: [Nilai Konversi IKM RSBP]
(AVG([NILAI_UNSUR_SKOR]) / 4.0) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 Radial Gauge & Radar Chart',
      rows: '[PELAYANAN PER UNSUR]',
      columns: 'AVG([SKOR])',
      marks: 'Color by [KATEGORI MUTU]',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #1: Indeks Kepuasan Masyarakat Layanan BU RS BP Batam (Hal. 19)',
      tableName: 'ikm_bu_rumah_sakit',
      attributes: ['TAHUN', 'INDIKATOR MUTU', 'KATEGORI MUTU', 'PELAYANAN PER UNSUR'],
      updateFrequency: 'Per Tahun',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '88,31 - 100,00 (Mutu A: Sangat Baik)',
      warning: '76,61 - 88,30 (Mutu B: Baik)',
      critical: '< 76,60 (Mutu C / D: Kurang / Tidak Baik)',
      standardOrigin: 'Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (PAN-RB)',
    },
    executiveAction: 'Tingkatkan kecepatan waktu tunggu di loket farmasi rawat jalan melalui sistem antrean digital terintegrasi di aplikasi mobile RSBP.',
  },

  rsbp_kunjungan: {
    id: 'rsbp_kunjungan',
    unit: 'bu-rumah-sakit',
    title: 'Jumlah Kunjungan Pasien & Layanan Unggulan (Dataset No. 5 & 6)',
    codeTag: 'BURS-05',
    category: 'Utilisasi & Volume Pelayanan',
    currentValue: '184.620 Pasien',
    targetValue: 'Target Tahunan: 200.000 Pasien',
    statusText: 'Trafik Pasien Sangat Tinggi',
    statusVariant: 'success',
    summary: 'Agregasi jumlah kunjungan pasien di seluruh instalasi RSBP Batam, terdistribusi atas Rawat Jalan, IGD, Rawat Inap, Hemodialisa, MCU, dan 6 Pusat Layanan Unggulan.',
    presentationPitch: 'Total kunjungan pasien RSBP mencapai 184.620 pasien. Rawat Jalan Poliklinik mendominasi 61,9% (114.250 kunjungan). Sebanyak 38.450 kasus ditangani di Pusat Layanan Unggulan, dipimpin oleh Cardiac Center (12.450 kasus) dan Trauma Center (9.120 kasus).',
    formulaConceptual: 'Total Pasien = ∑ Kunjungan Rawat Jalan + ∑ Kunjungan IGD + ∑ Kunjungan Rawat Inap + ∑ Kunjungan Hemodialisa + ∑ Kunjungan MCU',
    numerator: {
      label: 'Pembilang (Total Kunjungan Pasien Seluruh Instalasi)',
      realValue: '184.620 Kunjungan (Rawat Jalan: 114.250 | IGD: 32.480 | Ranap: 21.850 | HD: 9.840 | MCU: 6.200)',
      source: 'Satu Data Item #5 (Hal. 20): Atribut JUMLAH KUNJUNGAN',
    },
    denominator: {
      label: 'Penyebut (Target Prognosa Kunjungan Pasien 2026)',
      realValue: '200.000 Pasien / Tahun',
      source: 'Renstra RSBP Batam & RBA DIPA',
    },
    calculationResult: '(184.620 ÷ 200.000) × 100% = 92,31% Capaian Target',
    tableauCalculatedField: `// Calculated Field: [Total Pasien RSBP]
SUM([JUMLAH KUNJUNGAN])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #13 Stacked Bars / Donut',
      rows: '[BAGIAN LAYANAN]',
      columns: 'SUM([JUMLAH KUNJUNGAN])',
      marks: 'Color by [CARA BAYAR], Detail by [JENIS KELAMIN]',
      filters: "[JENIS RAWAT] IN ('Rawat Jalan', 'Rawat Inap', 'IGD')",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #5 (Hal. 20) & Item #6 (Hal. 20) Satu Data BP Batam',
      tableName: 'kunjungan_pasien_rsbp & layanan_unggulan_rsbp',
      attributes: ['BAGIAN LAYANAN', 'JENIS KUNJUNGAN', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'JUMLAH KUNJUNGAN', 'JENIS KELAMIN', 'CARA BAYAR'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '≥ 15.000 Pasien / Bulan',
      warning: '12.000 - 14.999 Pasien',
      critical: '< 12.000 Pasien',
      standardOrigin: 'Kapasitas Pelayanan Klinis Terpasang RSBP Batam',
    },
    executiveAction: 'Perluas kemitraan faskes primer (Klinik & Puskesmas) rujukan berjenjang BPJS dan perluas jam praktik dokter poliklinik sore/malam hari.',
  },

  rsbp_efisiensi_bor: {
    id: 'rsbp_efisiensi_bor',
    unit: 'bu-rumah-sakit',
    title: 'Indikator Efisiensi Rawat Inap / BOR (Dataset No. 9)',
    codeTag: 'BURS-09',
    category: 'Efisiensi Tempat Tidur (Barber Johnson)',
    currentValue: 'BOR: 74,2% • ALOS: 4,2 Hari',
    targetValue: 'Standar Ideal Kemenkes: 60% - 85%',
    statusText: 'Efisiensi Prima Sesuai Standar',
    statusVariant: 'success',
    summary: 'Tingkat pemanfaatan tempat tidur rawat inap (Bed Occupancy Rate) dan indikator Barber Johnson RSBP Batam (ALOS, TOI, BTO, NDR, GDR) berdasarkan standar Kemenkes RI.',
    presentationPitch: 'BOR RSBP berada di level 74,2%, tepat di koridor ideal standar Kemenkes (60%–85%). Rata-rata lama rawat (ALOS) 4,2 hari dan Turn Over Interval (TOI) 1,5 hari mencerminkan efisiensi penanganan medis tanpa memperpanjang masa rawat inap yang membebani klaim INA-CBGs.',
    formulaConceptual: 'BOR (%) = (Jumlah Hari Perawatan ÷ (Jumlah Tempat Tidur × Jumlah Hari Periode)) × 100%',
    numerator: {
      label: 'Pembilang (Akumulasi Hari Rawat Pasien Inap / Patient Days)',
      realValue: '57.416 Hari Perawatan (Kompilasi Buku Register Rawat Inap)',
      source: 'Satu Data Item #9 & Item #16: HARI RAWAT (Rawat Inap)',
    },
    denominator: {
      label: 'Penyebut (Kapasitas Maksimum Hari Tempat Tidur Tersedia)',
      realValue: '77.380 TT-Hari (212 Tempat Tidur Aktif × 365 Hari)',
      source: 'Kapasitas Operasional Tempat Tidur RSBP Batam',
    },
    calculationResult: '(57.416 ÷ 77.380) × 100% = 74,20%',
    tableauCalculatedField: `// Calculated Field: [Bed Occupancy Rate BOR %]
(SUM([HARI RAWAT]) / (COUNTD([TEMPAT TIDUR]) * [JUMLAH HARI PERIODE])) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 Barber Johnson Scatter Quadrant',
      rows: 'AVG([NILAI]) WHERE [INDIKATOR] = "BOR"',
      columns: 'AVG([NILAI]) WHERE [INDIKATOR] = "ALOS"',
      marks: 'Detail by [INDIKATOR]',
      filters: "[TANGGAL REKAP AWAL] >= '2026-01-01'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #9: Nilai Indikator Efisiensi Rumah Sakit BP Batam (Hal. 20)',
      tableName: 'indikator_efisiensi_rsbp',
      attributes: ['INDIKATOR', 'TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'NILAI'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '60,0% - 85,0% (Standar Barber Johnson Kemenkes RI)',
      warning: '85,1% - 90,0% (Kepadatan tinggi) atau 50,0% - 59,9%',
      critical: '> 90,0% (Overcapacity) atau < 50,0% (Underutilized)',
      standardOrigin: 'Buku Pedoman Pengelolaan Rekam Medis Rumah Sakit Kemenkes RI',
    },
    executiveAction: 'Pertahankan utilisasi bangsal kelas 1 dan 2 dengan mempercepat proses verifikasi resume medis untuk kepulangan pasien.',
  },

  rsbp_sewa_tenant: {
    id: 'rsbp_sewa_tenant',
    unit: 'bu-rumah-sakit',
    title: 'Rekapitulasi Sewa Ruangan & Fasilitas RS (Dataset No. 14)',
    codeTag: 'BURS-14',
    category: 'Optimalisasi Aset Non-Medis',
    currentValue: '8 Tenant • Rp 2,06 M/Thn',
    targetValue: 'Tingkat Kepatuhan: 100%',
    statusText: 'Utilisasi Komersial Aktif',
    statusVariant: 'success',
    summary: 'Pemantauan masa berlaku, nomor perjanjian (PKS), dan tanggal jatuh tempo sewa ruangan tenant komersial dan penunjang medis di lingkungan RSBP Batam.',
    presentationPitch: 'RSBP mengelola 8 mitra penyewa fasilitas ruangan aktif dengan kontribusi penerimaan sewa tahunan sebesar Rp 2,06 Miliar. Terdapat 2 tenant yang berada dalam periode H-60 jatuh tempo (Apotek Kimia Farma dan ATM Gallery), saat ini sedang dalam proses review addendum perpanjangan.',
    formulaConceptual: 'Sisa Masa Berlaku (Hari) = Tanggal Jatuh Tempo - Tanggal Rekap Hari Ini',
    numerator: {
      label: 'Pembilang (Jumlah Hari Tersisa Menuju Tanggal Jatuh Tempo)',
      realValue: '15 s.d 625 Hari Tersisa (Bervariasi per Tenant PKS)',
      source: 'Satu Data Item #14 (Hal. 21): Atribut JATUH TEMPO & MASA BERLAKU',
    },
    denominator: {
      label: 'Penyebut (Total Masa Kontrak Perjanjian Kerjasama)',
      realValue: '365 s.d 1.095 Hari (Durasi Kontrak 1 - 3 Tahun)',
      source: 'Satu Data Item #14: Atribut NOMOR PERJANJIAN',
    },
    calculationResult: '8 Mitra Penyewa Aktif (100% Legalitas PKS Terverifikasi)',
    tableauCalculatedField: `// Calculated Field: [Sisa Hari Kontrak Tenant]
DATEDIFF('day', TODAY(), [JATUH TEMPO])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 Gantt Chart / Matrix Table',
      rows: '[NAMA TENANT], [NOMOR PERJANJIAN]',
      columns: '[MASA BERLAKU], [JATUH TEMPO], [Sisa Hari Kontrak Tenant]',
      marks: 'Color by [Status Kepatuhan]',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #14: Daftar Penyewa Fasilitas Rumah Sakit BP Batam (Hal. 21)',
      tableName: 'sewa_fasilitas_rsbp',
      attributes: ['TAHUN', 'NAMA TENANT', 'NOMOR PERJANJIAN', 'MASA BERLAKU', 'JATUH TEMPO'],
      updateFrequency: 'Per Tahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '> 60 Hari Sebelum Jatuh Tempo (Status Aman)',
      warning: '30 - 60 Hari Sebelum Jatuh Tempo (Kirim Notifikasi Perpanjangan)',
      critical: '< 30 Hari atau Kedaluwarsa (Tindakan Penagihan / Relokasi)',
      standardOrigin: 'Standar Pengelolaan Kerjasama Pemanfaatan BMN BP Batam',
    },
    executiveAction: 'Terbitkan surat konfirmasi perpanjangan sewa kepada PT Kimia Farma dan pihak perbankan 30 hari sebelum batas akhir masa berlaku.',
  },

  rsbp_morbiditas: {
    id: 'rsbp_morbiditas',
    unit: 'bu-rumah-sakit',
    title: '10 Besar Kasus Penyakit Terbanyak / Morbiditas (Dataset No. 4)',
    codeTag: 'BURS-04',
    category: 'Surveilans Epidemiologi Klinis',
    currentValue: '14.850 Kasus Teratas (I11.9)',
    targetValue: 'Surveilans 100% ICD-10',
    statusText: 'Terkendali & Termonitor',
    statusVariant: 'info',
    summary: 'Pemetaan 10 besar penyakit terbanyak yang ditangani di rawat jalan dan rawat inap RSBP Batam berdasarkan standar klasifikasi internasional ICD-10.',
    presentationPitch: 'Penyakit kardiovaskular dan metabolik mendominasi morbiditas RSBP, dipimpin oleh Hypertensive Heart Disease (14.850 kasus) dan Diabetes Mellitus Tipe 2 (12.620 kasus). Data ini menjadi dasar alokasi pengadaan obat kronis dan penyediaan cathlab serta hemodialisa.',
    formulaConceptual: 'Persentase Kasus = (Jumlah Kasus Penyakit Tertentu ÷ Total Kasus Terdata) × 100%',
    numerator: {
      label: 'Pembilang (Jumlah Pasien Terdiagnosa Penyakit Spesifik)',
      realValue: '14.850 Kasus Hipertensi (Kode ICD I11.9)',
      source: 'Satu Data Item #4 (Hal. 20): Atribut JUMLAH KASUS & KODE ICD',
    },
    denominator: {
      label: 'Penyebut (Total Seluruh Kasus Morbiditas Terdata)',
      realValue: '74.990 Kasus Akumulasi 10 Besar Morbiditas',
      source: 'Satu Data Item #4: Rekapitulasi Kasus Penyakit',
    },
    calculationResult: '(14.850 ÷ 74.990) × 100% = 19,80% Proporsi Kasus',
    tableauCalculatedField: `// Calculated Field: [% Morbiditas ICD]
(SUM([JUMLAH KASUS]) / TOTAL(SUM([JUMLAH KASUS]))) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #2 Horizontal Ranked Bars',
      rows: '[NAMA PENYAKIT], [KODE ICD]',
      columns: 'SUM([JUMLAH KASUS])',
      marks: 'Color by [JENIS RAWAT]',
      filters: "[TANGGAL REKAP AWAL] >= '2026-01-01'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #4: Jumlah Kasus Penyakit Terbanyak di Rumah Sakit BP Batam (Hal. 20)',
      tableName: 'morbiditas_penyakit_rsbp',
      attributes: ['TANGGAL REKAP AWAL', 'TANGGAL REKAP AKHIR', 'JENIS RAWAT', 'NAMA PENYAKIT', 'JUMLAH KASUS', 'KODE ICD'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '100% Kasus Tervalidasi Kode ICD-10',
      warning: '< 95% Koding Terverifikasi',
      critical: '< 90% Validasi Rekam Medis',
      standardOrigin: 'Standar Akreditasi KARS & WHO ICD-10 Classification',
    },
    executiveAction: 'Optimalkan program Prolanis (Program Pengelolaan Penyakit Kronis) bersama BPJS Kesehatan untuk mengontrol pasien hipertensi dan diabetes di Batam.',
  },

  rsbp_resep_generik: {
    id: 'rsbp_resep_generik',
    unit: 'bu-rumah-sakit',
    title: 'Rasio Resep Obat Generik vs Non-Generik (Dataset No. 17)',
    codeTag: 'BURS-17',
    category: 'Rasionalitas Penggunaan Obat (Fornas)',
    currentValue: '83,44% Generik',
    targetValue: 'Standar Kemenkes RI: > 80,0%',
    statusText: 'Sesuai Standar Fornas Kemenkes',
    statusVariant: 'success',
    summary: 'Pengukuran kepatuhan penulisan resep obat generik oleh dokter spesialis di Rawat Jalan, Rawat Inap, dan IGD terhadap Formularium Nasional (Fornas).',
    presentationPitch: 'Rasio resep obat generik RSBP Batam mencapai 83,44% dari total 183.660 lembar resep yang dilayani. Capaian ini melampaui ambang batas Kementerian Kesehatan (>80%) dan menjamin efisiensi pengendalian biaya operasional farmasi RS BLU.',
    formulaConceptual: 'Persentase Resep Generik = (Total Resep Obat Generik ÷ Total Seluruh Resep) × 100%',
    numerator: {
      label: 'Pembilang (Total Lembar Resep Obat Golongan Generik)',
      realValue: '153.240 Lembar Resep (Rawat Jalan: 98.450 | Ranap: 31.250 | IGD: 23.540)',
      source: 'Satu Data Item #17 (Hal. 21): Atribut GOLONGAN OBAT (Generik)',
    },
    denominator: {
      label: 'Penyebut (Total Seluruh Lembar Resep Dilayani Instalasi Farmasi)',
      realValue: '183.660 Lembar Resep (Generik + Non-Generik)',
      source: 'Satu Data Item #17: Rekapitulasi Resep Dispens Obat',
    },
    calculationResult: '(153.240 ÷ 183.660) × 100% = 83,44%',
    tableauCalculatedField: `// Calculated Field: [% Resep Obat Generik]
(SUM([resep_generik]) / (SUM([resep_generik]) + SUM([resep_non_generik]))) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #13 100% Stacked Bar',
      rows: '[instalasi_layanan]',
      columns: '[% Resep Obat Generik]',
      marks: 'Color by [GOLONGAN OBAT]',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #17: Rekapitulasi Resep Dispens Obat Generik dan Non Generik (Hal. 21)',
      tableName: 'resep_farmasi_rsbp',
      attributes: ['TAHUN', 'BULAN', 'GOLONGAN OBAT', 'RAWAT JALAN', 'RAWAT INAP', 'GAWAT DARURAT'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 80,0% (Standar Kemenkes RS BLU Pemerintah)',
      warning: '70,0% - 79,9%',
      critical: '< 70,0% (Kepatuhan Fornas Rendah)',
      standardOrigin: 'Kepmenkes RI tentang Formularium Nasional (Fornas)',
    },
    executiveAction: 'Pantau komite farmasi dan terapi (KFT) untuk audit berkala resep antibiotik dan obat non-formularium pada dokter penanggung jawab pelayanan (DPJP).',
  },

  // ===================================================================
  // BIRO HUKUM BP BATAM (Satu Data Hal. 2)
  // ===================================================================
  hukum_perkara: {
    id: 'hukum_perkara',
    unit: 'biro-hukum',
    title: 'Jumlah Penanganan Perkara (Dataset No. 4 Hal. 2)',
    codeTag: 'BHUK-04',
    category: 'Kegiatan Penanganan Perkara Persidangan',
    currentValue: '10 Perkara Aktif (192 Berkas Dokumen)',
    targetValue: 'Monitoring & Pendampingan Penuh (100%)',
    statusText: 'Semua Perkara Terkendali & Berkas Lengkap',
    statusVariant: 'success',
    summary: 'Jumlah kumulatif perkara litigasi aktif yang dihadapi BP Batam di Pengadilan Negeri Batam, PTUN Tanjungpinang, Pengadilan Hubungan Industrial, dan Badan Arbitrase Nasional Indonesia (BANI).',
    presentationPitch: 'Biro Hukum saat ini mengawal 10 perkara aktif di persidangan dengan total 192 dokumen berkas perkara lengkap. Rata-rata berkas mencapai 19,2 dokumen per kasus, meliputi memori kasasi, surat kuasa khusus, replik-duplik, dan bukti alas hak HPL.',
    formulaConceptual: 'Total Penanganan Perkara = COUNT(Nomor_Perkara_Teregister [Dataset #4])',
    numerator: {
      label: 'Volume Berkas Dokumen Perkara',
      realValue: '192 Berkas Dokumen Hukum (Alat Bukti, Putusan Sela, Eksepsi)',
      source: 'Satu Data Item #4 (Hal. 2): Atribut JUMLAH DOKUMEN',
    },
    denominator: {
      label: 'Basis Registrasi Perkara Aktif',
      realValue: '10 Perkara Pengadilan (PN Batam, PTUN Tanjungpinang, BANI)',
      source: 'Satu Data Item #4: Atribut TANGGAL & TENTANG',
    },
    calculationResult: 'Total = 10 Perkara Aktif | Total Dokumen = 192 Berkas',
    tableauCalculatedField: `// Calculated Field: [Jumlah Perkara & Dokumen]
COUNTD([nomor_perkara])`,
    tableauShelvesGuide: {
      showMe: 'Show Me #3 Horizontal Bars / Data Table',
      rows: '[instansi_pengadilan], [klasifikasi_hukum]',
      columns: 'SUM([JUMLAH DOKUMEN])',
      marks: 'Color by [STATUS TAHAPAN SIDANG]',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #4: KEGIATAN PENANGANAN PERKARA (Hal. 2)',
      tableName: 'kegiatan_perkara_bp_batam',
      attributes: ['TANGGAL', 'TENTANG', 'JUMLAH DOKUMEN', 'INSTANSI PENGADILAN', 'TAHAPAN SIDANG'],
      updateFrequency: 'Per Bulan',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '100% Berkas Perkara Terinventarisir Tepat Waktu',
      warning: 'Terdapat perkara tanpa update tahapan > 30 hari',
      critical: 'Kekalahan perkara akibat kelalaian kehadiran sidang',
      standardOrigin: 'Standar Operasional Prosedur Penanganan Perkara Biro Hukum BP Batam',
    },
    executiveAction: 'Pastikan sinergi intensif bersama Jaksa Pengacara Negara (JPN) dan penyiapan saksi ahli tata ruang sebelum agenda pembuktian di PTUN Tanjungpinang.',
  },

  hukum_jdihn: {
    id: 'hukum_jdihn',
    unit: 'biro-hukum',
    title: 'Penilaian Kinerja JDIHN Se-Indonesia (Kemenkumham RI)',
    codeTag: 'BHUK-JDIHN',
    category: 'Jaringan Dokumentasi & Informasi Hukum Nasional',
    currentValue: '100 / 100 (Sempurna)',
    targetValue: 'Skor Maksimal: 100 Poin',
    statusText: 'Predikat Anggota JDIHN Terbaik Nasional',
    statusVariant: 'success',
    summary: 'Hasil evaluasi komprehensif Kementerian Hukum dan HAM Republik Indonesia (BPHN) terhadap pemenuhan 5 pilar standar tata kelola dokumentasi dan informasi hukum digital BP Batam.',
    presentationPitch: 'BP Batam meraih skor sempurna 100 dalam penilaian nasional JDIHN Kemenkumham RI, dinobatkan sebagai Anggota JDIHN Terbaik Nasional Kategori Lembaga Non-Kementerian. Seluruh 1.240+ regulasi telah terintegrasi 100% via API ke portal nasional jdihn.go.id.',
    formulaConceptual: 'Skor JDIHN = SUM(Skor 5 Pilar: Kelembagaan [20] + SDM [15] + Koleksi Dokumen [30] + IT/Website [25] + Sosialisasi [10])',
    numerator: {
      label: 'Total Nilai Capaian 5 Pilar Evaluasi',
      realValue: '100 Poin (Mencapai batas nilai tertinggi di setiap indikator)',
      source: 'Berita Acara Hasil Evaluasi Tahunan BPHN Kemenkumham RI',
    },
    denominator: {
      label: 'Skor Maksimal Penilaian Nasional',
      realValue: '100 Poin Standar Akreditasi JDIHN',
      source: 'Permenkumham No. 8 Tahun 2019 tentang Standar JDIHN',
    },
    calculationResult: '20 + 15 + 30 + 25 + 10 = 100 / 100 (100%)',
    tableauCalculatedField: `// Calculated Field: [Capaian Indikator JDIHN]
SUM([skor_capaian]) / SUM([skor_maksimal]) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #14 Bullet Graph / Radar Chart',
      rows: '[pilar_penilaian]',
      columns: '[skor_capaian]',
      marks: 'Color by [STATUS AKREDITASI]',
      filters: "[TAHUN EVALUASI] = '2025/2026'",
    },
    databaseSource: {
      catalogItem: 'Evaluasi Tahunan JDIHN Nasional Kemenkumham RI',
      tableName: 'evaluasi_jdihn_nasional',
      attributes: ['PILAR_PENILAIAN', 'BOBOT_PERSEN', 'SKOR_MAKSIMAL', 'SKOR_CAPAIAN', 'STATUS_INTEGRASI_API'],
      updateFrequency: 'Per Tahun',
      dataClassification: 'TERBUKA',
    },
    benchmarkThreshold: {
      target: '100 (Predikat Terbaik Nasional LPNK)',
      warning: '85 - 94 (Predikat Baik)',
      critical: '< 80 (Predikat Cukup / Belum Terakreditasi)',
      standardOrigin: 'Pedoman Penilaian Kinerja Anggota JDIHN BPHN Kemenkumham RI',
    },
    executiveAction: 'Pertahankan uptime server API 99,95% dan percepat upload naskah regulasi baru maksimal 1x24 jam pasca penetapan oleh Kepala BP Batam.',
  },

  hukum_litigasi: {
    id: 'hukum_litigasi',
    unit: 'biro-hukum',
    title: 'Persentase Penanganan Perkara Selesai / Inkracht (Dataset No. 9)',
    codeTag: 'BHUK-09',
    category: 'Efektivitas Pembelaan Litigasi',
    currentValue: '87,50%',
    targetValue: 'Target Perkin: ≥ 85,00%',
    statusText: 'Melampaui Target Perkin (100% Kasus Selesai Dimenangkan)',
    statusVariant: 'success',
    summary: 'Rasio perkara litigasi di pengadilan yang berhasil diselesaikan hingga berkekuatan hukum tetap (Inkracht) dan seluruh putusannya memenangkan posisi yuridis BP Batam.',
    presentationPitch: 'Tingkat penyelesaian perkara litigasi BP Batam mencapai 87,50%, melampaui target perkin 85%. Dari 8 perkara yang telah inkracht, 100% putusan menolak gugatan penggugat dan menyelamatkan aset strategis senilai Rp 505,7 Miliar.',
    formulaConceptual: 'Persentase Perkara Litigasi Selesai = (Jumlah Perkara Inkracht ÷ Total Perkara Litigasi) × 100%',
    numerator: {
      label: 'Pembilang (Perkara Litigasi Inkracht / Selesai)',
      realValue: '7 Perkara Inkracht Menang (1 Perkara Dading Sukarela)',
      source: 'Satu Data Item #9 (Hal. 2): Atribut TANGGAL & TENTANG (Status Inkracht)',
    },
    denominator: {
      label: 'Penyebut (Total Perkara Litigasi Berjalan)',
      realValue: '8 Perkara Teregister dalam Periode Evaluasi',
      source: 'Satu Data Item #9: Rekapitulasi Gugatan Terdaftar',
    },
    calculationResult: '(7 ÷ 8) × 100% = 87,50%',
    tableauCalculatedField: `// Calculated Field: [% Selesai Litigasi]
(COUNT(IIF([status] = 'Selesai (Inkracht)', [nomor_perkara], NULL)) / COUNT([nomor_perkara])) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #1 Pie / Donut Chart',
      rows: '[status_perkara]',
      columns: '[% Selesai Litigasi]',
      marks: 'Color by [HASIL PUTUSAN]',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #9: PERSENTASE PENANGANAN PERKARA YANG DISELESAIKAN (Hal. 2)',
      tableName: 'perkara_litigasi_bp_batam',
      attributes: ['TANGGAL', 'TENTANG', 'STATUS INKRACHT', 'HASIL PUTUSAN', 'NILAI_SENGKETA_RP'],
      updateFrequency: 'Per Tahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 85,0% Selesai Inkracht Menang',
      warning: '75,0% - 84,9%',
      critical: '< 75,0% (Risiko Kerugian Negara Tinggi)',
      standardOrigin: 'Perjanjian Kinerja (Perkin) Biro Hukum BP Batam',
    },
    executiveAction: 'Lanjutkan koordinasi dengan Pengadilan Negeri untuk proses eksekusi pengosongan lahan HPL yang telah inkracht secara persuasif dan terukur.',
  },

  hukum_non_litigasi: {
    id: 'hukum_non_litigasi',
    unit: 'biro-hukum',
    title: 'Persentase Pelayanan Permasalahan Hukum Non-Litigasi (Dataset No. 10)',
    codeTag: 'BHUK-10',
    category: 'Penyelesaian Sengketa Non-Litigasi & Mediasi',
    currentValue: '92,30%',
    targetValue: 'Target Perkin: ≥ 90,00%',
    statusText: 'Sangat Memuaskan (Mediasi Tuntas & Akta Damai)',
    statusVariant: 'success',
    summary: 'Rasio pelayanan konsultasi hukum, klarifikasi sengketa lahan, pendampingan legal opinion, dan mediasi non-litigasi yang diselesaikan secara tuntas dan damai.',
    presentationPitch: 'Persentase pelayanan non-litigasi mencapai 92,30%, berhasil menyelesaikan 48 dari 52 permohonan konsultasi dan mediasi sengketa. Pendekatan alternatif ini menghemat biaya operasional persidangan hingga miliaran rupiah dan mempercepat kepastian hukum investasi.',
    formulaConceptual: 'Persentase Layanan Non-Litigasi = (Jumlah Masalah Selesai Non-Litigasi ÷ Total Permohonan Layanan) × 100%',
    numerator: {
      label: 'Pembilang (Permasalahan Non-Litigasi Selesai Tuntas)',
      realValue: '48 Layanan Hukum (Konsultasi, Mediasi, Pendapat Hukum)',
      source: 'Satu Data Item #10 (Hal. 2): Atribut TANGGAL & TENTANG (Status Tuntas)',
    },
    denominator: {
      label: 'Penyebut (Total Permasalahan Masuk)',
      realValue: '52 Permohonan Layanan Non-Litigasi Teregister',
      source: 'Satu Data Item #10: Buku Register Konsultasi & Mediasi',
    },
    calculationResult: '(48 ÷ 52) × 100% = 92,30%',
    tableauCalculatedField: `// Calculated Field: [% Pelayanan Non-Litigasi]
(COUNT(IIF([status] = 'Selesai Tuntas', [nomor_registrasi], NULL)) / COUNT([nomor_registrasi])) * 100`,
    tableauShelvesGuide: {
      showMe: 'Show Me #13 Stacked Bar Chart',
      rows: '[jenis_layanan]',
      columns: '[% Pelayanan Non-Litigasi]',
      marks: 'Color by [STATUS PENYELESAIAN]',
      filters: "[TAHUN] = '2026'",
    },
    databaseSource: {
      catalogItem: 'Katalog Data Item #10: PERSENTASE PELAYANAN DAN PENANGANAN PERMASALAHAN HUKUM YANG DISELESAIKAN (Hal. 2)',
      tableName: 'pelayanan_non_litigasi_bp_batam',
      attributes: ['TANGGAL', 'TENTANG', 'JENIS LAYANAN', 'PEMOHON', 'STATUS PENYELESAIAN'],
      updateFrequency: 'Per Tahun',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: '≥ 90,0% Masalah Selesai Melalui Mediasi Tuntas',
      warning: '80,0% - 89,9%',
      critical: '< 80,0% (Banyak Sengketa Eskalasi ke Pengadilan)',
      standardOrigin: 'Standar Pelayanan Prima Non-Litigasi Biro Hukum BP Batam',
    },
    executiveAction: 'Optimalkan ruang mediasi terpadu dan tim negosiator bersertifikasi Mahkamah Agung untuk mempercepat akta dading sengketa UWT dan sewa tenant.',
  },

  hukum_formula_agregat: {
    id: 'hukum_formula_agregat',
    unit: 'biro-hukum',
    title: 'Formula Agregasi Litigasi & Non-Litigasi per Tentang (Dataset #9 + #10)',
    codeTag: 'BHUK-AGREGAT',
    category: 'Formula Agregasi Pokok Perkara',
    currentValue: '118 Total Kasus Terkelola',
    targetValue: 'Integrasi Data 100% Akurat',
    statusText: 'Formula Berjalan Otomatis & Terverifikasi',
    statusVariant: 'success',
    summary: 'Formula penggabungan otomatis jumlah perkara persidangan (Litigasi [DS 9]) dan permohonan mediasi damai (Non-Litigasi [DS 10]) yang memiliki pokok materi sengketa ("TENTANG") yang identik.',
    presentationPitch: 'Melalui formula agregasi terpadu: Total Kasus = SUM(Litigasi) + SUM(Non-Litigasi) untuk setiap pokok perkara yang sama. Sengketa Lahan HPL mendominasi dengan 30 kasus (12 Litigasi + 18 Non-Litigasi), disusul Wanprestasi Aset BMN sebanyak 22 kasus.',
    formulaConceptual: 'Total Kasus per Tema = SUM(Kasus_Litigasi [Dataset #9]) + SUM(Kasus_NonLitigasi [Dataset #10])',
    numerator: {
      label: 'Jumlah Kasus Litigasi (Pengadilan)',
      realValue: '47 Kasus Persidangan (PN Batam, PTUN Tanjungpinang, MA)',
      source: 'Dataset #9: Sub-Total Litigasi per Kluster Tentang',
    },
    denominator: {
      label: 'Jumlah Kasus Non-Litigasi (Mediasi / Konsultasi)',
      realValue: '71 Kasus Mediasi Damai & Negosiasi ADR',
      source: 'Dataset #10: Sub-Total Non-Litigasi per Kluster Tentang',
    },
    calculationResult: '47 Litigasi + 71 Non-Litigasi = 118 Total Kasus Sengketa',
    tableauCalculatedField: `// Calculated Field: [Total Kasus Gabungan per Tema]
ZN(SUM([Kasus_Litigasi])) + ZN(SUM([Kasus_NonLitigasi]))`,
    tableauShelvesGuide: {
      showMe: 'Show Me #13 Stacked Bar Horizontal',
      rows: '[TENTANG / POKOK PERKARA]',
      columns: '[Total Kasus Gabungan per Tema]',
      marks: 'Color by [JALUR PENYELESAIAN]',
      filters: "[STATUS] = 'SEMUA'",
    },
    databaseSource: {
      catalogItem: 'Kombinasi Dataset #9 & #10: Matriks Komparasi Litigasi vs Non-Litigasi',
      tableName: 'agregasi_perkara_tema_hukum',
      attributes: ['TENTANG', 'JUMLAH_LITIGASI', 'JUMLAH_NON_LITIGASI', 'TOTAL_PENANGANAN', 'TINGKAT_KEBERHASILAN'],
      updateFrequency: 'Per Semester',
      dataClassification: 'TERTUTUP',
    },
    benchmarkThreshold: {
      target: 'Rasio Non-Litigasi ≥ 60% (Efisiensi Biaya Perkara)',
      warning: 'Rasio Non-Litigasi 40% - 59%',
      critical: 'Rasio Non-Litigasi < 40% (Beban Litigasi Pengadilan Terlalu Berat)',
      standardOrigin: 'Kebijakan Restorative Justice & Alternatif Penyelesaian Sengketa BP Batam',
    },
    executiveAction: 'Fokuskan energi mediasi pada sengketa wanprestasi sewa tenant dan HPL perumahan agar tidak meluncur menjadi gugatan perdata berbiaya tinggi di pengadilan.',
  },
};

/**
 * Intelligent KPI resolver with comprehensive alias mapping for both Biro Keuangan and PDSI.
 * Guarantees that any clicked table/BAN opens the exact intended formula without wrong cross-unit fallbacks.
 */
export function resolveKpiFormulaDetail(kpiId: string | null): KpiFormulaDetail {
  if (!kpiId) return KPI_FORMULA_DETAILS.pendapatan;

  // 1. Direct match
  if (KPI_FORMULA_DETAILS[kpiId]) {
    return KPI_FORMULA_DETAILS[kpiId];
  }

  // 2. Explicit Alias Dictionary for both Biro Keuangan & PDSI
  const aliasMap: Record<string, string> = {
    // Keuangan Pendapatan & Belanja & Realisasi BLU
    rev_capaian: 'pendapatan',
    target_pnbp: 'pendapatan',
    pnbp: 'pendapatan',
    penerimaan_pnbp: 'pendapatan',
    exp_serapan: 'belanja',
    pagu_belanja: 'belanja',
    serapan_belanja: 'belanja',
    realisasi_blu: 'realisasi_blu_total',
    lra_blu: 'realisasi_blu_total',
    lra: 'realisasi_blu_total',
    laporan_realisasi_blu: 'realisasi_blu_total',

    // Keuangan Arus Kas & Likuiditas
    cash_flow: 'arus_kas',
    tren_arus_kas: 'arus_kas',
    cash_inflow: 'cash_inflow_total',
    cash_inflow_total: 'cash_inflow_total',
    total_kas_masuk: 'cash_inflow_total',
    kas_masuk: 'cash_inflow_total',
    cash_outflow: 'cash_outflow_total',
    cash_outflow_total: 'cash_outflow_total',
    total_kas_keluar: 'cash_outflow_total',
    kas_keluar: 'cash_outflow_total',
    net_surplus: 'net_surplus',
    net_cash_flow: 'net_surplus',
    net_kas: 'net_surplus',
    keseimbangan_surplus: 'keseimbangan_surplus',
    surplus_defisit: 'keseimbangan_surplus',
    keseimbangan_fiskal: 'keseimbangan_surplus',
    subsidi_silang: 'keseimbangan_surplus',
    unit_surplus_defisit: 'keseimbangan_surplus',
    surplus_unit: 'keseimbangan_surplus',
    cash_avg_monthly: 'avg_monthly_cash_inflow',
    avg_monthly_cash_inflow: 'avg_monthly_cash_inflow',
    rata_rata_kas_masuk: 'avg_monthly_cash_inflow',
    rata_rata_penerimaan_kas: 'avg_monthly_cash_inflow',
    liquidity_runway: 'liquidity_runway',
    ketahanan_likuiditas: 'liquidity_runway',
    standar_likuiditas: 'liquidity_runway',
    saldo_kas: 'saldo_bank_realtime',
    kas_bank: 'saldo_bank_realtime',
    saldo_bank: 'saldo_bank_realtime',
    likuiditas: 'saldo_bank_realtime',
    kemandirian_fiskal: 'otonomi_fiskal',
    rasio_kemandirian: 'otonomi_fiskal',
    komposisi_pendanaan: 'sumber_pendanaan',
    struktur_pendanaan: 'sumber_pendanaan',
    aging_piutang: 'piutang',
    mutasi_piutang: 'piutang',
    rincian_pnbp_total: 'pendapatan',

    // PDSI Data Center & Keamanan Siber
    kpi_dc_rack: 'rak_terisi',
    dc_rack: 'rak_terisi',
    kapasitas_rak: 'total_rak',
    okupansi_rak: 'rak_terisi',
    kpi_dc_pue: 'kpi_dc_pue',
    dc_pue: 'kpi_dc_pue',
    pue: 'kpi_dc_pue',
    kpi_cyber_incident: 'total_serangan',
    kpi_cyber: 'total_serangan',
    cyber_threats: 'total_serangan',
    csirt: 'total_serangan',
    keamanan_siber: 'total_serangan',

    // PDSI Helpdesk & Jaringan & SPBE
    kpi_helpdesk_sla: 'kpi_helpdesk_sla',
    kpi_helpdesk: 'kpi_helpdesk_sla',
    helpdesk_sla: 'kpi_helpdesk_sla',
    tiket_helpdesk: 'kpi_helpdesk_sla',
    kpi_fo_availability: 'kapasitas_core_fo',
    kpi_fo: 'panjang_jalur_fo',
    panjang_fiber: 'jaringan_fiber',
    jaringan_fiber: 'jaringan_fiber',
    fo_availability: 'panjang_jalur_fo',
    backbone_fiber: 'panjang_jalur_fo',
    panjang_jalur_fo: 'panjang_jalur_fo',
    kapasitas_core_fo: 'kapasitas_core_fo',
    core_fo: 'kapasitas_core_fo',
    fo_core: 'kapasitas_core_fo',
    kpi_spbe: 'indeks_spbe',
    spbe: 'indeks_spbe',
    domain_spbe: 'indeks_spbe',
    kpi_tte: 'jumlah_aplikasi',
    kpi_apps_tte: 'jumlah_aplikasi',
    tte_bsre: 'jumlah_aplikasi',
    tte_readiness: 'jumlah_aplikasi',
    kpi_csat_dc: 'kepuasan_dc',
    csat_dc: 'kepuasan_dc',
    server_drc: 'jumlah_server',

    // PTSP Perizinan, IKM & Pengaduan
    ikss_ikm: 'ikss_ikm',
    kpi_ptsp_ikm: 'ikss_ikm',
    ikm_ptsp: 'ikss_ikm',
    ikm: 'ikss_ikm',
    ikm_9unsur: 'ikss_ikm',
    ptsp_ikm: 'ikss_ikm',
    lic_sla: 'lic_sla',
    kpi_ptsp_sla: 'lic_sla',
    sla_ptsp: 'lic_sla',
    lic_vol: 'lic_vol',
    kpi_ptsp_vol: 'lic_vol',
    volume_izin: 'lic_vol',
    lic_issued: 'lic_issued',
    kpi_ptsp_issued: 'lic_issued',
    izin_terbit: 'lic_issued',
    rasio_terbit: 'lic_issued',
    lic_backlog: 'lic_backlog',
    kpi_ptsp_backlog: 'lic_backlog',
    backlog_izin: 'lic_backlog',
    lic_mlt: 'lic_mlt',
    kpi_ptsp_leadtime: 'lic_mlt',
    lead_time: 'lic_mlt',
    median_lead_time: 'lic_mlt',
    lic_bottleneck: 'lic_bottleneck',
    kpi_ptsp_bottleneck: 'lic_bottleneck',
    bottleneck_rate: 'lic_bottleneck',
    sat_ccr: 'sat_ccr',
    kpi_ptsp_complaints: 'sat_ccr',
    aduan_selesai: 'sat_ccr',
    pengaduan_ptsp: 'sat_ccr',
    sp4n_lapor: 'sat_ccr',
    kpi_ptsp_maritim: 'kpi_ptsp_maritim',
    ptsp_maritim: 'kpi_ptsp_maritim',
    maritim: 'kpi_ptsp_maritim',
    skkbm: 'kpi_ptsp_maritim',
    pelabuhan_ptsp: 'kpi_ptsp_maritim',

    // Kepelabuhanan (DPKPL)
    pelabuhan_pnbp: 'pelabuhan_pnbp',
    pnbp_pelabuhan: 'pelabuhan_pnbp',
    pelabuhan_belanja: 'pelabuhan_belanja',
    belanja_pelabuhan: 'pelabuhan_belanja',
    pelabuhan_ikm: 'pelabuhan_ikm',
    ikm_pelabuhan: 'pelabuhan_ikm',
    pelabuhan_penumpang: 'pelabuhan_penumpang',
    penumpang_pelabuhan: 'pelabuhan_penumpang',
    pelabuhan_dermaga: 'pelabuhan_dermaga',
    dermaga_pelabuhan: 'pelabuhan_dermaga',
    bor_pelabuhan: 'pelabuhan_dermaga',
    pelabuhan_kunjungan: 'pelabuhan_kunjungan',
    kunjungan_kapal: 'pelabuhan_kunjungan',
    kunjungan_pelabuhan: 'pelabuhan_kunjungan',
    call_kapal: 'pelabuhan_kunjungan',

    // Biro Hukum BP Batam
    'hukum-kpi-1': 'hukum_perkara',
    'hukum-kpi-2': 'hukum_jdihn',
    'hukum-kpi-3': 'hukum_litigasi',
    'hukum-kpi-4': 'hukum_non_litigasi',
    'hukum-kpi-5': 'hukum_formula_agregat',
    hukum_perkara: 'hukum_perkara',
    penanganan_perkara: 'hukum_perkara',
    perkara_hukum: 'hukum_perkara',
    hukum_jdihn: 'hukum_jdihn',
    jdihn: 'hukum_jdihn',
    jdihn_skor: 'hukum_jdihn',
    jdihn_se_indonesia: 'hukum_jdihn',
    hukum_litigasi: 'hukum_litigasi',
    litigasi: 'hukum_litigasi',
    perkara_mitigasi: 'hukum_litigasi',
    perkara_litigasi: 'hukum_litigasi',
    hukum_non_litigasi: 'hukum_non_litigasi',
    non_litigasi: 'hukum_non_litigasi',
    nonlitigasi: 'hukum_non_litigasi',
    mediasi_hukum: 'hukum_non_litigasi',
    hukum_formula_agregat: 'hukum_formula_agregat',
    formula_agregat_hukum: 'hukum_formula_agregat',
  };

  const mappedKey = aliasMap[kpiId];
  if (mappedKey && KPI_FORMULA_DETAILS[mappedKey]) {
    return KPI_FORMULA_DETAILS[mappedKey];
  }

  // 3. Prefix & Domain-based Fallback
  const lowerId = kpiId.toLowerCase();

  if (
    lowerId.includes('hukum') ||
    lowerId.includes('perkara') ||
    lowerId.includes('jdihn') ||
    lowerId.includes('litigasi') ||
    lowerId.includes('gugatan') ||
    lowerId.includes('sidang') ||
    lowerId.includes('bhuk')
  ) {
    if (lowerId.includes('jdihn') || lowerId.includes('100') || lowerId.includes('kemenkumham')) return KPI_FORMULA_DETAILS.hukum_jdihn;
    if (lowerId.includes('non') || lowerId.includes('mediasi') || lowerId.includes('konsultasi') || lowerId.includes('10')) return KPI_FORMULA_DETAILS.hukum_non_litigasi;
    if (lowerId.includes('litigasi') || lowerId.includes('mitigasi') || lowerId.includes('inkracht') || lowerId.includes('9')) return KPI_FORMULA_DETAILS.hukum_litigasi;
    if (lowerId.includes('agregat') || lowerId.includes('formula') || lowerId.includes('komparasi')) return KPI_FORMULA_DETAILS.hukum_formula_agregat;
    return KPI_FORMULA_DETAILS.hukum_perkara;
  }

  if (
    lowerId.includes('rsbp') ||
    lowerId.includes('rumah_sakit') ||
    lowerId.includes('rumah-sakit') ||
    lowerId.includes('pasien') ||
    lowerId.includes('tenant') ||
    lowerId.includes('morbiditas') ||
    lowerId.includes('resep') ||
    lowerId.includes('efisiensi_bor') ||
    lowerId.includes('bor_rs')
  ) {
    if (lowerId.includes('pnbp') || lowerId.includes('pendapatan')) return KPI_FORMULA_DETAILS.rsbp_pnbp;
    if (lowerId.includes('belanja') || lowerId.includes('anggaran') || lowerId.includes('serapan')) return KPI_FORMULA_DETAILS.rsbp_belanja;
    if (lowerId.includes('ikm') || lowerId.includes('kepuasan')) return KPI_FORMULA_DETAILS.rsbp_ikm;
    if (lowerId.includes('kunjungan') || lowerId.includes('pasien') || lowerId.includes('layanan')) return KPI_FORMULA_DETAILS.rsbp_kunjungan;
    if (lowerId.includes('bor') || lowerId.includes('efisiensi') || lowerId.includes('alos') || lowerId.includes('toi')) return KPI_FORMULA_DETAILS.rsbp_efisiensi_bor;
    if (lowerId.includes('tenant') || lowerId.includes('sewa') || lowerId.includes('ruangan')) return KPI_FORMULA_DETAILS.rsbp_sewa_tenant;
    if (lowerId.includes('morbiditas') || lowerId.includes('penyakit') || lowerId.includes('icd')) return KPI_FORMULA_DETAILS.rsbp_morbiditas;
    if (lowerId.includes('resep') || lowerId.includes('obat') || lowerId.includes('generik') || lowerId.includes('fornas')) return KPI_FORMULA_DETAILS.rsbp_resep_generik;
    return KPI_FORMULA_DETAILS.rsbp_pnbp;
  }

  if (
    lowerId.includes('pelabuhan') ||
    lowerId.includes('dermaga') ||
    lowerId.includes('kapal') ||
    lowerId.includes('dpkpl') ||
    lowerId.includes('bor_') ||
    lowerId.includes('batu_ampar')
  ) {
    if (lowerId.includes('pnbp') || lowerId.includes('pendapatan') || lowerId.includes('tarif')) return KPI_FORMULA_DETAILS.pelabuhan_pnbp;
    if (lowerId.includes('belanja') || lowerId.includes('anggaran') || lowerId.includes('serapan')) return KPI_FORMULA_DETAILS.pelabuhan_belanja;
    if (lowerId.includes('ikm') || lowerId.includes('kepuasan') || lowerId.includes('mutu')) return KPI_FORMULA_DETAILS.pelabuhan_ikm;
    if (lowerId.includes('penumpang') || lowerId.includes('pax') || lowerId.includes('datang') || lowerId.includes('berangkat')) return KPI_FORMULA_DETAILS.pelabuhan_penumpang;
    if (lowerId.includes('dermaga') || lowerId.includes('bor') || lowerId.includes('tambat') || lowerId.includes('draf')) return KPI_FORMULA_DETAILS.pelabuhan_dermaga;
    if (lowerId.includes('kunjungan') || lowerId.includes('kapal') || lowerId.includes('call') || lowerId.includes('gt')) return KPI_FORMULA_DETAILS.pelabuhan_kunjungan;
    return KPI_FORMULA_DETAILS.pelabuhan_pnbp;
  }

  if (
    lowerId.startsWith('kpi_dc') ||
    lowerId.startsWith('kpi_cyber') ||
    lowerId.startsWith('kpi_helpdesk') ||
    lowerId.startsWith('kpi_fo') ||
    lowerId.startsWith('kpi_tte') ||
    lowerId.startsWith('pdsi') ||
    lowerId.includes('spbe') ||
    lowerId.includes('rack') ||
    lowerId.includes('server')
  ) {
    return KPI_FORMULA_DETAILS.rak_terisi;
  }

  if (
    lowerId.startsWith('ptsp') ||
    lowerId.startsWith('lic_') ||
    lowerId.startsWith('ikss_') ||
    lowerId.startsWith('sat_') ||
    lowerId.includes('ikm') ||
    lowerId.includes('maritim') ||
    lowerId.includes('izin') ||
    lowerId.includes('aduan') ||
    lowerId.includes('lapor') ||
    lowerId.includes('oss')
  ) {
    return KPI_FORMULA_DETAILS.ikss_ikm;
  }

  if (
    lowerId.includes('kpi_investasi') ||
    lowerId.includes('dinv') ||
    lowerId.includes('invest_in_batam') ||
    lowerId.includes('promosi') ||
    lowerId.includes('sektor_minat') ||
    lowerId.includes('infrastruktur')
  ) {
    if (lowerId.includes('realisasi') || lowerId.includes('target')) return KPI_FORMULA_DETAILS.kpi_investasi_realisasi;
    if (lowerId.includes('web') || lowerId.includes('kunjungan') || lowerId.includes('traffic')) return KPI_FORMULA_DETAILS.kpi_investasi_website;
    if (lowerId.includes('minat') || lowerId.includes('pameran') || lowerId.includes('expo') || lowerId.includes('loi')) return KPI_FORMULA_DETAILS.kpi_investasi_minat;
    if (lowerId.includes('infra') || lowerId.includes('proyek') || lowerId.includes('lahan') || lowerId.includes('luas')) return KPI_FORMULA_DETAILS.kpi_investasi_infrastruktur;
    if (lowerId.includes('promosi') || lowerId.includes('tamu') || lowerId.includes('agenda')) return KPI_FORMULA_DETAILS.kpi_investasi_promosi;
    return KPI_FORMULA_DETAILS.kpi_investasi_realisasi;
  }

  if (
    lowerId.includes('llb') ||
    lowerId.includes('lalu_lintas_barang') ||
    lowerId.includes('lalu-lintas-barang') ||
    lowerId.includes('pemasukan') ||
    lowerId.includes('pengeluaran') ||
    lowerId.includes('kuota') ||
    lowerId.includes('sembako')
  ) {
    if (lowerId.includes('pnbp') || lowerId.includes('tarif') || lowerId.includes('pendapatan')) return KPI_FORMULA_DETAILS.llb_pnbp;
    if (lowerId.includes('total') || lowerId.includes('perizinan') || lowerId.includes('dokumen')) return KPI_FORMULA_DETAILS.llb_total_izin;
    if (lowerId.includes('industri') || lowerId.includes('pemasukan') || lowerId.includes('pengeluaran')) return KPI_FORMULA_DETAILS.llb_izin_industri;
    if (lowerId.includes('dagang') || lowerId.includes('perdagangan') || lowerId.includes('kuota') || lowerId.includes('sembako')) return KPI_FORMULA_DETAILS.llb_izin_perdagangan;
    if (lowerId.includes('kawasan') || lowerId.includes('iuk') || lowerId.includes('kbli')) return KPI_FORMULA_DETAILS.llb_izin_kawasan;
    if (lowerId.includes('sla') || lowerId.includes('waktu') || lowerId.includes('durasi') || lowerId.includes('jam')) return KPI_FORMULA_DETAILS.llb_sla;
    return KPI_FORMULA_DETAILS.llb_pnbp;
  }

  if (lowerId.includes('kek') || lowerId.includes('investasi') || lowerId.includes('perkin')) {
    if (lowerId.includes('investasi')) return KPI_FORMULA_DETAILS.kpi_kek_investasi;
    if (lowerId.includes('berusaha') || lowerId.includes('izin')) return KPI_FORMULA_DETAILS.kpi_kek_izin_berusaha;
    if (lowerId.includes('non')) return KPI_FORMULA_DETAILS.kpi_kek_non_perizinan;
    if (lowerId.includes('lainnya')) return KPI_FORMULA_DETAILS.kpi_kek_perizinan_lainnya;
    if (lowerId.includes('kajian') || lowerId.includes('perkin') || lowerId.includes('analisis')) return KPI_FORMULA_DETAILS.kpi_kek_kajian_perkin;
    return KPI_FORMULA_DETAILS.kpi_kek_investasi;
  }

  return KPI_FORMULA_DETAILS.pendapatan;
}

interface KpiFormulaExplanationModalProps {
  kpiId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherKpi?: (id: string) => void;
}

export const KpiFormulaExplanationModal: React.FC<KpiFormulaExplanationModalProps> = ({
  kpiId,
  isOpen,
  onClose,
  onSelectAnotherKpi,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'formula' | 'presentation' | 'tableau' | 'data_source'>('formula');

  if (!isOpen || !kpiId) return null;

  const detail = resolveKpiFormulaDetail(kpiId);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Group all available KPIs for quick switcher at the top
  const availableKpis = Object.values(KPI_FORMULA_DETAILS);
  const biroKeuanganKpis = availableKpis.filter((k) => k.unit === 'biro-keuangan');
  const pdsiKpis = availableKpis.filter((k) => k.unit === 'pdsi');
  const ptspKpis = availableKpis.filter((k) => k.unit === 'ptsp');
  const kekKpis = availableKpis.filter((k) => k.unit === 'dit-pengembangan-kek');
  const investasiKpis = availableKpis.filter((k) => k.unit === 'dit-investasi');
  const llbKpis = availableKpis.filter((k) => k.unit === 'dit-lalu-lintas-barang');
  const pelabuhanKpis = availableKpis.filter((k) => k.unit === 'dit-pelabuhan');
  const rsbpKpis = availableKpis.filter((k) => k.unit === 'bu-rumah-sakit');
  const hukumKpis = availableKpis.filter((k) => k.unit === 'biro-hukum');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-sans select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white shadow-2xl rounded-2xl border border-slate-200/90 max-w-4xl w-full max-h-[92vh] flex flex-col z-10 overflow-hidden text-slate-800">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-[#0A192F] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300 font-mono">
                  {detail.codeTag}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  {detail.unit === 'biro-keuangan'
                    ? 'Biro Keuangan'
                    : detail.unit === 'pdsi'
                    ? 'Pusat Data & Sistem Informasi (PDSI)'
                    : detail.unit === 'ptsp'
                    ? 'Pusat Pelayanan Terpadu Satu Pintu (PTSP)'
                    : detail.unit === 'dit-investasi'
                    ? 'Direktorat Promosi dan Fasilitasi Investasi'
                    : detail.unit === 'dit-lalu-lintas-barang'
                    ? 'Direktorat Lalu Lintas Barang'
                    : detail.unit === 'dit-pelabuhan'
                    ? 'Direktorat Pengelolaan Kepelabuhanan'
                    : detail.unit === 'bu-rumah-sakit'
                    ? 'Badan Usaha Rumah Sakit (RSBP Batam)'
                    : detail.unit === 'biro-hukum'
                    ? 'Biro Hukum BP Batam'
                    : 'Direktorat Perencanaan dan Pengembangan Investasi'}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-medium">
                  {detail.statusText}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white mt-0.5 line-clamp-1">
                {detail.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Tutup (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick KPI Navigation Switcher (Tabs for presentation) */}
        <div className="px-5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 text-xs overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mr-1">
              Ganti KPI:
            </span>
            <div className="flex items-center gap-1">
              {(detail.unit === 'biro-keuangan'
                ? biroKeuanganKpis
                : detail.unit === 'pdsi'
                ? pdsiKpis
                : detail.unit === 'ptsp'
                ? ptspKpis
                : detail.unit === 'dit-investasi'
                ? investasiKpis
                : detail.unit === 'dit-lalu-lintas-barang'
                ? llbKpis
                : detail.unit === 'dit-pelabuhan'
                ? pelabuhanKpis
                : detail.unit === 'bu-rumah-sakit'
                ? rsbpKpis
                : detail.unit === 'biro-hukum'
                ? hukumKpis
                : kekKpis
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectAnotherKpi && onSelectAnotherKpi(item.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                    item.id === detail.id
                      ? 'bg-[#1F4E79] text-white shadow-2xs font-bold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.codeTag}
                </button>
              ))}
            </div>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-1 text-[11px] shrink-0">
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('hukum_perkara')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'biro-hukum' ? 'text-amber-900 font-bold bg-amber-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Biro Hukum ({hukumKpis.length})
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('rsbp_pnbp')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'bu-rumah-sakit' ? 'text-emerald-900 font-bold bg-emerald-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              RSBP Batam ({rsbpKpis.length})
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('pelabuhan_pnbp')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'dit-pelabuhan' ? 'text-teal-900 font-bold bg-teal-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Kepelabuhanan ({pelabuhanKpis.length})
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('llb_pnbp')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'dit-lalu-lintas-barang' ? 'text-blue-900 font-bold bg-blue-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Dit. LLB ({llbKpis.length})
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('kpi_investasi_realisasi')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'dit-investasi' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Dit. Investasi ({investasiKpis.length})
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('pendapatan')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'biro-keuangan' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Keuangan ({biroKeuanganKpis.length})
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('rak_terisi')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'pdsi' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              PDSI ({pdsiKpis.length})
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('ikss_ikm')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'ptsp' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              PTSP ({ptspKpis.length})
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onSelectAnotherKpi && onSelectAnotherKpi('kpi_kek_investasi')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                detail.unit === 'dit-pengembangan-kek' ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              KEK ({kekKpis.length})
            </button>
          </div>
        </div>

        {/* Big Numbers Overview Strip (Like e-commerce / CRMS card stats) */}
        <div className="p-4 bg-white border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Nilai Riil Saat Ini
            </span>
            <div className="text-lg sm:text-xl font-black text-slate-900 font-mono mt-0.5">
              {detail.currentValue}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Cut-Off Data YTD</span>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Target / Tolok Ukur
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-800 font-mono mt-0.5">
              {detail.targetValue}
            </div>
            <span className="text-[10px] text-slate-500">Perkin TA 2026</span>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Klasifikasi Data
            </span>
            <div className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${
                detail.databaseSource.dataClassification === 'TERTUTUP'
                  ? 'bg-rose-500'
                  : detail.databaseSource.dataClassification === 'TERBATAS'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`} />
              <span>{detail.databaseSource.dataClassification}</span>
            </div>
            <span className="text-[10px] text-slate-500">SIMKEU / SAKTI</span>
          </div>

          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Frekuensi Sinkronisasi
            </span>
            <div className="text-xs font-bold text-slate-800 mt-1">
              {detail.databaseSource.updateFrequency}
            </div>
            <span className="text-[10px] text-blue-700 font-medium">Auto Extract</span>
          </div>
        </div>

        {/* Section Tabs inside Modal */}
        <div className="px-5 border-b border-slate-200 bg-white flex items-center gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('formula')}
            className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'formula'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Rumus &amp; Angka Riil</span>
          </button>
          <button
            onClick={() => setActiveTab('presentation')}
            className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'presentation'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Informasi / Insight</span>
          </button>
          <button
            onClick={() => setActiveTab('tableau')}
            className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'tableau'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-500" />
            <span>Sintaks Tableau Desktop</span>
          </button>
          <button
            onClick={() => setActiveTab('data_source')}
            className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'data_source'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sumber Data &amp; Database</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs bg-[#F8FAFC]">
          {/* TAB 1: FORMULA & ANGKA RIIL */}
          {activeTab === 'formula' && (
            <div className="space-y-4">
              {/* Formula Card */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Formula Konseptual Matematis
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                    Definisi Standar
                  </span>
                </div>
                <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm rounded-lg border border-slate-800 overflow-x-auto font-bold tracking-wide">
                  {detail.formulaConceptual}
                </div>
              </div>

              {/* Real Numbers Breakdown: Pembilang & Penyebut */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  <span>Breakdown Angka Riil Perhitungan (Mengapa Bernilai {detail.currentValue}?)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Numerator Box */}
                  <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200/80">
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wide block">
                      {detail.numerator.label}
                    </span>
                    <div className="text-sm font-bold text-slate-900 font-mono mt-1">
                      {detail.numerator.realValue}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Sumber: {detail.numerator.source}
                    </span>
                  </div>

                  {/* Denominator Box */}
                  <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block">
                      {detail.denominator.label}
                    </span>
                    <div className="text-sm font-bold text-slate-900 font-mono mt-1">
                      {detail.denominator.realValue}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Sumber: {detail.denominator.source}
                    </span>
                  </div>
                </div>

                {/* Calculation Process */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Hasil Kalkulasi Riil
                  </span>
                  <div className="font-mono text-xs font-bold text-slate-800">
                    {detail.calculationResult}
                  </div>
                </div>
              </div>

              {/* Benchmark & Thresholds */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Tolok Ukur Evaluasi &amp; Standar Acuan
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
                    <div className="flex items-center gap-1 font-bold text-[11px] mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Target Ideal / Aman</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">{detail.benchmarkThreshold.target}</p>
                  </div>

                  <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                    <div className="flex items-center gap-1 font-bold text-[11px] mb-0.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Rentang Waspada</span>
                    </div>
                    <p className="text-[11px] text-amber-800">{detail.benchmarkThreshold.warning}</p>
                  </div>

                  <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200 text-rose-900">
                    <div className="flex items-center gap-1 font-bold text-[11px] mb-0.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Status Kritis</span>
                    </div>
                    <p className="text-[11px] text-rose-800">{detail.benchmarkThreshold.critical}</p>
                  </div>
                </div>
                <p className="text-[10.5px] text-slate-500 pt-1">
                  Dasar Regulasi: <strong className="text-slate-700">{detail.benchmarkThreshold.standardOrigin}</strong>
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CARA MENJELASKAN KE ATASAN */}
          {activeTab === 'presentation' && (
            <div className="space-y-4">
              {/* Executive Script */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-amber-700">
                  <Lightbulb className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Narasi Paparan Langsung ke Pimpinan (Executive Speech / Script)
                  </h4>
                </div>
                <div className="p-4 bg-amber-50/70 border border-amber-200/90 rounded-xl text-xs sm:text-[13px] leading-relaxed text-slate-800 font-medium">
                  "{detail.presentationPitch}"
                </div>
              </div>

              {/* Strategic Action Recommendation */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Rekomendasi Tindak Lanjut Eksekutif (Bila Pimpinan Bertanya)</span>
                </h4>
                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs text-slate-800 leading-relaxed">
                  {detail.executiveAction}
                </div>
              </div>

              {/* 3 Key Presentation Talking Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-blue-700 uppercase block mb-1">
                    1. Posisi Terhadap Target
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Nilai saat ini <strong className="text-slate-900">{detail.currentValue}</strong> dengan status <strong className="text-slate-900">{detail.statusText}</strong>.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-blue-700 uppercase block mb-1">
                    2. Validitas Data
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Tersinkronisasi resmi dari tabel <strong className="text-slate-900">{detail.databaseSource.tableName}</strong>.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-blue-700 uppercase block mb-1">
                    3. Dampak ke Kinerja Organisasi
                  </span>
                  <p className="text-[11px] text-slate-600">
                    {detail.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SINTAKS TABLEAU DESKTOP */}
          {activeTab === 'tableau' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Tableau Calculated Field Formula</span>
                  </span>
                  <button
                    onClick={() => handleCopy(detail.tableauCalculatedField)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Kode Formula</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 bg-slate-900 text-sky-300 font-mono text-xs rounded-lg border border-slate-800 overflow-x-auto">
                  {detail.tableauCalculatedField}
                </pre>
                <p className="text-[11px] text-slate-500">
                  Tip: Buka Tableau Desktop &gt; Klik kanan di panel Data &gt; Pilih <em>"Create Calculated Field..."</em> &gt; Beri nama sesuai kode tag di atas.
                </p>
              </div>

              {/* Tableau Shelves Instructions */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Panduan Menempatkan di Tableau Shelves (Worksheet Setup)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block">Show Me Chart:</span>
                    <span className="text-xs font-semibold text-slate-900">{detail.tableauShelvesGuide.showMe}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block">Rows Shelf:</span>
                    <span className="text-xs font-mono text-slate-900">{detail.tableauShelvesGuide.rows}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block">Columns Shelf:</span>
                    <span className="text-xs font-mono text-slate-900">{detail.tableauShelvesGuide.columns}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block">Marks Card &amp; Colors:</span>
                    <span className="text-xs text-slate-900">{detail.tableauShelvesGuide.marks}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUMBER DATA & DATABASE */}
          {activeTab === 'data_source' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-blue-700">
                  <Database className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Asal Data Katalog &amp; Skema Database
                  </h4>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500">Item Katalog Data Resmi:</span>
                    <span className="font-mono text-xs font-bold text-blue-900">{detail.databaseSource.catalogItem}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500">Nama Tabel Database:</span>
                    <span className="font-mono text-xs font-semibold text-slate-800">{detail.databaseSource.tableName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500">Klasifikasi Akses:</span>
                    <span className="text-xs font-bold text-slate-800">{detail.databaseSource.dataClassification}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-600 block mb-1.5">
                    Atribut Kolom yang Digunakan dalam Formula:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {detail.databaseSource.attributes.map((attr, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-md font-mono text-[11px] font-semibold"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Kamus KPI Terverifikasi Resmi Biro Keuangan &amp; PDSI BP Batam</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(detail.presentationPitch)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Salin Narasi Paparan</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#1F4E79] hover:bg-[#163756] text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
