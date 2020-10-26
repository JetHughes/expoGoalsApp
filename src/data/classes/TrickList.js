import Utils from '../../Utils';

class TrickList {
  constructor(tricks, type, name, id){
    this.tricks = tricks;
    this.type = type;
    this.name = name;
    this.id = id ? id: Utils.unique();
  }
}

export default TrickList;