import React from 'react';
import './Menu.css';
import { MenuComponent } from '@syncfusion/ej2-react-navigations';

class Menu extends React.Component {
    constructor() {
        super(...arguments);
         // Menu items definition
        this.menuItems = [
            {
                items: [
                    { text: 'Open' },
                    { text: 'Save' },
                    { text: 'Exit' }
                ],
                text: 'File'
            },
            {
                items: [
                    { text: 'Cut' },
                    { text: 'Copy' },
                    { text: 'Paste' }
                ],
                text: 'Edit'
            },
            {
                items: [
                    { text: 'Toolbar' },
                    { text: 'Sidebar' }
                ],
                text: 'View'
            },
            {
                items: [
                    { text: 'Spelling & Grammar' },
                    { text: 'Customize' },
                    { text: 'Options' }
                ],
                text: 'Tools'
            },
            {
                text: 'Go' 
            },
            { 
                text: 'Help' 
            }
        ];
  }
  render() {
    return (
        <div className="menuContainer">
            <MenuComponent items={this.menuItems}/>
        </div>
        );
    }
}

export default Menu;