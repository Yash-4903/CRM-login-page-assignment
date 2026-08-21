import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../InputField';
import PasswordField from '../PasswordField';
import { loginSchema } from '../../lib/validators';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import api, { setToken } from '../../lib/api';
import { ArrowRightIcon, MailIcon } from '../icons';

function LoginForm({ mobile = false }) {
  const { dispatch } = useAuth();
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
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });
  const emailValue = watch('email');
  const passwordValue = watch('password');
  const idPrefix = mobile ? 'm-' : '';

  const onSubmit = async (data) => {
    setLoading(true);
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await api.post('/auth/login', data);
      setToken(response.data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response.data.data, token: response.data.token } });
      success('You have been signed in successfully.', 'Welcome back');
      navigate('/dashboard');
    } catch (err) {
      setShakeKey((k) => k + 1);
      errorToast(err.response?.data?.message || 'Invalid email or password.', 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={mobile ? 'space-y-4' : 'space-y-5'}>
      <div key={shakeKey} className={`${mobile ? 'space-y-4' : 'space-y-5'} ${shakeKey > 0 ? 'animate-shake' : ''}`}>
        <InputField
          label="Email address"
          name="email"
          type="email"
          placeholder="you@company.com"
          icon={MailIcon}
          register={register}
          error={errors.email?.message}
          valid={isDirty && !errors.email && emailValue.length > 0}
          onBlur={() => trigger('email')}
          idPrefix={idPrefix}
        />
        <PasswordField
          label="Password"
          name="password"
          placeholder="••••••••"
          register={register}
          error={errors.password?.message}
          valid={isDirty && !errors.password && passwordValue.length > 0}
          onBlur={() => trigger('password')}
          idPrefix={idPrefix}
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="relative text-[14px] font-medium tracking-[-0.01em] text-[#14249C] hover:text-[#0F1B75] transition-colors duration-200 group/link"
          >
            Forgot password?
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#14249C] transition-all duration-300 ease-out group-hover/link:w-full" />
          </Link>
        </div>

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
              <span className="ml-1 relative">Signing in...</span>
            </>
          ) : (
            <>
              <span className="relative">Sign in</span>
              <ArrowRightIcon className="w-4 h-4 relative transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
