import React from 'react';
import styles from "../styles/styles.css";

const ShoppingListTile = ({ item, isDetail }) => {
  return (
    <div className={`shopping-list-tile ${isDetail ? 'detail-tile' : ''}`}>
      <h3 className="tile-name">{item.name}</h3>
      {isDetail && <p className="tile-resolved">{item.resolved ? 'Resolved' : 'Unresolved'}</p>}
      {/* Add more details as needed */}
    </div>
  );
};

export default ShoppingListTile;
