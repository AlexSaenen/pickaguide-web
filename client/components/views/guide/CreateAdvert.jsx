import React from 'react';
import { browserHistory } from 'react-router';
import ImageUploader from 'layout/user/uploader/FileUploader.jsx';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { FormController } from 'base/FormController.jsx';
import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { Element } from 'layout/list/Element.jsx';
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
    };

    this.ctrl = new FormController();
    this.ctrl.attachSubmit(this.onSubmit.bind(this));
    this.timeoutChange = null;
    this.onDrop = this.onDrop.bind(this);
  }

  onStore(store) {
    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when creating your ad',
        content: String(store.error),
        type: 'Alert',
      }, false);
    } else {
      browserHistory.goBack();
    }
  }

  onSubmit(form) {
    delete form[''];
    form.pictures = this.state.pictures;

    if (form.pictures.length > 0) {
      AdvertsActions.create(form);
    } else {
      this.ctrl.messageCallback({
        title: 'We need images',
        content: 'We need at least one image for your new advert',
        type: 'Alert',
      }, false);
    }
  }

  changeLocation(location) {
    if (this.timeoutChange) {
      clearTimeout(this.timeoutChange);
    }

    this.timeoutChange = setTimeout(() => {
      this.setState({ location });
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
    });
  }

  render() {
    const advert = this.state.advert || {};

    return (
      <div>
        <PanelForm controller={this.ctrl} layoutStyle="LayoutLight Tight" panelStyle="Large">
          <Title>Create Ad</Title>

          <Information infoStyle="Info">Your first selected picture will be used as cover</Information>

          <ImageUploader
            withIcon
            withPreview
            buttonText="Choose images"
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            onChange={this.onDrop}
          />

          <hr className="SpacedOverlay" />

          <TextInput label="title" value={advert.title} required override onChange={this.changeTitle.bind(this)} />
          <TextInput label="city" value={advert.city} required onChange={this.changeCity.bind(this)} />
          <TextInput label="country" value={advert.country} required onChange={this.changeCountry.bind(this)} />
          <TextArea label="description" value={advert.description} required override onChange={this.changeDescription.bind(this)} />
          <TextInput label="location" placeholder="Street Address" value={advert.location} onChange={this.changeLocation.bind(this)} />

          <Element elementStyle="Tight NoHorizontalWrap Clickable Height20">
            <AdvertMap zoom={12} location={this.state.location} city={advert.city} country={advert.country} />
          </Element>
        </PanelForm>
      </div>
    );
  }
}
