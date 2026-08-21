import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../InputField';
import PasswordField from '../PasswordField';
import { registerSchema, passwordCriteria } from '../../lib/validators';
import useToast from '../../hooks/useToast';
import api from '../../lib/api';
import { ArrowRightIcon, CheckIcon, MailIcon, PhoneIcon, UserIcon } from '../icons';

function RegisterForm({ mobile = false }) {
  const { success, error: errorToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', password: '', password_confirmation: '', terms: false },
  });
  const values = watch();
  const criteria = passwordCriteria(values.password || '');
  const fieldValid = (name) => isDirty && !errors[name] && String(values[name] ?? '').length > 0;
  const idPrefix = mobile ? 'm-' : '';

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      success('Your account has been created. Please sign in.', 'Registration successful');
      navigate('/login');
    } catch (err) {
      setShakeKey((k) => k + 1);
      errorToast(err.response?.data?.errors?.email || err.response?.data?.message || 'Registration failed.', 'Could not register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={mobile ? 'space-y-4' : 'space-y-5'}>
      <div key={shakeKey} className={`${mobile ? 'space-y-4' : 'space-y-5'} ${shakeKey > 0 ? 'animate-shake' : ''}`}>
        <InputField
          label="Full Name"
          name="name"
          type="text"
          placeholder="John Doe"
          icon={UserIcon}
          register={register}
          error={errors.name?.message}
          valid={fieldValid('name')}
          onBlur={() => trigger('name')}
          idPrefix={idPrefix}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          icon={MailIcon}
          register={register}
          error={errors.email?.message}
          valid={fieldValid('email')}
          onBlur={() => trigger('email')}
          idPrefix={idPrefix}
        />
        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="+1 987 654 3210"
          icon={PhoneIcon}
          register={register}
          error={errors.phone?.message}
          valid={fieldValid('phone')}
          onBlur={() => trigger('phone')}
          idPrefix={idPrefix}
        />
        <PasswordField
          label="Password"
          name="password"
          placeholder="••••••••"
          register={register}
          error={errors.password?.message}
          valid={fieldValid('password')}
          showStrength
          criteria={criteria}
          value={values.password || ''}
          onBlur={() => trigger('password')}
          idPrefix={idPrefix}
        />
        <PasswordField
          label="Confirm Password"
          name="password_confirmation"
          placeholder="••••••••"
          register={register}
          error={errors.password_confirmation?.message}
          valid={fieldValid('password_confirmation')}
          onBlur={() => trigger('password_confirmation')}
          idPrefix={idPrefix}
        />

        <div className="flex items-start gap-3">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              {...register('terms')}
              id={`${idPrefix}terms`}
              className="peer w-4 h-4 rounded-md border-slate-300 text-[#14249C] focus:ring-[#14249C] focus:ring-2 cursor-pointer transition-all duration-200 appearance-none checked:bg-[#14249C] checked:border-[#14249C] bg-white border"
            />
            <CheckIcon className="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none p-[2px]" />
          </div>
          <label htmlFor={`${idPrefix}terms`} className="text-[13px] font-normal text-[#64748B] leading-relaxed cursor-pointer">
            I agree to the <span className="text-[#14249C] font-medium hover:underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-[#14249C] font-medium hover:underline cursor-pointer">Privacy Policy</span>
          </label>
        </div>
        {errors.terms && <p className="text-[13px] font-medium text-[#DC2626] animate-fade-in">{errors.terms.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="relative w-full flex items-center justify-center gap-2 bg-[#14249C] text-white font-medium text-[15px] tracking-[-0.01em] py-3.5 px-4 rounded-[14px] hover:bg-[#0F1B75] hover:shadow-lg hover:shadow-[#14249C]/20 hover:-translate-y-px active:scale-[0.97] active:shadow-md focus:outline-none focus:shadow-[0_0_0_4px_rgba(20,36,156,0.15)] transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:translate-y-0 overflow-hidden group"
        >
          <span className="absolute inset-0 overflow-hidden rounded-[14px]">
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
          </span>
          {loading ? (
            <>
              <span className="flex gap-1 relative">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              <span className="ml-1 relative">Creating account...</span>
            </>
          ) : (
            <>
              <span className="relative">Create Account</span>
              <ArrowRightIcon className="w-4 h-4 relative transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
