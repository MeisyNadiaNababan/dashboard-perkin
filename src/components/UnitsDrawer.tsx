import React, { useState, useMemo } from 'react';
import { X, Search, CheckCircle2, ArrowRight, Building2, Server, Users, Scale, ShieldAlert, Building, ClipboardCheck, Compass, CheckSquare, Target, MapPin, ShieldCheck, Truck, PieChart, Plane, Anchor, Briefcase, Ship, Shield, TrendingUp, HardHat, DraftingCompass, Stethoscope, Droplets, BookOpen, Layers, Award } from 'lucide-react';
import { BP_BATAM_24_UNITS, BpBatamUnit } from '../data/bpBatamUnits';

interface UnitsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeUnitId: string;
  onSelectUnit: (unitId: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Building2,
  Server,
  Users,
  Scale,
  ShieldAlert,
  Building,
  ClipboardCheck,
  Compass,
  CheckSquare,
  Target,
  MapPin,
  ShieldCheck,
  Truck,
  PieChart,
  Plane,
  Anchor,
  Briefcase,
  Ship,
  Shield,
  TrendingUp,
  HardHat,
  DraftingCompass,
  Stethoscope,
  Droplets,
  Award,
};

export const UnitsDrawer: React.FC<UnitsDrawerProps> = ({
  isOpen,
  onClose,
  activeUnitId,
  onSelectUnit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'active' | 'on_progress' | 'ready_to_build'>('ALL');

  const categories = ['ALL', 'Pimpinan', 'Biro', 'Direktorat', 'Pusat', 'Badan Usaha', 'Satuan'];

  // Realtime dynamic metrics computed from actual unit definitions
  const totalUnits = BP_BATAM_24_UNITS.length;
  const activeUnits = useMemo(() => BP_BATAM_24_UNITS.filter((u) => u.status === 'active'), []);
  const onProgressUnits = useMemo(() => BP_BATAM_24_UNITS.filter((u) => u.status === 'on_progress'), []);
  const readyUnits = useMemo(() => BP_BATAM_24_UNITS.filter((u) => u.status === 'ready_to_build'), []);
  const activeCount = activeUnits.length;
  const onProgressCount = onProgressUnits.length;
  const readyCount = readyUnits.length;

  const filteredUnits = useMemo(() => {
    return BP_BATAM_24_UNITS.filter((unit) => {
      const matchSearch =
        !searchTerm ||
        unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'ALL' || unit.category === selectedCategory;
      const matchStatus = statusFilter === 'ALL' || unit.status === statusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [searchTerm, selectedCategory, statusFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-slate-950/60 backdrop-blur-xs font-sans select-none animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white border border-slate-300 shadow-xl flex flex-col max-h-[72vh] overflow-hidden rounded-lg">
        {/* Top Header - Compact */}
        <div className="bg-[#0F1E36] text-white px-3 py-1.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-extrabold text-[10px] shadow-xs border border-blue-400/30">
              {totalUnits}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold tracking-tight">
                  Direktori 24 Unit Kerja BP Batam
                </h3>
                <span className="text-[8.5px] font-bold px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 rounded-full flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  {activeCount} Aktif
                </span>
                {onProgressCount > 0 && (
                  <span className="text-[8.5px] font-bold px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-400/50 rounded-full flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                    {onProgressCount} On Progress
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter & Search Bar - Compact */}
        <div className="px-2.5 py-1.5 bg-slate-50 border-b border-slate-200 flex flex-col gap-1">
          <div className="flex flex-col sm:flex-row gap-1.5 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari unit kerja, biro, direktorat, kode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-7 pr-2.5 py-0.5 text-[10.5px] bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ×
                </button>
              )}
            </div>

            {/* Status Quick Filter (Realtime) */}
            <div className="flex items-center gap-1 text-[10px]">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-1.5 py-0.5 rounded text-[9.5px] font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  statusFilter === 'ALL'
                    ? 'bg-[#1F3864] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                Semua ({totalUnits})
              </button>

              <button
                onClick={() => setStatusFilter('active')}
                className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 ${
                  statusFilter === 'active'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                <span>Aktif ({activeCount})</span>
              </button>

              <button
                onClick={() => setStatusFilter('on_progress')}
                className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 ${
                  statusFilter === 'on_progress'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100'
                }`}
              >
                <span className="w-1 h-1 rounded-full bg-amber-500" />
                <span>Progress ({onProgressCount})</span>
              </button>
            </div>
          </div>

          {/* Category Tabs - Compact */}
          <div className="flex items-center gap-1 overflow-x-auto text-[9.5px] pt-0.5">
            <span className="font-semibold text-slate-400 mr-0.5 shrink-0 text-[9px]">Kategori:</span>
            {categories.map((cat) => {
              const count = cat === 'ALL'
                ? BP_BATAM_24_UNITS.length
                : BP_BATAM_24_UNITS.filter((u) => u.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-1.5 py-0.2 rounded text-[9px] font-medium whitespace-nowrap cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-100 text-blue-900 font-bold border border-blue-300'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'ALL' ? 'Semua' : cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Units Grid - Ultra Compact (4 cols) */}
        <div className="p-1.5 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 bg-slate-100/60">
          {filteredUnits.map((unit) => {
            const IconComponent = ICON_MAP[unit.iconName] || Building2;
            const isActive = activeUnitId === unit.id;
            const isImplemented = unit.status === 'active';
            const isOnProgress = unit.status === 'on_progress';

            return (
              <div
                key={unit.id}
                onClick={() => {
                  onSelectUnit(unit.id);
                  onClose();
                }}
                className={`p-1.5 bg-white border rounded transition-all cursor-pointer group flex flex-col justify-between relative hover:shadow-2xs ${
                  isActive
                    ? 'border-blue-600 ring-1 ring-blue-500/30 bg-blue-50/20'
                    : 'border-slate-200 hover:border-blue-400'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-1 mb-0.5">
                    <div className="flex items-center gap-1 min-w-0">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : isImplemented
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isOnProgress
                            ? 'bg-amber-50 text-amber-700 border border-amber-300'
                            : 'bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-blue-50 group-hover:text-blue-600'
                        }`}
                      >
                        <IconComponent className="w-3 h-3" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-0.5">
                          <span className="font-mono text-[7.5px] font-bold px-1 py-0 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {unit.code}
                          </span>
                        </div>
                        <h4 className="font-bold text-[10px] text-slate-900 truncate group-hover:text-blue-600 transition-colors leading-tight" title={unit.name}>
                          {unit.shortName || unit.name}
                        </h4>
                      </div>
                    </div>

                    {/* Status Pill */}
                    {isImplemented ? (
                      <span className="text-[7.5px] font-bold px-1 py-0 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 shrink-0">
                        Aktif
                      </span>
                    ) : isOnProgress ? (
                      <span className="text-[7.5px] font-bold px-1 py-0 rounded-full bg-amber-50 text-amber-800 border border-amber-300 shrink-0">
                        Prog
                      </span>
                    ) : (
                      <span className="text-[7.5px] font-medium px-1 py-0 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                        Ranc
                      </span>
                    )}
                  </div>

                  {/* Description - 1 line */}
                  <p className="text-[8.5px] text-slate-500 line-clamp-1 leading-tight mb-0.5">
                    {unit.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-0.5 border-t border-slate-100 flex items-center justify-between text-[8.5px]">
                  <span className="font-mono text-slate-400 text-[8px]">
                    {unit.itemCount} Item
                  </span>

                  <div className="flex items-center gap-0.5 font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform text-[8.5px]">
                    <span>{isImplemented || isOnProgress ? 'Buka' : 'Katalog'}</span>
                    <ArrowRight className="w-2 h-2" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer Footer - Realtime Active Count */}
        <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] text-slate-600">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-800">
              Total: {totalUnits} Unit Kerja
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{activeCount} Aktif</span>
            </span>
            {onProgressCount > 0 && (
              <span className="text-amber-800 font-bold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>{onProgressCount} On Progress</span>
              </span>
            )}
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-slate-500 text-[10px]">
              {readyCount} Rancang
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter(statusFilter === 'active' ? 'ALL' : 'active')}
              className={`px-2 py-0.5 text-[10.5px] font-semibold rounded-md border transition-colors cursor-pointer flex items-center gap-1 ${
                statusFilter === 'active'
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>{statusFilter === 'active' ? 'Semua' : `Filter ${activeCount} Aktif`}</span>
            </button>

            <button
              onClick={onClose}
              className="px-3 py-0.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-md border border-slate-300 cursor-pointer transition-colors text-[10.5px]"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
