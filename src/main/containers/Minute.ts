import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Minute from "components/Minute";
// import { makeUserBoardJoined, makeViewPlayers } from "selectors";
import { recStart, recStop, clearMinute } from "modules/Minutes";

function makeMapStateToProps(): any {
  return (state: any) => {
    const { minutesReducer } = state;
    return {"minute": minutesReducer.data};
  };
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({
    recStart, recStop, clearMinute
  }, dispatch);
}

const MinuteCntr: any = connect(makeMapStateToProps, mapDispatchToProps)(Minute);

export default MinuteCntr;
