import Axios from "axios";
import AppConstants from "../../constants/AppConstants";

export default class DashboardServices {
  getData(type) {
    let URL = null;
    switch (type) {
      case AppConstants.PENDING:
        URL = "https://api.myjson.com/bins/15otm6";
        break;
      case AppConstants.WIP:
        URL = "https://api.myjson.com/bins/hc6z2";
        break;
      case AppConstants.COMPLETED:
        URL = "https://api.myjson.com/bins/1hked2";
        break;
    }
    return Axios.get(URL);
  }
}
