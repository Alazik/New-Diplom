import { connect } from "react-redux";
import {
  follow,
  setUsers,
  setCurrentPage,
  unfollow,
  toggleFollowingProgress,
  requestUsers,
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Loader";
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/users-selectors";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";

class UsersContainer extends React.Component {
  componentDidMount() {
    const {currentPage, pageSize, filter} = this.props
    this.props.getUsers(currentPage, pageSize, filter);
  }

  onPageChanged = (pageNumber) => {
    const {pageSize, filter} = this.props
    this.props.getUsers(pageNumber, pageSize, filter);
  };

  onFilterChanged = (filter) => {
    const {pageSize} = this.props
    this.props.getUsers(1, pageSize, filter);
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          onFilterChanged={this.onFilterChanged}
          onPageChanged={this.onPageChanged}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  console.log(typeof(getPageSize(state)))
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
  };
};

export default compose(withAuthNavigate,
  connect(mapStateToProps, {
    follow,
    setUsers,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers: requestUsers
  })
)(UsersContainer);