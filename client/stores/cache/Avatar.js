import alt from 'client/alt';
import AvatarActions from 'actions/CacheAvatar.js';


class AvatarCache {

  constructor() {
    this.error = null;
    this.timeouts = [];
    this.blocks = [];
    this.hashMap = [];
    this.avatars = [];
    this.bindActions(AvatarActions);
  }

  onCache(block) {
    this.error = null;
    const lastBlock = this.blocks.slice(-1)[0];
    const id = lastBlock ? lastBlock.id + 1 : 0;
    this.blocks.push({ id, block });

    Object.keys(block).forEach((userId) => {
      this.hashMap.push(userId);
      this.avatars.push(block[userId]);
    });


    const ptr = setTimeout((idBlock) => {
      AvatarActions.cacheBlockTimeout(idBlock);
    }, 1000 * 10, id);

    this.timeouts.push({ id, ptr });
    return false;
  }

  onCacheBlockTimeout(idBlock) {
    const indexTimeout = this.timeouts.findIndex(timeoutObj => timeoutObj.id === idBlock);

    if (indexTimeout !== -1) {
      clearTimeout(this.timeouts[indexTimeout].ptr);
      this.timeouts.splice(indexTimeout, 1);
    }

    const indexBlock = this.blocks.findIndex(blockObj => blockObj.id === idBlock);

    if (indexBlock !== -1) {
      const block = this.blocks[indexBlock];
      this.blocks.splice(indexBlock, 1);
      Object.keys(block.block).forEach((userId) => {
        const index = this.hashMap.indexOf(userId);
        this.hashMap.splice(index, 1);
        this.avatars.splice(index, 1);
      });
    }

    return false;
  }

  onInvalidate() {
    this.error = null;
    this.timeouts.forEach(timeoutObj => clearTimeout(timeoutObj.ptr));
    this.timeouts = [];
    this.blocks = [];
    this.hashMap = [];
    this.avatars = [];
    return false;
  }

}

export default alt.createStore(AvatarCache, 'AvatarCache');
