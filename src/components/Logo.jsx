import { Link } from 'react-router-dom';

export default function Logo({ textOnly, iconOnlyMobile, className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-[clamp(0.375rem,1.125vw,0.5625rem)] text-primary shrink-0 ${className}`}>
      {!textOnly && (
        <img 
          src="/logo.svg" 
          alt="Padilla's Store logo" 
          className="h-[clamp(1.5rem,2.5vw,2rem)] w-auto object-contain"
        />
      )}
      <div className={`flex flex-col justify-center ${iconOnlyMobile ? 'hidden sm:flex' : 'flex'}`}>
        <span className="text-slate-900 dark:text-slate-100 text-[clamp(0.875rem,1.4vw,1.125rem)] font-brand font-bold leading-none whitespace-nowrap tracking-tight">
          Padilla's
        </span>
        <div className="flex justify-between w-full text-primary text-[clamp(0.375rem,0.63vw,0.48rem)] font-extrabold uppercase whitespace-nowrap mt-[0.1875rem] select-none">
          <span>S</span>
          <span>T</span>
          <span>O</span>
          <span>R</span>
          <span>E</span>
        </div>
      </div>
    </Link>
  );
}
