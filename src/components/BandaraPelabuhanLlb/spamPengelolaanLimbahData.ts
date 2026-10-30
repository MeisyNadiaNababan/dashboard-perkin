// Data Terpadu Badan Usaha Sistem Pengelolaan Air Minum dan Pengelolaan Limbah BP Batam
// Disimpan dalam satu objek JSON agar mudah diganti dengan data asli

export const SPAM_LIMBAH_DATA = {
  // =========================================================================
  // A. PRODUKSI DAN AIR BAKU
  // =========================================================================
  // 1. Kapasitas produksi per instalasi pengolahan air (Terbuka, perbulan)
  kapasitasProduksiPerWtp: [
    { bulan: 'Jan', Duriangkang: 3000, Mukakuning: 600, SeiLadi: 380, SeiHarapan: 210, Nongsa: 60, Piayu: 200 },
    { bulan: 'Feb', Duriangkang: 3000, Mukakuning: 600, SeiLadi: 380, SeiHarapan: 210, Nongsa: 60, Piayu: 200 },
    { bulan: 'Mar', Duriangkang: 3050, Mukakuning: 610, SeiLadi: 385, SeiHarapan: 210, Nongsa: 65, Piayu: 205 },
    { bulan: 'Apr', Duriangkang: 3080, Mukakuning: 620, SeiLadi: 390, SeiHarapan: 215, Nongsa: 65, Piayu: 210 },
    { bulan: 'Mei', Duriangkang: 3100, Mukakuning: 620, SeiLadi: 390, SeiHarapan: 215, Nongsa: 70, Piayu: 210 },
    { bulan: 'Jun', Duriangkang: 3100, Mukakuning: 625, SeiLadi: 395, SeiHarapan: 220, Nongsa: 70, Piayu: 215 },
    { bulan: 'Jul', Duriangkang: 3120, Mukakuning: 630, SeiLadi: 395, SeiHarapan: 220, Nongsa: 75, Piayu: 215 },
    { bulan: 'Agu', Duriangkang: 3120, Mukakuning: 630, SeiLadi: 400, SeiHarapan: 220, Nongsa: 75, Piayu: 220 },
    { bulan: 'Sep', Duriangkang: 3150, Mukakuning: 635, SeiLadi: 400, SeiHarapan: 225, Nongsa: 80, Piayu: 220 },
    { bulan: 'Okt', Duriangkang: 3150, Mukakuning: 635, SeiLadi: 405, SeiHarapan: 225, Nongsa: 80, Piayu: 225 },
    { bulan: 'Nov', Duriangkang: 3180, Mukakuning: 640, SeiLadi: 405, SeiHarapan: 230, Nongsa: 85, Piayu: 225 },
    { bulan: 'Des', Duriangkang: 3200, Mukakuning: 650, SeiLadi: 410, SeiHarapan: 230, Nongsa: 85, Piayu: 230 },
  ],

  // 2. Pemakaian air baku per WTP per semester (Tertutup, persemester)
  pemakaianAirBakuSemester: [
    { semester: '2024-S1', Duriangkang: 46800000, Mukakuning: 9360000, SeiLadi: 5928000, SeiHarapan: 3276000, Nongsa: 936000, Piayu: 3120000 },
    { semester: '2024-S2', Duriangkang: 47520000, Mukakuning: 9504000, SeiLadi: 6019200, SeiHarapan: 3326400, Nongsa: 950400, Piayu: 3168000 },
    { semester: '2025-S1', Duriangkang: 48240000, Mukakuning: 9648000, SeiLadi: 6110400, SeiHarapan: 3376800, Nongsa: 964800, Piayu: 3216000 },
    { semester: '2025-S2', Duriangkang: 48960000, Mukakuning: 9792000, SeiLadi: 6201600, SeiHarapan: 3427200, Nongsa: 979200, Piayu: 3264000 },
    { semester: '2026-S1', Duriangkang: 49680000, Mukakuning: 9936000, SeiLadi: 6292800, SeiHarapan: 3477600, Nongsa: 993600, Piayu: 3312000 },
  ],

  // 3. Volume air baku vs air curah per bulan (Tertutup, perbulan)
  volumeBakuVsCurah: [
    { bulan: 'Jan', volumeAirBaku: 11840000, volumeAirCurah: 10420000 },
    { bulan: 'Feb', volumeAirBaku: 11120000, volumeAirCurah: 9840000 },
    { bulan: 'Mar', volumeAirBaku: 12150000, volumeAirCurah: 10750000 },
    { bulan: 'Apr', volumeAirBaku: 11980000, volumeAirCurah: 10580000 },
    { bulan: 'Mei', volumeAirBaku: 12350000, volumeAirCurah: 10920000 },
    { bulan: 'Jun', volumeAirBaku: 12050000, volumeAirCurah: 10660000 },
    { bulan: 'Jul', volumeAirBaku: 12500000, volumeAirCurah: 11050000 },
    { bulan: 'Agu', volumeAirBaku: 12280000, volumeAirCurah: 10860000 },
    { bulan: 'Sep', volumeAirBaku: 12120000, volumeAirCurah: 10710000 },
    { bulan: 'Okt', volumeAirBaku: 12450000, volumeAirCurah: 11010000 },
    { bulan: 'Nov', volumeAirBaku: 12200000, volumeAirCurah: 10790000 },
    { bulan: 'Des', volumeAirBaku: 12680000, volumeAirCurah: 11210000 },
  ],

  // 4. Kapasitas tampung dan luas permukaan waduk (Terbuka, jika update)
  kapasitasDanLuasWaduk: [
    { tahun: '2021', kapasitasTampungJutaM3: 101.2, luasPermukaanHa: 3850 },
    { tahun: '2022', kapasitasTampungJutaM3: 103.5, luasPermukaanHa: 3910 },
    { tahun: '2023', kapasitasTampungJutaM3: 104.8, luasPermukaanHa: 3940 },
    { tahun: '2024', kapasitasTampungJutaM3: 106.1, luasPermukaanHa: 3980 },
    { tahun: '2025', kapasitasTampungJutaM3: 108.4, luasPermukaanHa: 4020 },
    { tahun: '2026', kapasitasTampungJutaM3: 109.8, luasPermukaanHa: 4050 },
  ],

  // 5. Penyediaan air baku ke industri Batamindo (Terbuka, perbulan)
  airBakuBatamindo: [
    { bulan: 'Jan', jumlahM3: 312500 },
    { bulan: 'Feb', jumlahM3: 298400 },
    { bulan: 'Mar', jumlahM3: 325600 },
    { bulan: 'Apr', jumlahM3: 319200 },
    { bulan: 'Mei', jumlahM3: 334100 },
    { bulan: 'Jun', jumlahM3: 328700 },
    { bulan: 'Jul', jumlahM3: 341200 },
    { bulan: 'Agu', jumlahM3: 338900 },
    { bulan: 'Sep', jumlahM3: 331400 },
    { bulan: 'Okt', jumlahM3: 345000 },
    { bulan: 'Nov', jumlahM3: 339800 },
    { bulan: 'Des', jumlahM3: 352100 },
  ],

  // 6. Penggunaan bahan kimia pengolahan air (Tertutup, perbulan)
  bahanKimiaPerWtp: {
    Semua: [
      { bulan: 'Jan', pacKg: 42500, klorinKg: 18200, sodaAshKg: 14300, polimerKg: 2800 },
      { bulan: 'Feb', pacKg: 39800, klorinKg: 17100, sodaAshKg: 13500, polimerKg: 2650 },
      { bulan: 'Mar', pacKg: 44100, klorinKg: 18900, sodaAshKg: 14800, polimerKg: 2950 },
      { bulan: 'Apr', pacKg: 43200, klorinKg: 18500, sodaAshKg: 14500, polimerKg: 2890 },
      { bulan: 'Mei', pacKg: 45600, klorinKg: 19400, sodaAshKg: 15300, polimerKg: 3050 },
      { bulan: 'Jun', pacKg: 44800, klorinKg: 19100, sodaAshKg: 15000, polimerKg: 2980 },
      { bulan: 'Jul', pacKg: 46200, klorinKg: 19700, sodaAshKg: 15500, polimerKg: 3100 },
      { bulan: 'Agu', pacKg: 45300, klorinKg: 19300, sodaAshKg: 15200, polimerKg: 3020 },
      { bulan: 'Sep', pacKg: 44600, klorinKg: 19000, sodaAshKg: 14900, polimerKg: 2960 },
      { bulan: 'Okt', pacKg: 46800, klorinKg: 19900, sodaAshKg: 15700, polimerKg: 3120 },
      { bulan: 'Nov', pacKg: 45900, klorinKg: 19500, sodaAshKg: 15400, polimerKg: 3060 },
      { bulan: 'Des', pacKg: 47500, klorinKg: 20200, sodaAshKg: 15900, polimerKg: 3180 },
    ],
    'WTP Duriangkang': [
      { bulan: 'Jan', pacKg: 25500, klorinKg: 10900, sodaAshKg: 8500, polimerKg: 1680 },
      { bulan: 'Feb', pacKg: 23800, klorinKg: 10200, sodaAshKg: 8100, polimerKg: 1590 },
      { bulan: 'Mar', pacKg: 26400, klorinKg: 11300, sodaAshKg: 8800, polimerKg: 1770 },
      { bulan: 'Apr', pacKg: 25900, klorinKg: 11100, sodaAshKg: 8700, polimerKg: 1730 },
      { bulan: 'Mei', pacKg: 27300, klorinKg: 11600, sodaAshKg: 9100, polimerKg: 1830 },
      { bulan: 'Jun', pacKg: 26800, klorinKg: 11400, sodaAshKg: 9000, polimerKg: 1780 },
      { bulan: 'Jul', pacKg: 27700, klorinKg: 11800, sodaAshKg: 9300, polimerKg: 1860 },
      { bulan: 'Agu', pacKg: 27100, klorinKg: 11500, sodaAshKg: 9100, polimerKg: 1810 },
      { bulan: 'Sep', pacKg: 26700, klorinKg: 11400, sodaAshKg: 8900, polimerKg: 1770 },
      { bulan: 'Okt', pacKg: 28000, klorinKg: 11900, sodaAshKg: 9400, polimerKg: 1870 },
      { bulan: 'Nov', pacKg: 27500, klorinKg: 11700, sodaAshKg: 9200, polimerKg: 1830 },
      { bulan: 'Des', pacKg: 28500, klorinKg: 12100, sodaAshKg: 9500, polimerKg: 1900 },
    ],
    'WTP Mukakuning': [
      { bulan: 'Jan', pacKg: 8500, klorinKg: 3600, sodaAshKg: 2800, polimerKg: 560 },
      { bulan: 'Feb', pacKg: 7900, klorinKg: 3400, sodaAshKg: 2700, polimerKg: 530 },
      { bulan: 'Mar', pacKg: 8800, klorinKg: 3700, sodaAshKg: 2900, polimerKg: 590 },
      { bulan: 'Apr', pacKg: 8600, klorinKg: 3700, sodaAshKg: 2900, polimerKg: 570 },
      { bulan: 'Mei', pacKg: 9100, klorinKg: 3800, sodaAshKg: 3000, polimerKg: 610 },
      { bulan: 'Jun', pacKg: 8900, klorinKg: 3800, sodaAshKg: 3000, polimerKg: 590 },
      { bulan: 'Jul', pacKg: 9200, klorinKg: 3900, sodaAshKg: 3100, polimerKg: 620 },
      { bulan: 'Agu', pacKg: 9000, klorinKg: 3800, sodaAshKg: 3000, polimerKg: 600 },
      { bulan: 'Sep', pacKg: 8900, klorinKg: 3800, sodaAshKg: 2900, polimerKg: 590 },
      { bulan: 'Okt', pacKg: 9300, klorinKg: 3900, sodaAshKg: 3100, polimerKg: 620 },
      { bulan: 'Nov', pacKg: 9100, klorinKg: 3900, sodaAshKg: 3000, polimerKg: 610 },
      { bulan: 'Des', pacKg: 9500, klorinKg: 4000, sodaAshKg: 3100, polimerKg: 630 },
    ],
    'WTP Sei Ladi': [
      { bulan: 'Jan', pacKg: 5100, klorinKg: 2180, sodaAshKg: 1710, polimerKg: 336 },
      { bulan: 'Feb', pacKg: 4770, klorinKg: 2050, sodaAshKg: 1620, polimerKg: 318 },
      { bulan: 'Mar', pacKg: 5290, klorinKg: 2260, sodaAshKg: 1770, polimerKg: 354 },
      { bulan: 'Apr', pacKg: 5180, klorinKg: 2220, sodaAshKg: 1740, polimerKg: 346 },
      { bulan: 'Mei', pacKg: 5470, klorinKg: 2320, sodaAshKg: 1830, polimerKg: 366 },
      { bulan: 'Jun', pacKg: 5370, klorinKg: 2290, sodaAshKg: 1800, polimerKg: 357 },
      { bulan: 'Jul', pacKg: 5540, klorinKg: 2360, sodaAshKg: 1860, polimerKg: 372 },
      { bulan: 'Agu', pacKg: 5430, klorinKg: 2310, sodaAshKg: 1820, polimerKg: 362 },
      { bulan: 'Sep', pacKg: 5350, klorinKg: 2280, sodaAshKg: 1780, polimerKg: 355 },
      { bulan: 'Okt', pacKg: 5610, klorinKg: 2380, sodaAshKg: 1880, polimerKg: 374 },
      { bulan: 'Nov', pacKg: 5500, klorinKg: 2340, sodaAshKg: 1840, polimerKg: 367 },
      { bulan: 'Des', pacKg: 5700, klorinKg: 2420, sodaAshKg: 1900, polimerKg: 381 },
    ],
  },

  // =========================================================================
  // B. DISTRIBUSI DAN PELANGGAN
  // =========================================================================
  // 7. Volume air baca vs volume tagih (Tertutup, perbulan)
  volumeBacaVsTagihPerKpp: {
    Semua: [
      { bulan: 'Jan', volumeBaca: 10420000, volumeTagih: 8650000, selisih: 1770000 },
      { bulan: 'Feb', volumeBaca: 9840000, volumeTagih: 8180000, selisih: 1660000 },
      { bulan: 'Mar', volumeBaca: 10750000, volumeTagih: 8940000, selisih: 1810000 },
      { bulan: 'Apr', volumeBaca: 10580000, volumeTagih: 8810000, selisih: 1770000 },
      { bulan: 'Mei', volumeBaca: 10920000, volumeTagih: 9120000, selisih: 1800000 },
      { bulan: 'Jun', volumeBaca: 10660000, volumeTagih: 8920000, selisih: 1740000 },
      { bulan: 'Jul', volumeBaca: 11050000, volumeTagih: 9280000, selisih: 1770000 },
      { bulan: 'Agu', volumeBaca: 10860000, volumeTagih: 9140000, selisih: 1720000 },
      { bulan: 'Sep', volumeBaca: 10710000, volumeTagih: 9020000, selisih: 1690000 },
      { bulan: 'Okt', volumeBaca: 11010000, volumeTagih: 9310000, selisih: 1700000 },
      { bulan: 'Nov', volumeBaca: 10790000, volumeTagih: 9150000, selisih: 1640000 },
      { bulan: 'Des', volumeBaca: 11210000, volumeTagih: 9550000, selisih: 1660000 },
    ],
    'KPP Batam Center': [
      { bulan: 'Jan', volumeBaca: 3950000, volumeTagih: 3340000, selisih: 610000 },
      { bulan: 'Feb', volumeBaca: 3730000, volumeTagih: 3160000, selisih: 570000 },
      { bulan: 'Mar', volumeBaca: 4080000, volumeTagih: 3460000, selisih: 620000 },
      { bulan: 'Apr', volumeBaca: 4020000, volumeTagih: 3410000, selisih: 610000 },
      { bulan: 'Mei', volumeBaca: 4150000, volumeTagih: 3530000, selisih: 620000 },
      { bulan: 'Jun', volumeBaca: 4050000, volumeTagih: 3460000, selisih: 590000 },
      { bulan: 'Jul', volumeBaca: 4200000, volumeTagih: 3600000, selisih: 600000 },
      { bulan: 'Agu', volumeBaca: 4130000, volumeTagih: 3550000, selisih: 580000 },
      { bulan: 'Sep', volumeBaca: 4070000, volumeTagih: 3500000, selisih: 570000 },
      { bulan: 'Okt', volumeBaca: 4180000, volumeTagih: 3610000, selisih: 570000 },
      { bulan: 'Nov', volumeBaca: 4100000, volumeTagih: 3550000, selisih: 550000 },
      { bulan: 'Des', volumeBaca: 4260000, volumeTagih: 3710000, selisih: 550000 },
    ],
    'KPP Batu Aji': [
      { bulan: 'Jan', volumeBaca: 3230000, volumeTagih: 2640000, selisih: 590000 },
      { bulan: 'Feb', volumeBaca: 3050000, volumeTagih: 2490000, selisih: 560000 },
      { bulan: 'Mar', volumeBaca: 3330000, volumeTagih: 2720000, selisih: 610000 },
      { bulan: 'Apr', volumeBaca: 3280000, volumeTagih: 2690000, selisih: 590000 },
      { bulan: 'Mei', volumeBaca: 3390000, volumeTagih: 2780000, selisih: 610000 },
      { bulan: 'Jun', volumeBaca: 3310000, volumeTagih: 2720000, selisih: 590000 },
      { bulan: 'Jul', volumeBaca: 3430000, volumeTagih: 2830000, selisih: 600000 },
      { bulan: 'Agu', volumeBaca: 3370000, volumeTagih: 2790000, selisih: 580000 },
      { bulan: 'Sep', volumeBaca: 3320000, volumeTagih: 2750000, selisih: 570000 },
      { bulan: 'Okt', volumeBaca: 3410000, volumeTagih: 2840000, selisih: 570000 },
      { bulan: 'Nov', volumeBaca: 3350000, volumeTagih: 2790000, selisih: 560000 },
      { bulan: 'Des', volumeBaca: 3480000, volumeTagih: 2920000, selisih: 560000 },
    ],
    'KPP Tiban': [
      { bulan: 'Jan', volumeBaca: 1820000, volumeTagih: 1540000, selisih: 280000 },
      { bulan: 'Feb', volumeBaca: 1720000, volumeTagih: 1460000, selisih: 260000 },
      { bulan: 'Mar', volumeBaca: 1880000, volumeTagih: 1600000, selisih: 280000 },
      { bulan: 'Apr', volumeBaca: 1850000, volumeTagih: 1570000, selisih: 280000 },
      { bulan: 'Mei', volumeBaca: 1910000, volumeTagih: 1630000, selisih: 280000 },
      { bulan: 'Jun', volumeBaca: 1860000, volumeTagih: 1590000, selisih: 270000 },
      { bulan: 'Jul', volumeBaca: 1930000, volumeTagih: 1660000, selisih: 270000 },
      { bulan: 'Agu', volumeBaca: 1890000, volumeTagih: 1630000, selisih: 260000 },
      { bulan: 'Sep', volumeBaca: 1870000, volumeTagih: 1610000, selisih: 260000 },
      { bulan: 'Okt', volumeBaca: 1920000, volumeTagih: 1660000, selisih: 260000 },
      { bulan: 'Nov', volumeBaca: 1880000, volumeTagih: 1630000, selisih: 250000 },
      { bulan: 'Des', volumeBaca: 1950000, volumeTagih: 1700000, selisih: 250000 },
    ],
  },

  // 8. Non Revenue Water (NRW) per triwulan (Terbuka, pertriwulan)
  nrwPerTriwulan: [
    { triwulan: '2024-Q1', nrwPersen: 17.1, targetNrw: 16.5, volumeHilangM3: 5320000 },
    { triwulan: '2024-Q2', nrwPersen: 16.8, targetNrw: 16.3, volumeHilangM3: 5210000 },
    { triwulan: '2024-Q3', nrwPersen: 16.4, targetNrw: 16.0, volumeHilangM3: 5120000 },
    { triwulan: '2024-Q4', nrwPersen: 16.0, targetNrw: 15.8, volumeHilangM3: 4980000 },
    { triwulan: '2025-Q1', nrwPersen: 15.7, targetNrw: 15.5, volumeHilangM3: 4890000 },
    { triwulan: '2025-Q2', nrwPersen: 15.4, targetNrw: 15.3, volumeHilangM3: 4780000 },
    { triwulan: '2025-Q3', nrwPersen: 15.1, targetNrw: 15.0, volumeHilangM3: 4690000 },
    { triwulan: '2025-Q4', nrwPersen: 14.8, targetNrw: 14.8, volumeHilangM3: 4570000 },
    { triwulan: '2026-Q1', nrwPersen: 14.5, targetNrw: 14.5, volumeHilangM3: 4480000 },
  ],

  // 9. Jumlah pelanggan per DMZ (23 DMZ, diurutkan terbesar) (Terbuka, persemester)
  pelangganPerDmz: [
    { dmz: 'DMZ-04 Sagulung Baru', pelanggan: 28450, wilayah: 'Sagulung' },
    { dmz: 'DMZ-03 Batu Aji Indah', pelanggan: 26800, wilayah: 'Batu Aji' },
    { dmz: 'DMZ-01 Batam Center Kota', pelanggan: 24650, wilayah: 'Batam Center' },
    { dmz: 'DMZ-07 Bengkong Laut', pelanggan: 22100, wilayah: 'Bengkong' },
    { dmz: 'DMZ-02 Tiban Raya', pelanggan: 21400, wilayah: 'Sekupang' },
    { dmz: 'DMZ-05 Sei Panas Sentral', pelanggan: 19850, wilayah: 'Batam Center' },
    { dmz: 'DMZ-06 Nagoya Jodoh', pelanggan: 18320, wilayah: 'Lubuk Baja' },
    { dmz: 'DMZ-08 Baloi Permai', pelanggan: 17240, wilayah: 'Batam Center' },
    { dmz: 'DMZ-09 Tanjung Piayu', pelanggan: 16800, wilayah: 'Sei Beduk' },
    { dmz: 'DMZ-10 Mukakuning Industri', pelanggan: 15420, wilayah: 'Sei Beduk' },
    { dmz: 'DMZ-11 Batu Ampar Port', pelanggan: 14950, wilayah: 'Batu Ampar' },
    { dmz: 'DMZ-12 Marina City', pelanggan: 13780, wilayah: 'Sekupang' },
    { dmz: 'DMZ-13 Nongsa Pantai', pelanggan: 12640, wilayah: 'Nongsa' },
    { dmz: 'DMZ-14 Kabil Terpadu', pelanggan: 11950, wilayah: 'Nongsa' },
    { dmz: 'DMZ-15 Tanjung Uncang Galangan', pelanggan: 11200, wilayah: 'Batu Aji' },
    { dmz: 'DMZ-16 Sei Harapan Lama', pelanggan: 10450, wilayah: 'Sekupang' },
    { dmz: 'DMZ-17 Batamindo Estate', pelanggan: 9800, wilayah: 'Mukakuning' },
    { dmz: 'DMZ-18 Punggur Ferry Terminal', pelanggan: 8950, wilayah: 'Nongsa' },
    { dmz: 'DMZ-19 Duriangkang Sub-Zone', pelanggan: 8200, wilayah: 'Sei Beduk' },
    { dmz: 'DMZ-20 Tembesi Raya', pelanggan: 7650, wilayah: 'Sagulung' },
    { dmz: 'DMZ-21 Seraya Hills', pelanggan: 6920, wilayah: 'Batu Ampar' },
    { dmz: 'DMZ-22 Rempang Gateway', pelanggan: 4850, wilayah: 'Galang' },
    { dmz: 'DMZ-23 Galang Relokasi', pelanggan: 3620, wilayah: 'Galang' },
  ],

  // 10. Volume air baca per DMZ per bulan (Heatmap matrix) (Terbuka, perbulan)
  heatmapDmzBulan: [
    { dmz: 'DMZ-04 Sagulung', Jan: 895, Feb: 840, Mar: 920, Apr: 905, Mei: 935, Jun: 915, Jul: 950, Agu: 930, Sep: 918, Okt: 942, Nov: 925, Des: 960 },
    { dmz: 'DMZ-03 Batu Aji', Jan: 840, Feb: 790, Mar: 865, Apr: 850, Mei: 880, Jun: 860, Jul: 890, Agu: 875, Sep: 862, Okt: 885, Nov: 870, Des: 905 },
    { dmz: 'DMZ-01 Batam Center', Jan: 820, Feb: 775, Mar: 850, Apr: 835, Mei: 865, Jun: 845, Jul: 875, Agu: 860, Sep: 848, Okt: 870, Nov: 855, Des: 890 },
    { dmz: 'DMZ-07 Bengkong', Jan: 710, Feb: 670, Mar: 735, Apr: 720, Mei: 745, Jun: 730, Jul: 755, Agu: 742, Sep: 732, Okt: 750, Nov: 738, Des: 770 },
    { dmz: 'DMZ-02 Tiban Raya', Jan: 685, Feb: 645, Mar: 710, Apr: 695, Mei: 720, Jun: 705, Jul: 730, Agu: 718, Sep: 708, Okt: 725, Nov: 712, Des: 745 },
    { dmz: 'DMZ-05 Sei Panas', Jan: 640, Feb: 605, Mar: 665, Apr: 650, Mei: 675, Jun: 660, Jul: 685, Agu: 672, Sep: 662, Okt: 680, Nov: 668, Des: 700 },
    { dmz: 'DMZ-06 Nagoya', Jan: 620, Feb: 585, Mar: 645, Apr: 630, Mei: 655, Jun: 640, Jul: 665, Agu: 652, Sep: 642, Okt: 660, Nov: 648, Des: 680 },
    { dmz: 'DMZ-10 Mukakuning', Jan: 580, Feb: 550, Mar: 605, Apr: 590, Mei: 615, Jun: 600, Jul: 625, Agu: 612, Sep: 602, Okt: 620, Nov: 608, Des: 640 },
    { dmz: 'DMZ-11 Batu Ampar', Jan: 540, Feb: 510, Mar: 565, Apr: 550, Mei: 575, Jun: 560, Jul: 585, Agu: 572, Sep: 562, Okt: 580, Nov: 568, Des: 600 },
    { dmz: 'DMZ-13 Nongsa', Jan: 430, Feb: 405, Mar: 450, Apr: 440, Mei: 460, Jun: 448, Jul: 470, Agu: 458, Sep: 450, Okt: 465, Nov: 455, Des: 480 },
  ],

  // 11. Komposisi volume menurut kategori pelanggan (Tertutup)
  komposisiPelangganVolume: [
    { kategori: 'Rumah Tangga (Domestik)', volumeTagihM3: 56250000, persentase: 51.5, color: '#1E40AF' },
    { kategori: 'Niaga & Industri', volumeTagihM3: 31200000, persentase: 28.6, color: '#3B82F6' },
    { kategori: 'Instansi Pemerintah & TNI/Polri', volumeTagihM3: 11450000, persentase: 10.5, color: '#60A5FA' },
    { kategori: 'Sosial & Keagamaan', volumeTagihM3: 6200000, persentase: 5.7, color: '#93C5FD' },
    { kategori: 'Khusus & Pelabuhan/Bandara', volumeTagihM3: 4050000, persentase: 3.7, color: '#BFDBFE' },
  ],

  // =========================================================================
  // C. KEPUASAN LAYANAN
  // =========================================================================
  // 12. Persepsi pengguna jasa per pertanyaan (100% stacked bar) (Tertutup, perbulan)
  persepsiPenggunaJasa: {
    'Semester 1 2026': [
      { pertanyaan: 'Kemudahan Pendaftaran Sambungan Baru', sangatPuas: 48, puas: 38, cukupPuas: 10, tidakPuas: 3, sangatTidakPuas: 1 },
      { pertanyaan: 'Kecepatan Respons Penanganan Keluhan', sangatPuas: 42, puas: 41, cukupPuas: 12, tidakPuas: 4, sangatTidakPuas: 1 },
      { pertanyaan: 'Kualitas Kekeruhan & Kejernihan Air', sangatPuas: 51, puas: 37, cukupPuas: 8, tidakPuas: 3, sangatTidakPuas: 1 },
      { pertanyaan: 'Kontinuitas Aliran Air 24 Jam', sangatPuas: 39, puas: 44, cukupPuas: 11, tidakPuas: 5, sangatTidakPuas: 1 },
      { pertanyaan: 'Akurasi Pencatatan Meter Air', sangatPuas: 54, puas: 36, cukupPuas: 7, tidakPuas: 2, sangatTidakPuas: 1 },
      { pertanyaan: 'Kemudahan Pembayaran Rekening Digital', sangatPuas: 62, puas: 31, cukupPuas: 5, tidakPuas: 1, sangatTidakPuas: 1 },
      { pertanyaan: 'Ketepatan Waktu Tangki Bantuan Darurat', sangatPuas: 37, puas: 43, cukupPuas: 14, tidakPuas: 5, sangatTidakPuas: 1 },
    ],
    'Tahun 2025': [
      { pertanyaan: 'Kemudahan Pendaftaran Sambungan Baru', sangatPuas: 45, puas: 39, cukupPuas: 11, tidakPuas: 4, sangatTidakPuas: 1 },
      { pertanyaan: 'Kecepatan Respons Penanganan Keluhan', sangatPuas: 39, puas: 42, cukupPuas: 13, tidakPuas: 5, sangatTidakPuas: 1 },
      { pertanyaan: 'Kualitas Kekeruhan & Kejernihan Air', sangatPuas: 48, puas: 38, cukupPuas: 9, tidakPuas: 4, sangatTidakPuas: 1 },
      { pertanyaan: 'Kontinuitas Aliran Air 24 Jam', sangatPuas: 36, puas: 43, cukupPuas: 13, tidakPuas: 6, sangatTidakPuas: 2 },
      { pertanyaan: 'Akurasi Pencatatan Meter Air', sangatPuas: 52, puas: 37, cukupPuas: 8, tidakPuas: 2, sangatTidakPuas: 1 },
      { pertanyaan: 'Kemudahan Pembayaran Rekening Digital', sangatPuas: 59, puas: 33, cukupPuas: 6, tidakPuas: 1, sangatTidakPuas: 1 },
      { pertanyaan: 'Ketepatan Waktu Tangki Bantuan Darurat', sangatPuas: 34, puas: 44, cukupPuas: 15, tidakPuas: 5, sangatTidakPuas: 2 },
    ],
  },

  // =========================================================================
  // D. PENGELOLAAN LIMBAH
  // =========================================================================
  // 13. Volume layanan limbah per bulan (Stacked column) (Tertutup, perbulan)
  volumeLayananLimbah: [
    { bulan: 'Jan', limbahCairM3: 42500, limbahDomestikM3: 16800, sumurTinjaM3: 8400 },
    { bulan: 'Feb', limbahCairM3: 39800, limbahDomestikM3: 15900, sumurTinjaM3: 7900 },
    { bulan: 'Mar', limbahCairM3: 44200, limbahDomestikM3: 17400, sumurTinjaM3: 8800 },
    { bulan: 'Apr', limbahCairM3: 43100, limbahDomestikM3: 17100, sumurTinjaM3: 8600 },
    { bulan: 'Mei', limbahCairM3: 45800, limbahDomestikM3: 18200, sumurTinjaM3: 9100 },
    { bulan: 'Jun', limbahCairM3: 44600, limbahDomestikM3: 17800, sumurTinjaM3: 8900 },
    { bulan: 'Jul', limbahCairM3: 46500, limbahDomestikM3: 18600, sumurTinjaM3: 9300 },
    { bulan: 'Agu', limbahCairM3: 45200, limbahDomestikM3: 18100, sumurTinjaM3: 9000 },
    { bulan: 'Sep', limbahCairM3: 44900, limbahDomestikM3: 17900, sumurTinjaM3: 8900 },
    { bulan: 'Okt', limbahCairM3: 47100, limbahDomestikM3: 18900, sumurTinjaM3: 9400 },
    { bulan: 'Nov', limbahCairM3: 46000, limbahDomestikM3: 18400, sumurTinjaM3: 9200 },
    { bulan: 'Des', limbahCairM3: 48200, limbahDomestikM3: 19200, sumurTinjaM3: 9600 },
  ],

  // 14. Jumlah trip pengurasan per zona (Bar horizontal, diurutkan) (Tertutup)
  tripPengurasanZona: [
    { zona: 'Zona Batam Center', trip: 1240, armada: 12, rataDurasiJam: 1.8 },
    { zona: 'Zona Batu Aji & Sagulung', trip: 1150, armada: 11, rataDurasiJam: 2.1 },
    { zona: 'Zona Sekupang & Tiban', trip: 980, armada: 9, rataDurasiJam: 1.9 },
    { zona: 'Zona Lubuk Baja & Nagoya', trip: 870, armada: 8, rataDurasiJam: 1.6 },
    { zona: 'Zona Bengkong', trip: 760, armada: 7, rataDurasiJam: 1.7 },
    { zona: 'Zona Nongsa & Kabil', trip: 640, armada: 6, rataDurasiJam: 2.3 },
    { zona: 'Zona Sei Beduk & Piayu', trip: 520, armada: 5, rataDurasiJam: 2.0 },
  ],

  // 15. Berat limbah B3 dan persentase yang ditangani (Combo chart) (Tertutup, perbulan)
  limbahB3Ditangani: [
    { bulan: 'Jan', padatTon: 42.5, sludgeTon: 34.2, cairTon: 28.5, totalTon: 105.2, diolahTon: 103.5, persentase: 98.4 },
    { bulan: 'Feb', padatTon: 39.8, sludgeTon: 32.1, cairTon: 26.8, totalTon: 98.7, diolahTon: 97.2, persentase: 98.5 },
    { bulan: 'Mar', padatTon: 44.1, sludgeTon: 35.8, cairTon: 29.4, totalTon: 109.3, diolahTon: 107.8, persentase: 98.6 },
    { bulan: 'Apr', padatTon: 43.0, sludgeTon: 34.9, cairTon: 28.9, totalTon: 106.8, diolahTon: 105.4, persentase: 98.7 },
    { bulan: 'Mei', padatTon: 46.2, sludgeTon: 37.4, cairTon: 31.0, totalTon: 114.6, diolahTon: 113.2, persentase: 98.8 },
    { bulan: 'Jun', padatTon: 45.0, sludgeTon: 36.5, cairTon: 30.2, totalTon: 111.7, diolahTon: 110.5, persentase: 98.9 },
    { bulan: 'Jul', padatTon: 47.5, sludgeTon: 38.6, cairTon: 32.1, totalTon: 118.2, diolahTon: 117.1, persentase: 99.1 },
    { bulan: 'Agu', padatTon: 46.1, sludgeTon: 37.2, cairTon: 31.2, totalTon: 114.5, diolahTon: 113.4, persentase: 99.0 },
    { bulan: 'Sep', padatTon: 45.4, sludgeTon: 36.8, cairTon: 30.8, totalTon: 113.0, diolahTon: 112.0, persentase: 99.1 },
    { bulan: 'Okt', padatTon: 48.0, sludgeTon: 39.1, cairTon: 32.7, totalTon: 119.8, diolahTon: 118.8, persentase: 99.2 },
    { bulan: 'Nov', padatTon: 46.8, sludgeTon: 38.0, cairTon: 31.9, totalTon: 116.7, diolahTon: 115.8, persentase: 99.2 },
    { bulan: 'Des', padatTon: 49.2, sludgeTon: 40.2, cairTon: 33.5, totalTon: 122.9, diolahTon: 122.1, persentase: 99.3 },
  ],

  // 16. Produksi dan distribusi kompos organik (Combo chart) (Tertutup, perbulan)
  komposOrganik: [
    { bulan: 'Jan', produksiKarung: 2450, distribusiKarung: 2200, stockAkhirKarung: 1450 },
    { bulan: 'Feb', produksiKarung: 2300, distribusiKarung: 2150, stockAkhirKarung: 1600 },
    { bulan: 'Mar', produksiKarung: 2600, distribusiKarung: 2400, stockAkhirKarung: 1800 },
    { bulan: 'Apr', produksiKarung: 2550, distribusiKarung: 2500, stockAkhirKarung: 1850 },
    { bulan: 'Mei', produksiKarung: 2750, distribusiKarung: 2650, stockAkhirKarung: 1950 },
    { bulan: 'Jun', produksiKarung: 2700, distribusiKarung: 2600, stockAkhirKarung: 2050 },
    { bulan: 'Jul', produksiKarung: 2850, distribusiKarung: 2800, stockAkhirKarung: 2100 },
    { bulan: 'Agu', produksiKarung: 2800, distribusiKarung: 2750, stockAkhirKarung: 2150 },
    { bulan: 'Sep', produksiKarung: 2750, distribusiKarung: 2700, stockAkhirKarung: 2200 },
    { bulan: 'Okt', produksiKarung: 2900, distribusiKarung: 2850, stockAkhirKarung: 2250 },
    { bulan: 'Nov', produksiKarung: 2850, distribusiKarung: 2800, stockAkhirKarung: 2300 },
    { bulan: 'Des', produksiKarung: 3050, distribusiKarung: 2950, stockAkhirKarung: 2400 },
  ],

  // =========================================================================
  // E. PENERIMAAN DAN KINERJA
  // =========================================================================
  // 17. PNBP air per bulan (Stacked column) (Tertutup, perbulan)
  pnbpAirBulanan: [
    { bulan: 'Jan', pnbpAirMiliar: 34.2, pnbpHgatMiliar: 4.8, totalMiliar: 39.0 },
    { bulan: 'Feb', pnbpAirMiliar: 32.5, pnbpHgatMiliar: 4.5, totalMiliar: 37.0 },
    { bulan: 'Mar', pnbpAirMiliar: 35.8, pnbpHgatMiliar: 5.1, totalMiliar: 40.9 },
    { bulan: 'Apr', pnbpAirMiliar: 35.1, pnbpHgatMiliar: 4.9, totalMiliar: 40.0 },
    { bulan: 'Mei', pnbpAirMiliar: 36.9, pnbpHgatMiliar: 5.3, totalMiliar: 42.2 },
    { bulan: 'Jun', pnbpAirMiliar: 36.2, pnbpHgatMiliar: 5.2, totalMiliar: 41.4 },
    { bulan: 'Jul', pnbpAirMiliar: 37.8, pnbpHgatMiliar: 5.5, totalMiliar: 43.3 },
    { bulan: 'Agu', pnbpAirMiliar: 37.1, pnbpHgatMiliar: 5.4, totalMiliar: 42.5 },
    { bulan: 'Sep', pnbpAirMiliar: 36.7, pnbpHgatMiliar: 5.3, totalMiliar: 42.0 },
    { bulan: 'Okt', pnbpAirMiliar: 38.4, pnbpHgatMiliar: 5.6, totalMiliar: 44.0 },
    { bulan: 'Nov', pnbpAirMiliar: 37.9, pnbpHgatMiliar: 5.5, totalMiliar: 43.4 },
    { bulan: 'Des', pnbpAirMiliar: 39.5, pnbpHgatMiliar: 5.8, totalMiliar: 45.3 },
  ],

  // 18. Capaian penerimaan terhadap target (Clustered bar horizontal) (Tertutup, perbulan)
  capaianPenerimaan: {
    'Semua Unit': [
      { jenis: 'Tarif Air Minum Bersih', targetMiliar: 410.0, realisasiMiliar: 438.1, capaian: 106.9 },
      { jenis: 'Retribusi Pengolahan Air Limbah', targetMiliar: 32.5, realisasiMiliar: 35.2, capaian: 108.3 },
      { jenis: 'HGAT (Hak Guna Air Tanah)', targetMiliar: 58.0, realisasiMiliar: 62.9, capaian: 108.4 },
      { jenis: 'Layanan Pengurasan IPLT/Tinja', targetMiliar: 14.2, realisasiMiliar: 15.6, capaian: 109.9 },
      { jenis: 'Pasang Baru & Tera Meter', targetMiliar: 18.5, realisasiMiliar: 19.8, capaian: 107.0 },
    ],
    'Subdit Air Minum': [
      { jenis: 'Tarif Air Minum Bersih', targetMiliar: 410.0, realisasiMiliar: 438.1, capaian: 106.9 },
      { jenis: 'HGAT (Hak Guna Air Tanah)', targetMiliar: 58.0, realisasiMiliar: 62.9, capaian: 108.4 },
      { jenis: 'Pasang Baru & Tera Meter', targetMiliar: 18.5, realisasiMiliar: 19.8, capaian: 107.0 },
    ],
    'Subdit Pengelolaan Limbah': [
      { jenis: 'Retribusi Pengolahan Air Limbah', targetMiliar: 32.5, realisasiMiliar: 35.2, capaian: 108.3 },
      { jenis: 'Layanan Pengurasan IPLT/Tinja', targetMiliar: 14.2, realisasiMiliar: 15.6, capaian: 109.9 },
    ],
  },

  // 19. Capaian produksi terhadap target (Clustered bar horizontal) (Tertutup, perbulan)
  capaianProduksi: {
    'Semua Unit': [
      { jenis: 'Air Bersih WTP Duriangkang (m3)', targetVolumeJuta: 95.0, realisasiVolumeJuta: 98.4, capaian: 103.6 },
      { jenis: 'Air Bersih WTP Mukakuning (m3)', targetVolumeJuta: 19.0, realisasiVolumeJuta: 19.8, capaian: 104.2 },
      { jenis: 'Air Bersih WTP Sei Ladi (m3)', targetVolumeJuta: 12.2, realisasiVolumeJuta: 12.8, capaian: 104.9 },
      { jenis: 'Pengolahan Limbah Cair WWTP (m3)', targetVolumeJuta: 0.52, realisasiVolumeJuta: 0.55, capaian: 105.8 },
      { jenis: 'Produksi Kompos Organik IPLT (Karung)', targetVolumeJuta: 0.032, realisasiVolumeJuta: 0.034, capaian: 106.3 },
    ],
    'Subdit Air Minum': [
      { jenis: 'Air Bersih WTP Duriangkang (m3)', targetVolumeJuta: 95.0, realisasiVolumeJuta: 98.4, capaian: 103.6 },
      { jenis: 'Air Bersih WTP Mukakuning (m3)', targetVolumeJuta: 19.0, realisasiVolumeJuta: 19.8, capaian: 104.2 },
      { jenis: 'Air Bersih WTP Sei Ladi (m3)', targetVolumeJuta: 12.2, realisasiVolumeJuta: 12.8, capaian: 104.9 },
    ],
    'Subdit Pengelolaan Limbah': [
      { jenis: 'Pengolahan Limbah Cair WWTP (m3)', targetVolumeJuta: 0.52, realisasiVolumeJuta: 0.55, capaian: 105.8 },
      { jenis: 'Produksi Kompos Organik IPLT (Karung)', targetVolumeJuta: 0.032, realisasiVolumeJuta: 0.034, capaian: 106.3 },
    ],
  },

  // 20. Penyelesaian piutang per jenis piutang (Stacked bar horizontal) (Tertutup, perbulan)
  penyelesaianPiutang: [
    { jenis: 'Piutang Pelanggan Rumah Tangga', realisasiMiliar: 14.8, sisaPiutangMiliar: 1.9, totalPiutangMiliar: 16.7, tingkatPenyelesaian: 88.6 },
    { jenis: 'Piutang Pelanggan Niaga & Industri', realisasiMiliar: 28.5, sisaPiutangMiliar: 2.3, totalPiutangMiliar: 30.8, tingkatPenyelesaian: 92.5 },
    { jenis: 'Piutang Instansi & BUMN', realisasiMiliar: 8.9, sisaPiutangMiliar: 1.1, totalPiutangMiliar: 10.0, tingkatPenyelesaian: 89.0 },
    { jenis: 'Piutang Retribusi Limbah & IPLT', realisasiMiliar: 5.4, sisaPiutangMiliar: 0.6, totalPiutangMiliar: 6.0, tingkatPenyelesaian: 90.0 },
  ],

  // =========================================================================
  // F. PETA INFRASTRUKTUR AIR MINUM (Terbatas/Tertutup)
  // Koordinat Batam real-world & nodes infrastruktur
  // =========================================================================
  petaInfrastruktur: {
    waduk: [
      { id: 'w-1', nama: 'Waduk Duriangkang', volumeJutaM3: 78.5, luasHa: 2450, lat: 1.055, lng: 104.072, x: 57, y: 55 },
      { id: 'w-2', nama: 'Waduk Mukakuning', volumeJutaM3: 12.3, luasHa: 460, lat: 1.042, lng: 104.028, x: 49, y: 58 },
      { id: 'w-3', nama: 'Waduk Sei Ladi', volumeJutaM3: 9.5, luasHa: 380, lat: 1.118, lng: 104.005, x: 44, y: 41 },
      { id: 'w-4', nama: 'Waduk Sei Harapan', volumeJutaM3: 3.6, luasHa: 190, lat: 1.108, lng: 103.952, x: 34, y: 44 },
      { id: 'w-5', nama: 'Waduk Nongsa', volumeJutaM3: 0.8, luasHa: 95, lat: 1.162, lng: 104.095, x: 62, y: 31 },
      { id: 'w-6', nama: 'Waduk Tembesi', volumeJutaM3: 56.0, luasHa: 1200, lat: 1.025, lng: 104.058, x: 54, y: 62 },
    ],
    ipaWtp: [
      { id: 'ipa-1', nama: 'IPA WTP Duriangkang', kapasitas: '3.000 L/detik', teknologi: 'Pulsator & DAF', lat: 1.062, lng: 104.075, x: 58, y: 53 },
      { id: 'ipa-2', nama: 'IPA WTP Mukakuning', kapasitas: '600 L/detik', teknologi: 'Clarifier Konvensional', lat: 1.048, lng: 104.032, x: 50, y: 57 },
      { id: 'ipa-3', nama: 'IPA WTP Sei Ladi', kapasitas: '380 L/detik', teknologi: 'Rapid Sand Filter', lat: 1.122, lng: 104.009, x: 45, y: 40 },
      { id: 'ipa-4', nama: 'IPA WTP Sei Harapan', kapasitas: '210 L/detik', teknologi: 'Filtrasi Multi-media', lat: 1.112, lng: 103.955, x: 35, y: 43 },
      { id: 'ipa-5', nama: 'IPA WTP Nongsa', kapasitas: '60 L/detik', teknologi: 'Clarifier Compact', lat: 1.165, lng: 104.098, x: 63, y: 30 },
      { id: 'ipa-6', nama: 'IPA WTP Tanjung Piayu', kapasitas: '200 L/detik', teknologi: 'Ultrafiltrasi Membran', lat: 1.018, lng: 104.088, x: 60, y: 64 },
    ],
    tankiReservoir: [
      { id: 'tk-1', nama: 'Reservoir Bukit Senyum', kapasitasM3: 15000, elevasiM: 85, x: 46, y: 35 },
      { id: 'tk-2', nama: 'Reservoir Ocarina Batam Center', kapasitasM3: 12000, elevasiM: 52, x: 53, y: 44 },
      { id: 'tk-3', nama: 'Reservoir Tanjung Uncang', kapasitasM3: 10000, elevasiM: 45, x: 33, y: 64 },
      { id: 'tk-4', nama: 'Reservoir Batu Aji Raya', kapasitasM3: 14000, elevasiM: 48, x: 40, y: 65 },
      { id: 'tk-5', nama: 'Reservoir Tiban Koperasi', kapasitasM3: 8000, elevasiM: 65, x: 38, y: 45 },
      { id: 'tk-6', nama: 'Reservoir Kabil Industrial', kapasitasM3: 9000, elevasiM: 42, x: 64, y: 47 },
    ],
    boosterPump: [
      { id: 'bp-1', nama: 'Booster Pump Sukajadi', headM: 45, debitLps: 450, x: 49, y: 47 },
      { id: 'bp-2', nama: 'Booster Pump Simpang Kepri Mall', headM: 50, debitLps: 550, x: 51, y: 49 },
      { id: 'bp-3', nama: 'Booster Pump Tanjung Pinggir', headM: 40, debitLps: 320, x: 32, y: 48 },
      { id: 'bp-4', nama: 'Booster Pump Sei Panas', headM: 35, debitLps: 400, x: 48, y: 38 },
      { id: 'bp-5', nama: 'Booster Pump Tembesi Trans', headM: 45, debitLps: 480, x: 48, y: 63 },
    ],
    meterLogger: [
      { id: 'ml-1', nama: 'DMA Logger Duriangkang Trunk', tekananBar: 3.8, flowLps: 820, status: 'Normal', x: 55, y: 51 },
      { id: 'ml-2', nama: 'DMA Logger Batam Center Hub', tekananBar: 3.2, flowLps: 410, status: 'Normal', x: 53, y: 46 },
      { id: 'ml-3', nama: 'DMA Logger Batu Aji Indah', tekananBar: 2.8, flowLps: 380, status: 'Perlu Monitor', x: 42, y: 64 },
      { id: 'ml-4', nama: 'DMA Logger Nagoya Commercial', tekananBar: 3.5, flowLps: 320, status: 'Normal', x: 44, y: 36 },
      { id: 'ml-5', nama: 'DMA Logger Nongsa Beachline', tekananBar: 2.5, flowLps: 180, status: 'Normal', x: 61, y: 34 },
    ],
    pipaJaringan: [
      { id: 'pipe-1', nama: 'Trunk Transmisi Duriangkang - Batam Center (DN 1000mm)', points: '58,53 55,50 53,46' },
      { id: 'pipe-2', nama: 'Trunk Transmisi Duriangkang - Sukajadi - Nagoya (DN 800mm)', points: '58,53 51,49 49,47 48,38 44,36' },
      { id: 'pipe-3', nama: 'Trunk Mukakuning - Batu Aji - Tanjung Uncang (DN 600mm)', points: '50,57 48,63 42,64 33,64' },
      { id: 'pipe-4', nama: 'Trunk Sei Ladi - Baloi - Batu Ampar (DN 600mm)', points: '45,40 46,35 45,31' },
      { id: 'pipe-5', nama: 'Trunk Sei Harapan - Tiban - Sekupang (DN 500mm)', points: '35,43 38,45 32,48' },
      { id: 'pipe-6', nama: 'Trunk Duriangkang - Kabil Port (DN 500mm)', points: '58,53 62,50 64,47' },
      { id: 'pipe-7', nama: 'Trunk Nongsa Sub-system (DN 300mm)', points: '63,30 61,34 65,36' },
    ],
    stressArea: [
      { id: 'sa-1', nama: 'Stress Area Bukit Senyum Ujung', masalah: 'Elevasi Tinggi, Tekanan < 0.8 bar jam puncak', x: 46, y: 34, r: 16 },
      { id: 'sa-2', nama: 'Stress Area Tanjung Uncang Ujung', masalah: 'Pipa Ujung Jaringan, Sering Drop saat Shift Pabrik', x: 31, y: 65, r: 18 },
      { id: 'sa-3', nama: 'Stress Area Bengkong Kolam', masalah: 'Kepadatan Tinggi, Fluktuasi Tekanan Siang Hari', x: 49, y: 36, r: 14 },
      { id: 'sa-4', nama: 'Stress Area Piayu Laut', masalah: 'Jarak dari WTP > 14 km, Pasokan Tergantung Booster', x: 62, y: 66, r: 15 },
    ],
    wilayahDmz: [
      { id: 'dmz-bc', nama: 'DMZ-01 Batam Center', warna: '#3B82F6', points: '50,42 55,41 57,48 51,49' },
      { id: 'dmz-ba', nama: 'DMZ-03 Batu Aji Indah', warna: '#60A5FA', points: '38,60 45,60 44,68 37,68' },
      { id: 'dmz-tb', nama: 'DMZ-02 Tiban Raya', warna: '#93C5FD', points: '34,40 40,40 41,48 35,48' },
      { id: 'dmz-ng', nama: 'DMZ-06 Nagoya Commercial', warna: '#2563EB', points: '42,33 47,33 47,38 42,38' },
      { id: 'dmz-kb', nama: 'DMZ-14 Kabil Industrial', warna: '#1D4ED8', points: '61,44 67,44 68,52 62,52' },
    ],
    sebaranPelanggan: [
      { id: 'sp-1', nama: 'Klaster Pelanggan Batam Center Kota (24.650 SL)', x: 53, y: 44, density: 95 },
      { id: 'sp-2', nama: 'Klaster Pelanggan Batu Aji & Sagulung (55.250 SL)', x: 41, y: 64, density: 98 },
      { id: 'sp-3', nama: 'Klaster Pelanggan Bengkong & Sei Panas (41.950 SL)', x: 48, y: 37, density: 92 },
      { id: 'sp-4', nama: 'Klaster Pelanggan Tiban & Sekupang (31.850 SL)', x: 37, y: 45, density: 88 },
      { id: 'sp-5', nama: 'Klaster Pelanggan Nagoya & Jodoh (18.320 SL)', x: 44, y: 35, density: 85 },
      { id: 'sp-6', nama: 'Klaster Industri Batamindo & Mukakuning (25.220 SL)', x: 50, y: 55, density: 90 },
      { id: 'sp-7', nama: 'Klaster Nongsa & Kabil (24.590 SL)', x: 63, y: 46, density: 78 },
      { id: 'sp-8', nama: 'Klaster Tanjung Piayu & Sei Beduk (16.800 SL)', x: 59, y: 63, density: 82 },
    ],
  },
};
