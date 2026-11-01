/**
 * Data Terpadu Visualisasi Pusat Data dan Sistem Informasi (PDSI) BP Batam
 * Berisi 8 dataset analitik sesuai standar Satu Data & Dashboard Eksekutif
 * Digabungkan dalam satu objek JSON terstruktur (PDSI_VISUALISASI_DATA) agar mudah disubstitusi dengan data API live.
 */

export interface OkupansiRakItem {
  ruangan: string;
  ruanganShort: string;
  jenisRak: string;
  totalRak: number;
  jumlahRakTerisi: number;
  jumlahRakKosong: number;
  persentaseTerisi: number; // Jika > 90%, segmen terisi berwarna oranye
}

export interface ServerInfrastrukturItem {
  brand: string;
  garansiAktif: number;
  garansiHabis: number;
  total: number;
  tipePopuler: string;
  tglGaransiTerdekat: string;
  eosRerata: string;
  contohServer: string;
}

export interface SeranganKeamananBulanItem {
  bulan: string;
  bulanFull: string;
  ddosVolumetric: number;
  webExploit: number;
  malwareTrojan: number;
  bruteForce: number;
  portScanning: number;
  totalSerangan: number;
  statusKeamanan: string;
}

export interface HelpdeskLayananItem {
  namaLayanan: string;
  kategori: string;
  jumlah: number;
  avgSlaJam: number;
  tingkatPenyelesaian: number;
  bulan: string; // 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'ALL'
}

export interface PortofolioAplikasiItem {
  kategori: string;
  kategoriShort: string;
  aktif: number;
  dalamPengembangan: number;
  nonaktif: number;
  total: number;
  domain: string;
  unitOperasional: string;
  klasifikasiAplikasi: string;
  unitPengembang: string;
  devYear: string;
}

export interface LisensiSoftwareItem {
  jenisLisensi: string;
  valid: number;
  tidakValid: number;
  total: number;
  tipeSoftware: string;
  pemilikLisensi: string;
  contohSoftware: string;
}

export interface KatalogDataItem {
  produsenData: string;
  produsenShort: string;
  terbuka: number;
  terbatas: number;
  tertutup: number;
  total: number;
  kategoriData: string;
  jenisData: 'Semua' | 'Spasial' | 'Statistik' | 'Keuangan' | 'Operasional';
  pemutakhiranData: string;
}

export interface KepuasanPelangganDcItem {
  kategori: string;
  kategoriShort: string;
  puas: number; // Persentase %
  netral: number; // Persentase %
  tidakPuas: number; // Persentase %
  skor: number;
}

export interface PdsiVisualisasiModel {
  tahunAnggaranList: string[];
  okupansiRak: Record<string, OkupansiRakItem[]>;
  serverInfrastruktur: ServerInfrastrukturItem[];
  seranganKeamanan: Record<string, SeranganKeamananBulanItem[]>;
  helpdeskLayanan: Record<string, HelpdeskLayananItem[]>;
  portofolioAplikasi: PortofolioAplikasiItem[];
  lisensiSoftware: LisensiSoftwareItem[];
  katalogData: Record<string, KatalogDataItem[]>;
  kepuasanPelangganDc: Record<string, KepuasanPelangganDcItem[]>;
}

export const PDSI_VISUALISASI_DATA: PdsiVisualisasiModel = {
  tahunAnggaranList: ['2026', '2025', '2024'],

  /* =======================================================================
   * KARTU 1: OKUPANSI RAK DATA CENTER (Per Tahun)
   * Dataset: Data Rak Data Center (Terbatas, pertahun)
   * ======================================================================= */
  okupansiRak: {
    '2026': [
      {
        ruangan: 'Ruang Server Utama (BIDA Lt. 3)',
        ruanganShort: 'Server Utama BIDA',
        jenisRak: '42U Standard Blade & SAN',
        totalRak: 36,
        jumlahRakTerisi: 33, // 33/36 = 91.7% (>90% -> oranye peringatan)
        jumlahRakKosong: 3,
        persentaseTerisi: 91.7,
      },
      {
        ruangan: 'Ruang Colocation Tenant (BIDA Lt. 3)',
        ruanganShort: 'Colocation Tenant',
        jenisRak: '42U Colocation K/L & BUMN',
        totalRak: 28,
        jumlahRakTerisi: 24, // 24/28 = 85.7% (biru)
        jumlahRakKosong: 4,
        persentaseTerisi: 85.7,
      },
      {
        ruangan: 'Ruang Jaringan & Telco Meet-Me',
        ruanganShort: 'Jaringan & Meet-Me',
        jenisRak: '45U Network Patch & ODF',
        totalRak: 16,
        jumlahRakTerisi: 12, // 12/16 = 75.0% (biru)
        jumlahRakKosong: 4,
        persentaseTerisi: 75.0,
      },
      {
        ruangan: 'Disaster Recovery Center (DRC Sekupang)',
        ruanganShort: 'DRC Sekupang',
        jenisRak: '42U Backup & Standby Rack',
        totalRak: 16,
        jumlahRakTerisi: 9, // 9/16 = 56.3% (biru)
        jumlahRakKosong: 7,
        persentaseTerisi: 56.3,
      },
    ],
    '2025': [
      {
        ruangan: 'Ruang Server Utama (BIDA Lt. 3)',
        ruanganShort: 'Server Utama BIDA',
        jenisRak: '42U Standard Blade & SAN',
        totalRak: 36,
        jumlahRakTerisi: 31,
        jumlahRakKosong: 5,
        persentaseTerisi: 86.1,
      },
      {
        ruangan: 'Ruang Colocation Tenant (BIDA Lt. 3)',
        ruanganShort: 'Colocation Tenant',
        jenisRak: '42U Colocation K/L & BUMN',
        totalRak: 28,
        jumlahRakTerisi: 22,
        jumlahRakKosong: 6,
        persentaseTerisi: 78.6,
      },
      {
        ruangan: 'Ruang Jaringan & Telco Meet-Me',
        ruanganShort: 'Jaringan & Meet-Me',
        jenisRak: '45U Network Patch & ODF',
        totalRak: 16,
        jumlahRakTerisi: 11,
        jumlahRakKosong: 5,
        persentaseTerisi: 68.8,
      },
      {
        ruangan: 'Disaster Recovery Center (DRC Sekupang)',
        ruanganShort: 'DRC Sekupang',
        jenisRak: '42U Backup & Standby Rack',
        totalRak: 16,
        jumlahRakTerisi: 8,
        jumlahRakKosong: 8,
        persentaseTerisi: 50.0,
      },
    ],
    '2024': [
      {
        ruangan: 'Ruang Server Utama (BIDA Lt. 3)',
        ruanganShort: 'Server Utama BIDA',
        jenisRak: '42U Standard Blade & SAN',
        totalRak: 36,
        jumlahRakTerisi: 28,
        jumlahRakKosong: 8,
        persentaseTerisi: 77.8,
      },
      {
        ruangan: 'Ruang Colocation Tenant (BIDA Lt. 3)',
        ruanganShort: 'Colocation Tenant',
        jenisRak: '42U Colocation K/L & BUMN',
        totalRak: 28,
        jumlahRakTerisi: 19,
        jumlahRakKosong: 9,
        persentaseTerisi: 67.9,
      },
      {
        ruangan: 'Ruang Jaringan & Telco Meet-Me',
        ruanganShort: 'Jaringan & Meet-Me',
        jenisRak: '45U Network Patch & ODF',
        totalRak: 16,
        jumlahRakTerisi: 10,
        jumlahRakKosong: 6,
        persentaseTerisi: 62.5,
      },
      {
        ruangan: 'Disaster Recovery Center (DRC Sekupang)',
        ruanganShort: 'DRC Sekupang',
        jenisRak: '42U Backup & Standby Rack',
        totalRak: 16,
        jumlahRakTerisi: 7,
        jumlahRakKosong: 9,
        persentaseTerisi: 43.8,
      },
    ],
  },

  /* =======================================================================
   * KARTU 2: INFRASTRUKTUR SERVER PER BRAND DAN STATUS GARANSI
   * Dataset: Rekap Infrastruktur Server dan Storage (Tertutup, jika update)
   * ======================================================================= */
  serverInfrastruktur: [
    {
      brand: 'Dell PowerEdge',
      garansiAktif: 28,
      garansiHabis: 8,
      total: 36,
      tipePopuler: 'R750xs / R640 Virtualization Host',
      tglGaransiTerdekat: '15 Des 2026',
      eosRerata: 'Q4 2028',
      contohServer: 'SRV-PROD-BIDA-01 s/d 36',
    },
    {
      brand: 'HPE ProLiant',
      garansiAktif: 22,
      garansiHabis: 6,
      total: 28,
      tipePopuler: 'DL380 Gen10 Database Engine',
      tglGaransiTerdekat: '20 Okt 2026',
      eosRerata: 'Q2 2027',
      contohServer: 'SRV-DB-ORACLE-01 s/d 28',
    },
    {
      brand: 'Cisco UCS',
      garansiAktif: 14,
      garansiHabis: 2,
      total: 16,
      tipePopuler: 'B200 M5 Blade Converged',
      tglGaransiTerdekat: '10 Feb 2027',
      eosRerata: 'Q1 2029',
      contohServer: 'UCS-BLADE-SYS-01 s/d 16',
    },
    {
      brand: 'Lenovo ThinkSystem',
      garansiAktif: 10,
      garansiHabis: 2,
      total: 12,
      tipePopuler: 'SR650 Storage Analytics',
      tglGaransiTerdekat: '05 Mei 2027',
      eosRerata: 'Q3 2028',
      contohServer: 'SRV-ANALYTICS-01 s/d 12',
    },
    {
      brand: 'Huawei FusionServer',
      garansiAktif: 7,
      garansiHabis: 1,
      total: 8,
      tipePopuler: '2288H V5 Edge Gateway & DMZ',
      tglGaransiTerdekat: '30 Ags 2026',
      eosRerata: 'Q4 2027',
      contohServer: 'SRV-DMZ-GATEWAY-01 s/d 08',
    },
  ],

  /* =======================================================================
   * KARTU 3: SERANGAN KEAMANAN IT PER BULAN (Stacked Column)
   * Dataset: Data Serangan Keamanan IT (Terbuka, perbulan)
   * ======================================================================= */
  seranganKeamanan: {
    '2026': [
      {
        bulan: 'Jan',
        bulanFull: 'Januari 2026',
        ddosVolumetric: 620,
        webExploit: 380,
        malwareTrojan: 210,
        bruteForce: 420,
        portScanning: 290,
        totalSerangan: 1920,
        statusKeamanan: '100% Termitigasi WAF/SOC CSIRT',
      },
      {
        bulan: 'Feb',
        bulanFull: 'Februari 2026',
        ddosVolumetric: 580,
        webExploit: 410,
        malwareTrojan: 190,
        bruteForce: 390,
        portScanning: 270,
        totalSerangan: 1840,
        statusKeamanan: '100% Termitigasi WAF/SOC CSIRT',
      },
      {
        bulan: 'Mar',
        bulanFull: 'Maret 2026',
        ddosVolumetric: 740,
        webExploit: 490,
        malwareTrojan: 240,
        bruteForce: 480,
        portScanning: 320,
        totalSerangan: 2270,
        statusKeamanan: '100% Termitigasi WAF/SOC CSIRT',
      },
      {
        bulan: 'Apr',
        bulanFull: 'April 2026',
        ddosVolumetric: 810,
        webExploit: 520,
        malwareTrojan: 270,
        bruteForce: 530,
        portScanning: 350,
        totalSerangan: 2480,
        statusKeamanan: '100% Termitigasi WAF/SOC CSIRT',
      },
      {
        bulan: 'Mei',
        bulanFull: 'Mei 2026',
        ddosVolumetric: 690,
        webExploit: 460,
        malwareTrojan: 230,
        bruteForce: 460,
        portScanning: 310,
        totalSerangan: 2150,
        statusKeamanan: '100% Termitigasi WAF/SOC CSIRT',
      },
      {
        bulan: 'Jun',
        bulanFull: 'Juni 2026',
        ddosVolumetric: 720,
        webExploit: 480,
        malwareTrojan: 250,
        bruteForce: 490,
        portScanning: 330,
        totalSerangan: 2270,
        statusKeamanan: '100% Termitigasi WAF/SOC CSIRT',
      },
      {
        bulan: 'Jul',
        bulanFull: 'Juli 2026',
        ddosVolumetric: 650,
        webExploit: 430,
        malwareTrojan: 220,
        bruteForce: 440,
        portScanning: 300,
        totalSerangan: 2040,
        statusKeamanan: '100% Termitigasi WAF/SOC CSIRT',
      },
      {
        bulan: 'Ags',
        bulanFull: 'Agustus 2026',
        ddosVolumetric: 780,
        webExploit: 510,
        malwareTrojan: 260,
        bruteForce: 510,
        portScanning: 340,
        totalSerangan: 2400,
        statusKeamanan: '100% Termitigasi WAF/SOC CSIRT',
      },
    ],
    '2025': [
      {
        bulan: 'Jan',
        bulanFull: 'Januari 2025',
        ddosVolumetric: 510,
        webExploit: 320,
        malwareTrojan: 180,
        bruteForce: 340,
        portScanning: 220,
        totalSerangan: 1570,
        statusKeamanan: '100% Termitigasi',
      },
      {
        bulan: 'Feb',
        bulanFull: 'Februari 2025',
        ddosVolumetric: 480,
        webExploit: 300,
        malwareTrojan: 160,
        bruteForce: 310,
        portScanning: 200,
        totalSerangan: 1450,
        statusKeamanan: '100% Termitigasi',
      },
      {
        bulan: 'Mar',
        bulanFull: 'Maret 2025',
        ddosVolumetric: 590,
        webExploit: 380,
        malwareTrojan: 200,
        bruteForce: 390,
        portScanning: 260,
        totalSerangan: 1820,
        statusKeamanan: '100% Termitigasi',
      },
      {
        bulan: 'Apr',
        bulanFull: 'April 2025',
        ddosVolumetric: 620,
        webExploit: 400,
        malwareTrojan: 220,
        bruteForce: 420,
        portScanning: 280,
        totalSerangan: 1940,
        statusKeamanan: '100% Termitigasi',
      },
    ],
    '2024': [
      {
        bulan: 'Jan',
        bulanFull: 'Januari 2024',
        ddosVolumetric: 420,
        webExploit: 260,
        malwareTrojan: 140,
        bruteForce: 280,
        portScanning: 190,
        totalSerangan: 1290,
        statusKeamanan: '100% Termitigasi',
      },
      {
        bulan: 'Feb',
        bulanFull: 'Februari 2024',
        ddosVolumetric: 390,
        webExploit: 250,
        malwareTrojan: 130,
        bruteForce: 260,
        portScanning: 170,
        totalSerangan: 1200,
        statusKeamanan: '100% Termitigasi',
      },
    ],
  },

  /* =======================================================================
   * KARTU 4: PERMINTAAN LAYANAN IT (HELPDESK)
   * Dataset: Data Permintaan Layanan IT (Helpdesk) (Tertutup, perbulan)
   * ======================================================================= */
  helpdeskLayanan: {
    '2026': [
      {
        namaLayanan: 'Reset Password Akun SSO & Email',
        kategori: 'Identitas & Akses',
        jumlah: 412,
        avgSlaJam: 0.8,
        tingkatPenyelesaian: 99.5,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Troubleshooting Jaringan LAN & VPN',
        kategori: 'Infrastruktur Jaringan',
        jumlah: 326,
        avgSlaJam: 1.4,
        tingkatPenyelesaian: 98.8,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Instalasi & Pembaruan Lisensi Software',
        kategori: 'Perangkat Lunak',
        jumlah: 248,
        avgSlaJam: 2.1,
        tingkatPenyelesaian: 97.6,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Perbaikan Hardware PC / Laptop / Printer',
        kategori: 'Perangkat Keras',
        jumlah: 184,
        avgSlaJam: 3.5,
        tingkatPenyelesaian: 96.2,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Dukungan Video Conference & Rapat Virtual',
        kategori: 'Multimedia & Vicon',
        jumlah: 142,
        avgSlaJam: 0.5,
        tingkatPenyelesaian: 100.0,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Permintaan Subdomain, SSL & Hosting Web',
        kategori: 'Web & Hosting',
        jumlah: 78,
        avgSlaJam: 4.2,
        tingkatPenyelesaian: 96.1,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Restore Data & Hak Akses Cloud Storage',
        kategori: 'Penyimpanan Data',
        jumlah: 38,
        avgSlaJam: 2.8,
        tingkatPenyelesaian: 97.4,
        bulan: 'ALL',
      },
    ],
    '2025': [
      {
        namaLayanan: 'Reset Password Akun SSO & Email',
        kategori: 'Identitas & Akses',
        jumlah: 380,
        avgSlaJam: 1.1,
        tingkatPenyelesaian: 99.0,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Troubleshooting Jaringan LAN & VPN',
        kategori: 'Infrastruktur Jaringan',
        jumlah: 295,
        avgSlaJam: 1.8,
        tingkatPenyelesaian: 98.0,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Instalasi & Pembaruan Lisensi Software',
        kategori: 'Perangkat Lunak',
        jumlah: 220,
        avgSlaJam: 2.5,
        tingkatPenyelesaian: 96.5,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Perbaikan Hardware PC / Laptop / Printer',
        kategori: 'Perangkat Keras',
        jumlah: 165,
        avgSlaJam: 4.0,
        tingkatPenyelesaian: 95.0,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Dukungan Video Conference & Rapat Virtual',
        kategori: 'Multimedia & Vicon',
        jumlah: 130,
        avgSlaJam: 0.6,
        tingkatPenyelesaian: 100.0,
        bulan: 'ALL',
      },
      {
        namaLayanan: 'Permintaan Subdomain, SSL & Hosting Web',
        kategori: 'Web & Hosting',
        jumlah: 65,
        avgSlaJam: 4.8,
        tingkatPenyelesaian: 95.0,
        bulan: 'ALL',
      },
    ],
  },

  /* =======================================================================
   * KARTU 5: PORTOFOLIO APLIKASI PER KATEGORI (Stacked Bar Horizontal)
   * Dataset: Data Aplikasi BP Batam (Tertutup, jika update)
   * ======================================================================= */
  portofolioAplikasi: [
    {
      kategori: 'Layanan Publik & Perizinan Investasi',
      kategoriShort: 'Publik & Investasi',
      aktif: 34,
      dalamPengembangan: 5,
      nonaktif: 2,
      total: 41,
      domain: 'Layanan Publik',
      unitOperasional: 'PTSP & Dit. Investasi',
      klasifikasiAplikasi: 'Strategis Institusi',
      unitPengembang: 'PDSI BP Batam',
      devYear: '2019 - 2026',
    },
    {
      kategori: 'Administrasi & Tata Kelola SPBE',
      kategoriShort: 'Admin & SPBE',
      aktif: 28,
      dalamPengembangan: 4,
      nonaktif: 3,
      total: 35,
      domain: 'Tata Kelola Manajemen',
      unitOperasional: 'Biro Umum, SDM & BOKMR',
      klasifikasiAplikasi: 'Operasional Kantor',
      unitPengembang: 'PDSI BP Batam',
      devYear: '2018 - 2026',
    },
    {
      kategori: 'Keuangan, PNBP & Pengadaan BLU',
      kategoriShort: 'Keuangan & PNBP',
      aktif: 22,
      dalamPengembangan: 3,
      nonaktif: 1,
      total: 26,
      domain: 'Layanan Bisnis/BLU',
      unitOperasional: 'Biro Keuangan & UKPBJ',
      klasifikasiAplikasi: 'Finansial & Akuntabilitas',
      unitPengembang: 'PDSI BP Batam',
      devYear: '2020 - 2026',
    },
    {
      kategori: 'Operasional Sarana, Lahan & Pelabuhan',
      kategoriShort: 'Sarana & Lahan',
      aktif: 19,
      dalamPengembangan: 3,
      nonaktif: 2,
      total: 24,
      domain: 'Layanan Bisnis/BLU',
      unitOperasional: 'Dit. Pertanahan & Pelabuhan',
      klasifikasiAplikasi: 'Spasial & Logistik',
      unitPengembang: 'PDSI BP Batam',
      devYear: '2021 - 2026',
    },
    {
      kategori: 'Kesehatan, Fasilitas Lingkungan & Air',
      kategoriShort: 'Kesehatan & SPAM',
      aktif: 13,
      dalamPengembangan: 2,
      nonaktif: 1,
      total: 16,
      domain: 'Layanan Publik',
      unitOperasional: 'RSBP & BU SPAM',
      klasifikasiAplikasi: 'Pelayanan Dasar',
      unitPengembang: 'PDSI & Vendor',
      devYear: '2022 - 2026',
    },
  ],

  /* =======================================================================
   * KARTU 6: VALIDITAS LISENSI SOFTWARE (Donut Chart)
   * Dataset: Daftar Software BP Batam (Tertutup, jika update)
   * ======================================================================= */
  lisensiSoftware: [
    {
      jenisLisensi: 'Sistem Operasi Server (Windows & RHEL)',
      valid: 72,
      tidakValid: 8,
      total: 80,
      tipeSoftware: 'OS Server Enterprise',
      pemilikLisensi: 'PDSI Data Center',
      contohSoftware: 'Windows Server 2022 Datacenter, Red Hat Enterprise Linux 9',
    },
    {
      jenisLisensi: 'Database Engine (Oracle & MS SQL)',
      valid: 44,
      tidakValid: 6,
      total: 50,
      tipeSoftware: 'Relational DBMS Core-based',
      pemilikLisensi: 'PDSI Subdit Basis Data',
      contohSoftware: 'Oracle Enterprise Database 19c, Microsoft SQL Server Enterprise',
    },
    {
      jenisLisensi: 'Virtualisasi & Hyperconverged (VMware & Nutanix)',
      valid: 58,
      tidakValid: 4,
      total: 62,
      tipeSoftware: 'Hypervisor Infrastructure',
      pemilikLisensi: 'PDSI Cloud Infra',
      contohSoftware: 'VMware vSphere Enterprise Plus, Nutanix Acropolis OS',
    },
    {
      jenisLisensi: 'Cybersecurity & Endpoint Protection',
      valid: 68,
      tidakValid: 6,
      total: 74,
      tipeSoftware: 'EDR, WAF & Antivirus',
      pemilikLisensi: 'PDSI SOC CSIRT',
      contohSoftware: 'Fortinet FortiGate UTM, Trend Micro Apex One, CrowdStrike Falcon',
    },
    {
      jenisLisensi: 'Productivity & Office Suites (M365)',
      valid: 36,
      tidakValid: 16,
      total: 52,
      tipeSoftware: 'Perkantoran Digital',
      pemilikLisensi: 'Seluruh Satker BP Batam',
      contohSoftware: 'Microsoft 365 E3/E5, Adobe Acrobat Pro DC',
    },
  ],

  /* =======================================================================
   * KARTU 7: KATALOG DATA PER PRODUSEN DATA (Stacked Bar Horizontal)
   * Dataset: Daftar Data BP Batam (Terbatas, jika update)
   * ======================================================================= */
  katalogData: {
    '2026': [
      {
        produsenData: 'Biro Keuangan',
        produsenShort: 'Biro Keuangan',
        terbuka: 28,
        terbatas: 46,
        tertutup: 18,
        total: 92,
        kategoriData: 'Keuangan & PNBP',
        jenisData: 'Keuangan',
        pemutakhiranData: 'Bulanan / Triwulanan',
      },
      {
        produsenData: 'Dit. Pengelolaan Lahan & Pesisir',
        produsenShort: 'Pengelolaan Lahan',
        terbuka: 22,
        terbatas: 44,
        tertutup: 14,
        total: 80,
        kategoriData: 'Alokasi & Spasial Lahan',
        jenisData: 'Spasial',
        pemutakhiranData: 'Berkala / Realtime',
      },
      {
        produsenData: 'Dit. Pengelolaan Kepelabuhanan',
        produsenShort: 'Kepelabuhanan',
        terbuka: 26,
        terbatas: 34,
        tertutup: 12,
        total: 72,
        kategoriData: 'Logistik & Arus Kapal',
        jenisData: 'Operasional',
        pemutakhiranData: 'Harian / Bulanan',
      },
      {
        produsenData: 'Pusat PTSP BP Batam',
        produsenShort: 'Pusat PTSP',
        terbuka: 30,
        terbatas: 24,
        tertutup: 10,
        total: 64,
        kategoriData: 'Perizinan Berusaha (OSS)',
        jenisData: 'Statistik',
        pemutakhiranData: 'Mingguan',
      },
      {
        produsenData: 'Dit. Kawasan Bandara Hang Nadim',
        produsenShort: 'Kawasan Bandara',
        terbuka: 18,
        terbatas: 26,
        tertutup: 8,
        total: 52,
        kategoriData: 'Penerbangan & Kargo Udara',
        jenisData: 'Operasional',
        pemutakhiranData: 'Harian / Bulanan',
      },
      {
        produsenData: 'Dit. Pembangunan Infrastruktur',
        produsenShort: 'Infrastruktur',
        terbuka: 16,
        terbatas: 24,
        tertutup: 8,
        total: 48,
        kategoriData: 'Progres Proyek & Jaringan Jalan',
        jenisData: 'Spasial',
        pemutakhiranData: 'Bulanan',
      },
      {
        produsenData: 'Pusat Data dan Sistem Informasi (PDSI)',
        produsenShort: 'PDSI (Satu Data)',
        terbuka: 24,
        terbatas: 16,
        tertutup: 4,
        total: 44,
        kategoriData: 'TIK, Server, Jaringan & SPBE',
        jenisData: 'Statistik',
        pemutakhiranData: 'Berkala',
      },
    ],
    '2025': [
      {
        produsenData: 'Biro Keuangan',
        produsenShort: 'Biro Keuangan',
        terbuka: 24,
        terbatas: 40,
        tertutup: 16,
        total: 80,
        kategoriData: 'Keuangan & PNBP',
        jenisData: 'Keuangan',
        pemutakhiranData: 'Bulanan',
      },
      {
        produsenData: 'Dit. Pengelolaan Lahan & Pesisir',
        produsenShort: 'Pengelolaan Lahan',
        terbuka: 18,
        terbatas: 38,
        tertutup: 14,
        total: 70,
        kategoriData: 'Alokasi & Spasial Lahan',
        jenisData: 'Spasial',
        pemutakhiranData: 'Berkala',
      },
      {
        produsenData: 'Dit. Pengelolaan Kepelabuhanan',
        produsenShort: 'Kepelabuhanan',
        terbuka: 22,
        terbatas: 30,
        tertutup: 10,
        total: 62,
        kategoriData: 'Logistik & Arus Kapal',
        jenisData: 'Operasional',
        pemutakhiranData: 'Harian',
      },
      {
        produsenData: 'Pusat PTSP BP Batam',
        produsenShort: 'Pusat PTSP',
        terbuka: 26,
        terbatas: 22,
        tertutup: 8,
        total: 56,
        kategoriData: 'Perizinan Berusaha',
        jenisData: 'Statistik',
        pemutakhiranData: 'Mingguan',
      },
    ],
  },

  /* =======================================================================
   * KARTU 8: KEPUASAN PELANGGAN DATA CENTRE (Stacked Bar 100%)
   * Dataset: Data Kepuasan Pelanggan Data Centre (Terbuka, pertahun)
   * ======================================================================= */
  kepuasanPelangganDc: {
    '2026': [
      {
        kategori: 'Keandalan Pasokan Daya Listrik & Redundansi UPS',
        kategoriShort: 'Daya Listrik & UPS',
        puas: 96.5,
        netral: 2.5,
        tidakPuas: 1.0,
        skor: 4.88,
      },
      {
        kategori: 'Stabilitas Pendingin Presisi & Pengendalian Suhu HVAC',
        kategoriShort: 'Pendingin & Suhu HVAC',
        puas: 94.8,
        netral: 4.0,
        tidakPuas: 1.2,
        skor: 4.79,
      },
      {
        kategori: 'Keamanan Fisik, Akses Biometrik & CCTV Ruangan',
        kategoriShort: 'Keamanan & Biometrik',
        puas: 95.2,
        netral: 3.8,
        tidakPuas: 1.0,
        skor: 4.82,
      },
      {
        kategori: 'Kecepatan Bandwidth & Redundansi Backbone Fiber Optik',
        kategoriShort: 'Konektivitas Network',
        puas: 92.4,
        netral: 5.6,
        tidakPuas: 2.0,
        skor: 4.68,
      },
      {
        kategori: 'Responsivitas, Kecepatan Penanganan & SLA Helpdesk 24/7',
        kategoriShort: 'Helpdesk SLA 24/7',
        puas: 90.2,
        netral: 6.8,
        tidakPuas: 3.0,
        skor: 4.58,
      },
    ],
    '2025': [
      {
        kategori: 'Keandalan Pasokan Daya Listrik & Redundansi UPS',
        kategoriShort: 'Daya Listrik & UPS',
        puas: 94.2,
        netral: 4.3,
        tidakPuas: 1.5,
        skor: 4.76,
      },
      {
        kategori: 'Stabilitas Pendingin Presisi & Pengendalian Suhu HVAC',
        kategoriShort: 'Pendingin & Suhu HVAC',
        puas: 92.5,
        netral: 5.5,
        tidakPuas: 2.0,
        skor: 4.65,
      },
      {
        kategori: 'Keamanan Fisik, Akses Biometrik & CCTV Ruangan',
        kategoriShort: 'Keamanan & Biometrik',
        puas: 93.8,
        netral: 4.8,
        tidakPuas: 1.4,
        skor: 4.72,
      },
      {
        kategori: 'Kecepatan Bandwidth & Redundansi Backbone Fiber Optik',
        kategoriShort: 'Konektivitas Network',
        puas: 89.6,
        netral: 7.4,
        tidakPuas: 3.0,
        skor: 4.52,
      },
      {
        kategori: 'Responsivitas, Kecepatan Penanganan & SLA Helpdesk 24/7',
        kategoriShort: 'Helpdesk SLA 24/7',
        puas: 87.5,
        netral: 8.5,
        tidakPuas: 4.0,
        skor: 4.41,
      },
    ],
  },
};
