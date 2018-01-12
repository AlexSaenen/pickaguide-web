import React from 'react';

import { StateComponent } from 'base/StateComponent.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { Guide } from 'modals/Guide.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { List } from 'layout/list/List.jsx';
import { strings } from './Become_lang.js'


export class Become extends StateComponent {

  render() {
    return (
      <div className="HomeContainer">
        <Layout>
          <Title>Thank you and have fun !</Title>
        </Layout>

        <Layout>
          <hr className="Overlay" />
        </Layout>

        <List listStyle="W50E MW90" wrapChildren={false}>
          <Element elementStyle="Transparent">
            <Layout layoutStyle="LayoutRegular SoftShadowNonHover">
              <Text>
                <p>Thank you for joining the <strong>Pickguide guides community</strong></p><br />
                <p>Now you have access to <strong>lot of features</strong> that will allow you to handle <strong>your guide life</strong></p><br />
                <p>You can begin by accessing to the <a className="Blue Bold" href="/guide/adverts">advert creation</a> page to create your first advert</p><br />
                <p>And we recommend you to fill in your personal description in your <a className="Blue Bold" href="/profiles/mine/edit">profile</a> and</p><br />
                <p>update your avatar there as well</p>
              </Text>
            </Layout>
            <Information infoStyle="Info">{strings.info}</Information>
          </Element>
        </List>

        <Guide controller={new ModalFormController(true)} />
      </div>
    );
  }
}
