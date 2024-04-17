import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import markAsResolvedIcon from '../images/mark_as_resolved_icon.png';
import removeIcon from '../images/remove_icon.png';
import addIcon from '../images/add_icon.png';
import backIcon from '../images/back_icon.png';
import ShoppingListTile from '../utils/ShoppingListTile';

function ShoppingListDetail({ shoppingLists, updateShoppingList, user }) {
  const { id } = useParams();
  const [editedName, setEditedName] = useState('');
  const [newMember, setNewMember] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [filterResolved, setFilterResolved] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'tiles'

  const shoppingList = shoppingLists.find(list => list.id === parseInt(id));

  if (!user) {
    return <Navigate to="/" />;
  }

  // Check if the user is the owner of the list or a member
  if (!shoppingList || (shoppingList.owner !== user.username && !shoppingList.members.includes(user.username))) {
    return <Navigate to="/" />;
  }

  const handleNameChange = (e) => {
    if (user.username === shoppingList.owner) {
      setEditedName(e.target.value);
    }
  };

  const handleMemberAdd = () => {
    if (!/^[a-zA-Z\s]+$/.test(newMember.trim())) {
      alert('Please enter a valid member name containing only letters.');
      return;
    }
    const updatedMembers = [...shoppingList.members, newMember];
    updateShoppingList({ ...shoppingList, members: updatedMembers });
    setNewMember('');
  };
  
  
  const handleMemberRemove = (member) => {
    if (member === shoppingList.owner) {
      alert("The owner cannot be removed from the list.");
      return;
    }
  
    if (user.username === shoppingList.owner) {
      const updatedMembers = shoppingList.members.filter(m => m !== member);
      updateShoppingList({ ...shoppingList, members: updatedMembers });
    } else {
      alert("You don't have permission to remove members.");
    }
  };
  
  const handleLeaveList = () => {
    if (user.username === shoppingList.owner) {
      alert("As the owner, you cannot leave the list.");
      return;
    }
  
    const updatedMembers = shoppingList.members.filter(member => member !== user.username);
    updateShoppingList({ ...shoppingList, members: updatedMembers });
  };
  
  const handleItemAdd = () => {
    if (!/^[a-zA-Z\s]+$/.test(newItemName.trim())) {
      alert('Please enter a valid item name containing only letters.');
      return;
    }
    const newItem = { id: Date.now(), name: newItemName, resolved: false };
    const updatedItems = [...shoppingList.items, newItem];
    updateShoppingList({ ...shoppingList, items: updatedItems });
    setNewItemName('');
  };
  
  const handleItemRemove = (itemId) => {
    const updatedItems = shoppingList.items.filter(item => item.id !== itemId);
    updateShoppingList({ ...shoppingList, items: updatedItems });
  };

  const handleItemResolve = (itemId) => {
    const updatedItems = shoppingList.items.map(item =>
      item.id === itemId ? { ...item, resolved: true } : item
    );
    updateShoppingList({ ...shoppingList, items: updatedItems });
  };

  const handleFilterToggle = () => {
    setFilterResolved(!filterResolved);
  };

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'list' ? 'tiles' : 'list');
  };

  return (
    <div className="shopping-list-container">
      <h2>
        {user.username === shoppingList.owner ? (
          <input
            type="text"
            value={editedName || shoppingList.name}
            onChange={handleNameChange}
            onBlur={() => updateShoppingList({ ...shoppingList, name: editedName })}
            placeholder="Enter shopping list name"
          />
        ) : (
          <span>{shoppingList.name}</span>
        )}
      </h2>
      <p>Owner: {shoppingList.owner}</p>
    
      <>
        <h3>Members:</h3>
        <div className="filter-container">
        <button onClick={toggleViewMode}>
          {viewMode === 'list' ? 'Show them as Tiles' : 'Show them as List'}
        </button>
        </div>
        {viewMode === 'tiles' ? (
          <div className="tile-container">
            {shoppingList.members.map(member => (
              <ShoppingListTile key={member} item={{ name: member }} />
            ))}
          </div>
        ) : (
          <ul>
            {shoppingList.members.map(member => (
              <li key={member}>
                {member}
                {user.username === shoppingList.owner && member !== shoppingList.owner && (
                  <button onClick={() => handleMemberRemove(member)}>
                    <img src={removeIcon} alt="Remove Member" width="20" height="20" />
                  </button>
                )}
              </li>
            ))}
            {user.username !== shoppingList.owner && (
              <li>
                <button onClick={handleLeaveList}>
                  Leave List
                </button>
              </li>
            )}
            {user.username === shoppingList.owner && (
              <li>
                <input
                  type="text"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  placeholder="Enter new member name"
                />
                <button onClick={handleMemberAdd}>
                  <img src={addIcon} alt="Add Member" width="20" height="20" />
                </button>
              </li>
            )}
          </ul>
        )}
      </>
      <h3>Items:</h3>
      <div className="filter-container">
        <label>
          Filter Resolved Items
          <input
            type="checkbox"
            checked={filterResolved}
            onChange={handleFilterToggle}
          />
        </label>
      </div>
      {viewMode === 'tiles' ? (
        <div className="tile-container">
          {shoppingList.items.map(item => (
            (!filterResolved || !item.resolved) && (
              <ShoppingListTile key={item.id} item={item} />
            )
          ))}
          <div className="tile">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Enter new item name"
            />
            <button onClick={handleItemAdd}>
              <img src={addIcon} alt="Add Item" width="20" height="20" />
            </button>
          </div>
        </div>
      ) : (
        <div className="list-container">
          <ul>
            {shoppingList.items.map(item => (
              (!filterResolved || !item.resolved) && (
                <div key={item.id} className="list-item">
                  <span>{item.name} {item.resolved ? '(Resolved)' : ''}</span>
                  {!item.resolved && (
                    <>
                      <button onClick={() => handleItemResolve(item.id)}>
                        <img src={markAsResolvedIcon} alt="Mark as Resolved" width="20" height="20" />
                      </button>
                      <button onClick={() => handleItemRemove(item.id)}>
                        <img src={removeIcon} alt="Remove" width="20" height="20" />
                      </button>
                    </>
                  )}
                </div>
              )
            ))}
            <div className="list-item">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter new item name"
              />
              <button onClick={handleItemAdd}>
                <img src={addIcon} alt="Add Item" width="20" height="20" />
              </button>
            </div>
          </ul>
        </div>
      )}
     
      <Link to="/" className="back-link">
        <img src={backIcon} alt="Back to Shopping Lists Overview" width="20" height="20" />
      </Link>
    </div>
  );
}

export default ShoppingListDetail;
