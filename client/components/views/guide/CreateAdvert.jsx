import React from 'react';
import { browserHistory } from 'react-router';
import ImageUploader from 'layout/user/uploader/FileUploader.jsx';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Form } from 'form/Form.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Message } from 'layout/elements/Message.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { List } from 'layout/list/List.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { TextArea } from 'form/TextArea.jsx';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsStore from 'stores/user/Adverts.js';
import ProfileStore from 'stores/user/Profile.js';
import AdvertMap from 'layout/user/AdvertMap.jsx';
import { strings } from './CreateAdvert_lang.js';

export class CreateAdvert extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    const profile = ProfileStore.getState().profile;

    this.state = {
      advert: {
        city: profile.city,
        country: profile.country,
        location: '',
        title: '',
      },
      pictures: [],
      cover: null,
    };

    this.timeoutChange = null;
    this.onDrop = this.onDrop.bind(this);
    this.onSelectAsCover = this.onSelectAsCover.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.messageCallback = () => {};
  }

  onStore(store) {
    if (store.error) {
      this.messageCallback({
        title: String(strings.errorTitle),
        content: String(store.error),
        type: 'Alert Medium MarginAuto',
      }, false);
    } else {
      browserHistory.goBack();
    }
  }

  onSubmit(form, messageCallback) {
    delete form[''];
    form.pictures = this.state.pictures;

    const cover = this.state.cover;

    const populateFileReaders = () => {
      const fileReaders = [];

      for (let it = 0; it < form.pictures.length; it += 1) {
        const picture = form.pictures.item(it);

        fileReaders.push(new Promise((resolve) => {
          const reader = new FileReader();

          reader.onloadend = function loadedData() {
            if (reader.result === cover) {
              resolve(true);
            } else {
              resolve(false);
            }
          };

          reader.readAsDataURL(picture);
        }));
      }

      return fileReaders;
    };

    if (form.pictures.length > 0) {
      if (cover !== null) {
        Promise.all(populateFileReaders())
        .then((results) => {
          form.coverIndex = results.findIndex(result => result);
          AdvertsActions.create(form);
        });
      } else {
        form.coverIndex = 0;
        AdvertsActions.create(form);
      }
    } else {
      this.messageCallback = messageCallback;
      messageCallback({
        title: String(strings.needTitle),
        content: String(strings.needContent),
        type: 'Alert Medium MarginAuto',
      }, false);
    }
  }

  changeLocation(location) {
    if (this.timeoutChange) {
      clearTimeout(this.timeoutChange);
    }

    this.timeoutChange = setTimeout(() => {
      const advert = Object.assign({}, this.state.advert);
      advert.location = location;
      this.setState({ advert });
      clearTimeout(this.timeoutChange);
      this.timeoutChange = null;
    }, 400);
  }

  changeCity(city) {
    if (this.timeoutChange) {
      clearTimeout(this.timeoutChange);
    }

    this.timeoutChange = setTimeout(() => {
      const advert = Object.assign({}, this.state.advert);
      advert.city = city;
      this.setState({ advert });
      clearTimeout(this.timeoutChange);
      this.timeoutChange = null;
    }, 400);
  }

  changeCountry(country) {
    if (this.timeoutChange) {
      clearTimeout(this.timeoutChange);
    }

    this.timeoutChange = setTimeout(() => {
      const advert = Object.assign({}, this.state.advert);
      advert.country = country;
      this.setState({ advert });
      clearTimeout(this.timeoutChange);
      this.timeoutChange = null;
    }, 400);
  }

  changeTitle(title) {
    const advert = Object.assign({}, this.state.advert);
    advert.title = title;
    this.setState({ advert });
  }

  changeDescription(description) {
    const advert = Object.assign({}, this.state.advert);
    advert.description = description;
    this.setState({ advert });
  }

  onDrop(pictures) {
    this.setState({
      pictures,
      cover: null,
    });
  }

  onSelectAsCover(cover) {
    if (this.state.pictures.length > 1) {
      this.setState({
        cover,
      });
    }
  }

  render() {
    const advert = this.state.advert || {};
    const pictures = this.state.pictures;
    const cover = this.state.cover;

    return (
      <div>
        <Layout layoutStyle="LayoutBlank">
          <Title>{strings.title}</Title>
        </Layout>

        <Layout layoutStyle="LayoutBlank">
          <hr className="Overlay" />
          <Form layoutStyle="LayoutBlank Tight" onSubmit={this.onSubmit}>
            <List listStyle="ListStack" wrapChildren={false}>
              <div className="W80 Transparent MarginAuto PaddingOne Box">
                <Layout layoutStyle="Transparent SoftShadowNonHover Fluid">
                  <Information infoStyle="Info Medium MarginHAuto">{strings.PODescriptionInfo}</Information>
                  <TextInput placeholder={strings.POTitle} displayLabel={false} label="title" value={advert.title} required override onChange={this.changeTitle.bind(this)} />
                  <TextArea placeholder={strings.PODescription} displayLabel={false} className="Margin" label="description" value={advert.description} required override onChange={this.changeDescription.bind(this)} />
                </Layout>
              </div>

              <div className="W80 Transparent MarginAuto">
                <Layout layoutStyle="Transparent NoWrap">
                  <List listStyle="ListGrid WidthFull" wrapChildren={false}>
                    <Element elementStyle="W60 Inline-BlockImportant NoWrap Transparent Vertical Box">
                      <Layout layoutStyle="Transparent NoWrap">
                        {
                          pictures.length === 0 &&
                            <Information infoStyle="Info">{strings.POImage}</Information>
                        }

                        <Layout layoutStyle="SoftShadowNonHover OverflowHidden">
                          <ImageUploader
                            className="Transparent NoWrap"
                            withIcon
                            withPreview
                            buttonText={strings.POImageBtn}
                            imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                            onChange={this.onDrop}
                            onSelect={this.onSelectAsCover}
                          />
                          {
                            pictures.length > 1 && cover === null &&
                              <Information infoStyle="Info">{strings.imageInfo}</Information>
                          }
                        </Layout>
                      </Layout>
                    </Element>

                    {
                      cover !== null &&
                        <Element elementStyle="W40 Inline-BlockImportant NoWrap Transparent Vertical Box">
                          <Layout layoutStyle="Transparent NoWrap">
                            <Information infoStyle="Info">{strings.imageInfo2}</Information>
                            <Picture pictureName={strings.imageName} url={cover} />
                          </Layout>
                        </Element>
                    }
                  </List>
                </Layout>
              </div>
            </List>

            <Layout layoutStyle="W80 NoWrap MarginAuto">
              <Layout layoutStyle="W80 NoWrap MarginAuto">
                <Element elementStyle="W60 NoWrap PaddingOne Box Inline-Block Vertical">
                  <Element elementStyle="WidthFull Height20 NoWrap OverflowHidden Inline-Block SoftShadow">
                    <AdvertMap zoom={12} location={advert.location} city={advert.city} country={advert.country} />
                  </Element>
                </Element>

                <Element elementStyle="W40 NoWrap PaddingOne Box Vertical Inline-Block">
                  <Information infoStyle="Info LessMarginTop">{strings.localisationInfo}</Information>

                  <Layout layoutStyle="Transparent SoftShadowNonHover">
                    <TextInput displayLabel={false} label="city" placeholder={strings.POCity} value={advert.city} required onChange={this.changeCity.bind(this)} />
                    <TextInput displayLabel={false} label="country" placeholder={strings.POCountry} value={advert.country} required onChange={this.changeCountry.bind(this)} />
                    <TextInput displayLabel={false} label="location" placeholder={strings.POStreetAdresse} value={advert.location} onChange={this.changeLocation.bind(this)} />
                  </Layout>
                </Element>
              </Layout>
            </Layout>
            <Information infoStyle="Warning Auto MarginAuto TopMarginImportant">{strings.activateInfo}</Information>
          </Form>
        </Layout>
      </div>
    );
  }
}
