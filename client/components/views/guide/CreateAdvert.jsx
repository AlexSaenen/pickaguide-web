import React from 'react';
import { browserHistory } from 'react-router';
import ImageUploader from 'layout/user/uploader/FileUploader.jsx';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Form } from 'form/Form.jsx';
import { Title } from 'layout/elements/Title.jsx';
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
        title: 'Some error occurred when creating your ad',
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
        title: 'We need images',
        content: 'We need at least one image for your new advert',
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
          <Title>Create your Advert</Title>
        </Layout>

        <Layout layoutStyle="LayoutBlank">
          <hr className="Overlay" />
          <Form layoutStyle="LayoutBlank Tight" onSubmit={this.onSubmit}>
            <List listStyle="ListGrid" elementStyle="W50 Transparent NoWrap Box Vertical">
              <Layout layoutStyle="Transparent NoWrap">
                {
                  pictures.length === 0 &&
                    <Information infoStyle="Info">Select images to illustrate your visit experience to others</Information>
                }

                <Layout layoutStyle="SoftShadowNonHover OverflowHidden">
                  <ImageUploader
                    className="Transparent NoWrap"
                    withIcon
                    withPreview
                    buttonText="Choose images"
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    onChange={this.onDrop}
                    onSelect={this.onSelectAsCover}
                  />
                  {
                    pictures.length > 1 && cover === null &&
                      <Information infoStyle="Info">Select one of these images to be the advert's cover</Information>
                  }
                </Layout>
                {
                  cover !== null &&
                    <div>
                      <Information infoStyle="Info">The picture below will be the cover for your advert, or you can still chose another picture above</Information>
                      <Picture pictureName="Cover" url={cover} />
                    </div>
                }
              </Layout>

              <Layout layoutStyle="Transparent SoftShadowNonHover">
                <TextInput label="title" value={advert.title} required override onChange={this.changeTitle.bind(this)} />
                <TextArea label="description" value={advert.description} required override onChange={this.changeDescription.bind(this)} />
                <Information infoStyle="Info">The more descriptive you are, the more interesting people will find you</Information>
              </Layout>
            </List>

            <Layout layoutStyle="W80 NoWrap MarginAuto">
              <Element elementStyle="W50 NoWrap PaddingOne Box Inline-Block Vertical">
                <Element elementStyle="WidthFull Height20 NoWrap OverflowHidden Inline-Block SoftShadow">
                  <AdvertMap zoom={12} location={advert.location} city={advert.city} country={advert.country} />
                </Element>
              </Element>

              <Element elementStyle="W50 NoWrap PaddingOne Box Vertical Inline-Block">
                <Information infoStyle="Info">Users near the location provided below will be able to see your advert in their choices</Information>

                <Layout layoutStyle="Transparent SoftShadowNonHover">
                  <TextInput label="city" value={advert.city} required onChange={this.changeCity.bind(this)} />
                  <TextInput label="country" value={advert.country} required onChange={this.changeCountry.bind(this)} />
                  <TextInput label="location" placeholder="Street Address" value={advert.location} onChange={this.changeLocation.bind(this)} />
                </Layout>
              </Element>
            </Layout>
            <Information infoStyle="Warning Auto MarginAuto TopMarginImportant">Once you create this advert you will still need to activate it, to make it available to the other users</Information>
          </Form>
        </Layout>
      </div>
    );
  }
}
