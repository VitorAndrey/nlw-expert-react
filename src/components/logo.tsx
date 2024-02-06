import logo from "../assets/Logo.svg";

type LogoProps = {
  size?: number;
};

export function Logo({ size = 100 }: LogoProps) {
  return <img src={logo} alt="NWL Expert Logo" width={size} />;
}
