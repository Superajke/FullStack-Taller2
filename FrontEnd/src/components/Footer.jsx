import "../css/Footer.css";
function Footer() {
  const actualYear = new Date().getFullYear();

  return (
    <section className="footer">
      <p>© {actualYear} Samuel Arango</p>
    </section>
  );
}

export default Footer;
