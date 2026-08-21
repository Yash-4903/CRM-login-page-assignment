import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import { ShieldIcon } from '../components/icons';

function RegisterPage() {
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
                  Create your account
                </h1>
                <p className="text-[15px] font-normal text-[#64748B] tracking-[-0.01em] leading-[1.5]">
                  Get started with your CRM workspace
                </p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <RegisterForm mobile={false} />
              </div>
              <p
                className="mt-10 text-center text-[14px] font-normal tracking-[-0.01em] text-[#64748B] animate-fade-in"
                style={{ animationDelay: '150ms' }}
              >
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="relative font-medium tracking-[-0.01em] text-[#14249C] hover:text-[#0F1B75] transition-colors duration-200 group/link inline-block"
                >
                  Sign in
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#14249C] transition-all duration-300 ease-out group-hover/link:w-full" />
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-[24px] font-semibold text-[#0F172A] tracking-[-0.02em] leading-[1.2] mb-1">Create account</h1>
              <p className="text-[14px] font-normal text-[#64748B] mb-7">Get started with your workspace.</p>
              <RegisterForm mobile={true} />
              <p className="mt-7 text-center text-[14px] text-[#64748B]">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-[#14249C] hover:text-[#0F1B75] transition-colors duration-200">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </>
      )}
    </AuthLayout>
  );
}

export default RegisterPage;
