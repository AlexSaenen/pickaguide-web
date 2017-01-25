import { StateComponent } from 'base/StateComponent.jsx';


export class StoreObserver extends StateComponent {

  constructor(props, context, stores) {
    super(props, context);

    this.stores = (stores.constructor === Array ? stores : [stores]);
  }

  componentDidMount() {
    this.stores.forEach((store) => {
      store.listen(this.onStoreChange);
    });
  }

  componentWillUnmount() {
    this.stores.forEach((store) => {
      store.unlisten(this.onStoreChange);
    });
  }
}
