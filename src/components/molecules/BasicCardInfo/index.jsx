import styles from './basicCard.module.css';
import Divider from '@mui/material/Divider';

function BasicCardColetas({ dadoTitulo, dado2, dado3 }) {
  return (
    <div className={styles.card}>
      <h3>{dadoTitulo}</h3>
      <p>{dado2}</p>
      <p> {dado3} </p>
      <Divider variant="middle" />
    </div>
  );
}

export default BasicCardColetas;
