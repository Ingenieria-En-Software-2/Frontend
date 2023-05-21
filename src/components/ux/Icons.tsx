import { faAngleDown, faAngleUp, faArrowDown, faArrowLeft, faArrowRight, faCircle, faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconProps = {
  children: React.ReactNode;
  className?: string;
};

type ComponentProps = {
  className?: string;
};

export default function Icon({ children, className }: IconProps) {
  return <span className={`icon ${className ?? ""}`}>{children}</span>;
}

export function CloseIcon({ className }: ComponentProps) {
  return <FontAwesomeIcon className={className} icon={faTimes} />;
}
export function HomeIcon({ className }: ComponentProps) {
  return <FontAwesomeIcon className={className} icon={faHome} />;
}
export function ArrowLeftLineIcon({ className }: ComponentProps) {
  return <FontAwesomeIcon className={className} icon={faArrowLeft} />;
}
export function ArrowRightLineIcon({ className }: ComponentProps) {
  return <FontAwesomeIcon className={className} icon={faArrowRight} />;
}
export function ArrowDownLineIcon({ className }: ComponentProps) {
  return <FontAwesomeIcon className={className} icon={faArrowDown} />;
}
export function AngleUpLineIcon({ className }: ComponentProps) {
  return <FontAwesomeIcon className={className} icon={faAngleUp} />;
}
export function AngleDownLineIcon({ className }: ComponentProps) {
  return <FontAwesomeIcon className={className} icon={faAngleDown} />;
}
export function CircleIcon({ className }: ComponentProps) {
  return <FontAwesomeIcon className={className} icon={faCircle} />;
}