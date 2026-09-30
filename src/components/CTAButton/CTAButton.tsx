import styles from './CTAButton.module.css'

type CTAButtonProps = {
  text: string
  href?: string
  className?: string
}

function CTAButton({ text, href = '#', className }: CTAButtonProps) {
  return (
    <a
      className={className ? `${styles.button} ${className}` : styles.button}
      href={href}
    >
      <span>{text}</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12h20m-7-7 7 7-7 7" />
      </svg>
    </a>
  )
}

export default CTAButton
