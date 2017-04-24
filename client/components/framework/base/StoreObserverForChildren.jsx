import { PropsComponent } from 'base/PropsComponent.jsx';


export class StoreObserverForChildren extends PropsComponent {

  constructor(props, context, stores) {
    super(props, context);

    this.stores = (stores.constructor === Array ? stores : [stores]);
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
