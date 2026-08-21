import { AlertIcon } from './icons';

function InputField({ label, name, type = 'text', placeholder, icon: Icon, register, error, valid, idPrefix = '', ...props }) {
  const id = `${idPrefix}${name}`;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[13px] font-medium tracking-[0.01em] text-[#64748B]">
        {label}
      </label>
      <div className="relative group/input">
        {Icon && (
          <Icon
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-all duration-200 ${error ? 'text-[#DC2626]' : 'text-[#94A3B8] group-focus-within/input:text-[#14249C] group-focus-within/input:scale-110'}`}
          />
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          {...props}
          className={`w-full pl-11 pr-4 py-3.5 bg-[#F8FAFC] border rounded-[14px] text-[15px] font-normal tracking-normal text-[#0F172A] placeholder-[#94A3B8] transition-all duration-200 ease-out outline-none hover:border-[#CBD5E1] ${
            error
              ? 'border-[#DC2626] bg-[#FEF2F2] focus:border-[#DC2626] focus:shadow-[0_0_0_4px_rgba(220,38,38,0.08)]'
              : 'border-[#E2E8F0] focus:bg-white focus:border-[#14249C] focus:shadow-[0_0_0_4px_rgba(20,36,156,0.08)]'
          } ${error || valid ? 'pr-11' : ''}`}
        />
        {error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-shake">
            <AlertIcon className="w-[18px] h-[18px] text-[#DC2626]" />
          </div>
        )}
      </div>
      {error && <p className="text-[13px] font-medium text-[#DC2626] animate-fade-in">{error}</p>}
    </div>
  );
}

export default InputField;
