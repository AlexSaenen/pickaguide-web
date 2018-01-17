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
          <Title>{strings.title}</Title>
        </Layout>

        <Layout>
          <hr className="Overlay" />
        </Layout>

        <List listStyle="W50E MW90" wrapChildren={false}>
          <Element elementStyle="Transparent">
            <Layout layoutStyle="LayoutRegular SoftShadowNonHover">
              <Text>
                <p dangerouslySetInnerHTML={{ __html: strings.text1 }} / ><br />
                <p dangerouslySetInnerHTML={{ __html: strings.text2 }} / ><br />
                <p>{strings.text3}<a className="Blue Bold" href="/guide/adverts">{strings.text4}</a>{strings.text5}</p><br />
                <p>{strings.text6}<a className="Blue Bold" href="/profiles/mine/edit">{strings.text7}</a>{strings.text8}</p><br />
                <p>{strings.text9}</p>
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
