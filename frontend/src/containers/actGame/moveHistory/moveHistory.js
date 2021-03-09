import react from 'react';
import styles from './moveHistory.module.css'
import ScrollToBottom from 'react-scroll-to-bottom';

const MoveHistory = ({ moves }) => (
  <div className={styles.moveBox}>
      <h4 className={styles.moveHeader}>Move history</h4>
      <ScrollToBottom className={styles.moveList}>
      <ul>
        {(moves !== undefined) ?
          moves.map((move) => {
            return (
              <li>{move}</li>
            );
          })
          : <div />}
      </ul>
      </ScrollToBottom>
  </div>
);

export default MoveHistory;
