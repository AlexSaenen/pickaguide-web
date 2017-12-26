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

export class Become extends StateComponent {

  render() {
    return (
      <div className="HomeContainer">
        <Guide controller={new ModalFormController(true)} />
        <List wrapChildren={false}>
          <Element elementStyle="Tight Transparent">
            <Layout layoutStyle="LayoutRegular">
              <Text>
                <p>Thank you for joining the <strong>Pickguide guides community</strong></p>
                <p>Now you have access to <strong>lot of features</strong> that will allow you to handle <strong>your guide life</strong></p>
                <p>You can begin by accessing to the <a className="Blue" href="/guide/adverts">advert creation</a> page to create your first advert</p>
              </Text>
            </Layout>
            <Information infoStyle="Info">Enjoy & have a good experience with us.</Information>
          </Element>
        </List>
      </div>
    );
  }
}
