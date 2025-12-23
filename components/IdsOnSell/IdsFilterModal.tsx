import { FiX } from "react-icons/fi";

interface Props {
  open: boolean;
  onClose: () => void;
  rentOnly: boolean;
  setRentOnly: (v: boolean) => void;
  globalOnly: boolean;
  setGlobalOnly: (v: boolean) => void;
}

export default function IdsFilterModal({
  open,
  onClose,
  rentOnly,
  setRentOnly,
  globalOnly,
  setGlobalOnly,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-sm rounded-2xl
        bg-[var(--background)] border border-white/10 p-5 space-y-4">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="hover:text-red-500">
            <FiX />
          </button>
        </div>

        {/* FILTERS */}
        <div className="space-y-3 text-sm">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={rentOnly}
              onChange={(e) => setRentOnly(e.target.checked)}
            />
            <span>Rent available only</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={globalOnly}
              onChange={(e) => setGlobalOnly(e.target.checked)}
            />
            <span>Global hero available</span>
          </label>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={() => {
              setRentOnly(false);
              setGlobalOnly(false);
            }}
            className="px-3 py-2 text-sm rounded-lg border
              hover:text-red-500 hover:border-red-500"
          >
            Clear
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg
              bg-[var(--accent)] text-black font-semibold"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
