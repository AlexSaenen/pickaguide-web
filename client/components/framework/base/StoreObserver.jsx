import { StateComponent } from 'base/StateComponent.jsx';


export class StoreObserver extends StateComponent {

  constructor(props, context, stores) {
    super(props, context);

    this.stores = (stores.constructor === Array ? stores : [stores]);

    if (typeof this.onStore === 'function') {
      this.onStore = this.onStore.bind(this);
    }
  }

  componentDidMount() {
    this.stores.forEach((store) => {
      store.listen(this.onStore);
    });
  }

  componentWillUnmount() {
    this.stores.forEach((store) => {
      store.unlisten(this.onStore);
    });
  }
}
