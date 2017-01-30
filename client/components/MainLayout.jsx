import React from 'react';

import { Menu } from 'components/Menu.jsx';
import { Footer } from 'components/Footer.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';


export class MainLayout extends PropsComponent {

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
