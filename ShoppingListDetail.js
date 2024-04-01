import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import markAsResolvedIcon from '../images/mark_as_resolved_icon.png';
import removeIcon from '../images/remove_icon.png';
import addIcon from '../images/add_icon.png';
import backIcon from '../images/back_icon.png';

function ShoppingListDetail({ shoppingLists, updateShoppingList, user }) {
  const { id } = useParams();
  const [editedName, setEditedName] = useState('');
  const [newMember, setNewMember] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [filterResolved, setFilterResolved] = useState(false);

  const shoppingList = shoppingLists.find(list => list.id === parseInt(id));

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  if (!shoppingList) {
    return <div>Loading...</div>;
  }

  const handleNameChange = (e) => {
    if (user.username === shoppingList.owner) {
      setEditedName(e.target.value);
    }
  };

  const handleMemberAdd = () => {
    if (user.username === shoppingList.owner) {
      if (!/^[a-zA-Z\s]+$/.test(newMember.trim())) {
        alert('Please enter a valid member name containing only letters.');
        return;
      }
      const updatedMembers = [...shoppingList.members, newMember];
      updateShoppingList({ ...shoppingList, members: updatedMembers });
      setNewMember('');
    }
  };
  
  const handleMemberRemove = (member) => {
    if (user.username === shoppingList.owner) {
      const updatedMembers = shoppingList.members.filter(m => m !== member);
      updateShoppingList({ ...shoppingList, members: updatedMembers });
    }
  };

  const handleLeaveList = (shoppingList) => {
    // If the current user is the owner, prevent them from leaving the list
    if (user.username === shoppingList.owner) {
      alert("As the owner, you cannot leave the list.");
      return;
    }
  
    // If the current user is not the owner, remove them from the list
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
    
      {user.username === shoppingList.owner && (
        <>
          <h3>Members:</h3>
          <ul>
            {shoppingList.members.map(member => (
              <li key={member}>
                {member}
                {member === user.username ? (
                 <button onClick={() => handleLeaveList(shoppingList)}>
                 Leave List
               </button>
               
                ) : (
                  <button onClick={() => handleMemberRemove(member)}>
                    <img src={removeIcon} alt="Remove Member" width="20" height="20" />
                  </button>
                )}
              </li>
            ))}
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
          </ul>
        </>
      )}
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
      <ul>
        {shoppingList.items.map(item => (
          (!filterResolved || !item.resolved) && (
            <li key={item.id}>
              {item.name} {item.resolved ? '(Resolved)' : ''}
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
            </li>
          )
        ))}
        <li>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Enter new item name"
          />
          <button onClick={handleItemAdd}>
            <img src={addIcon} alt="Add Item" width="20" height="20" />
          </button>
        </li>
      </ul>
      <Link to="/" className="back-link">
        <img src={backIcon} alt="Back to Shopping Lists Overview" width="20" height="20" />
      </Link>
    </div>
  );
}

export default ShoppingListDetail;
