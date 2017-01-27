import React from 'react';

import { Menu } from 'components/Menu.jsx';
import { Footer } from 'components/Footer.jsx';
import { ParentComponent } from 'base/ParentComponent.jsx';


export class MainLayout extends ParentComponent {

  render() {
    return (
      <div>
        <Menu />
        {this.state.children}
        <Footer />
      </div>
    );
  }
}
