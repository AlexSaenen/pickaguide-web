import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Form } from 'form/Form.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Element } from 'layout/list/Element.jsx';
import { List } from 'layout/list/List.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import BooksStore from 'stores/user/Books.js';
import BookActions from 'actions/Book.js';
import { strings } from './EditChapter.lang.js';
import ImageUploader from 'layout/user/uploader/FileUploader.jsx';

import 'scss/views/visits.scss';


export class EditChapter extends StoreObserver {

  constructor(props, context) {
    super(props, context, BooksStore);

    this.id = this.props.params.id;
    this.state = {
      visit: undefined,
      pictures: [],
    };

    this.onDrop = this.onDrop.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.messageCallback = () => {};
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.params.id;
    BookActions.find(this.id);
  }

  componentDidMount() {
    super.componentDidMount();

    if (this.state.visit === undefined) {
      BookActions.find(this.id);
    }
  }

  onStore(store) {
    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when updating your travelbook',
        content: String(store.error),
        type: 'Alert Medium MarginAuto',
      }, false);
      return;
    } else if (store.specificVisit && store.specificVisit._id === this.id) {
      const visit = store.specificVisit;

      this.setState({
        visit: {
          images: visit.images,
        },
      });
    } else {
      browserHistory.push('/travelbook');
    }
  }

  onDrop(pictures) {
    this.setState({
      pictures,
    });
  }

  onSubmit(form, messageCallback) {
    this.messageCallback = messageCallback;
    delete form[''];
    form._id = this.id;
    form.pictures = [];

    if (this.state.pictures.length > 0) {
      form.pictures = this.state.pictures;
    }

    if (form.pictures.length > 0) {
      BookActions.update(form);
    }
  }

  render() {
    const visit = this.state.visit;
    const pictures = this.state.pictures;

    if (visit === undefined || visit === null) {
      return (
        <div className="EditChapter">
          <Layout layoutStyle="LayoutBlank">
            <Loader />
          </Layout>
        </div>
      );
    }

    return (
      <div className="EditChapter">
        <Layout layoutStyle="LayoutBlank">
          <Title>Edit your travel</Title>
        </Layout>

        <Layout layoutStyle="LayoutBlank">
          <hr className="Overlay" />
          <Form layoutStyle="LayoutBlank Tight" onSubmit={this.onSubmit}>
            <List listStyle="ListStack WidthFull" wrapChildren={false}>
              <div className="W80 Transparent MarginAuto">
                <Layout layoutStyle="Transparent NoWrap">
                  <Element elementStyle="W60 MarginAuto Transparent">
                    <Layout layoutStyle="Transparent NoWrap">
                      {pictures.length === 0 && visit.images.length !== 0 &&
                        <div>
                          <Text><p className="Italic">Current images attached to the travel</p></Text>
                          <List listStyle="ListGrid" elementStyle="W20 Vertical SoftShadowNonHover Tight Inline-BlockImportant">
                            {
                              visit.images.map((image, index) =>
                                <Picture key={index} pictureName="Travel images" pictureType="WidthFull" url={image} />
                              )
                            }
                          </List>
                          <Information infoStyle="Info LessMarginTop">You may still decide to replace the current images with new ones</Information>
                        </div>
                      }
                      {visit.images.length === 0 && pictures.length === 0 &&
                        <Information infoStyle="Info">You have no memories yet</Information>
                      }

                      <Layout layoutStyle="SoftShadowNonHover OverflowHidden">
                        <ImageUploader
                          className="Transparent NoWrap"
                          withIcon
                          withPreview
                          buttonText="Choose images"
                          imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                          onChange={this.onDrop}
                        />
                      </Layout>
                    </Layout>
                  </Element>
                </Layout>
              </div>
            </List>
          </Form>
        </Layout>
      </div>
    );
  }
}
