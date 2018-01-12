import React from 'react';
import { browserHistory } from 'react-router';
import ImageUploader from 'layout/user/uploader/FileUploader.jsx';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalController } from 'base/ModalController.jsx';
import { Form } from 'form/Form.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Text } from 'layout/elements/Text.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Element } from 'layout/list/Element.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { List } from 'layout/list/List.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { Picture } from 'layout/elements/Picture.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import AdvertMap from 'layout/user/AdvertMap.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';
import { strings } from './OwnerAdvert_lang.js';

import 'scss/views/adverts.scss';

const getCache = (advertId) => {
  const storeCache = AdvertsStore.getState().specificAdvert;

  return (storeCache && storeCache._id === advertId ? storeCache : undefined);
};


export class OwnerAdvert extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.id = this.props.params.id;
    this.state = {
      advert: undefined,
      pictures: [],
      cover: null,
    };

    this.onDelete = this.onDelete.bind(this);
    this.previewAdvert = this.previewAdvert.bind(this);
    this.deleteCtrl = new ModalController();
    this.timeoutChange = null;
    this.onDrop = this.onDrop.bind(this);
    this.onSelectAsCover = this.onSelectAsCover.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.messageCallback = () => {};
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.params.id;
    AdvertsActions.find(this.id);
  }

  componentDidMount() {
    super.componentDidMount();

    if (this.state.advert === undefined) {
      AdvertsActions.find(this.id);
    }
  }

  onStore(store) {
    let advert = getCache(this.id);

    if (store.error) {
      this.messageCallback({
        title: 'Some error occurred when updating your ad',
        content: String(store.error),
        type: 'Alert Medium MarginAuto',
      }, false);
      return;
    } else if (store.specificAdvert && store.specificAdvert._id === this.id) {
      advert = store.specificAdvert;
    }

    this.setState({
      advert: {
        _id: advert._id,
        city: advert.city,
        country: advert.country,
        location: advert.location,
        title: advert.title,
        description: advert.description,
        images: advert.images,
      },
      cover: advert.images.length > 1 ? advert.images[0] : null,
    });
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
    this.setState({
      cover,
    });
  }

  onSubmit(form, messageCallback) {
    this.messageCallback = messageCallback;
    delete form[''];
    form._id = this.state.advert._id;
    form.pictures = [];

    if (this.state.pictures.length > 0) {
      form.pictures = this.state.pictures;
    }

    form.active = false;

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

    if (form.pictures.length > 0 && cover !== null) {
      Promise.all(populateFileReaders())
      .then((results) => {
        form.coverIndex = results.findIndex(result => result);
        AdvertsActions.update(form);
      });
    } else if (cover !== null) {
      form.coverIndex = this.state.advert.images.findIndex(image => cover === image);
      AdvertsActions.update(form);
    } else {
      form.coverIndex = 0;
      AdvertsActions.update(form);
    }
  }

  onDelete() {
    AdvertsActions.remove(this.state.advert._id);
    browserHistory.goBack();
  }

  previewAdvert() {
    browserHistory.push(`/guide/adverts/${this.state.advert._id}`);
  }

  render() {
    const advert = this.state.advert;
    const pictures = this.state.pictures;
    const cover = this.state.cover;

    if (advert === undefined || advert === null) {
      return (
        <div className="OwnerAdvert">
          <Layout layoutStyle="LayoutBlank">
            <Loader />
          </Layout>
        </div>
      );
    }

    return (
      <div className="OwnerAdvert">
        <QueryModal
          controller={this.deleteCtrl}
          query="Do you really wish to delete this Ad ?de"
          onConfirm={this.onDelete}
        />

        <Layout layoutStyle="LayoutBlank">
          <Title>Edit your Advert</Title>
          <div>
            <Button label="Back" buttonStyle="Auto TextWhite Bold" onCallback={browserHistory.goBack} />
            <Button label="Preview" buttonStyle="Blue Auto TextWhite Bold Spaced" onCallback={this.previewAdvert} />
            <Button buttonStyle="Red Auto TextWhite Bold" label="Delete" onCallback={this.deleteCtrl.toggle} />
          </div>
        </Layout>

        <Layout layoutStyle="LayoutBlank">
          <hr className="Overlay" />
          <Form layoutStyle="LayoutBlank Tight" onSubmit={this.onSubmit}>
            <List listStyle="ListGrid" elementStyle="W50 Transparent NoWrap Box Vertical">
              <Layout layoutStyle="Transparent NoWrap">
                {
                  pictures.length === 0 &&
                    <div>
                      <Text><p className="Italic">Current images attached to the Advert</p></Text>
                      <List listStyle="ListGrid" elementStyle="W20 Vertical SoftShadowNonHover Tight">
                        {
                          advert.images.map((image, index) =>
                            <ClickablePicture key={index} pictureName="Advert images" full pictureType="WidthFull" url={image} onClick={this.onSelectAsCover.bind(this, image)} />
                          )
                        }
                      </List>
                    </div>
                }

                <Layout layoutStyle="SoftShadowNonHover OverflowHidden">
                  {
                    pictures.length === 0 &&
                      <Information infoStyle="Info LessMarginTop">You may still decide to replace the current images with new ones</Information>
                  }
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
                  <TextInput label="location" defaultValue="" placeholder="Street Address" value={advert.location} onChange={this.changeLocation.bind(this)} />
                </Layout>
              </Element>
            </Layout>
            <Information infoStyle="Warning Auto MarginAuto TopMarginImportant">Once you edit this advert, as a measure of privacy we will disable it again for you to enable when comfortable</Information>
          </Form>
        </Layout>
      </div>
    );
  }
}
