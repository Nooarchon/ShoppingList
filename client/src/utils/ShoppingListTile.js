import React from 'react';
import './ShoppingListTile.css'; // Import CSS file for styling

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
