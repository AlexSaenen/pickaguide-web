import React from 'react';

import { Menu } from 'components/Menu.jsx';
import { Footer } from 'components/Footer.jsx';
import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/components/mainLayout.scss';


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
