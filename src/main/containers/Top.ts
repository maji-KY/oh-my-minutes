import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Top from "components/Top";
import { createNewMinute } from "modules/Top";

function makeMapStateToProps(): any {
  return (state: any) => {
    const { topReducer } = state;
    return {"minuteList": topReducer.minuteList};
  };
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({
    createNewMinute
  }, dispatch);
}

const TopCntr: any = connect(makeMapStateToProps, mapDispatchToProps)(Top);

export default TopCntr;
