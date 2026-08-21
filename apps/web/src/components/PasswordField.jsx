import { useState } from 'react';
import { CheckIcon, EyeIcon, EyeOffIcon, LockIcon } from './icons';

const criteriaList = [
  { key: 'length', label: '8+ characters' },
  { key: 'uppercase', label: 'Uppercase letter' },
  { key: 'number', label: 'Number' },
  { key: 'special', label: 'Special character' },
];

function getStrengthMeta(count) {
  if (count === 0) return { label: '', color: 'bg-slate-200' };
  if (count === 1) return { label: 'Weak', color: 'bg-[#DC2626]' };
  if (count === 2) return { label: 'Fair', color: 'bg-[#EA580C]' };
  if (count === 3) return { label: 'Good', color: 'bg-[#CA8A04]' };
  return { label: 'Strong', color: 'bg-[#16A34A]' };
}

function PasswordField({
  label,
  name,
  placeholder = '••••••••',
  register,
  error,
  valid,
  showStrength = false,
  criteria = {},
  value = '',
  idPrefix = '',
  ...props
}) {
  const [visible, setVisible] = useState(false);
  const id = `${idPrefix}${name}`;
  const metCount = Object.values(criteria).filter(Boolean).length;
  const strength = getStrengthMeta(metCount);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[13px] font-medium tracking-[0.01em] text-[#64748B]">
        {label}
      </label>
      <div className="relative group/input">
        <LockIcon
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-all duration-200 ${error ? 'text-[#DC2626]' : 'text-[#94A3B8] group-focus-within/input:text-[#14249C] group-focus-within/input:scale-110'}`}
        />
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name)}
          {...props}
          className={`w-full pl-11 pr-12 py-3.5 bg-[#F8FAFC] border rounded-[14px] text-[15px] font-normal tracking-normal text-[#0F172A] placeholder-[#94A3B8] transition-all duration-200 ease-out outline-none hover:border-[#CBD5E1] ${
            error
              ? 'border-[#DC2626] bg-[#FEF2F2] focus:border-[#DC2626] focus:shadow-[0_0_0_4px_rgba(220,38,38,0.08)]'
              : 'border-[#E2E8F0] focus:bg-white focus:border-[#14249C] focus:shadow-[0_0_0_4px_rgba(20,36,156,0.08)]'
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-all duration-150 active:scale-75"
          aria-label={visible ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          <div className="transition-transform duration-200">
            {visible ? <EyeOffIcon className="w-[18px] h-[18px]" /> : <EyeIcon className="w-[18px] h-[18px]" />}
          </div>
        </button>
      </div>
      {error && <p className="text-[13px] font-medium text-[#DC2626] animate-fade-in">{error}</p>}
      {showStrength && value && (
        <div className="mt-3 space-y-2">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-[5px] flex-1 rounded-full transition-all duration-500 ease-out ${
                  i < metCount ? strength.color : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-medium text-[#64748B]">{strength.label}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {criteriaList.map(({ key, label: criterionLabel }) => {
              const met = !!criteria[key];
              return (
                <div key={key} className="flex items-center gap-2">
                  {met ? (
                    <div className="w-4 h-4 rounded-full bg-[#16A34A]/10 flex items-center justify-center transition-all duration-200">
                      <CheckIcon className="w-2.5 h-2.5 text-[#16A34A]" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 transition-all duration-200" />
                  )}
                  <span
                    className={`text-[12px] font-medium transition-colors duration-200 ${met ? 'text-[#0F172A]' : 'text-[#94A3B8]'}`}
                  >
                    {criterionLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordField;
