import { FooterProps } from "./footer.types";
import "./footer.styles.css";

export default function Footer({}: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          Feito com ❤ na aula de IA do SENAI
        </p>
      </div>
    </footer>
  );
}
