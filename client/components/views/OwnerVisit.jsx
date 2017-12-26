import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import Visit from 'layout/user/Visit.jsx';
import { FeedableModalFormController } from 'base/FeedableModalFormController.jsx';
import { ChangeStatus } from 'modals/ChangeStatus.jsx';
import VisitsStore from 'stores/user/Visits.js';
import VisitsActions from 'actions/Visits.js';


const getStatusMapping = (type) => {
  return (type === 'visitor' ? {
    waiting: ['cancel'],
    accepted: ['cancel'],
  } : {
    waiting: ['accept', 'deny'],
    accepted: ['finish', 'deny'],
  });
};

const getButtonColor = (status) => {
  switch (status.capitalize()) {
    case 'Accept':
    case 'Finish':
      return 'Blue';
    case 'Deny':
    case 'Cancel':
      return 'Red';
    default:
      return 'Blue';
  }
};


export class OwnerVisit extends StoreObserver {

  constructor(props, context) {
    super(props, context, VisitsStore);

    this.id = this.props.params.id;
    this.type = this.props.params.type;
    this.statusMapping = getStatusMapping(this.type);
    this.ctrl = new FeedableModalFormController();
    this.state = { visit: null };
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.params.id;
    this.type = nextProps.params.type;
    this.statusMapping = getStatusMapping(this.type);
    VisitsActions.find({ visitId: this.id, mine: true, type: this.type });
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.state.visit === null) {
      VisitsActions.find({ visitId: this.id, mine: true, type: this.type });
    }
  }

  onStore(store) {
    const nextState = Object.assign({}, this.state);

    if (store.error) {
      return;
    } else if (store.specificVisit && store.specificVisit._id === this.id) {
      nextState.visit = store.specificVisit;
    } else {
      nextState.visit = VisitsStore.getState().specificVisit;
    }

    this.setState(nextState);
  }

  render() {
    const visit = this.state.visit;

    if (visit === undefined || visit === null) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Loader />
        </Layout>
      );
    }

    const visitStatus = visit.status.slice(-1)[0].label;

    let changeStatus = null;

    const wrapFunctionToAction = (action) => {
      return () => {
        this.ctrl.feed({ callerId: this.id, actionType: action });
        this.ctrl.toggle(true);
      };
    };

    if (this.statusMapping[visitStatus] !== undefined && visit.about) {
      changeStatus = this.statusMapping[visitStatus].map((nextStatus, index) => {
        const callback = wrapFunctionToAction(nextStatus);

        return (
          <Button
            buttonStyle={`${getButtonColor(nextStatus)} Auto`}
            label={nextStatus.capitalize()}
            key={index}
            onCallback={callback}
          />
        );
      });
    }

    return (
      <div>
        <Visit visit={visit} clickable type={this.type} addon={changeStatus} />

        <ChangeStatus controller={this.ctrl} />
      </div>
    );
  }
}

OwnerVisit.propTypes = {
  params: React.PropTypes.object,
};
