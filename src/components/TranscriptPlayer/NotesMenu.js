import React from "react";
import pin from "../../images/pin.svg"
const NotesMenu = () => (
  <div className="notes">
    <div className="notesTitle">
      <img src={pin} alt="pin"/>Show notes
    </div>
    <div className="notesedit"></div>
  </div>
);

export default NotesMenu;
