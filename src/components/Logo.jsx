import { Link } from 'react-router-dom';

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center shrink-0 ${className}`}>
      <span className="text-[#1C2035] dark:text-white text-[1.15rem] md:text-[1.35rem] font-light tracking-[0.35em] uppercase select-none whitespace-nowrap">
        INOVA
      </span>
    </Link>
  );
}

