import React from 'react';

import { Menu } from 'main/Menu.jsx';
import { Footer } from 'main/Footer.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/main/layout.scss';


export class MainLayout extends PropsComponent {

  render() {
    return (
      <div>
        <Menu />
        <div className="MainContent">
          {this.state.children}
        </div>
        <Footer />
      </div>
    );
  }
}
