import React from 'react';
import { Link } from 'react-router';

import { StateComponent } from 'base/StateComponent.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { Guide } from 'modals/Guide.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { strings } from './Become_lang.js'


export class Become extends StateComponent {

  render() {
    return (
      <div className="HomeContainer">
        <Guide controller={new ModalFormController(true)} />
        <List wrapChildren={false}>
          <Element elementStyle="Tight Transparent">
            <Layout layoutStyle="LayoutRegular">
              <Text>
                  <p dangerouslySetInnerHTML={{ __html: strings.text1 }} / >
                  <p dangerouslySetInnerHTML={{ __html: strings.text2 }} / >
                  <p>{strings.text3}<Link to="/guide/adverts">{strings.text4}</Link>{strings.text5}</p>
              </Text>
            </Layout>
            <Information infoStyle="Info">{strings.info}</Information>
          </Element>
        </List>
      </div>
    );
  }
}
