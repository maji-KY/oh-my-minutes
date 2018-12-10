import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MyAppBar from "components/MyAppBar";
import { minuteTitleFromLocationSelector, isViewingMinuteSelector } from "selectors";

function makeMapStateToProps(): any {
  const makeMinuteTitleFromLocation = minuteTitleFromLocationSelector();
  const makeIsViewingMinute = isViewingMinuteSelector();
  return (state: any) => {
    const minuteTitle = makeMinuteTitleFromLocation(state);
    const isViewingMinute = makeIsViewingMinute(state);
    return { isViewingMinute, minuteTitle };
  };
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({
  }, dispatch);
}

const MyAppBarCntr: any = connect(makeMapStateToProps, mapDispatchToProps)(MyAppBar);

export default MyAppBarCntr;
