import { Link } from "react-router-dom";
import styles from "./About.module.css";

function About() {
  return (
    <div className={`${styles.about} layout`}>
      <h2>Sobre nós</h2>
      <p>
        <span>Missão: </span>Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Aliquam risus libero, efficitur eu placerat quis, lacinia varius
        quam. Sed turpis tellus, rutrum eu velit semper, pulvinar sollicitudin
        mauris. Mauris accumsan dolor quis facilisis maximus. Nulla suscipit
        sagittis viverra. In posuere sem est, a porta risus rhoncus nec. Cras
        euismod nisi vel sem blandit gravida. Sed sem tortor, suscipit ac nunc
        eu.
      </p>
      <p>
        <span>Visão: </span>Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Aliquam risus libero, efficitur eu placerat quis, lacinia varius
        quam. Sed turpis tellus, rutrum eu velit semper, pulvinar sollicitudin
        mauris. Mauris accumsan dolor quis facilisis maximus. Nulla suscipit
        sagittis viverra. In posuere sem est, a porta risus rhoncus nec. Cras
        euismod nisi vel sem blandit gravida. Sed sem tortor, suscipit ac nunc
        eu.
      </p>
      <p>
        <span>Valor: </span>Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Aliquam risus libero, efficitur eu placerat quis, lacinia varius
        quam. Sed turpis tellus, rutrum eu velit semper, pulvinar sollicitudin
        mauris. Mauris accumsan dolor quis facilisis maximus. Nulla suscipit
        sagittis viverra. In posuere sem est, a porta risus rhoncus nec. Cras
        euismod nisi vel sem blandit gravida. Sed sem tortor, suscipit ac nunc
        eu.
      </p>
      <Link to="/posts/createProperty" className="btn">
        Anuncie seu imóvel
      </Link>
    </div>
  );
}

export default About;
