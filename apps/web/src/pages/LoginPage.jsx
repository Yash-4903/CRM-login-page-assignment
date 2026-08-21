import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import { ArrowRightIcon, ShieldIcon } from '../components/icons';

function LoginPage() {
  return (
    <AuthLayout>
      {(variant) => (
        <>
          {variant === 'desktop' ? (
            <>
              <div className="mb-10 animate-fade-in">
                <div className="w-11 h-11 bg-[#14249C] rounded-[14px] flex items-center justify-center shadow-lg shadow-[#14249C]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#14249C]/25 hover:-translate-y-0.5">
                  <ShieldIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="mb-9 animate-fade-in" style={{ animationDelay: '50ms' }}>
                <h1 className="text-[28px] font-semibold text-[#0F172A] tracking-[-0.02em] leading-[1.15] mb-2">
                  Sign in to your account
                </h1>
                <p className="text-[15px] font-normal text-[#64748B] tracking-[-0.01em] leading-[1.5]">
                  Enter your credentials to access the dashboard
                </p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <LoginForm mobile={false} />
              </div>
              <p
                className="mt-10 text-center text-[14px] font-normal tracking-[-0.01em] text-[#64748B] animate-fade-in"
                style={{ animationDelay: '150ms' }}
              >
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="relative font-medium tracking-[-0.01em] text-[#14249C] hover:text-[#0F1B75] transition-colors duration-200 group/link inline-block"
                >
                  Register
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#14249C] transition-all duration-300 ease-out group-hover/link:w-full" />
                  <ArrowRightIcon className="w-3.5 h-3.5 inline-block ml-0.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-[24px] font-semibold text-[#0F172A] tracking-[-0.02em] leading-[1.2] mb-1">Sign in</h1>
              <p className="text-[14px] font-normal text-[#64748B] mb-7">Welcome back! Please enter your details.</p>
              <LoginForm mobile={true} />
              <p className="mt-7 text-center text-[14px] text-[#64748B]">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="font-medium text-[#14249C] hover:text-[#0F1B75] transition-colors duration-200">
                  Register
                </Link>
              </p>
            </>
          )}
        </>
      )}
    </AuthLayout>
  );
}

export default LoginPage;
